# 0007. Shared controls, each app its own palette

- Status: Proposed
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

- [ ] A second palette changes the colours on the gallery page and nothing else: step 1.2.

## Sources

- The owner, on 2026-11-27; PhotoMatch's record 0070; PhotoBook's `App.css`.
