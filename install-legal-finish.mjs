// TaxCheck - finish the legal pages: treat /refund as legal, link it, publish the entity line.
import fs from "node:fs";
import path from "node:path";
const L = { en: "Refunds", ar: "\u0627\u0644\u0627\u0633\u062a\u0631\u062f\u0627\u062f" };
const ENT = { en: "TaxCheck is operated by Finsuite technologies, a sole establishment licensed in Dubai under professional licence 1653679 issued by the Department of Economy and Tourism.", ar: "\u064a\u064f\u0634\u063a\u0651\u0644 TaxCheck \u0645\u0624\u0633\u0633\u0629 \u0641\u064a\u0646 \u0633\u0648\u064a\u062a \u0644\u0644\u062a\u0643\u0646\u0648\u0644\u0648\u062c\u064a\u0627\u060c \u0645\u0624\u0633\u0633\u0629 \u0641\u0631\u062f\u064a\u0629 \u0645\u0631\u062e\u0651\u0635\u0629 \u0641\u064a \u062f\u0628\u064a \u0628\u0645\u0648\u062c\u0628 \u0627\u0644\u0631\u062e\u0635\u0629 \u0627\u0644\u0645\u0647\u0646\u064a\u0629 \u0631\u0642\u0645 1653679 \u0627\u0644\u0635\u0627\u062f\u0631\u0629 \u0639\u0646 \u062f\u0627\u0626\u0631\u0629 \u0627\u0644\u0627\u0642\u062a\u0635\u0627\u062f \u0648\u0627\u0644\u0633\u064a\u0627\u062d\u0629." };

const isSite = (d) => { for (const b of [d, path.join(d, "taxcheck-site")]) if (fs.existsSync(path.join(b, "content", "content.json"))) return b; return null; };
const here = process.cwd(); const cands = [here];
for (const dir of [path.dirname(here), here]) { try { for (const e of fs.readdirSync(dir, { withFileTypes: true }))
  if (e.isDirectory() && !/^(node_modules|\.git|dist)$/.test(e.name)) cands.push(path.join(dir, e.name)); } catch {} }
let site = null; for (const c of cands) { site = isSite(c); if (site) break; }
if (!site) { console.error("STOP: site not found"); process.exit(1); }

// 1 --- /refund must be treated as a legal page (no Start Free CTA, no demo band)
const gp = path.join(site, "render", "generic.mjs");
if (fs.existsSync(gp)) {
  let s = fs.readFileSync(gp, "utf8");
  const m = /const legal\s*=\s*\[([^\]]*)\]/.exec(s);
  if (!m) console.error("WARN: could not find the `legal` list in render/generic.mjs - skipping");
  else if (/['"`]refund['"`]/.test(m[1])) console.log("OK      generic.mjs legal list (already)");
  else {
    s = s.slice(0, m.index) + "const legal = [" + m[1].replace(/\s*$/, "") + ", 'refund']" + s.slice(m.index + m[0].length);
    fs.writeFileSync(gp, s, "utf8");
    console.log("PATCHED render/generic.mjs - /refund is now a legal page");
  }
}

// 2 --- content.json: footer link + the entity line
const cp = path.join(site, "content", "content.json");
const raw = fs.readFileSync(cp, "utf8");
const c = JSON.parse(raw);
let edits = 0;
for (const lng of ["en", "ar"]) {
  const cols = c[lng] && c[lng].footerCols;
  if (Array.isArray(cols)) {
    let hit = false;
    for (const col of cols) {
      const items = Array.isArray(col) ? col : (col.items || col.links || col.rows);
      if (!Array.isArray(items)) continue;
      const i = items.findIndex((it) => it && typeof it === "object" && Object.values(it).some((v) => v === "terms" || v === "/terms"));
      if (i < 0) continue;
      hit = true;
      if (items.some((it) => it && typeof it === "object" && Object.values(it).some((v) => v === "refund" || v === "/refund"))) { console.log("OK      " + lng + " footer (already)"); break; }
      const src = items[i]; const next = {};
      for (const [k, v] of Object.entries(src)) next[k] = (v === "terms" || v === "/terms") ? String(v).replace("terms", "refund") : L[lng];
      items.splice(i + 1, 0, next); edits++;
      console.log("ADDED   " + lng + " footer link " + JSON.stringify(next));
      break;
    }
    if (!hit) console.error("WARN: no footer item pointing at 'terms' in " + lng);
  }
  if (c[lng] && c[lng].legalEntity !== ENT[lng]) { c[lng].legalEntity = ENT[lng]; edits++; console.log("SET     " + lng + ".legalEntity"); }
}
if (edits) {
  let out = JSON.stringify(c, null, 1) + (raw.replace(/\r/g, "").endsWith("\n") ? "\n" : "");
  if (raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
  fs.writeFileSync(cp, out, "utf8");
  console.log("PATCHED content/content.json (" + edits + ")");
} else console.log("OK      content.json (already)");

// 3 --- render the entity line under the existing legal disclaimer in the footer
const lp = path.join(site, "lib", "layout.mjs");
if (fs.existsSync(lp)) {
  let s = fs.readFileSync(lp, "utf8");
  if (s.includes("legalEntity")) console.log("OK      layout.mjs footer (already)");
  else {
    const m = /<p class="legal">[\s\S]{0,240}?<\/p>/.exec(s);
    if (!m) console.error("WARN: could not find the footer legal paragraph in lib/layout.mjs - add it by hand");
    else {
      const add = m[0] + "\n    ${t.legalEntity ? `<p class=\"legal\">${esc(t.legalEntity)}</p>` : ''}";
      s = s.slice(0, m.index) + add + s.slice(m.index + m[0].length);
      fs.writeFileSync(lp, s, "utf8");
      console.log("PATCHED lib/layout.mjs - entity line in the footer");
    }
  }
}
console.log("\nDONE");
