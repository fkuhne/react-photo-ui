# Plan

The work, as small steps in order. Each step names the decision records it depends on or will create; see the [decision index](decisions/README.md). Each step ends in a few small commits.

**How we work through it**
- One step at a time. Before a step with design choices, the agent lays out the options, the evidence and a recommendation; the owner picks.
- A new decision gets its record first, in its own commit. A Proposed record becomes Accepted in the commit that implements it.
- Guesses go into the matching record's "Assumptions to verify", ticked with evidence once checked.
- Tick the step here in the commit that finishes it.

**What a step leaves behind.** A step that measures something writes down the number, the command that produced it, and the settings and machine it ran on, in `docs/`. A number that lives only in a terminal is lost.

## Phase 0: The spec

- [x] 0.1 The product spec, the requirements, this plan and the first records ([0001](decisions/0001-work-from-a-spec-and-record-every-decision.md) to [0007](decisions/0007-shared-controls-each-app-its-own-palette.md)). Also a first pass of the notes: today's styles, the platforms' guidelines, and the libraries, icon sets and token tools compared, measured on 2026-11-27 ([`docs/foundations.md`](../docs/foundations.md)).
- [x] 0.2 The owner reviews the spec, the records and the notes, and the first commit is made: the public GitHub repository `fkuhne/react-photo-ui`, with its two licence files ([0003](decisions/0003-open-from-the-start-under-mit-or-apache-2-0.md)).

  Done on 2026-11-27 ([0003](decisions/0003-open-from-the-start-under-mit-or-apache-2-0.md) accepted): the owner read the spec and the README and said "go ahead"; the first commit, and the repository created public on GitHub.

## Phase 1: The foundations

PhotoMatch's plan step 2.86.

- [x] 1.1 The package: `photo-ui`, not published on npm, in TypeScript 6.0.3, React 19.3.1 as the apps', Vite 8.3.5, and React Aria Components 1.22.1, each pinned; built into `dist/`, committed, with no install scripts; and the gallery page, `npm run dev` ([0002](decisions/0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md), [0004](decisions/0004-the-controls-built-on-react-aria-components.md)). Measures the built files' size.

  Done on 2026-11-27: `package.json`, the two TypeScript settings, `src/index.ts`, `scripts/make.mjs`, the gallery page and `dist/`; the build named `make`, as npm runs a git dependency's `build` or `prepare` on install. 447 bytes built; 6.2 KB packed for an app, the licences and `dist/`; the gallery page served and built. See [`docs/package.md`](../docs/package.md#step-11-the-package).
- [x] 1.2 The tokens: Graphite, dark and light, from PhotoMatch's record 0070, in the W3C format; the script that writes them as CSS variables, and prints each pair of text and background with its contrast; on the gallery page ([0006](decisions/0006-tokens-in-the-w3c-format-made-into-css-variables-by-a-script-of-our-own.md), [0007](decisions/0007-shared-controls-each-app-its-own-palette.md)).

  Done on 2026-11-27 ([0006](decisions/0006-tokens-in-the-w3c-format-made-into-css-variables-by-a-script-of-our-own.md) and [0007](decisions/0007-shared-controls-each-app-its-own-palette.md) accepted): `tokens/`, the palette, the shared sizes, Graphite dark and light and a draft of PhotoBook's palette, tied by a resolver; `scripts/tokens.mjs` and its 5 tests; `dist/tokens.css`, 1 KB gzipped; the gallery page showing each theme. 57 pairs of text checked, all 4.5:1 or more; PhotoBook's own quieter text on its stage found at 4.39:1. See [`docs/package.md`](../docs/package.md#step-12-the-tokens).
- [x] 1.3 The icons: the Lucide icons PhotoMatch uses, copied as SVG files with Lucide's licence; an `Icon` component with Graphite's line width; on the gallery page ([0005](decisions/0005-lucide-s-icons-those-used-copied-as-svg-files.md)).

  Done on 2026-11-27 ([0005](decisions/0005-lucide-s-icons-those-used-copied-as-svg-files.md) accepted): 39 of Lucide's icons, 1.82.0, in `icons/lucide/` with its licence; `scripts/icons.mjs`, which lets only shapes and their geometry through, and its 4 tests; `Icon`, its line `--pu-icon-stroke` wide at any size; Lucide's licence beside the built files. See [`docs/package.md`](../docs/package.md#step-13-the-icons).
- [x] 1.4 A site to browse the design system, from the owner on 2026-11-27, "I want react-photo-ui repo to have some kind of UI to navigate through the design system and its components": the overview, the foundations, the icons and each family of controls, down the left; a search and the theme along the top; each page in every theme ([0008](decisions/0008-a-site-of-its-own-to-browse-the-design-system.md)).

  Done on 2026-11-27 ([0008](decisions/0008-a-site-of-its-own-to-browse-the-design-system.md) accepted): `gallery/`, its pages reading the built tokens, contrast and icons; drawn in WebKit, dark, light and paper, by `scripts/snapshot.swift`. See [`docs/package.md`](../docs/package.md#step-14-the-site).
- [ ] 1.5 PhotoMatch takes it, by its git URL over HTTPS pinned to a commit, its tokens' CSS loaded and nothing yet changed in its look; PhotoMatch's tests and self-check pass (PhotoMatch's record 0071).

## Phase 2: The controls

PhotoMatch's plan step 2.88. Each family on its page of the site, in every theme, its keys checked, then taken by PhotoMatch with its self-check. *Design choices.*

- [ ] 2.1 Buttons: the accented, the plain, the quiet and the icon-only, pressed and turned off.
- [ ] 2.2 Fields and dropdowns: a text field, a field that suggests as one types, and a dropdown.
- [ ] 2.3 Segmented choices, sliders and switches.
- [ ] 2.4 Popovers, menus, tooltips, dialogs and messages.
- [ ] 2.5 Panels, lists, the folder tree and the tags field.

Version 1 is done when PhotoMatch's controls are all the design system's.
