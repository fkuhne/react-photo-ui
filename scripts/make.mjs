// Builds the package into `dist/`, which is committed so that an app's pinned commit is exactly what
// it gets (record 0002): the TypeScript in `src/` compiled to JavaScript and type files, and each
// stylesheet copied. Then says each built file's size. Named `make`, not `build`: npm builds a git
// dependency on install when it defines `build`, `prepare` or another install script (npm's
// `package.json` docs, npm 11), and nothing of ours is to run in an app's install.
//
// npm run make
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const dist = join(root, "dist");

/** Every file under `folder`, as paths. */
function files(folder) {
  return readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const path = join(folder, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

function fail(message) {
  console.error(`make: ${message}`);
  process.exit(1);
}

// The version the code says is the package's.
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
const index = readFileSync(join(src, "index.ts"), "utf8");
if (!index.includes(`PHOTO_UI_VERSION = "${version}"`)) fail(`src/index.ts's PHOTO_UI_VERSION isn't package.json's ${version}`);

rmSync(dist, { recursive: true, force: true });
const tsc = spawnSync(process.execPath, [join(root, "node_modules", "typescript", "bin", "tsc"), "-p", join(root, "tsconfig.build.json")], { stdio: "inherit" });
if (tsc.status !== 0) fail("TypeScript's build failed");

for (const file of files(src).filter((f) => f.endsWith(".css"))) {
  const to = join(dist, relative(src, file));
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(file, to);
}

let total = 0;
let zipped = 0;
for (const file of files(dist).sort()) {
  const bytes = readFileSync(file);
  const gz = gzipSync(bytes, { level: 9 }).length;
  total += statSync(file).size;
  zipped += gz;
  console.log(`${relative(root, file).padEnd(40)} ${String(bytes.length).padStart(8)} bytes, ${String(gz).padStart(7)} gzipped`);
}
console.log(`${"dist/".padEnd(40)} ${String(total).padStart(8)} bytes, ${String(zipped).padStart(7)} gzipped, photo-ui ${version}`);
