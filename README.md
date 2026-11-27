# react-photo-ui

The design system of three desktop apps for photographers, PhotoMatch, PhotoDev and PhotoBook, built with Tauri 2 and React. It holds what they share in their interface:

- **design tokens:** colour, type, spacing, corners and depth, in the [W3C Design Tokens format](https://www.designtokens.org/), made into CSS variables, dark and light;
- **icons,** from [Lucide](https://lucide.dev);
- **controls,** in React and TypeScript, on [React Aria Components](https://react-aria.adobe.com/): accessible, and with the keys a desktop app has.

Its first look, Graphite, is dense and quiet, in the line of the photo apps professionals use, so that the photos come first. Each app may set its own palette over the same controls.

**Status:** the package, its gallery page and its tokens are built, Graphite dark and light, every pair of text and background checked at 4.5:1 contrast or more (plan steps 1.1 and 1.2); the icons and the controls come next. Its companion for the apps' cores is [`rust-photo-library`](https://github.com/fkuhne/rust-photo-library).

## Where to start

- [`spec/product.md`](spec/product.md): what this project covers and what it doesn't.
- [`docs/foundations.md`](docs/foundations.md): what it rests on, each claim with its source: the platforms' guidelines, and the libraries, icon sets and token tools compared and measured.
- [`docs/package.md`](docs/package.md): how the package is built and taken, and what each step measured.
- [`spec/plan.md`](spec/plan.md): the steps, in order. The next one is the first unticked.
- [`spec/decisions/`](spec/decisions/README.md): why each choice was made.

## How it's worked on

From a spec, one plan step at a time, with a record for each decision, the same way as the owner's other projects. [`AGENTS.md`](AGENTS.md) gives the method to coding agents.

## License

Licensed under either of

- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or <https://www.apache.org/licenses/LICENSE-2.0>)
- MIT license ([LICENSE-MIT](LICENSE-MIT) or <https://opensource.org/licenses/MIT>)

at your option.

Lucide's icons, when they arrive, keep their own ISC licence, beside them.

## Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
