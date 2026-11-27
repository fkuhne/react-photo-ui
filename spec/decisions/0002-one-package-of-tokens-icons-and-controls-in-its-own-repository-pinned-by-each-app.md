# 0002. One package of tokens, icons and controls, in its own repository, pinned by each app

- Status: Proposed
- Date: 2026-11-27

## Context

The owner on 2026-11-27, in PhotoMatch: "I want to use the same design system in my other projects as well (PhotoDev, PhotoBook, etc) so we might want to create a separate repo with all UI definitions there." PhotoDev's copies of PhotoMatch's panels had drifted by 92 and 62 lines ([`docs/foundations.md`](../../docs/foundations.md#the-apps-styles-on-2026-11-27)), as its photo code had before `rust-photo-library` was made, which each app takes at a pinned commit.

What npm offers (its `package.json` docs for npm 11, read that day): a dependency on a git URL, "If #<commit-ish> is provided, it will be used to clone exactly that commit"; a git dependency is built on install when it defines `prepare` or the other install scripts, and a repository with pre-built files should define none.

The owner's picks of 2026-11-27, in PhotoMatch's step 2.86: "go with your recommendations": the name `react-photo-ui` for the repository and `photo-ui` for the package; its built files committed; each app pinning a commit by a git URL.

## Decision

**One npm package, `photo-ui`, in the repository `fkuhne/react-photo-ui`, holding the tokens, their CSS, the icons and the controls; built into `dist/`, which is committed; each app depends on it by its git URL, pinned to a commit.**

- **Not on npm,** for now: `"private": true` in its `package.json` keeps it from being published by mistake.
- **No install scripts:** nothing of ours runs when an app installs it; the commit an app pins is exactly the code it gets.
- **Its source in TypeScript and CSS,** built by the repository's own build, run before each commit that changes it.
- **The apps' versions:** React, TypeScript and Vite at the versions the apps pin, as peers where an app brings them.
- **While a change is under way,** an app may point at the local folder; a pin to a commit is what's committed, as with `rust-photo-library`.
- **Over HTTPS,** as the repository is public ([0003](0003-open-from-the-start-under-mit-or-apache-2-0.md)): no key, in the apps' CI or anywhere.

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| Each app keeps its own copy | The drift that made it |
| Tokens shared, controls in each app | The drift is in the controls: PhotoDev's copied panels |
| Built on install by `prepare` | Its build tools installed in every app's install, and a pin no longer exactly what the app gets |
| The TypeScript source, compiled by each app's Vite | Unchecked that Vite compiles TypeScript inside a dependency as an app's own; the built files leave nothing to doubt |
| Published on npm | Nothing gained for three apps of the owner's; can come later |
| One repository holding the apps and the design system | The apps are separate repositories, PhotoMatch's private |

## Consequences

- **A change reaches an app when it moves its pin,** after its checks pass on it.
- **`dist/` in git:** small text, rebuilt with each change; a commit's source and its `dist/` always match.
- **The apps' CI needs no key** for it.

## Assumptions to verify

- [ ] `npm ci` in PhotoMatch installs it from a pinned commit over HTTPS, running no script of ours: step 1.4.
- [x] The built files stay small: on 2026-11-27, step 1.1, 447 bytes in `dist/`, 6,211 bytes as npm packs it for an app ([`docs/package.md`](../../docs/package.md#step-11-the-package)); the build named `make`, as a `build` or `prepare` script would run in each app's install.

## Sources

- The owner, on 2026-11-27, in PhotoMatch's repository.
- npm's `package.json` documentation, npm 11, read on 2026-11-27.
- [`docs/foundations.md`](../../docs/foundations.md).
