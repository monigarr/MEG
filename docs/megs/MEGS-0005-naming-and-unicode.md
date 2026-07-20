# MEGS-0005: Naming and Unicode

| Field | Value |
|-------|-------|
| Status | Draft |
| Version | 0.1.0 |
| Normative | Yes (when Approved) |

## 1. Purpose

Define canonical naming and Private Use Area (PUA) codepoint policy so files, shortcodes, fonts, and metadata stay aligned.

## 2. File and id naming

- Glyph ids and SVG filenames MUST use `snake_case` (e.g. `authority_mark.svg`).
- Compacted names WITHOUT underscores (e.g. `authoritymark.svg`) MUST NOT be introduced.
- Existing compacted or duplicate files SHOULD be migrated to a single canonical `snake_case` id.
- Filename (sans extension) MUST equal metadata `id`.

## 3. Shortcodes

- Shortcode MUST be `:id:` (e.g. `:authority_mark:`).
- Historical shortcodes without underscores (e.g. `:authority:`) MAY remain as **aliases** when already documented, but new glyphs MUST use the full `id` in the primary shortcode.

## 4. Unicode PUA policy

- MEG assigns codepoints in the Unicode **Private Use Area** starting at `U+E000`.
- Assigned examples in this repository:
  - `:authority:` / authority family → `U+E001` (see style guide; canonical id TBD on cleanup)
  - `:certitude:` / certitude family → `U+E002`
- New assignments MUST be sequential, recorded in metadata, and never reused for a different glyph meaning.
- Unassigned glyphs MUST omit `codepoint` or set it to `null` until allocated.

## 5. Mapping triad

For every assigned glyph, these MUST agree:

1. `id` / filename
2. primary `shortcode`
3. `codepoint` (when present)

## 6. Cleanup status

Compacted duplicate filenames (`authoritymark`, `certitudepoint`) were removed. `sarmark` was renamed to `sar_mark`. The shippable catalog is snake_case-only (see `config/unicode-map.json`).

## 7. References

- [MEGS-0002 Semantic Taxonomy](MEGS-0002-semantic-taxonomy.md)
- [Style guide](../style-guide.md)
