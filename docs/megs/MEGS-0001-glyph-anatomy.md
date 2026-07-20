# MEGS-0001: Glyph Anatomy

| Field | Value |
|-------|-------|
| Status | Draft |
| Version | 0.1.0 |
| Normative | Yes (when Approved) |

## 1. Purpose

Define the geometric and optical rules for every MEG glyph so the system remains visually consistent at every scale.

## 2. Canvas

- Glyphs MUST use `viewBox="0 0 64 64"`.
- The design grid is **64×64** user units.
- Live artwork SHOULD stay within an optical safe area of **4 units** from each edge (content roughly in 4–60), except intentional full-bleed marks.

## 3. Stroke and fill

- Default rendering MUST use `stroke="currentColor"`.
- Default stroke width MUST be `2.5` unless a glyph family documents an intentional exception in its metadata.
- `fill` MUST be `"none"` unless a solid region is required for semantic recognition; filled regions MUST also use `currentColor` (or inherit it).
- Glyphs MUST remain legible as monochrome and MUST NOT rely on multiple stroke colors for meaning.

## 4. Optical alignment

- Primary mass SHOULD be optically centered, not merely geometrically centered.
- Vertical stems, shields, and person marks SHOULD share common alignment axes where categories overlap.
- Curves SHOULD be optically balanced (overshoot allowed beyond the geometric midline).

## 5. Corners and joins

- Stroke linecaps and linejoins SHOULD be consistent within a glyph family.
- Corner radii, when used, SHOULD feel intentional and repeated across related glyphs rather than ad hoc.

## 6. Scalability

- Glyphs MUST remain recognizable at 16px, 24px, and 32px display sizes.
- Geometry SHOULD snap to half-unit or whole-unit coordinates when it improves pixel clarity at common sizes.
- High-DPI rendering is assumed; hairlines thinner than 2.0 MUST NOT be used for primary meaning.

## 7. Node budget

- SVGs SHOULD minimize node count; decorative or redundant path segments MUST NOT remain in production files.
- Prefer a small number of clear shapes over dense illustration.

## 8. Themes

- Light mode, dark mode, and brand themes MUST be achieved via `currentColor` (and host CSS), not baked-in hex colors in production SVGs.

## 9. References

- [MEGS-0006 SVG Production](MEGS-0006-svg-production.md)
- [MEGS-0003 Accessibility](MEGS-0003-accessibility.md)
