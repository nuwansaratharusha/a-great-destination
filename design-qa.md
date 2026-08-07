# Design QA — Eagle's Nest Motion Front-end

## Source truth

- Live reference: https://eaglesnest.sergesyutkin.com/
- Captured viewport: 1363 × 936 CSS px at DPR 1.
- Source state: desktop hero and long-scroll section states captured in the cloud browser.
- Prototype state: local production preview in the same cloud browser and viewport.
- Combined comparison: `design-qa-hero-comparison.jpg` (reference left, prototype right).

## Focused comparison

### Hero

- Full-bleed lake-and-volcano composition, silhouette focal point, fixed navigation, lower metadata, oversized split serif title, and dark lower gradient are matched.
- The prototype uses an original generated photographic asset because the source video could not be reused.
- The first comparison showed the correct information density and visual hierarchy. No P0–P2 mismatch remained.

### Core Values

- Initial implementation placed the title over the image.
- P1 fixed: added the source-like cream title rail and changed the timeline so the oversized heading compresses into the rail before the Belong/Play/Elevate copy crossfades.
- Browser-rendered state at scroll Y 3556 confirmed a 107.625 px rail, settled title transform, and Play at opacity 1.

## Interaction and motion verification

- Lenis inertial scroll and GSAP ScrollTrigger timelines initialize in the production preview.
- Core Values pinned transition changes rail height/title scale and crossfades the active value.
- Stay cards stack, scale, and dim as the next card arrives.
- Rooms pin and translate horizontally on desktop.
- Yoga image clip-path expands while the background word translates.
- Event and review tracks auto-scroll and pause on hover.
- Cacao chapters crossfade across five sticky full-screen states.
- Quote words reveal from blurred low opacity to sharp full opacity.
- Team modal opens, closes through the explicit close control, and supports Escape.
- FAQ accordion changes `aria-expanded` to `true` and reveals its answer.
- Reduced-motion CSS disables non-essential animations.

## Runtime checks

- `npm run build`: passed.
- `npm run test:sites`: 4/4 passed.
- Application console: no application-origin warnings or errors. Browser-extension metadata errors were ignored as unrelated to the prototype.

## Severity history

- P0: none.
- P1: Core Values title-rail mismatch — fixed.
- P2: animation cleanup leak for Lenis/ticker/pointer listener — fixed.
- P3: exact mobile source-state comparison was unavailable in the fixed cloud-browser viewport; responsive behavior is implemented with desktop/tablet/mobile CSS and reduced-motion handling.

## Final result

Passed for the captured desktop reference viewport and tested interaction states. No open P0, P1, or P2 issues.
