# 0003. Open from the start, under MIT OR Apache-2.0

- Status: Accepted
- Date: 2026-11-27

## Context

The owner on 2026-11-27, choosing first a private repository, then, the same day: "I would make both the ui repo and the rust library open now, as a way to share what I am doing... considering that recruiter can look at my github". Of the licence, the owner's pick: "MIT OR Apache-2.0, both", for this repository and `rust-photo-library`.

What was read that day:
- **The Rust API Guidelines,** C-PERMISSIVE: the Rust project "is dual-licensed, under either the MIT or Apache 2.0 licenses. Crates that simply need the maximum compatibility with the Rust ecosystem are recommended to do the same", with `LICENSE-APACHE` and `LICENSE-MIT` in the repository's root and a License section in the README. It's written for crates; an npm package may follow it as well.
- **GitHub's "Setting repository visibility":** a public repository's code "will be visible to everyone", and "Anyone can fork your repository".
- **PhotoMatch's record 0054:** everything it ships must allow publishing under MIT or Apache 2.0, and nothing from GPL or AGPL code; the apps stay closed (PhotoMatch's record 0017).

## Decision

**The repository is public from its first commit, licensed MIT OR Apache-2.0, at the user's option.**

- **Two licence files,** `LICENSE-MIT` and `LICENSE-APACHE`, and a License and a Contribution section in the README, as the Rust API Guidelines lay out; `"license": "MIT OR Apache-2.0"` in `package.json`.
- **Every dependency, icon and font** allows that and closed use, is listed with its licence in `docs/foundations.md`, and is credited where its licence asks: Lucide's ISC licence beside its icons.
- **Nothing private in it:** no secret, private path, or detail of the owner's private projects beyond what the documentation needs.
- **The apps stay closed:** a design system they use doesn't open them.

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| Private, written so it can be opened | The owner's first pick, replaced the same day: the owner wants the work seen |
| MIT alone | The owner's pick is the dual licence, the Rust convention, for both repositories |
| Apache-2.0 alone | Not recommended by the Rust guidelines for compatibility |

## Consequences

- **Visitors see the spec, the records and the code,** the method with them.
- **No key** is needed to take it ([0002](0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md)).
- **Each new dependency's licence is checked as it comes in.**

## Assumptions to verify

- [ ] The repository public, with both licence files, at its first commit: step 0.2.

## Sources

- The owner, on 2026-11-27.
- The Rust API Guidelines, Necessities, C-PERMISSIVE; GitHub's "Setting repository visibility"; read on 2026-11-27.
- PhotoMatch's records 0017 and 0054.
