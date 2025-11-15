# Copilot Instructions for Surrogacy Landing Page (React/Vite/Tailwind)

## Core Architecture
- **Monolithic SPA**: `index.html` → `src/main.jsx` → `LandingTemplateFixed.jsx` (~4531 lines)
- **Single source of truth**: All functionality consolidated in `LandingTemplateFixed.jsx`
- **Legacy artifacts**: Files like `多語行銷型單頁《網站模板》_react_tailwind_shadcn_ui.jsx`, `LandingTemplateMinimal.jsx` exist but are unused - avoid editing
- **Build chain**: Vite + React + Tailwind with minimal dependencies (framer-motion, lucide-react only)
- **GlobalStyles component**: Injectable CSS variables and responsive typography system - modify here for brand/layout changes

## File Organization & Entry Points
- **Production template**: `LandingTemplateFixed.jsx` (4531 lines, actively maintained)
- **Build config**: `vite.config.js` (dev port 3000), `tailwind.config.js` (scans root `.jsx` files)
- **Package scripts**: `npm run dev|build|preview`, `npm run deploy` (GitHub Pages via gh-pages)
- **Documentation trail**: 30+ `.md` files document feature evolution - read before major changes
- **Asset structure**: `public/images/` → `/images/...` in code, `surrogacy-deploy/` contains build artifacts

## Data Architecture & Internationalization  
- **Bilingual state**: `lang` toggles `zh`/`en`, all content in `useMemo` dictionaries
- **Content constants**: `NAV` (line ~629), `FEATURES` (~651), `FAQS` (~1803), `HERO_IMAGES` (~578)
- **Routing pattern**: Hash-based navigation via custom `useHashRoute` hook (~line 2223)
- **Section mapping**: Navigation `path` values must match DOM element IDs exactly
- **Content updates**: Modify constant objects near top of file, not scattered JSX

## Component Patterns & State Management
- **Inline primitives**: Hand-rolled Button, Card, Input components - reuse existing patterns vs external libraries
- **Carousel system**: `heroIndex` + `useEffect` timer rotates `HERO_IMAGES` array
- **Multi-step flows**: Follow `SurrogacyScreeningModule` pattern (index-based state, conditional rendering)
- **Form handling**: `sent`/`loading` booleans, Formspree integration with honeypot `hp` field
- **Navigation**: Hash anchors preferred over JavaScript navigation

## External Integrations & Services
- **Form backend**: Formspree endpoint `https://formspree.io/f/mjkvgqyb` (needs reconfiguration for `jctommyliu@gmail.com`)
- **HRC Fertility**: Recently integrated partner content with dedicated navigation section
- **Fonts**: Google Fonts (Inter, Noto Sans TC) loaded in GlobalStyles component
- **Icons**: Lucide React library for consistent iconography

## Styling System & Design Tokens
- **CSS variables**: Comprehensive design system in `:root` (brand colors, gradients, shadows)
- **Layout utility**: `.section-shell` provides consistent max-width/padding across sections
- **Responsive typography**: HTML font-size scaling (14px→18px) across 5 breakpoints
- **Animation**: Minimal framer-motion for hero badges and scroll reveals only
- **Theme consistency**: Teal-based palette with calculated contrast ratios

## Development & Deployment Workflow
- **Local development**: `npm run dev` (port 3000), file watching enabled with polling
- **Build process**: `npm run build` outputs to `dist/`, Vercel-optimized SPA rewrites in `vercel.json`
- **Deployment options**: Vercel (recommended), GitHub Pages, Netlify - see `DEPLOYMENT-GUIDE.md`
- **No testing framework**: Manual QA on bilingual content, hash navigation, form submissions, responsive behavior
- **Asset management**: Absolute paths `/images/...`, Vite copies `public/` to build root
- **Change tracking**: Feature changes documented in timestamped `.md` files
