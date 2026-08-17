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

The development server prints its local URL. The app is served from the root path (`/`).

## Checks and production build

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

The production output is written to `dist/`. The host must serve `index.html` as the fallback for `/about`, `/projects`, `/join`, and `/sponsor`, because routing uses the browser History API.

## Project structure

- `src/data/site.ts` — all editable copy: navigation, mission, values, process stages, teams, event calendar, project schedule, and the org chart
- `src/pages/` — Home, Team (`/about`), Projects, Join, and Sponsor routes
- `src/components/HeroReveille.tsx` — animated home hero; an eight-cell Reveille run cycle cross-dissolved into a continuous gait
- `src/components/EventChart.tsx` — club calendar plotted as a rising chart with click-to-open detail
- `src/logoMark.ts` — crop box that reduces the logo plate to Reveille alone
- `src/components/ProcessFlow.tsx` — the six-stage "concept to silicon" diagram set
- `src/components/ProjectTimeline.tsx` — architecture-to-tapeout schedule rail
- `src/components/AcceleratorScene.tsx` — interactive conceptual accelerator built from Three.js primitives (Projects page)
- `src/components/FlickerGrid.tsx` — home CTA canvas treatment
- `src/styles.css` — global design system, motion, accessibility, and responsive layouts
- `assets/logo-mark.png`, `assets/logo-plate.png`, and `assets/dog-run-cycle-white.png` — supplied brand art and the generated hero run cycle

## Editing content

Copy is centralized in `src/data/site.ts`. Update that file before changing page markup. No sponsor, officer, fabrication-node, performance, or tapeout claims are encoded in the default content.

### Placeholders to replace before launch

`contact` at the top of `src/data/site.ts` holds three destinations that are **not yet real**:

| Field | Current placeholder | Used by |
| --- | --- | --- |
| `email` | `revsilicon@tamu.edu` | footer, Join page, Sponsor page |
| `instagram.url` / `linkedin.url` | `.../revsilicon` | footer, Sponsor page |
| `resources` | `https://github.com/revsilicon` | Join page "resource repo" link |

The Join page "Apply here" button stays disabled until the application form exists. Switch it to a linked `<a>` when the form is ready, and update the `FORM OPENS FALL 2026` status line beneath it.

## The process diagrams

`src/components/ProcessFlow.tsx` draws six SVG stages that follow the standard digital ASIC flow: architecture → RTL → verification → synthesis → physical design → signoff and tapeout. Each stage is a plain `<g>` of primitives sharing the arrowhead markers defined once in `StageDefs`. Stage copy lives in `site.process`; the artwork array is index-matched to it, so adding a stage requires adding both.

The tapeout package embeds the Rev mark through `markImageProps()` in `src/logoMark.ts`, which crops the logo plate down to Reveille alone so it can be dropped into any square. `MARK_CROP` is measured off the source art; if the logo file is ever replaced, remeasure it.

## Copy rules

No em dashes or en dashes anywhere in the copy. Use a period, a colon, or a comma.

## Replacing the accelerator

The Projects centerpiece is a lightweight conceptual accelerator assembled in `buildAccelerator()` inside `src/components/AcceleratorScene.tsx`. It intentionally avoids implying a final board specification.

To replace it with an approved production model:

1. Put an optimized `.glb` model in `public/models/`.
2. Replace `buildAccelerator()` with a `GLTFLoader` load path.
3. Preserve the existing camera, drag/reset controls, pointer lighting, visibility pause, pixel-ratio cap, reduced-motion behavior, and `StaticAccelerator` fallback.
4. Keep the model lazy-loaded from `ProjectsPage.tsx` so it does not block the first text paint.

## Accessibility and performance

- Semantic landmarks, headings, labels, and keyboard focus are included; every diagram carries an `aria-label`.
- Motion is disabled or reduced under `prefers-reduced-motion: reduce`, including animation delays.
- The Three.js scene is lazy-loaded and only on the Projects route.
- WebGL scenes cap device pixel ratio, pause offscreen, and include static fallbacks.

## Screenshots

- `screenshots/home-desktop.png`
- `screenshots/home-mobile.png`

These are generated from the local development build and should be refreshed after material visual changes.
