// Hero globe: land as survey dots, arcs from New Delhi to the markets on the resume.
// Self-contained: three.js is vendored, land data is precomputed (assets/js/land.js).
import * as THREE from '../vendor/three.module.min.js';
import { LAND } from './land.js';

const host = document.getElementById('globe');
if (host) {
  try { start(host); }
  catch (err) { host.classList.add('is-fallback'); console.warn('Globe disabled:', err); }
}

function start(host) {
  const canvasWrap = host.querySelector('.globe-canvas');
  const labelEls = Array.from(host.querySelectorAll('.globe-label'));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Phones and low-core devices draw at ~30fps and a lower pixel ratio: same look, far less battery.
  const lowPower = window.matchMedia('(max-width: 760px)').matches || (navigator.hardwareConcurrency || 8) <= 4;
  // Label sizes are measured here (on resize and once fonts load), never inside the frame loop.
  const labelSizes = [];
  function measureLabels() {
    labelEls.forEach((lab, i) => {
      const span = lab.firstElementChild;
      labelSizes[i] = span ? [span.offsetWidth, span.offsetHeight] : [0, 0];
    });
  }
  const DEG = Math.PI / 180;
  let inViewport = true, visible = !document.hidden, running = false, needs = true, started = false;
  const t0 = performance.now();

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.75 : 2));
  renderer.setClearColor(0x000000, 0);
  // No graphics chip (software rendering): draw a still frame and only redraw when the visitor drags.
  let software = false;
  try {
    const gl = renderer.getContext();
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const name = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    software = /swiftshader|llvmpipe|softpipe|software|basic render/i.test(String(name || ''));
  } catch (_) {}
  const calm = reduced || software;
  canvasWrap.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 4.1);

  // pivot tilts toward the viewer's latitude, spin turns the longitude
  const pivot = new THREE.Group();
  const spin = new THREE.Group();
  pivot.add(spin);
  scene.add(pivot);

  const toVec = (lat, lon, r = 1) => new THREE.Vector3(
    r * Math.cos(lat * DEG) * Math.sin(lon * DEG),
    r * Math.sin(lat * DEG),
    r * Math.cos(lat * DEG) * Math.cos(lon * DEG)
  );

  // ---------- ocean + atmosphere ----------
  // Soft fixed lighting gives the sphere depth while labels and routes stay crisp.
  scene.add(new THREE.AmbientLight(0xffffff, 1.05));
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
  keyLight.position.set(-3, 4, 5);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0x5c8db8, 0.7);
  rimLight.position.set(3, -1, -2);
  scene.add(rimLight);
  const oceanMat = new THREE.MeshPhongMaterial({ color: 0x13253a, shininess: 18, specular: 0x33445a });
  const ocean = new THREE.Mesh(new THREE.SphereGeometry(0.994, 72, 72), oceanMat);
  ocean.renderOrder = 0;
  spin.add(ocean);

  const glowMat = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(0x5c8db8) }, uStrength: { value: 1.0 } },
    vertexShader: `
      varying vec3 vN;
      void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uStrength; varying vec3 vN;
      void main(){ float i = pow(clamp(0.66 - dot(vN, vec3(0.0,0.0,1.0)), 0.0, 1.0), 3.0) * uStrength;
        gl_FragColor = vec4(uColor, i); }`,
    side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const glow = new THREE.Mesh(new THREE.SphereGeometry(1.085, 64, 64), glowMat);
  scene.add(glow);

  // ---------- land dots ----------
  const raw = Uint8Array.from(atob(LAND), c => c.charCodeAt(0));
  const ll = new Int16Array(raw.buffer);
  const n = ll.length / 2;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const v = toVec(ll[2 * i] / 100, ll[2 * i + 1] / 100, 1.0);
    pos[3 * i] = v.x; pos[3 * i + 1] = v.y; pos[3 * i + 2] = v.z;
  }
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dotsMat = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xd9c7a3) },
      uSize: { value: 2.6 },
      uOpacity: { value: 0.9 }
    },
    vertexShader: `
      uniform float uSize; varying float vFace;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 nrm = normalize(normalMatrix * position);
        vFace = dot(nrm, normalize(-mv.xyz));
        gl_PointSize = uSize * (4.1 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uOpacity; varying float vFace;
      void main(){
        vec2 c = gl_PointCoord - 0.5; float d = length(c);
        if (d > 0.5) discard;
        float edge = 1.0 - smoothstep(0.34, 0.5, d);
        float face = smoothstep(0.0, 0.45, vFace);
        gl_FragColor = vec4(uColor, uOpacity * edge * (0.35 + 0.65 * face));
      }`,
    transparent: true, depthWrite: false
  });
  const dots = new THREE.Points(dotsGeo, dotsMat);
  dots.renderOrder = 1;
  spin.add(dots);

  // ---------- markets ----------
  const HOME = { lat: 28.61, lon: 77.21 };
  const HARARE = { lat: -17.83, lon: 31.05 };
  const LUSAKA = { lat: -15.39, lon: 28.32 };
  const LAGOS = { lat: 6.52, lon: 3.38 };
  const DUBAI = { lat: 25.2, lon: 55.27 };
  // New Delhi -> Harare: launched and run. Harare -> Lusaka and Lagos: next markets for the product.
  const routes = [
    { from: HOME, to: HARARE, delay: 0.3 },
    { from: HARARE, to: LUSAKA, delay: 1.5 },
    { from: HARARE, to: LAGOS, delay: 1.7 },
    { from: DUBAI, to: HARARE, delay: 1.0 }   // engagement and team coordination run through Dubai
  ];
  // order matches the .globe-label elements in index.html
  const cities = [HOME, HARARE, LUSAKA, LAGOS, DUBAI];

  const arcMat = new THREE.MeshBasicMaterial({ color: 0xf2a93b, transparent: true, opacity: 0.95, depthWrite: false });
  const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffe2ad, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const markerMat = new THREE.MeshBasicMaterial({ color: 0xf2a93b });
  const homeMat = new THREE.MeshBasicMaterial({ color: 0xedf1f5 });

  const arcs = routes.map((m) => {
    const a0 = toVec(m.from.lat, m.from.lon);
    const b0 = toVec(m.to.lat, m.to.lon);
    const ang = a0.angleTo(b0);
    const lift = 0.035 + ang * 0.24;
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const t = i / 64;
      const p = slerp(a0, b0, ang, t);
      pts.push(p.multiplyScalar(1.004 + lift * Math.sin(Math.PI * t)));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = new THREE.TubeGeometry(curve, 128, 0.0052, 6, false);
    const mesh = new THREE.Mesh(geo, arcMat);
    mesh.renderOrder = 3;
    const full = geo.index.count;
    geo.setDrawRange(0, calm ? full : 0);
    spin.add(mesh);
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.016, 16, 16), pulseMat.clone());
    pulse.renderOrder = 4;
    pulse.visible = false;
    spin.add(pulse);
    return { geo, full, curve, pulse, delay: m.delay };
  });

  const rings = [];
  cities.forEach((c, i) => {
    const p = toVec(c.lat, c.lon, 1.003);
    const dot = new THREE.Mesh(new THREE.SphereGeometry(i === 0 ? 0.019 : 0.016, 20, 20), i === 0 ? homeMat : markerMat);
    dot.position.copy(p);
    dot.renderOrder = 5;
    spin.add(dot);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.024, 0.031, 48),
      new THREE.MeshBasicMaterial({ color: i === 0 ? 0xedf1f5 : 0xf2a93b, transparent: true, side: THREE.DoubleSide, depthWrite: false })
    );
    ring.position.copy(toVec(c.lat, c.lon, 1.006));
    ring.lookAt(toVec(c.lat, c.lon, 2));
    ring.renderOrder = 5;
    spin.add(ring);
    rings.push({ ring, phase: i * 0.6, home: i === 0 });
  });

  // ---------- view + interaction ----------
  const BASE_YAW = -40 * DEG;   // centre the Indian Ocean: Delhi and Lagos both in view
  const BASE_PITCH = 6 * DEG;
  let userYaw = 0, userPitch = 0, velYaw = 0, velPitch = 0;
  let dragging = false, lastX = 0, lastY = 0, lastInteract = -1e9;
  let swayT = 0;

  const el = renderer.domElement;
  el.addEventListener('pointerdown', (e) => {
    dragging = true; lastX = e.clientX; lastY = e.clientY; velYaw = velPitch = 0;
    host.classList.add('is-dragging');
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
    kick();
  });
  el.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    lastX = e.clientX; lastY = e.clientY;
    const k = 3.2 / Math.max(240, el.clientWidth);
    velYaw = dx * k;
    velPitch = e.pointerType === 'touch' ? 0 : dy * k;
    userYaw += velYaw;
    userPitch = clamp(userPitch + velPitch, -0.55, 0.55);
    lastInteract = performance.now();
    kick();
  });
  const end = () => { dragging = false; host.classList.remove('is-dragging'); lastInteract = performance.now(); };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);
  el.addEventListener('lostpointercapture', end);

  // ---------- theme ----------
  function applyTheme() {
    const cs = getComputedStyle(document.documentElement);
    const get = (v, f) => (cs.getPropertyValue(v).trim() || f);
    oceanMat.color.set(get('--globe-ocean', '#13253a'));
    dotsMat.uniforms.uColor.value.set(get('--globe-land', '#d9c7a3'));
    glowMat.uniforms.uColor.value.set(get('--globe-glow', '#5c8db8'));
    rimLight.color.set(get('--globe-glow', '#5c8db8'));
    const light = document.documentElement.dataset.tone === 'light';
    glowMat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
    glowMat.uniforms.uStrength.value = light ? 0.5 : 0.85;
    glowMat.needsUpdate = true;
    dotsMat.uniforms.uOpacity.value = 0.92;
    const arc = get('--globe-arc', '#f2a93b');
    arcMat.color.set(arc); markerMat.color.set(arc);
    const home = get('--globe-home', '#edf1f5');
    homeMat.color.set(home);
    rings.forEach(r => r.ring.material.color.set(r.home ? home : arc));
    arcs.forEach(a => {
      a.pulse.material.color.set(get('--globe-pulse', '#ffe2ad'));
      a.pulse.material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
      a.pulse.material.needsUpdate = true;
    });
    kick();
  }
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-tone'] });
  applyTheme();

  // ---------- size ----------
  let W = 0, H = 0;
  function resize() {
    const r = canvasWrap.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    // keep the whole globe (plus glow) in frame whatever the box shape
    const fitV = 2 * Math.atan(1.22 / camera.position.z) / DEG;
    camera.fov = camera.aspect >= 1 ? fitV : Math.min(80, 2 * Math.atan(Math.tan(fitV * DEG / 2) / camera.aspect) / DEG);
    camera.updateProjectionMatrix();
    const pxPerUnit = H / (2 * Math.tan(camera.fov * DEG / 2) * camera.position.z);
    dotsMat.uniforms.uSize.value = clamp(pxPerUnit * 0.0125, 1.4, 4.2) * renderer.getPixelRatio();
    measureLabels();
    kick();
  }
  new ResizeObserver(resize).observe(canvasWrap);
  resize();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measureLabels(); kick(); });

  // ---------- labels ----------
  const tmp = new THREE.Vector3(), nrm = new THREE.Vector3(), camDir = new THREE.Vector3();
  const labelAnchors = cities.map(c => toVec(c.lat, c.lon, 1.0));
  // Each label tries up to four spots around its city (preferred side first, then the other side,
  // above then below) and takes the first that stays in frame and clears labels already placed.
  // The previous spot is tried first so labels don't jump around while the globe sways.
  const lastSpot = [];
  function project(a) {
    tmp.copy(a).applyMatrix4(spin.matrixWorld);
    nrm.copy(tmp).normalize();
    camDir.copy(camera.position).sub(tmp).normalize();
    const facing = nrm.dot(camDir);
    tmp.project(camera);
    return { x: (tmp.x * 0.5 + 0.5) * W, y: (-tmp.y * 0.5 + 0.5) * H, facing };
  }
  function placeLabels() {
    const pts = labelAnchors.map(project);
    // city dots are obstacles too, so no label hides another city's marker
    const dots = pts.map((p, j) => p.facing > 0.18 ? [p.x - 9, p.y - 9, p.x + 9, p.y + 9, j] : null).filter(Boolean);
    const placed = [];
    labelEls.forEach((lab, i) => {
      if (!pts[i]) return;
      const { x, y, facing } = pts[i];
      const [w, h] = labelSizes[i] || [0, 0];
      const prefLeft = lab.dataset.side === 'left', prefBelow = lab.dataset.v === 'below';
      const spots = [
        [prefLeft, prefBelow], [!prefLeft, prefBelow], [prefLeft, !prefBelow], [!prefLeft, !prefBelow]
      ];
      if (lastSpot[i]) spots.unshift(lastSpot[i]);
      const boxOf = ([left, below]) => {
        const x0 = left ? x - 14 - w : x + 14, y0 = below ? y + 8 : y - 15;
        return [x0, y0, x0 + w, y0 + h];
      };
      const inFrame = b => b[0] >= 4 && b[2] <= W - 4 && b[1] >= 4 && b[3] <= H - 4;
      const apart = (b, p) => b[2] + 6 < p[0] || b[0] - 6 > p[2] || b[3] + 4 < p[1] || b[1] - 4 > p[3];
      const clear = b => placed.every(p => apart(b, p)) && dots.every(d => d[4] === i || apart(b, d));
      let pick = spots.find(sp => { const b = boxOf(sp); return inFrame(b) && clear(b); })
              || spots.find(sp => inFrame(boxOf(sp))) || spots[0];
      lastSpot[i] = pick;
      if (!lab._spot || lab._spot[0] !== pick[0] || lab._spot[1] !== pick[1]) {
        lab.classList.toggle('left', pick[0]);
        lab.classList.toggle('below', pick[1]);
        lab._spot = pick;
      }
      const visibleNow = facing > 0.18;
      if (visibleNow) placed.push(boxOf(pick));
      lab.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      lab.style.opacity = String(clamp((facing - 0.18) / 0.2, 0, 1) * (started ? 1 : 0));
    });
  }


  // ---------- loop ----------
  function kick() { needs = true; if (!running && visible) { running = true; requestAnimationFrame(frame); } }

  let lastDraw = 0;
  function frame(now) {
    if (lowPower && !dragging && now - lastDraw < 31) {
      if (visible) requestAnimationFrame(frame); else running = false;
      return;
    }
    lastDraw = now;
    const t = (now - t0) / 1000;
    const idle = now - lastInteract > 2600;

    if (!dragging) {
      userYaw += velYaw; userPitch = clamp(userPitch + velPitch, -0.55, 0.55);
      velYaw *= 0.93; velPitch *= 0.9;
      if (idle) {
        userYaw = wrap(userYaw) * 0.965; userPitch *= 0.95;
        if (!calm) swayT += 1 / 60;
      }
    }
    const sway = calm ? 0 : Math.sin(swayT * 0.22) * 12 * DEG;
    spin.rotation.y = BASE_YAW + sway + userYaw;
    pivot.rotation.x = BASE_PITCH + userPitch;

    // intro: arcs draw in, then pulses travel
    if (!calm) {
      arcs.forEach((a, i) => {
        const p = clamp((t - 0.6 - a.delay) / 1.5, 0, 1);
        const e = 1 - Math.pow(1 - p, 3);
        a.geo.setDrawRange(0, Math.floor(a.full * e / 6) * 6);
        if (p >= 1) {
          const period = 3.6, local = ((t - 2.2 - a.delay - i * 0.4) % period + period) % period / period;
          a.pulse.visible = local < 0.82;
          const u = local / 0.82;
          a.pulse.position.copy(a.curve.getPointAt(Math.min(u, 1)));
          a.pulse.material.opacity = Math.sin(Math.PI * Math.min(u, 1)) * 0.95;
        }
      });
      rings.forEach(r => {
        const k = ((t * 0.55 + r.phase) % 1);
        r.ring.scale.setScalar(1 + k * 1.6);
        r.ring.material.opacity = (1 - k) * 0.85;
      });
    } else {
      rings.forEach(r => { r.ring.scale.setScalar(1.3); r.ring.material.opacity = 0.5; });
    }

    if (!started && t > 0.15) { started = true; host.classList.add('is-live'); }
    renderer.render(scene, camera);
    placeLabels();
    needs = false;

    const settling = Math.abs(velYaw) > 1e-4 || Math.abs(userYaw) > 1e-3 || Math.abs(userPitch) > 1e-3;
    const keep = visible && (!calm || dragging || settling || needs || !started);
    if (keep) requestAnimationFrame(frame); else running = false;
  }

  new IntersectionObserver((entries) => {
    inViewport = entries[0].isIntersecting;
    visible = inViewport && !document.hidden;
    if (visible) kick();
  }, { threshold: 0 }).observe(host);
  document.addEventListener('visibilitychange', () => { visible = inViewport && !document.hidden; if (visible) kick(); });

  renderer.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); host.classList.add('is-fallback'); });
  kick();

  function slerp(a, b, ang, t) {
    const s = Math.sin(ang);
    if (s < 1e-6) return a.clone();
    return a.clone().multiplyScalar(Math.sin((1 - t) * ang) / s).add(b.clone().multiplyScalar(Math.sin(t * ang) / s));
  }
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function wrap(a) { return Math.atan2(Math.sin(a), Math.cos(a)); }
