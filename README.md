# Rev Silicon website

A responsive React and TypeScript website for Rev Silicon, a Texas A&M student semiconductor organization. The supplied Claude Design exports are retained as visual references only; the runnable site is implemented in `src/`.

## Setup

Requirements:

- Node.js 20.19+ or 22.12+
- npm 10+

```bash
npm install
npm run dev
```

The development server prints its local URL, normally `http://localhost:5173`.

## Checks and production build

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production output is written to `dist/`. The host must serve `index.html` as the fallback for `/about`, `/join`, and `/contact`, because routing uses the browser History API.

## Project structure

- `src/data/site.ts` — editable organization copy, navigation, project metadata, transistor milestones, process stages, technical areas, and provisional contact labels
- `src/pages/` — Home, About, Join, and Contact routes
- `src/components/AcceleratorScene.tsx` — interactive conceptual accelerator built from Three.js primitives
- `src/components/LiquidShader.tsx` — hero material shader
- `src/components/MooreTimeline.tsx` — linear-year, logarithmic-count SVG chart
- `src/components/FlickerGrid.tsx` — final CTA canvas treatment
- `src/styles.css` — global design system, motion, accessibility, and responsive layouts
- `assets/logo-mark.png` and `assets/logo-plate.png` — supplied Rev Silicon brand assets
- `IMPLEMENTATION_PLAN.md` — design and engineering direction distilled from the supplied mockups

## Editing content

Confirmed and provisional copy is centralized in `src/data/site.ts`. Update that file before changing page markup. No sponsor, officer, fabrication-node, performance, or tapeout claims are encoded in the default content.

The milestone array also drives the Moore's Law visualization. Each device requires a name, short label, year, exact transistor count, and formatted display count. Chart positions are calculated at runtime using a linear year transform and `Math.log10` for transistor counts.

## Replacing the accelerator

The current centerpiece is a lightweight conceptual accelerator assembled in `buildAccelerator()` inside `src/components/AcceleratorScene.tsx`. It intentionally avoids implying a final board specification.

To replace it with an approved production model:

1. Put an optimized `.glb` model in `public/models/`.
2. Replace `buildAccelerator()` with a `GLTFLoader` load path.
3. Preserve the existing camera, drag/reset controls, pointer lighting, visibility pause, pixel-ratio cap, reduced-motion behavior, and `StaticAccelerator` fallback.
4. Keep the model lazy-loaded through `HeroVisuals.tsx` so it does not block the first text paint.

## Connecting the forms

The Join and Contact forms currently validate in the browser and show an explicit preview state. They do not send or store data.

To connect delivery:

1. Replace the local `submit` handlers in `src/pages/JoinPage.tsx` and `src/pages/ContactPage.tsx` with calls to an approved HTTPS endpoint.
2. Add a typed request schema and server-side validation.
3. Add visible pending, success, field-error, and network-error states.
4. Add abuse protection and a privacy notice before collecting personal information.
5. Do not place API credentials in client-side environment variables.

## Accessibility and performance

- Semantic landmarks, headings, labels, keyboard focus, and an accessible chart description are included.
- Motion is disabled or reduced under `prefers-reduced-motion: reduce`.
- The Three.js visual bundle is lazy-loaded and does not block the hero copy.
- WebGL scenes cap device pixel ratio, pause offscreen, and include static fallbacks.
- Mobile graph content scrolls inside its own labeled region instead of causing page overflow.

## Screenshots

- `screenshots/home-desktop.png`
- `screenshots/home-mobile.png`

These are generated from the local development build and should be refreshed after material visual changes.
