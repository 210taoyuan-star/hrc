# Copilot Instructions for Surrogacy Landing Page (React/Vite/Tailwind)

## Core Architecture
- **Single-file app**: `index.html` → `src/main.jsx` → `LandingTemplateFixed.jsx` (~4600 lines)
- Everything lives in `LandingTemplateFixed.jsx` - treat it as the monolithic source of truth
- Legacy files exist (`多語行銷型單頁《網站模板》_react_tailwind_shadcn_ui.jsx`, `LandingTemplateMinimal.jsx`) but are unused
- `GlobalStyles` component injects fonts, CSS variables, and responsive typography; modify there for brand/layout changes
- Hand-rolled UI primitives (Button, Card, Input) are defined inline; reuse patterns instead of adding external UI libraries

## File Structure & Templates
- **Active**: `LandingTemplateFixed.jsx` (current production template)
- **Legacy**: `多語行銷型單頁《網站模板》_react_tailwind_shadcn_ui.jsx`, `LandingTemplateMinimal.jsx`, `MinimalTest.jsx`
- **Documentation**: Multiple `.md` files track feature changes and deployment guides
- **Assets**: `public/images/**` for static assets, referenced as `/images/...` in code

## Data & State Management
- **i18n**: `lang` state toggles between `zh`/`en`; content stored in `useMemo` dictionaries within constants (`NAV`, `FEATURES`, `FAQS`, `PHYSICIAN_DATA`)
- **Routing**: Custom `useHashRoute` hook manages section navigation; section IDs must match `NAV[].path` values
- **Carousel**: Hero images rotate via `heroIndex` state + `useEffect` timer using `HERO_IMAGES` array
- **Interactive modules**: `SurrogacyScreeningModule` demonstrates multi-step pattern with index-based state and conditional rendering
- **Data constants**: All content lives in large constant objects near top of file; update these for content changes

## Forms & External Services
- **Contact form**: Posts to Formspree (`https://formspree.io/f/mjkvgqyb`) with honeypot field `hp` for spam protection
- **Form state**: Uses `sent`/`loading` boolean states; preserve these patterns when modifying forms
- **Setup required**: See `FORMSPREE-SETUP.md` - form currently needs reconfiguration for `jctommyliu@gmail.com`
- **CTAs**: Most buttons use hash anchors (`<a href="#section">`) rather than JavaScript navigation

## Styling System
- **CSS Variables**: Comprehensive design tokens in `:root` (brand colors, gradients, shadows) - modify in `GlobalStyles`
- **Layout**: `.section-shell` utility provides consistent max-width/padding; used throughout for section containers
- **Responsive**: Multi-breakpoint font scaling via CSS `font-size` on `html` element
- **Theme**: Teal-based color palette (`--brand: #0F766E`, gradients, shadows) with careful contrast ratios
- **Animation**: Minimal `framer-motion` usage for hero badges and scroll reveals

## Development Workflow
- **Commands**: `npm run dev` (port 3000), `npm run build`, `npm run preview`
- **No testing**: Manual QA focuses on bilingual content, hash navigation, form submissions, responsive design
- **Deployment**: Vercel-optimized (`vercel.json` SPA rewrites), also supports GitHub Pages (`gh-pages` script)
- **Assets**: Vite copies `public/` to dist root; use absolute paths like `/images/hero/image.jpg`
- **Documentation**: Check `.md` files for recent changes and deployment instructions before modifying
