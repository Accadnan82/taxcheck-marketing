// TaxCheck - add the Refunds link to the footer, next to Terms. ASCII-only.
import fs from "node:fs";
import path from "node:path";

const L = { en: "Refunds", ar: "\u0627\u0644\u0627\u0633\u062a\u0631\u062f\u0627\u062f" };

const isSite = (d) => {
  for (const b of [d, path.join(d, "taxcheck-site")]) if (fs.existsSync(path.join(b, "content", "content.json"))) return b;
  return null;
};
const here = process.cwd();
const cands = [here];
for (const dir of [path.dirname(here), here]) {
  try { for (const e of fs.readdirSync(dir, { withFileTypes: true }))
    if (e.isDirectory() && !/^(node_modules|\.git|dist)$/.test(e.name)) cands.push(path.join(dir, e.name)); } catch {}
}
let site = null; for (const c of cands) { site = isSite(c); if (site) break; }
if (!site) { console.error("STOP: site not found"); process.exit(1); }

const p = path.join(site, "content", "content.json");
const raw = fs.readFileSync(p, "utf8");
const c = JSON.parse(raw);
let edits = 0;

for (const lng of ["en", "ar"]) {
  const cols = c[lng] && c[lng].footerCols;
  if (!Array.isArray(cols)) { console.error("STOP: " + lng + ".footerCols is not an array"); process.exit(1); }

  // find the column and the item that points at the terms page, whatever the key names are
  let done = false;
  for (const col of cols) {
    const items = Array.isArray(col) ? col : (col.items || col.links || col.rows);
    if (!Array.isArray(items)) continue;
    const idx = items.findIndex((it) => typeof it === "object" && Object.values(it).some((v) => v === "terms" || v === "/terms"));
    if (idx < 0) continue;
    if (items.some((it) => typeof it === "object" && Object.values(it).some((v) => v === "refund" || v === "/refund"))) {
      console.log("OK      " + lng + " footer (already)"); done = true; break;
    }
    const src = items[idx];
    const next = {};
    for (const [k, v] of Object.entries(src)) next[k] = (v === "terms" || v === "/terms") ? v.replace("terms", "refund") : L[lng];
    items.splice(idx + 1, 0, next);
    edits++; done = true;
    console.log("ADDED   " + lng + " footer link -> " + JSON.stringify(next));
    break;
  }
  if (!done) {
    console.error("STOP: could not find a footer item pointing at 'terms' in " + lng + ". Footer is:");
    console.error(JSON.stringify(cols, null, 1).slice(0, 1200));
    process.exit(1);
  }
}

if (edits) {
  let out = JSON.stringify(c, null, 1) + (raw.replace(/\r/g, "").endsWith("\n") ? "\n" : "");
  if (raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
  fs.writeFileSync(p, out, "utf8");
  console.log("\nPATCHED content/content.json (" + edits + ")");
} else console.log("\nOK      nothing to change");
console.log("DONE");
