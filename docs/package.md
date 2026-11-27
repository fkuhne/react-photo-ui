# The package

How `photo-ui` is laid out, built and taken, and what each step measured, with the command, the settings and the machine.

## Layout

- **`src/`:** the package's source, TypeScript and CSS. `src/index.ts` is what an app imports.
- **`dist/`:** the built package, committed ([0002](../spec/decisions/0002-one-package-of-tokens-icons-and-controls-in-its-own-repository-pinned-by-each-app.md)): JavaScript, type files and the stylesheets. Rebuilt by `npm run make` in every commit that changes `src/`.
- **`gallery/`:** the gallery page, run by `npm run dev` from the source, never shipped.
- **`scripts/make.mjs`:** the build. It checks `src/index.ts`'s version is `package.json`'s, compiles `src/` with `tsconfig.build.json`, copies the stylesheets, and prints each built file's size.

## Choices the build makes

- **No script an install would run.** npm's `package.json` docs (npm 11, read on 2026-11-27) say a git dependency is built on install when it defines `build`, `prepare`, `prepack`, `preinstall`, `install` or `postinstall`. So the build is `make`, and the scripts are `dev`, `make` and `check` alone.
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

## Commands

```sh
npm install         # once, and after a dependency changes
npm run dev         # the gallery page, at http://localhost:5180
npm run check       # type-check the package and the gallery
npm run make        # build dist/, to commit with the change
```
