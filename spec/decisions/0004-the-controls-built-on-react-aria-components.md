# 0004. The controls built on React Aria Components

- Status: Proposed
- Date: 2026-11-27

## Context

The controls PhotoMatch uses: buttons; fields, one suggesting as one types for the camera and the lens, and dropdowns; segmented choices, sliders and switches; popovers, menus, tooltips, dialogs and messages; panels, lists, a folder tree and a tags field. Each needs to work with the keys alone and name itself to a screen reader. Three unstyled, accessible libraries were compared on 2026-11-27, from their pages and npm, and measured with the same seven controls ([`docs/foundations.md`](../../docs/foundations.md#the-controls-foundations-compared)):
- **React Aria Components** 1.22.1, Apache-2.0: over 50 components, `ComboBox`, `Tree` and `TagGroup` among them; "Keyboard interactions are first-class, including arrow key navigation, typeahead, multiple selection modifiers"; +68 KB gzipped over React for the seven.
- **Base UI** 1.9.0, MIT, stable since 2025-12-11: a combobox, no tree or tags field; +67 KB.
- **Radix Primitives,** MIT: no combobox, tree or tags field; +41 KB.

The app loads from disk, so the sizes weigh little. The owner's pick of 2026-11-27, in PhotoMatch's step 2.86: "go with your recommendations".

## Decision

**The controls are built on React Aria Components, pinned at an exact version, styled only by our tokens through its class names and its state's data attributes.**

- **Its components as our controls' base:** our `Button` on its `Button`, our dropdown on its `Select`, the suggesting field on its `ComboBox`, the folder tree on its `Tree`, the tags field on its `TagGroup`, and so on, each wrapped in a control of ours with our name and our styles.
- **Its own package alone,** `react-aria-components`, which brings `react-aria` and `react-stately`, all Apache-2.0.
- **Our controls' interface is ours,** so that the apps never import React Aria themselves.

## Alternatives considered

| Option | Why we didn't choose it |
|---|---|
| Base UI | No tree or tags field, which the Folders panel and the tags need |
| Radix Primitives | No suggesting field, tree or tags field |
| Fluent UI or React Spectrum, already styled | They look like Microsoft's or Adobe's apps, not Graphite |
| Our own controls, as today | The keys and the screen reader done again in each control, as they are now |

## Consequences

- **The controls' keys and accessibility come from one library,** kept up by Adobe.
- **About 68 KB gzipped** more in each app, measured with seven controls.
- **A larger API to learn** than the other two.

## Assumptions to verify

- [ ] It passes `data-*` attributes to the element it renders, which PhotoMatch's self-check finds controls by: step 2.1.
- [ ] Its focus and keys work in Tauri's webviews, WebKit on macOS and WebView2 on Windows: steps 2.1 to 2.5.

## Sources

- [`docs/foundations.md`](../../docs/foundations.md#the-controls-foundations-compared), and the measurement in it.
- The owner, on 2026-11-27.
