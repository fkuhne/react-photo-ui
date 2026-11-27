# AGENTS.md

Instructions for coding agents working in this repository. Keep this file short: detail belongs in `spec/` and `docs/`, read when a step needs it.

## What this is

react-photo-ui is the design system the owner's photo apps share, the package `photo-ui`: PhotoMatch first, then PhotoDev and PhotoBook. It holds their look's values as design tokens in the [W3C Design Tokens format](https://www.designtokens.org/), their icons, from [Lucide](https://lucide.dev), and their controls, in React, built on [React Aria Components](https://react-aria.adobe.com/). Each app takes it at a pinned commit ([0002](spec/decisions/0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md)). It's public, under MIT OR Apache-2.0 ([0003](spec/decisions/0003-open-from-the-start-under-mit-or-apache-2-0.md)).

Two kinds of reader:
- **The owner** builds the apps, and is the person you work with.
- **The apps' users** are photographers, who see these controls; and visitors to the owner's GitHub read this repository. Write the code and the notes for both: clear, and with no private detail.

What the project covers is in [`spec/product.md`](spec/product.md). What we know about the platforms' guidelines, the libraries and the icons, with sources, is in [`docs/foundations.md`](docs/foundations.md).

## Read before acting

1. [`spec/product.md`](spec/product.md): what we do and what we don't. It's the source of truth for scope.
2. [`spec/requirements.md`](spec/requirements.md): each requirement, how it's met and how it's verified.
3. [`spec/plan.md`](spec/plan.md): the steps, in order. The next step is the first unticked one.
4. [`spec/decisions/README.md`](spec/decisions/README.md): the decision records that touch the step.
5. [`docs/foundations.md`](docs/foundations.md) and [`docs/package.md`](docs/package.md): the notes, for the sections the step relies on.

## How we work

- **One plan step at a time.** Before a step with design choices, lay out the options, the evidence and a recommendation, and let the owner pick. Don't decide a whole step alone.
- **Show evidence the owner can see:** real output and real numbers, such as scores, time, peak memory and disk use. Not just "it ran".
- **Write down what a step measures,** in `docs/`, with its command, its settings and the machine it ran on.
- **Check the documentation before recommending.** Before any recommendation, read the documentation and the guidelines of the developers and the community for each technology involved, such as a language's API guidelines or a tool's reference, and cite what was read. Memory alone isn't enough; what couldn't be checked is marked unchecked. A strong rule of the owner's, for every project.
- **Source every claim in the notes:** a paper's section or table, a model card, a config, the code, a vendor page, or our own run. A number worked out but not yet run is marked "computed". A claim from memory is marked "unchecked".
- **A record for every decision**, from [`spec/decisions/decision-template.md`](spec/decisions/decision-template.md), committed on its own or with the change it justifies.
  - Proposed becomes Accepted in the commit that implements it.
  - A reversed decision gets a new record, and the old one is marked superseded.
- **Guesses go under "Assumptions to verify"**, ticked with evidence once checked.
- **Small commits.** Each one is a coherent increment, and none references files that only arrive later. Tick the plan step in the commit that finishes it.
- **A change of scope starts in `spec/product.md`.** When the work departs from the plan, update the plan in the same change.
- **After a step,** explain what was built or learned and why, with links to the lines, before moving on.
- **A change here is a change in every app that moves its pin,** so a change of how a control looks or behaves is a step of its own, checked in PhotoMatch before its pin moves.
- **Skills** run these routines:
  - [`next-step`](.agents/skills/next-step/SKILL.md) prepares the plan's next step;
  - [`decide`](.agents/skills/decide/SKILL.md) writes a record.

  They live in `.agents/skills/`; `.claude/skills/` points Claude Code to them.

## Commands

It needs Node 22. How the package is built and why: [`docs/package.md`](docs/package.md).

```sh
npm install         # once, and after a dependency changes
npm run dev         # the gallery page, at http://localhost:5180
npm run check       # type-check the package and the gallery
npm run make        # build dist/, committed with every change to src/
```

Never add a script named `build`, `prepare`, `prepack`, `preinstall`, `install` or `postinstall`: npm would run it in each app's install of this git dependency ([0002](spec/decisions/0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md)).

## Conventions

- **English everywhere:** code, notes, records.
- **Resources are stated, not assumed.** Each step says what it needs: memory, disk, time and money. Each measurement names the machine it ran on.
- **Pin dependencies to exact versions,** with a lockfile; React, TypeScript and Vite at the apps' own versions.
- **Nothing large in git.** The built files in `dist/` are kept, and are small text ([0002](spec/decisions/0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md)).
- **No money is spent without a record:** hardware, rented compute and paid APIs.
- **Public:** no secret, private path, or detail of the owner's private projects beyond what the documentation needs. Every dependency, icon and font allows MIT or Apache 2.0 publishing and closed use, and is credited; nothing from GPL or AGPL code ([0003](spec/decisions/0003-open-from-the-start-under-mit-or-apache-2-0.md)).
- **Controls on React Aria Components,** styled by our tokens only ([0004](spec/decisions/0004-the-controls-built-on-react-aria-components.md)).
- **Icons from Lucide alone,** copied as SVG files, the ones used ([0005](spec/decisions/0005-lucide-s-icons-those-used-copied-as-svg-files.md)).
- **Values only through the tokens:** no colour, text size, space or corner written in a control's styles; the tokens' CSS made only by our script ([0006](spec/decisions/0006-tokens-in-the-w3c-format-made-into-css-variables-by-a-script-of-our-own.md)).
- **No app's own look in the shared controls:** an app's palette is a theme over them ([0007](spec/decisions/0007-shared-controls-each-app-its-own-palette.md)).
