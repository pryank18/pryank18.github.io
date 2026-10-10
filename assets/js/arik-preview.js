(() => {
  const root=document.documentElement, select=document.getElementById('palette');
  const themes={sand:'night',ivory:'day',blue:'night',forest:'night'};
  let selected='sand';try{selected=localStorage.getItem('pryank-preview-palette')||'sand'}catch{}
  if(!themes[selected])selected='sand';
  function setPalette(value){root.dataset.palette=value;root.dataset.theme=themes[value];select.value=value;try{localStorage.setItem('pryank-preview-palette',value)}catch{}window.dispatchEvent(new CustomEvent('portfolio-theme',{detail:{theme:themes[value]}}));}
  setPalette(selected);select.addEventListener('change',()=>setPalette(select.value));
  const menu=document.getElementById('menu-toggle'),links=document.getElementById('nav-links');
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));links.classList.toggle('open',open)});
  links.addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');links.classList.remove('open')}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');links.classList.remove('open');menu.focus()}});
  const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!calm&&matchMedia('(hover:hover) and (pointer:fine)').matches){const stage=document.querySelector('.portrait-stage'),portrait=document.querySelector('.hero-portrait');stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();portrait.style.transform=`rotateY(${((e.clientX-r.left)/r.width-.5)*5}deg) rotateX(${(.5-(e.clientY-r.top)/r.height)*4}deg)`});stage.addEventListener('pointerleave',()=>portrait.style.transform='');}
  const globe=document.getElementById('globe');
  if(!calm){import('./globe.js').catch(()=>globe.classList.add('is-fallback'));}else globe.classList.add('is-fallback');
})();
