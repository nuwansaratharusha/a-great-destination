# Design QA — Yoga Scroll Reveal

## Comparison target

- Source visual truth: `/workspace/scratch/cc4359c1e8e9/upload/Screen Recording 2026-08-07 at 17.45.30.mov`
- Extracted source states: `/workspace/scratch/cc4359c1e8e9/video-frames-174530/frame-01.jpg` and `frame-13.jpg`
- Browser-rendered implementation states: `qa/implementation-start.jpg`, `qa/implementation-mid.jpg`, and `qa/implementation-details.jpg`
- Full-view comparison evidence: `qa/comparison-start.jpg` and `qa/comparison-details.jpg`
- Route: local prototype root
- Browser viewport: 1348 × 926 CSS px, device scale factor 1
- State coverage: opening title, centered reveal window, near-full cinematic image, and benefits section

## Normalization

- The source recording is 3354 × 1854 px and appears to have been captured at approximately 2× density (about 1677 × 927 CSS px).
- Source frames were extracted at 1200 × 663 px.
- For direct comparison, source states were normalized to 1348 × 744 px and implementation screenshots were cropped to the same 1348 × 744 px content region. This preserves the full horizontal composition while removing the aspect-ratio difference caused by the cloud browser viewport.
- Implementation screenshots are 1348 × 926 px at 1× density.

## Findings

- No actionable P0, P1, or P2 differences remain.
- Fonts and typography: Cormorant Garamond reproduces the high-contrast editorial display treatment; Inter supplies the restrained navigation and body copy. Display scale, weight, tracking, and line-height now match the source hierarchy closely.
- Spacing and layout rhythm: the title, centered reveal window, top navigation, three-column benefits layout, and 4:5 practice image align with the source composition. The benefits content begins near the source's vertical anchor and maintains balanced side-column spacing.
- Colors and tokens: warm cream, deep forest green, muted orange, and the title's image-filled treatment are consistent with the source. The caption switches from green to cream when it moves over the full image.
- Image quality and asset fidelity: the section uses original, production-resolution raster imagery with matching lake, volcano, bamboo, and yoga art direction. No placeholder, CSS-drawn, emoji, or inline-SVG substitutes are present.
- Copy and content: all visible text is coherent standalone content and follows the source's information structure while remaining original.
- Interaction and accessibility: semantic buttons, navigation labels, alt text, reduced-motion handling, keyboard-compatible controls, and readable contrast are present.
- Responsive behavior: the desktop grid collapses to two columns below 900 px and one column below 640 px; navigation simplifies without overlapping the CTA.

## Focused comparison

A separate crop was not required. The original-size opening comparison keeps the navigation, logo, display type, and image-filled mask readable; the details comparison keeps headings, body wrapping, image crop, spacing, and corner radius readable. `qa/implementation-mid.jpg` provides focused evidence for the central motion checkpoint.

## Primary interactions tested

- Scroll from the image-filled “Yoga” wordmark to a small centered window.
- Continue scrolling as the window expands symmetrically to the viewport.
- Verify title and header fade timing.
- Verify the bottom caption reveals and changes to cream over the full image.
- Verify the full image releases into the benefits section.
- Click the “Stay” navigation control and confirm Lenis lands on the benefits section.
- Return to the top and confirm the header, title, and zero-size reveal state rewind correctly.
- Verify the practice image parallax and one-time benefit text entrances.

## Browser diagnostics

- Application-origin console errors: none.
- Application-origin console warnings: none.
- The browser reported extension-only metadata errors from `chrome-extension://...`; these are unrelated to the prototype.

## Comparison history

1. [P2] The opening state exposed a small image rectangle behind the wordmark. Fixed by starting both clip axes at 50%. Post-fix evidence: `qa/implementation-start.jpg`.
2. [P2] Direct `clip-path` string tweens produced asymmetric intermediate insets during overlapping animation segments. Fixed with independent `--clip-x`, `--clip-y`, and `--clip-radius` variables and non-overlapping window keyframes. Post-fix evidence: `qa/implementation-mid.jpg`.
3. [P2] The caption remained dark over the near-full image. Fixed by transitioning it to the cream token as the reveal reaches the viewport edge. Post-fix browser state reported `rgb(245, 241, 223)`.
4. [P2] Header animation did not rewind cleanly at the top. Fixed by giving the header an explicit top-state `fromTo` segment. Post-fix browser state reported header opacity `1` at scroll position `0`.
5. [P1] Navigation used native smooth scrolling and did not move while Lenis controlled the page. Fixed by sharing the Lenis instance with the header and using its `scrollTo` method. Post-fix browser state landed at practice section top `0`.
6. [P2] The benefits image was too tall and vertically centered too low. Fixed with a 4:5 figure, top-aligned grid, and source-matched benefit-column offset. Post-fix evidence: `qa/comparison-details.jpg`.
7. [P2] The opening display title was slightly underscaled. Increased the responsive display size from 17vw to 18vw. Post-fix evidence: `qa/comparison-start.jpg`.

## Verification

- `npm run build`: passed
- `npm run test:sites`: 4/4 passed
- Final browser preview: healthy and left open at the opening state

final result: passed
