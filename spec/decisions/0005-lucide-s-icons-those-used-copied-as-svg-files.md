# 0005. Lucide's icons, those used, copied as SVG files

- Status: Accepted
- Date: 2026-11-27

## Context

PhotoMatch draws a few icons by hand and uses text for others. Three icon sets were compared on 2026-11-27, from their own SVG packages ([`docs/foundations.md`](../../docs/foundations.md#the-icon-sets-compared)): Lucide 1.82.0, ISC, 2,437 icons, published that day; Tabler 3.53.0, MIT, 5,509 outline icons; Phosphor 2.1.1, MIT, 1,512 icons in six weights, its React package last published 2025-05-22. Each has every icon PhotoMatch needs. Apple's SF Symbols are licensed for Apple's platforms alone (unchecked), so the apps can't use them on Windows.

The owner's pick of 2026-11-27, in PhotoMatch's step 2.86: "go with your recommendations".

## Decision

**The icons come from Lucide alone: the SVG files of those the apps use, copied into the repository unchanged, with Lucide's ISC licence beside them, drawn through one `Icon` component.**

- **One component,** `Icon`, taking an icon's name, its size, Graphite's line width and the text's colour. Its line is `--pu-icon-stroke`, 1.4 px, the same at any size, as a stroke that doesn't scale (`vector-effect: non-scaling-stroke`), rather than Lucide's 2 units of 24, which would be 1.17 px at 14 px (computed).
- **The shapes alone are kept:** `scripts/icons.mjs` lets through Lucide's root as it is and only path, circle, line, rect, polyline, polygon and ellipse with their geometry, a fill only in the text's colour; anything else fails the build.
- **Added by copying its file,** from Lucide's own SVG package at a version written down beside them.
- **No icon package at run time.**

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| Tabler | More icons than needed; Lucide's one geometry is enough |
| Phosphor | Its light weight would suit Graphite, but it's the least active of the three |
| `lucide-react`, the package | A dependency for a few dozen icons; the files are simpler to check |
| Icons drawn by hand | As today |

## Consequences

- **Every icon from one hand,** in one style.
- **An icon not in Lucide** waits, or is drawn in its style, marked as ours.

## Assumptions to verify

- [x] Lucide's line reads well at 14 px on a Mac: on 2026-11-27, step 1.4, the 39 icons drawn in WebKit at 14 px, their line 1.4 px wide by a stroke that doesn't scale, crisp in Graphite light (`scripts/snapshot.swift`).
- [ ] The same on Windows, in WebView2: the owner's PC.

## Sources

- [`docs/foundations.md`](../../docs/foundations.md#the-icon-sets-compared).
- The owner, on 2026-11-27.
