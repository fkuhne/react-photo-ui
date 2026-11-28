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

## Step 1.5: PhotoMatch takes it

On 2026-11-27, PhotoMatch's plan step 2.86 and its record 0071, on the owner's planning Mac (Node 22.22.0, npm 10.9.4):
- **The address:** `npm install "photo-ui@git+https://github.com/fkuhne/react-photo-ui.git#<commit>"` saved it as `github:fkuhne/react-photo-ui#<commit>`; written by hand in `package.json` as `git+https://…`, it stays so. The lockfile's `resolved` is `git+ssh://git@github.com/fkuhne/react-photo-ui.git#<commit>` either way, npm's own way for GitHub.
- **No key needed:** `npm ci --ignore-scripts` on a copy of PhotoMatch's `package.json` and lockfile, with an empty `--cache` and `GIT_SSH_COMMAND=false`, so that SSH fails as on a CI runner, installed `photo-ui` 0.1.0 with its `dist/`.
- **What it brings** into an app's `node_modules`: 14 packages, 61 MB, `react-aria` 37 MB, `react-aria-components` 10 MB and `react-stately` 9.8 MB of it; `photo-ui` itself 108 KB. Into its built interface, with `tokens.css` imported and nothing else: 3,955 bytes of CSS, 656 gzipped, and no JavaScript.
- **Licences:** each of the 14 has its licence text, but `client-only` 0.0.1, an empty marker package of the React project, MIT, which an app's notices may take from React's own `LICENSE`; Lucide's is `dist/LICENSE-LUCIDE`.

## Step 1.6: what PhotoMatch's styles need

On 2026-11-27, for PhotoMatch's plan step 2.87, from a count of its `App.css`: 13 of its 57 text sizes off Graphite's 11, 12 and 13 px, at 14, 15, 18 and 20 px for headings; its dialogs' 24 px of padding, nine times; circles and pills; white text on black scrims over photos; a backdrop behind them; and error text ([0010](../spec/decisions/0010-two-more-type-sizes-space-24-and-32-a-round-corner-and-colours-for-photos-and-errors.md)).

- **Added:** `--pu-font-size-heading` 15 px and `--pu-font-size-display` 20 px, with lines of 20 and 28 px; `--pu-space-24` and `--pu-space-32`; `--pu-radius-full`, 999 px; and in each theme `--pu-color-backdrop`, `--pu-color-on-photo`, `--pu-color-scrim`, black at 72%, `--pu-color-scrim-soft`, black at 45%, and `--pu-color-error`.
- **The check found** PhotoMatch's light error red, `#c62828`, at 3.88:1 on Graphite light's canvas, and 4.39:1 on paper's. The lightest red of its hue at 4.6:1 or more on every light surface, by stepping its lightness down by 1%, is `#b12424`.
- **`npm run make`:** 69 pairs, all 4.5:1 or more; the closest, the light error red on the canvas, 4.60:1. `dist/` 65,060 bytes, 10,695 gzipped.

## Step 2.1: buttons and the dropdown

On 2026-11-27, PhotoMatch's plan step 2.88, its first family, the owner's order: the most seen first ([0004](../spec/decisions/0004-the-controls-built-on-react-aria-components.md)).

- **`Button`:** React Aria's `Button` as `variant` `accent`, `plain` or `quiet`, `size` `large` for a dialog's foot, 26 px, else 24; an `icon`, before the text or alone, named then by `aria-label`. React Aria's `filterDOMProps` passes no `title` in 1.22.1, so `Button` sets it on the element itself, the system's tooltip, until the overlays' step.
- **`Select`:** React Aria's `Select` with `value` and `onChange`, its `selectedKey` deprecated in 1.22.1; its button shows the choice and a chevron, its list a `ListBox` in a `Popover` at least as wide as the button, `--trigger-width`, rows 22 px, the focused one in the accent, the chosen one ticked. Each option carries `data-key`, its id, from React Aria's `useSelectableItem`.
- **`controls.css`:** every colour, size, space and corner from the tokens; the states from React Aria's data attributes, `data-hovered`, `data-pressed`, `data-focus-visible`, `data-disabled`, `data-open`, `data-focused`, `data-selected`. Exported as `photo-ui/controls.css`, loaded after the tokens.
- **Read on 2026-11-27:** React Aria's Styling, Select, Slider, Switch, ToggleButtonGroup and Testing pages, now at react-aria.adobe.com, with no dates; and its 1.22.1 code for what they leave out: `usePress` takes `element.click()` as a press, "as if it were a keyboard click"; the slider's hidden input is a `range`, the switch's a `checkbox`; its overlays always give focus back, `restoreFocus`.
- **`npm run make`:** `dist/` 75,342 bytes, 11,273 gzipped, from 65,060 and 10,695.
- **Drawn in WebKit** by `scripts/snapshot.swift`, the site's Buttons and Fields pages, dark and light: each kind in the three palettes, the turned-off ones faded, the dropdown's list with its tick.

## Step 2.3: the choices

On 2026-11-27, PhotoMatch's plan step 2.88, its second family ([0004](../spec/decisions/0004-the-controls-built-on-react-aria-components.md), [0011](../spec/decisions/0011-a-knob-colour-for-switches-and-sliders.md)).

- **`ToggleButton`:** React Aria's, `plain` or `quiet`, pressed while `isSelected`; standalone, it says so by `aria-pressed`.
- **`Segmented`:** React Aria's `ToggleButtonGroup`, one choice always on, a `radiogroup` of `radio`s with `aria-checked` (its `useToggleButtonGroup`, 1.22.1); `joined`, one control, or `apart`, each a button, as the canvas draws colours. Each option may carry `data-*` attributes, for an app's checks.
- **`Switch`, `Checkbox`, `RadioGroup`:** React Aria's, each with its hidden input, `checkbox` or `radio`, inside the `label` that carries the app's `data-*`; a switch 28 by 16 px, a box and a circle of 14 px, in the accent while on.
- **`Slider`:** React Aria's, its track a 2 px line with the accent up to a 12 px thumb, its value in a box beside it, as Apple's and Microsoft's guidelines suggest; its hidden input a `range`, its `min` and `max` set.
- **Which to use,** read on 2026-11-27: Apple's Toggles (changed 2024-03-29), "To present a single setting that can be on or off, prefer a checkbox" and "Prefer a switch for settings that you want to emphasize"; Microsoft's Toggle switches (updated 2026-09-21), "Use a toggle switch for binary settings when changes become effective immediately"; both, a checkbox for any combination of a list. PhotoMatch's settings take effect at once and the canvas draws switches: switches there. Apple's Sliders and Microsoft's Slider: the value beside the slider; Apple's Segmented controls: "no more than about five to seven segments".
- **`color.knob`,** a light knob in every theme ([0011](../spec/decisions/0011-a-knob-colour-for-switches-and-sliders.md)).
- **`npm run make`:** `dist/` 92,901 bytes, 18,532 gzipped by the sum of each file's, the build's own count.
- **Drawn in WebKit,** the Choices page, dark and light: each control in the three palettes, the knobs light in each.

## Step 2.2: the text field

On 2026-11-27, PhotoMatch's plan step 2.88, its last family.

- **`Field`:** React Aria's `Input`, which passes every property to its `<input>` (its 1.22.1 code), a ref and an app's key handlers among them, so that it stands in for an `<input>`; 24 px high, the `field` ground, the `edge`, the `accent` while typed in, the `error` while `aria-invalid`.
- **The field that suggests as one types,** the folder tree and the tags field keep PhotoMatch's behaviour for now, drawn with `.pu-field`, `.pu-popover` and `.pu-listbox-item`: their keys, right clicks and drops are what its self-check covers most, and React Aria's `ComboBox`, `Tree` and `TagGroup` each change them; step 2.6 moves them.

## Step 2.4: dialogs and messages

On 2026-11-27, PhotoMatch's plan step 2.88, its third family.

- **`Dialog`:** React Aria's `ModalOverlay`, `Modal` and `Dialog`: the app behind `scrim-soft`, the dialog a `panel` with an `edge`, 6 px corners and the dialog's shadow; focus kept inside it, given back after; a click on the scrim closes it. Esc closes it too unless `isKeyboardDismissDisabled`: PhotoMatch's own keys handle Esc for every dialog, and toggle its keyboard shortcuts with it, which React Aria's closing as well would open again. Its content is the app's, and so are the classes on the element named `dialog`, its size and layout, as the box around it, its edge, corners, ground and shadow, is ours; `DialogTitle` names it.
- **`.pu-message`:** a message that comes and goes, as the canvas draws it: a popover 30 px high, its words, and an action such as Undo as a quiet button.
- **Not drawn here:** the menus, each system's own, and the tooltips, the system's, by PhotoMatch's records 0074 and 0075, from Apple's and Microsoft's pages read on 2026-11-27: their Tooltips and Offering help describe the system's own; their Menus ask for the system's.
- **Read on 2026-11-27:** Apple's Sheets (updated 2026-03-24) and Alerts (2024-02-02), the default button on the trailing side, Cancel on the leading side; Microsoft's Dialogs (2026-07-15), the "do it" buttons first and the safe one last, Esc as the close button. The foot's order is the app's, by system.
- **`npm run make`:** `dist/` 96,514 bytes, 19,739 gzipped.

## Step 2.6: the suggesting field, tags and a tree's rows

On 2026-11-27, PhotoMatch's plan step 2.91.

- **`ComboBox`:** React Aria's, `allowsCustomValue`, the app holding its text (`inputValue`) and its suggestions (`items`), nothing selected in it (`selectedKey={null}`): a suggestion taken calls `onChoose`; Enter on typed text, Esc and leaving it are the app's, as React Aria's state then only closes its list (its `useComboBoxState`, 1.22.1). Its list opens as the field takes the keys, or as one types (`opensOnFocus={false}`). An app's own button at its end, such as a filter's ×, is kept out of the `ButtonContext` React Aria's combo box gives its trigger: inside it, the × also opened the list and took the keys, and leaving the field then took its text again, which PhotoMatch's self-check found.
- **`Tags`:** React Aria's `TagGroup`, each `Tag` a chip with a × (`slot="remove"`), `onRemove`; a tag may act on a click, `onAction`; the arrows move between them, Delete removes one. Its title set on the element, as React Aria passes none.
- **In PhotoMatch,** the filter fields take `ComboBox`, the Tags field `Tags`. Its tag input stays a `Field` with the system's suggestions, a `<datalist>`: with `ComboBox` there, PhotoMatch's self-check stopped at the move of two photos in two runs, the app held up, and passed with the chips alone; the cause not found, to look at again.
- **A tree's rows:** `.pu-tree-row`, 24 px times the text scale, the current one by `data-current` in `selected`, a quiet one by `data-quiet`, one things are dragged onto by `data-drop-target`; `.pu-tree-twisty`, turned by `data-open`; `.pu-tree-name` and `.pu-tree-count`. An app's tree keeps its behaviour ([0012](../spec/decisions/0012-an-app-s-tree-keeps-its-behaviour-the-design-system-draws-its-rows.md)).
- **Drawn in WebKit,** the site's Panels page, dark and light.
- **`npm run make`:** `dist/` 108,363 bytes, 23,782 gzipped.

## Commands

```sh
npm install         # once, and after a dependency changes
npm run dev         # the site, at http://localhost:5180
npm run check       # type-check the package and the site
npm test            # the token and icon scripts' tests
npm run make        # build dist/, to commit with the change; fails under 4.5:1 contrast
```
