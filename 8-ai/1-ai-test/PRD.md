# Nova — The Future of Digital Workspaces

## Product vision

Nova is a fictional premium SaaS for unified digital workspaces. The landing page must feel like a real, high-end startup site: dark, futuristic, glassmorphic, and fully interactive using only HTML, CSS, and vanilla JavaScript.

## Constraints (source of truth)

- Three implementation files only: `index.html`, `style.css`, `script.js`.
- No frameworks or libraries (no React, Vue, Bootstrap, Tailwind, jQuery).
- Google Fonts may be linked for typography.
- Fully responsive: desktop, tablet, mobile.
- Site must work when `index.html` is opened in a browser (relative paths, no build step).
- File-count exception: CSS/JS may exceed 500 lines because the user required a single stylesheet and a single script.

## Brand

- Name: **Nova**
- Tagline: The Future of Digital Workspaces
- Palette: near-black backgrounds, electric violet / cyan gradients, glass panels, soft glow
- Type: Syne (display) + Outfit (UI)

## Phases

### Phase 1 — Structure

Nav, hero, features, stats, product demo, testimonials, pricing, footer, modal markup. Semantic HTML, skip-friendly headings, accessible labels.

### Phase 2 — Visual system

CSS variables, layout, glassmorphism, gradients, hover states, responsive breakpoints (900px, 640px).

### Phase 3 — Interactions

Mobile menu, product dropdown, animated counters, demo tabs/toggles, pricing billing toggle, waitlist modal, accent theme switch, reveal-on-scroll.

### Phase 4 — Polish and verify

Hover/focus states, keyboard access for modal and menus, browser check on desktop and mobile widths.

## Page sections

1. **Header** — Logo, links, Products dropdown, accent-theme control, Get Access CTA, mobile toggle.
2. **Hero** — Large headline, short copy, two CTAs, decorative workspace preview.
3. **Features** — Four cards: Neural Canvas, Live Presence, Signal Flow, Vault.
4. **Stats** — Teams, latency, uptime, countries; counters animate into view.
5. **Product demo** — Tabbed mock workspace; density/view switch; interactive nodes.
6. **Testimonials** — Three customer quotes.
7. **Pricing** — Starter / Orbit / Horizon with monthly vs yearly toggle.
8. **Footer** — Links, product note, copyright.
9. **Modal** — Early access form with success state.

## Interactions

| Feature | Behavior |
|---|---|
| Nav dropdown | Click/keyboard to open Products; close on outside click / Escape |
| Mobile menu | Hamburger toggles overlay nav |
| Counters | Count up once when stats enter viewport |
| Demo tabs | Switch canvas / pulse / vault views |
| Density toggle | Compact vs expanded mock UI |
| Pricing toggle | Monthly / yearly amounts |
| Modal | Open from CTAs, trap focus-ish close on overlay/Escape, form submit success |
| Accent theme | Cycle violet / cyan / amber glow tokens |
| Scroll | Sticky header gains backdrop; in-view fade-up |

## Success criteria

- Opens from `index.html` with no console-blocking errors.
- All listed sections and interactions work.
- Readable and usable at ~1280px, ~768px, and ~390px.
