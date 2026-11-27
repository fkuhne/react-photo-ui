// The token script's rules, on small token files written for each test: `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build, checkContrast, contrast, css, stylesheet, TokenError } from "./tokens.mjs";

const srgb = (hex, alpha) => ({ colorSpace: "srgb", components: [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255), ...(alpha === undefined ? {} : { alpha }), hex });

/** A resolver over a base file and two themes, in a new folder; returns its path. */
function tokens({ base, dark, light }) {
  const folder = mkdtempSync(join(tmpdir(), "photo-ui-tokens-"));
  writeFileSync(join(folder, "base.tokens.json"), JSON.stringify(base));
  writeFileSync(join(folder, "dark.tokens.json"), JSON.stringify(dark));
  writeFileSync(join(folder, "light.tokens.json"), JSON.stringify(light));
  const resolver = {
    name: "test",
    version: "2025.10",
    sets: { base: { sources: [{ $ref: "base.tokens.json" }] } },
    modifiers: { theme: { default: "dark", contexts: { dark: [{ $ref: "dark.tokens.json" }], light: [{ $ref: "light.tokens.json" }] } } },
    resolutionOrder: [{ $ref: "#/sets/base" }, { $ref: "#/modifiers/theme" }],
    $extensions: { "org.photo-ui": { prefix: "t", css: { dark: { selector: ":root", scheme: "dark" }, light: { selector: '[data-theme="light"]', scheme: "light", system: true } } } },
  };
  writeFileSync(join(folder, "test.resolver.json"), JSON.stringify(resolver));
  return join(folder, "test.resolver.json");
}

const palette = { palette: { $type: "color", ink: { $value: srgb("#111111") }, paper: { $value: srgb("#eeeeee") }, mid: { $value: srgb("#888888") } } };
const theme = (text, ground) => ({ color: { $type: "color", ground: { $value: `{palette.${ground}}` }, text: { $value: `{palette.${text}}`, $extensions: { "org.photo-ui": { contrastOn: ["color.ground"], least: 4.5 } } } } });

test("a theme's aliases resolve through the palette, and its type comes from its group", () => {
  const { themes } = build(tokens({ base: palette, dark: theme("paper", "ink"), light: theme("ink", "paper") }));
  assert.equal(css("color", themes.dark.get("color.text").value, "x"), "#eeeeee");
  assert.equal(themes.light.get("color.ground").type, "color");
});

test("the CSS has the shared tokens under :root, each theme under its selector, and the system's under its media query", () => {
  const base = { ...palette, space: { $type: "dimension", "4": { $value: { value: 4, unit: "px" } } }, font: { size: { $type: "dimension", $extensions: { "org.photo-ui": { scaled: true } }, text: { $value: { value: 12, unit: "px" } } } } };
  const sheet = stylesheet(build(tokens({ base, dark: theme("paper", "ink"), light: theme("ink", "paper") })));
  assert.match(sheet, /:root \{\n {2}--t-text-scale: 1;\n {2}--t-space-4: 4px;\n {2}--t-font-size-text: calc\(12px \* var\(--t-text-scale, 1\)\);/);
  assert.match(sheet, /\[data-theme="light"\] \{\n {2}color-scheme: light;\n {2}--t-color-ground: #eeeeee;/);
  assert.match(sheet, /@media \(prefers-color-scheme: light\) \{\n {2}:root:not\(\[data-theme\]\), \[data-theme="system"\] \{/);
  assert.doesNotMatch(sheet, /--t-palette/, "the palette isn't for the controls to name");
});

test("contrast is WCAG 2's, and a pair under its least fails", () => {
  assert.equal(Math.round(contrast({ r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 255 }) * 100) / 100, 21);
  const { themes } = build(tokens({ base: palette, dark: theme("mid", "ink"), light: theme("mid", "paper") }));
  const [dark] = checkContrast(themes.dark);
  const [light] = checkContrast(themes.light);
  assert.equal(dark.ok, true, `#888 on #111: ${dark.ratio}`);
  assert.equal(light.ok, false, `#888 on #eee: ${light.ratio}`);
});

test("a reference to a group, or to no token, or round in a circle, is refused by name", () => {
  const toGroup = { color: { $type: "color", text: { $value: "{palette}" } } };
  assert.throws(() => build(tokens({ base: palette, dark: toGroup, light: toGroup })), (e) => e instanceof TokenError && /\{palette\} is no token, but a group/.test(e.message));
  const circle = { color: { $type: "color", a: { $value: "{color.b}" }, b: { $value: "{color.a}" } } };
  assert.throws(() => build(tokens({ base: palette, dark: circle, light: circle })), (e) => e instanceof TokenError && /circular/.test(e.message));
});

test("a translucent colour is rgb() with its alpha, a shadow its four lengths and its colour", () => {
  assert.equal(css("color", srgb("#d8963f", 0.18), "x"), "rgb(216 150 63 / 0.18)");
  const px = (value) => ({ value, unit: "px" });
  assert.equal(css("shadow", { color: srgb("#000000", 0.5), offsetX: px(0), offsetY: px(8), blur: px(24), spread: px(0) }, "x"), "0px 8px 24px 0px rgb(0 0 0 / 0.5)");
  assert.throws(() => css("dimension", { value: 1, unit: "em" }, "x"), TokenError);
});
