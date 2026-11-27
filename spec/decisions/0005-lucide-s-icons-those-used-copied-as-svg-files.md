# 0005. Lucide's icons, those used, copied as SVG files

- Status: Proposed
- Date: 2026-11-27

## Context

PhotoMatch draws a few icons by hand and uses text for others. Three icon sets were compared on 2026-11-27, from their own SVG packages ([`docs/foundations.md`](../../docs/foundations.md#the-icon-sets-compared)): Lucide 1.82.0, ISC, 2,437 icons, published that day; Tabler 3.53.0, MIT, 5,509 outline icons; Phosphor 2.1.1, MIT, 1,512 icons in six weights, its React package last published 2025-05-22. Each has every icon PhotoMatch needs. Apple's SF Symbols are licensed for Apple's platforms alone (unchecked), so the apps can't use them on Windows.

The owner's pick of 2026-11-27, in PhotoMatch's step 2.86: "go with your recommendations".

## Decision

**The icons come from Lucide alone: the SVG files of those the apps use, copied into the repository unchanged, with Lucide's ISC licence beside them, drawn through one `Icon` component.**

- **One component,** `Icon`, taking an icon's name, its size, Graphite's line width and the text's colour.
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

- [ ] Lucide's 2-unit line, made thinner, reads well at 14 px on both systems: step 1.3.

## Sources

- [`docs/foundations.md`](../../docs/foundations.md#the-icon-sets-compared).
- The owner, on 2026-11-27.
