# 0007. Shared controls, each app its own palette

- Status: Accepted
- Date: 2026-11-27

## Context

PhotoMatch chose Graphite, dense and quiet, its greys brighter, dark and light (its record 0070), and PhotoDev copied PhotoMatch's look. PhotoBook, which lays out photos for print, has a warm, light, paper-like look of its own. The owner on 2026-11-27, of PhotoBook's look in the design system: "Shared controls, own palette".

## Decision

**All the apps share one set of controls, type, spacing and corners; each app may set its own palette over them, as a theme of the tokens' names by purpose.**

- **Graphite** is the first palette, dark and light, for PhotoMatch and PhotoDev.
- **An app's palette** gives the same names by purpose other raw values ([0006](0006-tokens-in-the-w3c-format-made-into-css-variables-by-a-script-of-our-own.md)); the controls don't change.
- **PhotoBook's** comes with its move, after version 1.

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| Graphite everywhere | PhotoBook would give up its look |
| Settled when PhotoBook moves | The tokens' names would be made for one palette and redone |

## Consequences

- **The controls name only purposes,** never a colour.
- **The gallery page shows a second palette** to prove it.

## Assumptions to verify

- [x] A second palette changes the colours on the gallery page and nothing else: on 2026-11-27, step 1.2, the draft of PhotoBook's under `[data-palette="paper"]` sets the 21 colours and two shadows alone, the sizes shared under `:root`; shown beside Graphite on the gallery page. Its quieter text darkened to `#67635c`, as PhotoBook's own, `#6b6760`, is 4.39:1 on its stage.

## Sources

- The owner, on 2026-11-27; PhotoMatch's record 0070; PhotoBook's `App.css`.
