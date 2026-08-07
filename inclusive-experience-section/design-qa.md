# Design QA — All-inclusive Experience Section

## Source visual truth

- Recording: `/workspace/scratch/cc4359c1e8e9/upload/Screen Recording 2026-08-07 at 17.46.59.mov`
- Source pixels: 3354 × 1854 at approximately 2× density, 7.03 seconds.
- Primary source frame: `qa/reference-frame-01.jpg`, extracted at 1200 × 663.
- Source states reviewed: initial meal row, Yoga/Workshop middle states, Event/Sauna late states, and the section exit into Rooms.

## Implementation evidence

- Browser screenshot: `qa/implementation-final.jpg`
- Motion-state screenshot: `qa/motion-state.jpg`
- Viewport: 1363 × 936 CSS px, devicePixelRatio 1. The screenshot content width is 1348 px after the browser scrollbar.
- Comparison normalization: source frame resized to 1348 × 744; implementation cropped to 1348 × 744. Both were placed side-by-side in `comparison-final.jpg`.
- State: initial section state after the heading intro completes, scroll Y 0.

## Findings

- No open P0, P1, or P2 findings.
- [P3] The implementation uses original retreat photographs rather than copying the recording's exact photographs. Subjects, portrait crops, warmth, and visual density remain consistent with the source art direction.

## Required fidelity surfaces

- Fonts and typography: Cormorant Garamond recreates the high-contrast editorial display face; Inter provides the compact body copy. Final title scale, line height, spacing, and wrapping match the normalized reference.
- Spacing and layout: sticky heading height, three-column grid, row dividers, image dimensions, and row height align in the final side-by-side comparison.
- Colors and tokens: warm cream background, muted sage display type, deep green text, subtle green dividers, and an orange scroll accent match the recorded palette.
- Image quality: all five rows use full-resolution raster assets with portrait crops and GSAP image parallax. No placeholders, CSS drawings, or inline SVG substitutes remain.
- Copy and content: five all-inclusive offerings mirror the recording's content model and text density.
- Accessibility: semantic section/article/heading structure, descriptive alt text, reduced-motion support, and readable contrast are present.

## Comparison history

1. Pass 1 found a P1 proportion mismatch: the sticky heading rail, row height, and images were materially too compact.
2. Pass 2 increased the rail and rows but created a P2 density mismatch in the fixed browser's taller viewport.
3. Final fix converted the key vertical dimensions to width-relative proportions, matching the recording's 1.81:1 composition. The final comparison aligns the title rail, first-row divider, image crop, and three-column rhythm.

## Motion and runtime verification

- Sticky state: at scroll Y 2117, the heading remained at viewport top 0.
- Parallax state: the second image had an active GSAP transform (`matrix(1.02, 0, 0, 1.02, 0, 43.3422)`).
- Exit state: at scroll Y 2596, the heading bottom and next-section top both measured 0.484 px, confirming the synchronized unpin transition.
- Browser console: no application-origin errors or warnings.
- Production build: passed.
- Sites packaging tests: 4/4 passed.

## Focused comparison

A separate crop was unnecessary because the normalized 1348 px comparison keeps the title typography, image crop, row divider, labels, and body copy legible in one frame.

## Final result

passed
