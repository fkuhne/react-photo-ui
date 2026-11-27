# 0006. Tokens in the W3C format, made into CSS variables by a script of our own

- Status: Accepted
- Date: 2026-11-27

## Context

Graphite's values (PhotoMatch's record 0070): its colours in a dark and a light version, its type, corners, spacing and depth. Each app's styles need them as CSS. What was read on 2026-11-27 ([`docs/foundations.md`](../../docs/foundations.md#the-tokens-format-and-tools)): the W3C Design Tokens Community Group's format has its "First stable version 2025.10"; Style Dictionary 5.8.0, the usual tool, says "the latest format 2025.10 does not have full support yet". Microsoft's Fluent keeps two layers of tokens: raw values, then names by purpose.

The owner's pick of 2026-11-27, in PhotoMatch's step 2.86: "go with your recommendations".

## Decision

**The tokens are written in the W3C format, 2025.10, in two layers, and a script of our own makes them CSS variables, one set for each theme.**

- **Two layers,** as Fluent's: the raw values, a palette of greys and accents, sizes and radii; and the names the controls use, by purpose, as "the panel's background" or "quieter text", each an alias of a raw value, set for dark and for light.
- **The script,** in the repository, a few hundred lines at most (computed): it reads the token files, resolves their aliases, and writes `dist/tokens.css`, the names by purpose as CSS variables under each theme.
- **Contrast checked by it:** each pair of text and background the tokens name is printed with its contrast, and the script fails under 4.5:1.

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| Style Dictionary 5.8 | Its support of 2025.10 isn't complete, by its own docs; a dependency for what a short script does |
| CSS variables written by hand | No source in the standard format, and no contrast checked |
| One layer of names | A palette change would touch every control's name |

## Consequences

- **The script is ours to keep,** small and tested.
- **The format can be read by design tools** later.

## Assumptions to verify

- [x] The script covers the 2025.10 types we use, colour and dimension among them: on 2026-11-27, step 1.2, colour, dimension, fontFamily, fontWeight and shadow, 197 lines, its 5 tests passing; themes as the Resolver module's one modifier, each theme's CSS selector in the resolver's `$extensions` ([`docs/package.md`](../../docs/package.md#step-12-the-tokens)).

## Sources

- [`docs/foundations.md`](../../docs/foundations.md#the-tokens-format-and-tools).
- PhotoMatch's record 0070; the owner, on 2026-11-27.
