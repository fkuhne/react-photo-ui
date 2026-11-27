# react-photo-ui: product spec

This is the source of truth for what the project covers and what it doesn't. A change of scope starts here, then flows into [`requirements.md`](requirements.md), [`plan.md`](plan.md) and the [decision records](decisions/README.md).

> **Drafted on 2026-11-27,** from the owner's conversation in PhotoMatch's repository, where the design system was decided (PhotoMatch's plan steps 2.85 and 2.86, its records 0070 and 0071). The names are the owner's picks of that day: `react-photo-ui` for the repository, and `photo-ui` for the package, as `rust-photo-library` and its crate `photo-library`. The owner reviews this spec in plan step 0.2.

react-photo-ui is the design system the owner's photo apps share: PhotoMatch, PhotoDev and PhotoBook. It holds their look's values, as design tokens, their icons, and their controls, built once in React. It's open, under MIT or Apache 2.0, as the owner's `rust-photo-library` is to be ([0003](decisions/0003-open-from-the-start-under-mit-or-apache-2-0.md)).

## The problem

The owner on 2026-11-27, in PhotoMatch: "I am finding the menus, buttons, dropdowns, etc... too 'amateur', let's say. I think we can explore more the UI, making it better, more professional. I want to use the same design system in my other projects as well (PhotoDev, PhotoBook, etc) so we might want to create a separate repo with all UI definitions there."

What was there that day, measured in the apps' code ([`docs/foundations.md`](../docs/foundations.md#the-apps-styles-on-2026-11-27)):
- **No scale:** PhotoMatch's 2,440 lines of CSS hold 11 text sizes, from 10 to 24 px, 10 corner radii and about 30 paddings.
- **Controls drawn one by one:** each panel draws its own buttons, segmented choices and lists; native `<select>` boxes sit beside custom ones; a few icons are drawn by hand.
- **Copies that drift:** PhotoDev copied PhotoMatch's filter panel, side panel and fields, and they differ already: its filter panel in 92 lines, its side panel in 62. PhotoBook has a look of its own.
- **The same stack in all three:** Tauri 2.12, React 19.3, Vite 8.3 and TypeScript 6.0, and no UI library.

It's the problem `rust-photo-library` solved for photo reading, in the interface.

## Who it's for

1. **The owner's photo apps:** PhotoMatch first, then PhotoDev and PhotoBook, each taking it at a pinned commit.
2. **The owner,** who builds them: one place to change how they look and behave.
3. **The apps' users,** photographers, who get controls that look and work alike across the apps, accessible, with the keys a desktop app has.
4. **Visitors to the owner's GitHub,** recruiters among them, who see the work, from the owner on 2026-11-27: "as a way to share what I am doing... considering that recruiter can look at my github".
5. **A coding agent** working with the owner, who needs the spec, the notes and the records to pick up where the last session stopped.

## What it is

One package, `photo-ui`, in its own repository ([0002](decisions/0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md)):
- **Design tokens:** colour, type, spacing, corners and depth, in the W3C Design Tokens format, 2025.10, made into CSS variables, dark and light ([0006](decisions/0006-tokens-in-the-w3c-format-made-into-css-variables-by-a-script-of-our-own.md)). The first palette is Graphite, PhotoMatch's (its record 0070); each app may set its own over the shared controls ([0007](decisions/0007-shared-controls-each-app-its-own-palette.md)).
- **Icons:** the ones the apps use, from Lucide, copied as SVG files with Lucide's licence, drawn through one component ([0005](decisions/0005-lucide-s-icons-those-used-copied-as-svg-files.md)).
- **Controls,** in React and TypeScript, built on React Aria Components, which brings their accessibility and their keys ([0004](decisions/0004-the-controls-built-on-react-aria-components.md)): buttons; fields and dropdowns; segmented choices, sliders and switches; popovers, menus, tooltips, dialogs and messages; panels, lists, a folder tree and a tags field.
- **A site to browse it,** from the owner on 2026-11-27, "I want react-photo-ui repo to have some kind of UI to navigate through the design system and its components": its sections down the left, the overview, the foundations, the icons and each family of controls, each page with its examples in every theme and how to use it, a search and the theme along the top, run with `npm run dev`, and a static site that can be put anywhere ([0008](decisions/0008-a-site-of-its-own-to-browse-the-design-system.md)).

Its built files are committed, so that a pinned commit is exactly what an app gets, with nothing built on install. An app takes it by its public git URL, over HTTPS, with no key.

## Outcomes

- **PhotoMatch's styles come from the tokens:** no colour, text size, space or corner of its own outside them.
- **PhotoMatch's controls are the design system's,** in Graphite, dark and light, and its self-check passes on them.
- **One icon set:** every icon PhotoMatch shows comes from it.
- **A change lands once:** one change here reaches each app that moves its pin.
- **Accessible:** every control works with the keys alone and names itself to a screen reader, and its text meets 4.5:1 contrast, as Apple's guidelines ask.
- **Open and credited:** licensed MIT OR Apache-2.0, and every dependency's and icon's licence allows it and is credited ([0003](decisions/0003-open-from-the-start-under-mit-or-apache-2-0.md)).

## Scope

**Version 1,** the owner's pick of 2026-11-27, "Tokens, icons, all controls":
- Graphite's tokens, dark and light, and the script that makes them CSS;
- the icons PhotoMatch uses;
- every control family PhotoMatch uses;
- the site to browse it;
- PhotoMatch on it: its plan steps 2.86 to 2.88.

**Next:**
- **PhotoDev moved to it,** its copied panels and fields replaced, in Graphite.
- **PhotoBook moved to it,** with a palette of its own, its warm, paper-like light, over the shared controls: the owner's pick of 2026-11-27, "Shared controls, own palette".

**Later, as ideas:**
- **Published on npm,** if others come to use it.
- **The tokens read by design tools,** as the W3C format means them to be.

## Non-goals

- **What makes each app itself:** PhotoMatch's grid of photos, Compare and photo view, PhotoDev's editing panels, PhotoBook's page editor. They stay in their apps, built from the design system's parts.
- **The menu bar and the right-click menus,** which stay the system's own in each app (PhotoMatch's record 0070).
- **Photo reading and the apps' cores,** which are `rust-photo-library`'s.
- **A design system for the world,** for now: it serves the three apps first. Being open doesn't change that.

## Constraints

- **Resources are stated, not assumed.** Each step says what it needs: memory, disk, time and money. Each measurement names the machine it ran on.
- **The machines:** the apps run on Windows and macOS, the owner's PC and Macs and their users'. The owner's planning Mac, an Apple M3 with 8 GB and 27 GB free on 2026-11-27, builds and checks the design system, but bounds nothing in it.
- **The apps' stack, as it is:** React 19.3, TypeScript 6.0 and Vite 8.3, at the versions the apps pin; a change of version moves here and in the apps together.
- **Money:** nothing is spent without a record. An app's CI build costs money past GitHub's allowance, and runs only at the owner's word.
- **Licences:** every dependency, icon and font allows use in a closed, paid app and publishing under MIT or Apache 2.0, and nothing from GPL or AGPL code comes in (PhotoMatch's record 0054).
- **Public:** no secret, private path, or detail of the owner's private projects beyond what the documentation needs.
- **Nothing large in git.** The built files are small text, and kept.
- **English** everywhere: code, notes and records.
