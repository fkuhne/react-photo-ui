# The package

How `photo-ui` is laid out, built and taken, and what each step measured, with the command, the settings and the machine.

## Layout

- **`src/`:** the package's source, TypeScript and CSS. `src/index.ts` is what an app imports.
- **`dist/`:** the built package, committed ([0002](../spec/decisions/0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md)): JavaScript, type files and the stylesheets. Rebuilt by `npm run make` in every commit that changes `src/`.
- **`tokens/`:** the design tokens, in the W3C Design Tokens format 2025.10 ([0006](../spec/decisions/0006-tokens-in-the-w3c-format-made-into-css-variables-by-a-script-of-our-own.md)): `palette.tokens.json`, the raw colours named by hue and lightness, CIE L* rounded down; `ui.tokens.json`, the type, corners, space and sizes every theme shares; a file of names by purpose for each theme, `graphite-dark`, `graphite-light` and `paper-light`, a draft of PhotoBook's; and `photo-ui.resolver.json`, which ties them together, the theme as its one modifier, and says each theme's CSS selector in its `$extensions`.
- **`icons/lucide/`:** Lucide's SVG files the apps use, copied unchanged, its licence and `version.json` ([0005](../spec/decisions/0005-lucide-s-icons-those-used-copied-as-svg-files.md)); `src/icon-data.ts` is made from them.
- **`gallery/`:** the site to browse the design system, run by `npm run dev` from the source, never shipped ([0008](../spec/decisions/0008-a-site-of-its-own-to-browse-the-design-system.md)).
- **`scripts/make.mjs`:** the build. It checks `src/index.ts`'s version is `package.json`'s, makes the tokens' CSS and table with `scripts/tokens.mjs`, failing on a pair of text and background under 4.5:1, compiles `src/` with `tsconfig.build.json`, copies the stylesheets, and prints each built file's size.
- **`scripts/tokens.mjs`:** the tokens into `dist/tokens.css`, `dist/tokens.json` and `dist/contrast.json`; its tests in `scripts/tokens.test.mjs`.
- **`scripts/icons.mjs`:** the icons' shapes into `src/icon-data.ts`; its tests in `scripts/icons.test.mjs`. `npm test` runs both.
- **`scripts/snapshot.swift`:** draws pages of the site in WebKit, off screen, into PNG files, on a Mac.

## Choices the build makes

- **No script an install would run.** npm's `package.json` docs (npm 11, read on 2026-11-27) say a git dependency is built on install when it defines `build`, `prepare`, `prepack`, `preinstall`, `install` or `postinstall`. So the build is `make`, and the scripts are `dev`, `make`, `check` and `test` alone.
- **React as a peer,** `^19.3.1`, so that an app's own React is the one used; the package's own tooling pins `react`, `react-dom`, `typescript` 6.0.3, `vite` 8.3.5, `@vitejs/plugin-react` 6.1.2 and the React types at exactly PhotoMatch's versions.
- **React Aria Components** 1.22.1, pinned exactly, a dependency the apps install with the package ([0004](../spec/decisions/0004-the-controls-built-on-react-aria-components.md)); no control uses it before phase 2.
- **Imports left as written,** for the apps' bundlers, Vite in each: the package isn't meant for Node itself.
- **`private: true`:** never published on npm by mistake.

## Step 1.1: the package

On the owner's planning Mac (Apple M3, 8 GB, macOS 14.3, Node 22.22.0, npm 10.9.4), 2026-11-27:
- **`npm install`:** 36 packages in 6 s; `node_modules` 125 MB.
- **`npm run check`:** no error.
- **`npm run make`:** `dist/index.js` 303 bytes, 238 gzipped; `dist/index.d.ts` 144 bytes, 146 gzipped; 447 bytes in all.
- **`npm pack --dry-run`,** what an app's install takes: `LICENSE-APACHE`, `LICENSE-MIT`, `README.md`, `dist/index.d.ts`, `dist/index.js` and `package.json`, 6,211 bytes packed, 16,175 unpacked.
- **`npm run dev`:** the gallery page on port 5180, its page and its script answering `200`.
- **`npx vite build`** of the gallery page: 220.47 KB of JavaScript, 69.07 KB gzipped, React's nearly all.

## Step 1.2: the tokens

The token files were first written on 2026-11-27 from Graphite's values in PhotoMatch's record 0070, and PhotoBook's light palette from its `App.css`, by a one-off generator, so that no colour was mistyped; they're edited by hand from now on. What the format asks, from its 2025.10 Format, Color and Resolver modules ("Final Community Group Report", 28 October 2025, read that day): a colour as `{colorSpace, components, alpha?, hex?}`, a dimension as `{value, unit}` in px or rem, references as `{group.token}` to a whole token only, files named `.tokens.json`, and themes as a resolver's modifier with one context each.

**What the CSS holds** (`dist/tokens.css`): the shared tokens once under `:root`, as `--pu-font-*`, `--pu-radius-*`, `--pu-space-*` and `--pu-size-*`, the font sizes and line heights scaled by `--pu-text-scale`, Settings' text size; each theme's 21 colours and two shadows under its selector, Graphite dark on `:root` and `[data-theme="dark"]`, light on `[data-theme="light"]` and, by `prefers-color-scheme`, on a root with no theme set or `data-theme="system"`; the draft paper palette on `[data-palette="paper"]`. The palette itself isn't in the CSS: the controls name purposes only.

On the owner's planning Mac (as in step 1.1), 2026-11-27:
- **`npm test`:** 5 tests pass: aliases through the palette, types from their group, the CSS's blocks, WCAG 2's contrast, references to a group, to nothing or in a circle refused by name, translucent colours and shadows.
- **`npm run make`:** 57 pairs of text and background checked, every one 4.5:1 or more. The closest: Graphite light's accent as text on a caption, 4.84:1, its quieter text on the canvas, 4.95:1; Graphite dark's quieter text on a control, 5.06:1.
- **A finding for PhotoBook:** its quieter text, `#6b6760`, on its stage, `#e7e3da`, is 4.39:1, under 4.5:1. The draft uses `#67635c`, 4.66:1.
- **The built files:** `dist/tokens.css` 4,448 bytes, 1,027 gzipped; `dist/tokens.json` 15,787 bytes, 996 gzipped; `dist/` 20,682 bytes in all.
- **The gallery page,** built: 234.54 KB of JavaScript, 71.00 KB gzipped, and 3.85 KB of CSS, 0.90 KB gzipped.

## Step 1.3: the icons

39 of Lucide's icons, from the npm package `lucide-static` 1.82.0, its `icons/` folder and `LICENSE`, copied unchanged on 2026-11-27: the ones PhotoMatch draws today and those Graphite's mock-ups show. Lucide's licence is ISC, with an MIT notice for the icons derived from Feather, among them `check`, `chevron-*`, `crosshair`, `info`, `minus`, `plus`, `search`, `trash-2`, `x` and `zoom-*`; both travel in `LICENSE-LUCIDE` beside the built files.

- **What the files hold:** four shapes, path, circle, line and rect; one fill, the text's colour, on the dot of `tag`. Every root is Lucide's, a 24-unit grid with a line 2 units wide.
- **`Icon`** draws an icon's shapes in the text's colour at `--pu-icon-size`, 14 px, with a line `--pu-icon-stroke`, 1.4 px, that doesn't scale with the icon (`vector-effect: non-scaling-stroke`): Lucide's own 2 units would be 1.17 px at 14 px (computed). Both follow `--pu-text-scale`. Named for a screen reader with `label`, else hidden from it.
- **`npm test`:** 9 tests pass, 4 of them the icons': Lucide's files read, `line`'s `x1` to `y2` kept, a script, an image, a style, a handler, another fill and another grid refused by name.
- **`npm run make`:** `dist/icon-data.js` 7,732 bytes, 2,133 gzipped; `dist/Icon.js` 805 bytes, 459 gzipped.

## Step 1.4: the site

From the owner on 2026-11-27: "I want react-photo-ui repo to have some kind of UI to navigate through the design system and its components" ([0008](../spec/decisions/0008-a-site-of-its-own-to-browse-the-design-system.md)).

- **Its frame** (`gallery/main.tsx`, `gallery/site.css`): a bar along the top with the name and version, a search of the pages and icons, and the theme, System, Dark, Light or Paper, kept in the browser; the sections down the left, Overview, Foundations, Icons and Controls, each control family marked with the plan step that builds it; the page beside them. Each page has its address, `#/foundations/colour`, so that it links and works as a static site anywhere. Its styles name the tokens alone.
- **Its pages** (`gallery/pages.tsx`): the overview, with how an app takes the package and its themes; colour, every token by purpose with its value in each theme and every pair's contrast; type, the scale at 100% to 200% text; space and size; corners and depth; the icons, at 14, 20 and 28 px, a click copying `<Icon name="…" />`; and a page for each family of controls, which phase 2 fills.
- **Built** as a static site, `npx vite build --base ./`, on the owner's planning Mac on 2026-11-27: 257.93 KB of JavaScript, 77.06 KB gzipped, and 9.22 KB of CSS, 2.12 KB gzipped.
- **Drawn in WebKit** by `scripts/snapshot.swift`, at 1280 × 820: the overview dark, colour dark, the icons light and type in the paper palette, each as designed; the icons' lines crisp at 14 px.
- **Online** at <https://fkuhne.github.io/react-photo-ui/>, published by `scripts/publish-site.sh` from a clean commit to the `gh-pages` branch ([0009](../spec/decisions/0009-the-site-on-github-pages-published-by-hand.md)).

## Commands

```sh
npm install         # once, and after a dependency changes
npm run dev         # the site, at http://localhost:5180
npm run check       # type-check the package and the site
npm test            # the token and icon scripts' tests
npm run make        # build dist/, to commit with the change; fails under 4.5:1 contrast
```
