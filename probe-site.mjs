// TaxCheck - find the marketing site and report how it registers pages.
// Run from ANY Taxcheck folder:   node probe-site.mjs
import fs from "node:fs";
import path from "node:path";

const isSite = (d) => {
  for (const base of [d, path.join(d, "taxcheck-site")]) {
    if (fs.existsSync(path.join(base, "content", "content.json"))) return base;
  }
  return null;
};

// look here, then in every sibling folder, then in every child folder
const here = process.cwd();
const candidates = [here];
for (const dir of [path.dirname(here), here]) {
  try {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory() && !/^(node_modules|\.git|dist)$/.test(e.name)) candidates.push(path.join(dir, e.name));
    }
  } catch { /* ignore */ }
}

let site = null;
for (const c of candidates) { site = isSite(c); if (site) break; }
if (!site) {
  console.error("STOP: could not find a folder containing content/content.json.");
  console.error("Looked in:\n  " + [...new Set(candidates)].join("\n  "));
  console.error("\nOpen the taxcheck-marketing folder and run it there.");
  process.exit(1);
}

const out = [];
const say = (s) => { out.push(s); console.log(s); };
say("SITE FOUND: " + site + "\n");

say("=== files ===");
for (const d of ["", "render", "lib", "content", "public", "static", "assets"]) {
  const p = path.join(site, d);
  if (!fs.existsSync(p)) continue;
  const names = fs.readdirSync(p, { withFileTypes: true })
    .map((e) => e.name + (e.isDirectory() ? "/" : ""))
    .filter((n) => !/^node_modules|^\.git|^dist/.test(n));
  say((d || ".") + ": " + names.join(", "));
}

const c = JSON.parse(fs.readFileSync(path.join(site, "content", "content.json"), "utf8"));
say("\n=== content.json ===");
say("top-level: " + Object.keys(c).join(", "));
for (const lng of Object.keys(c)) {
  if (!c[lng] || typeof c[lng] !== "object") continue;
  say(lng + " keys: " + Object.keys(c[lng]).join(", "));
  if (c[lng].pages) say(lng + ".pages: " + Object.keys(c[lng].pages).join(", "));
}
const sample = c.en && c.en.pages && Object.entries(c.en.pages)[0];
if (sample) {
  say("\n=== shape of page '" + sample[0] + "' ===");
  say(JSON.stringify(sample[1], null, 1).split("\n").slice(0, 50).join("\n"));
}

for (const f of ["build.mjs", path.join("render", "generic.mjs"), path.join("lib", "layout.mjs")]) {
  const p = path.join(site, f);
  if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, "utf8");
  say("\n=== " + f.replace(/\\/g, "/") + " : relevant lines ===");
  s.split(/\r?\n/).forEach((l, i) => {
    if (/route|ROUTES|pages|dictKey|generic|renderGeneric|writeFile|mkdir|index\.html|footer|nav/i.test(l)) {
      say(String(i + 1).padStart(4) + " | " + l.trim().slice(0, 160));
    }
  });
}

fs.writeFileSync(path.join(here, "probe-site.txt"), out.join("\n"), "utf8");
console.log("\nSaved to probe-site.txt in " + here);
