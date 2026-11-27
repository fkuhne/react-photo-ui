// The icon script's rules: `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { IconError, iconModule, parse, readIcons } from "./icons.mjs";

const lucide = join(dirname(fileURLToPath(import.meta.url)), "..", "icons", "lucide");
const svg = (inner, root = 'xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"') => `<svg ${root}>${inner}</svg>`;

test("Lucide's files read as their shapes, the tag's dot filled in the text's colour", () => {
  const flag = parse(readFileSync(join(lucide, "flag.svg"), "utf8"), "flag.svg");
  assert.equal(flag.length, 1);
  assert.equal(flag[0][0], "path");
  const tag = parse(readFileSync(join(lucide, "tag.svg"), "utf8"), "tag.svg");
  assert.deepEqual(tag.at(-1), ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor" }]);
  assert.equal(Object.keys(readIcons(lucide)).length, 39);
});

test("lines keep their x1, y1, x2 and y2", () => {
  assert.deepEqual(parse(svg('<line x1="22" x2="18" y1="12" y2="12" />')), [["line", { x1: "22", x2: "18", y1: "12", y2: "12" }]]);
});

test("anything but a shape and its geometry is refused by name", () => {
  const refused = (inner, why) => assert.throws(() => parse(svg(inner), "t.svg"), (e) => e instanceof IconError && why.test(e.message));
  refused('<script>alert(1)</script>', /something besides shapes/);
  refused('<image href="x.png" />', /<image> isn't a shape/);
  refused('<path d="M0 0" style="fill:red" />', /style isn't kept/);
  refused('<path d="M0 0" onclick="x()" />', /onclick isn't kept/);
  refused('<circle cx="1" cy="1" r="1" fill="red" />', /a fill other than the text's colour/);
  assert.throws(() => parse(svg('<path d="M0 0" />', 'viewBox="0 0 16 16"'), "t.svg"), /viewBox isn't "0 0 24 24"/);
});

test("the module names every icon and its version", () => {
  const text = iconModule({ flag: [["path", { d: "M4 22V4" }]] }, "9.9.9");
  assert.match(text, /export const LUCIDE_VERSION = "9\.9\.9";/);
  assert.match(text, /"flag": \[\["path",\{"d":"M4 22V4"\}\]\],/);
});
