# Rev Silicon implementation plan

## Direction retained from v2

- Keep the concise home sequence: hero, accelerator project, Moore's Law context, tapeout process, join invitation.
- Preserve the semiconductor visual language: orthogonal traces, vias, die outlines, small technical labels, and the supplied Rev Silicon mark.
- Keep Archivo for primary typography and IBM Plex Mono only for metadata and chart labels.
- Retain the calm interaction model: normal scrolling, one dominant hero animation, one-time section reveals, and no scroll hijacking.

## Visual refinement

- Use warm off-white as the primary reading surface, Texas A&M maroon for structure and signal paths, and deep navy for dimensional depth.
- Keep the hero dark but brighter than the mockup through pearl highlights, a white technical grid, reflective maroon folds, and an illuminated accelerator.
- Build a dimensional accelerator from lightweight Three.js primitives with pointer tilt, drag rotation, fan movement, and a reset control.
- Render a precise, flat SVG timeline with a linear year scale and logarithmic transistor-count scale. The 2026 Rev Silicon marker remains separate from the quantitative series.
- Use the flickering-grid idea only in the final CTA, shaped around the supplied logo mark.

## Engineering plan

1. Create a Vite + React + strict TypeScript project with shared layout and real routes.
2. Centralize editable site content and all provisional organization details.
3. Build accessible, responsive pages for Home, About, Join, and Contact.
4. Add WebGL and static fallbacks, IntersectionObserver reveals, and reduced-motion behavior.
5. Verify type checking, linting, production build, routes, forms, overflow, and layouts at 1440, 1024, 768, and 390 pixels.
