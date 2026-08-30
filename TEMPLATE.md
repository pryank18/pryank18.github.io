# Project Page Template

Standard structure for new project landing pages in this portfolio, based on the Dispatch OS page (`dispatch-os/index.html`).

## Sections (in order)

- **Nav** — logo, in-page anchor links, day/night theme toggle, language selector, "Book a demo"-style CTA. Collapses to a hamburger drawer under 720px.
- **Hero** — eyebrow label, one-line headline (with a struck-through "old way" phrase in `<em>`), sub-line, two buttons (primary action + "see how it works" anchor scroll), and a live-looking animated data feed as visual proof.
- **Stats strip** — 3–4 blunt numbers (setup cost, time to go live, commission, availability).
- **Problem** — grid of 3–4 cards, each a specific, concrete failure mode the target user recognizes (not generic pain points).
- **How it works** — 3 numbered steps, plain language, no jargon.
- **Features** — grid of 6 short feature cards (icon, title, one-sentence description).
- **Your numbers** — an interactive ROI calculator with sliders tied to the user's own inputs, producing a live estimated value.
- **Pricing** — 3-tier card grid, one tier visually highlighted as "most picked."
- **CTA + footer** — final call to action, contact links (email/WhatsApp), copyright line.
- **Embedded live demo** — a self-contained, in-memory mock of the actual product (no backend), opened via a modal, so a visitor can click around a realistic version of the tool before asking for a real demo.

## Style conventions

- Dark theme by default (`--ink`, `--surface`, `--text` custom properties), with an automatic light theme swap based on local time (day = light, night = dark), plus a manual toggle that overrides it.
- One accent color for "urgent/instant" actions, one for "standard" actions — used consistently across badges, buttons, and data.
- Monospace font for numbers, stats, and data-dense UI; system sans-serif for prose.
- Mobile-responsive via CSS grid `auto-fit`/`auto-fill` and a small number of breakpoints (720px, 900px), not a heavy framework.
- No build step — a single self-contained `index.html` (inline `<style>` and `<script>`), so it can be dropped straight into GitHub Pages.

## Adding a new project

1. Create a new repo named after the project, add `index.html` following the structure above.
2. Enable GitHub Pages (Settings → Pages → Deploy from branch → `main` / root).
3. Add a description and topics in the repo's About section.
4. Add a card for it in this repo's root `index.html` (the hub landing page).
5. Add an item for it to the [project tracker board](https://github.com/users/pryank18/projects/2).
