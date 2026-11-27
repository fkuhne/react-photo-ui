# 0008. A site of its own to browse the design system

- Status: Accepted
- Date: 2026-11-27

## Context

The owner on 2026-11-27, as the icons were being built: "I want react-photo-ui repo to have some kind of UI to navigate through the design system and its components", then "go". The repository had a gallery page, one long page of the tokens in each theme. The repository is public, for visitors to the owner's GitHub to see the work ([0003](0003-open-from-the-start-under-mit-or-apache-2-0.md)).

What was known that day:
- **Storybook,** the usual tool for this, on npm: `storybook` 10.6.9, MIT, its core 22 MB unpacked with 17 direct dependencies, before its addons.
- **The package's own pieces:** its tokens as CSS and as a table with each one's description, each pair's contrast, and its icons, all in `dist/`.
- **The apps' stack:** React 19.3 and Vite 8.3, as here.

## Decision

**The design system has a site of its own, in `gallery/`, built with React and the design system itself: its sections down the left, a page for each part with its examples in every theme and how to use it, a search and the theme along the top.**

- **Sections:** the overview, with how an app takes the package; the foundations, colour, type, space and size, corners and depth; the icons; and each family of controls, marked with the plan step that builds it until it's built.
- **Each page reads the built package,** its tokens, their contrast and its icons, so that it shows what an app gets and can't fall out of step with it.
- **Each page has its own address,** `#/foundations/colour`, so that it can be linked to and the site works as static files anywhere, with no server of its own.
- **The theme,** System, Dark, Light or Paper, set on the page's root as an app sets it, and kept in the browser.
- **Its styles name the tokens alone;** its controls become the design system's as phase 2 builds them.
- **No new dependency.**
- **A step shows its pages** drawn in WebKit, the engine of Tauri's macOS webview, by `scripts/snapshot.swift`.

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| Storybook 10.6.9 | 22 MB and 17 dependencies for its core alone; its own look around ours; one more tool to keep in step with React and Vite |
| The one long gallery page | Hard to find a part as the controls arrive; no page to link to |
| A documentation tool, as a static site generator | One more stack; the pages need the package's React to show its controls |

## Consequences

- **Each new control comes with its page,** in the same step.
- **The site can be put online as it is,** as static files, if the owner wants visitors to browse it: a separate decision.

## Assumptions to verify

- [x] It builds as a static site and draws as designed in WebKit: on 2026-11-27, `vite build --base ./`, 77 KB of JavaScript gzipped; four pages drawn by `scripts/snapshot.swift`, dark, light and paper.
- [ ] It draws the same in Chromium, WebView2's engine: at a look in a Chromium browser.

## Sources

- The owner, on 2026-11-27.
- npm's registry for `storybook`, read on 2026-11-27.
- `gallery/`, `scripts/snapshot.swift`, [`docs/package.md`](../../docs/package.md#step-14-the-site).
