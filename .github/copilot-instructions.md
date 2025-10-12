# Copilot Instructions for Surrogacy Landing Page (React/Vite/Tailwind)

## Core Structure
- Single-page marketing app: `index.html` → `src/main.jsx` → `多語行銷型單頁《網站模板》_react_tailwind_shadcn_ui.jsx`.
- All UI/state live in the main template (~1300 lines); treat it as the source of truth before creating new components.
- `GlobalStyles` injects font links, CSS variables, and layout scaffolding; update there when changing branding tokens.
- Minimal primitives (`Button`, `Card`, `Input`, etc.) are hand-rolled in-template. Reuse them instead of introducing new UI libs.

## Data & State Patterns
- Language toggle uses `lang` state plus `useMemo` dictionaries with `zh`/`en` keys; extend translations in these objects and in constants like `NAV`, `FEATURES`, `STEPS`, `FAQS`.
- Hash routing is managed by the custom `useHashRoute`; section IDs must align with `NAV.path` (`#services`, `#contact`, ...).
- Hero carousel uses `heroIndex` + `useEffect` interval rotating `HERO_IMAGES`; update arrays under the constants block for content changes.
- `SurrogacyScreeningModule` shows the pattern for multi-step interactions: index-based state, `.hidden` Tailwind classes, and result flags.
- `PhysicianDirectory` reads `PHYSICIAN_DATA`, supports detail view toggles, and emits JSON-LD; mirror its shape when adding physicians.
- `runSanityTests` asserts critical constants on load—keep assertions updated when modifying brand/nav data.

## Forms & Integrations
- Contact form posts to Formspree (`https://formspree.io/f/xbldvyqn`) and relies on the hidden `hp` honeypot plus `sent/loading` state; preserve these fields when editing.
- CTA buttons often anchor to hash targets; prefer `<a href="#section">` over client routing.
- Meta tags and document title update inside a `useEffect`; adjust there for SEO changes.
- Assets live in `public/images/**`; reference via absolute `/images/...` paths so Vite copies them correctly.

## Styling & Animation
- Tailwind drives layout (`section-shell` utility wraps each major block); customize global rhythm via `GlobalStyles` rather than scattered CSS.
- Theme colors come from CSS vars (`--brand`, `--brand-800`, `--brand-50`); reuse them in Tailwind arbitrary values (`text-[var(--brand)]`).
- Animations use `framer-motion` sparingly (hero badges, scroll reveals); follow the existing motion variants if adding new effects.

## Developer Workflow
- Install deps then `npm run dev` (Vite on 3000), `npm run build`, `npm run preview`.
- No automated tests or backend; manual QA focuses on bilingual content, hash navigation, and Formspree submissions.
- Deployment targets Vercel (`vercel.json` rewrites `/index.html`); keep SPA behavior in mind when adding routes or assets.
