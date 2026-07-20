# MEGS-0006: SVG Production

| Field | Value |
|-------|-------|
| Status | Draft |
| Version | 0.1.0 |
| Normative | Yes (when Approved) |

## 1. Purpose

Define production requirements for MEG SVG source files so every glyph is optimized, consistent, and release-ready.

## 2. Required root attributes

Every production SVG MUST include:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5">
```

Exceptions to `fill="none"` or `stroke-width="2.5"` MUST be intentional and documented in glyph metadata.

## 3. Forbidden in production

SVGs MUST NOT include:

- Hard-coded presentation colors (`#000`, `rgb(...)`, theme-specific fills) for primary geometry
- Unnecessary editor metadata (`inkscape:`, `sodipodi:`, Adobe Illustrator cruft)
- Embedded rasters or fonts
- Scripts or external references
- Unused `id`s, empty groups, or hidden draft layers

## 4. Optimization

- SVGs MUST be optimized before merge (SVGO or equivalent).
- Path data SHOULD be simplified without harming optical quality.
- Prefer consistent formatting: one logical shape per clear element.

## 5. Accessibility hooks in SVG

When shipping standalone meaningful SVGs:

- SHOULD include `<title>` with the accessible name
- SHOULD include `<desc>` with the accessible description
- Host components MAY inject equivalent ARIA instead; metadata MUST still define the strings

## 6. Validation checklist

Before merge, each SVG MUST pass:

- [ ] Filename is `snake_case.svg` matching `id`
- [ ] `viewBox="0 0 64 64"` present
- [ ] Uses `currentColor` for stroke/fill of primary geometry
- [ ] Default `stroke-width` is `2.5` or justified exception
- [ ] No editor namespaces or junk nodes
- [ ] Recognizable at 16–32px
- [ ] No compacted-name duplicate of a canonical file

## 7. References

- [MEGS-0001 Glyph Anatomy](MEGS-0001-glyph-anatomy.md)
- [MEGS-0005 Naming and Unicode](MEGS-0005-naming-and-unicode.md)
