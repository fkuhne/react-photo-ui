# What the design system rests on

What we know about the platforms' guidelines, the libraries, the icon sets and the token tools, each claim with its source and the date it was checked: a vendor's page, the package registry, the code, or a run of ours. A number worked out but not yet run is marked "computed". A claim from memory is marked "unchecked".

## The apps' styles on 2026-11-27

Counted in the apps' code that day, on the owner's planning Mac:
- **PhotoMatch's `App.css`:** 2,440 lines; 11 text sizes, from 10 to 24 px, 12 px the most used (19 times); 10 corner radii, 6 px and 4 px the most used; about 30 different paddings. Two native `<select>` boxes; hand-drawn SVGs in eight components.
- **PhotoDev's copies of PhotoMatch's files,** lines that differ, by `diff`: `FilterPanel.tsx` 92, `SidePanel.tsx` 62, `filters.ts` 45, `sorting.ts` 18, `ComboField.tsx`, `RatingMarks.tsx`, `selection.ts` and `format.ts` 2 each. Its `App.css` keeps PhotoMatch's colour names for the copied styles (PhotoDev's record 0025).
- **PhotoBook's `App.css`:** 936 lines, a warm light palette of its own, around a bundled Noto Sans for its pages.
- **All three** pin `react` 19.3.1, `typescript` 6.0.3, `vite` 8.3.5, `@vitejs/plugin-react` 6.1.2 and `@tauri-apps/api` 2.12.4, and use no UI library (their `package.json`).

## The platforms' guidelines

- **Apple, Human Interface Guidelines,** read on 2026-11-27 through the pages' data files (`developer.apple.com/tutorials/data/design/human-interface-guidelines/…json`), as the pages render in JavaScript:
  - **Typography:** "SF Pro is the system font in macOS"; macOS's default size 13 pt, its least 10 pt; "don't embed system fonts in your app". The full table of macOS styles came from a summary of the page, not its text: unchecked.
  - **Dark Mode:** contrast "no lower than 4.5:1", and "strive for a contrast ratio of 7:1, especially in small text"; "it can make sense for an app that supports immersive media viewing to use a permanently dark appearance"; "Avoid offering an app-specific appearance setting".
  - **Designing for macOS:** "a comfortable information density"; "Use the menu bar to give people easy access to all the commands"; "Handle keyboard shortcuts".
- **Microsoft, Windows apps:**
  - [Typography in Windows](https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/typography) (updated 2026-07-14): Segoe UI Variable, "the new system font for Windows"; a ramp of Caption 12/16, Body 14/20, Body Strong 14/20, Body Large 18/24, Subtitle 20/28, Title 28/36 px; least "14px Semibold, 12px Regular".
  - [Geometry in Windows 11](https://learn.microsoft.com/en-us/windows/apps/design/signature-experiences/geometry) (updated 2026-02-19): 4 px corners for controls and bars, 8 px for windows, dialogs, flyouts and menus, 0 where straight edges meet.
  - [Content layout and spacing](https://learn.microsoft.com/en-us/windows/apps/design/basics/content-basics) (updated 2026-10-14): 8 px between buttons, and between a control and its header; 12 px between a control and its label, and between content areas; 16 px from a surface's edge to its text.
  - [Fluent 2's design tokens](https://fluent2.microsoft.design/design-tokens): global tokens hold the raw values; alias tokens name them by purpose; themes for light, dark and high contrast.

## The controls' foundations compared

Each library's own pages and the npm registry, read on 2026-11-27:

| | React Aria Components | Base UI | Radix Primitives |
|---|---|---|---|
| Maker | Adobe (its site's address, `react-aria.adobe.com`) | "From the creators of Radix, Floating UI, and Material UI" (its home page) | WorkOS (unchecked) |
| Licence (npm) | Apache-2.0 | MIT | MIT |
| Version, last published | 1.22.1, 2026-10-09 | 1.9.0, 2026-10-09; stable since 1.0.0, 2025-12-11 | per package, e.g. `react-dropdown-menu` 2.2.1, 2026-10-14 |
| React | 16.8 to 19 (peer range) | 17 to 19 | 16.8 to 19 |
| What it says of itself | "style-free out of the box"; "Keyboard interactions are first-class, including arrow key navigation, typeahead, multiple selection modifiers" | "unstyled UI components for building accessible component libraries" | "a low-level UI component library with a focus on accessibility, customization and developer experience" |
| A suggesting field | `ComboBox`, `Autocomplete` | `combobox`, `autocomplete` | none (`@radix-ui/react-combobox` doesn't exist on npm) |
| A tree | `Tree` | none | none |
| A tags field | `TagGroup`, `TokenField` | none | none |

The components are from each installed package's own files: React Aria Components' `dist/exports/`, Base UI's folders.

**Measured on 2026-11-27,** on the owner's planning Mac (Apple M3, 8 GB, macOS 14.3): the same seven controls, a dropdown, a menu, a slider, a switch, a segmented choice, a tooltip and a dialog, built by Vite 8.3.5 as an app, with React 19.3.1, the JavaScript gzipped at level 9:

| Build | Minified | Gzipped | Added to React |
|---|---|---|---|
| React alone | 219,481 bytes | 67,692 | — |
| React Aria Components 1.22.1 | 441,066 | 135,652 | +67,960 |
| Base UI 1.9.0 | 423,889 | 134,885 | +67,193 |
| Radix Primitives, seven packages | 351,610 | 108,654 | +40,962 |
| PhotoMatch's interface, for scale | 583,507 | 174,580 | — |

How: an empty folder with `npm install --ignore-scripts` of those versions; one `.jsx` file per library, rendering the seven controls; `vite build` with `@vitejs/plugin-react` 6.1.2, one page each; `gzip -9 -c <the built .js> | wc -c`. The installed packages and everything they bring in at run time are MIT, Apache-2.0 or 0BSD (each `package.json`'s `license`); the build tools add MPL-2.0 (`lightningcss`), BSD-3-Clause and ISC, which aren't shipped.

## The icon sets compared

Each set's own SVG package from npm, on 2026-11-27, `npm pack` into an empty folder:

| Set | Package, licence | Icons | Last published |
|---|---|---|---|
| Lucide | `lucide-static` 1.82.0, ISC | 2,437 | 2026-11-27 |
| Tabler | `@tabler/icons` 3.53.0, MIT | 5,509 outline | 2026-11-24 |
| Phosphor | `@phosphor-icons/core` 2.1.1, MIT | 1,512 in each of six weights | `@phosphor-icons/react` 2.1.10, 2025-05-22 |

Each has every icon PhotoMatch needs, found by name in the package: a folder and a folder to add, a flag, a cross, a star, a stack for bursts, two columns for Compare, focus, a crosshair for the focus point, an aperture, a warning for clipping, the two side panels, a grid, a funnel, sorting, a tag, a bin, undo, info, search, settings, zoom, a histogram, a camera, an eye, a chevron and rotation. Lucide's and Tabler's SVGs are drawn on a 24-unit grid with a line 2 units wide, `stroke-width="2"`, which can be set thinner.

## The tokens' format and tools

- **The W3C Design Tokens Community Group's format:** "First stable version 2025.10 now available" ([designtokens.org](https://www.designtokens.org/)). "An object with a $value property is a token"; `$type` on a token or inherited from its group; aliases as `"{group.token}"`. Read on 2026-11-27.
- **Style Dictionary** 5.8.0, Apache-2.0 (npm): "As of version 4, Style Dictionary has first-class support for the DTCG format", but "the latest format 2025.10 does not have full support yet in Style Dictionary. This is a work in progress in v5" ([its DTCG page](https://styledictionary.com/info/dtcg/), read on 2026-11-27).

## How an app takes it

- **npm's git dependencies** ([package.json, npm 11](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#git-urls-as-dependencies), read on 2026-11-27): "If #<commit-ish> is provided, it will be used to clone exactly that commit." A git dependency is built on install when it defines `build`, `prepare`, `prepack`, `preinstall`, `install` or `postinstall`, or uses workspaces; a repository with pre-built files should "make sure that none of the above scripts are defined".
- **GitHub's deploy keys** ([Managing deploy keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys), read on 2026-11-27): a deploy key "grants access to a single repository"; "You can't reuse a deploy key for multiple repositories". A public repository needs none: an app reaches it over HTTPS.

## Open questions

- **Graphite's 11 px captions on Windows,** under Microsoft's least of 12 px for regular text (PhotoMatch's record 0070): to judge on the owner's PC.
- **Whether React Aria Components passes `data-*` attributes** to the element it renders, which PhotoMatch's self-check finds its controls by: unchecked, to try in step 2.1.
