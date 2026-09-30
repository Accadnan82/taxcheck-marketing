import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = fs.existsSync(path.join(root, "taxcheck-site")) ? path.join(root, "taxcheck-site") : root;
const F = {
  build: path.join(site, "build.mjs"),
  layout: path.join(site, "lib", "layout.mjs"),
  content: path.join(site, "content", "content.json"),
};
for (const [k, p] of Object.entries(F)) if (!fs.existsSync(p)) { console.error("STOP: missing " + k + " at " + p); process.exit(1); }

const changed = [];
function patch(file, from, to, label) {
  let s = fs.readFileSync(file, "utf8");
  const crlf = s.includes("\r\n");
  if (crlf) { from = from.replace(/\n/g, "\r\n"); to = to.replace(/\n/g, "\r\n"); }
  if (s.includes(to)) { console.log("OK      " + label + " (already)"); return; }
  const n = s.split(from).length - 1;
  if (n !== 1) { console.error("STOP: " + label + " - expected 1 match, found " + n); process.exit(1); }
  fs.writeFileSync(file, s.replace(from, to), "utf8");
  changed.push(file); console.log("PATCHED " + label);
}

patch(F.layout,
  "export function shell({ lang, route, t, title, description, body, jsonLd }) {",
  "export function shell({ lang, route, t, title, description, body, jsonLd, titleFull = false }) {",
  "layout.mjs shell() signature");
patch(F.layout,
  "  const fullTitle = route === 'home' ? `${t.brand} ${t.brandSuffix} \u2014 ${title}` : `${title} \u2014 ${t.brand}`;",
  "  const fullTitle = titleFull ? title : (route === 'home' ? `${t.brand} ${t.brandSuffix} \u2014 ${title}` : `${title} \u2014 ${t.brand}`);",
  "layout.mjs fullTitle");

patch(F.build,
  "function meta(t, route) {\n  if (route === 'home') return { title: t.home.heroL1 + ' ' + t.home.heroL2, description: t.home.heroSub };\n  const d = t[dictKey[route] || route] || t.pages[route];\n  return { title: d.title, description: d.sub || t.notFTA };\n}",
  "function meta(t, route) {\n  // SEO: a page dictionary may carry seoTitle (search phrase first, brand appended here)\n  // and seoDesc. Without them the visible H1 / lede are used as before.\n  const d = route === 'home' ? t.home : (t[dictKey[route] || route] || t.pages[route]);\n  if (d.seoTitle) return { title: `${d.seoTitle} | ${t.brand}`, titleFull: true, description: d.seoDesc || d.metaDesc || d.sub || t.notFTA };\n  if (route === 'home') return { title: t.home.heroL1 + ' ' + t.home.heroL2, description: t.home.heroSub };\n  return { title: d.title, description: d.sub || t.notFTA };\n}",
  "build.mjs meta()");
patch(F.build,
  "    const { title, description } = meta(t, route);",
  "    const { title, description, titleFull } = meta(t, route);",
  "build.mjs meta destructure");
patch(F.build,
  "    const html = shell({ lang, route, t, title, description, body, jsonLd });",
  "    const html = shell({ lang, route, t, title, description, body, jsonLd, titleFull });",
  "build.mjs shell call");

const SEO = {
  en: {
    home: { seoTitle: "UAE Corporate Tax & VAT return software \u2014 catch errors before you file",
            seoDesc: "Prepares and checks UAE Corporate Tax and VAT 201 returns, shows the document behind every number and flags what doesn\u2019t reconcile. Arabic and English." },
    vat:  { seoTitle: "UAE VAT return (VAT 201) checker \u2014 every box verified before filing",
            seoDesc: "Check your UAE VAT 201 return before filing: outputs by emirate, reverse charge, adjustments and input tax in the right boxes, every number traced to its invoice.",
            title: "Your VAT 201 return, box by box, emirate by emirate" },
    ct:   { seoTitle: "UAE Corporate Tax return software \u2014 from trial balance to filed return",
            seoDesc: "From trial balance to a checked UAE Corporate Tax return: adjustments, elections, 0%/9% computation and disclosures, each cited to Decree-Law 47/2022.",
            title: "The whole Corporate Tax return, structured and checked" },
    calc: { seoTitle: "UAE Corporate Tax & VAT late filing penalty calculator 2026",
            seoDesc: "Free UAE tax penalty calculator: Corporate Tax and VAT late filing, late payment and late registration under the 2026 rules, with the law behind every figure." },
    acc:  { seoTitle: "Tax software for UAE accounting firms and tax agents",
            seoDesc: "Multi-client tax software for UAE accounting firms: every taxpayer, period, deadline and reviewer on one board, VAT 201 and Corporate Tax returns checked and cited." },
  },
  ar: {
    home: { seoTitle: "\u0628\u0631\u0646\u0627\u0645\u062c \u0625\u0642\u0631\u0627\u0631\u0627\u062a \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0648\u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u2014 \u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u062e\u0637\u0623 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645",
            seoDesc: "\u064a\u0639\u062f\u0651 \u0625\u0642\u0631\u0627\u0631\u0627\u062a \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0648\u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 (201) \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0645\u0646 \u0645\u0633\u062a\u0646\u062f\u0627\u062a\u0643\u060c \u0648\u064a\u0631\u064a\u0643 \u0627\u0644\u0645\u0633\u062a\u0646\u062f \u0648\u0631\u0627\u0621 \u0643\u0644 \u0631\u0642\u0645\u060c \u0648\u064a\u0634\u064a\u0631 \u0625\u0644\u0649 \u0645\u0627 \u0644\u0627 \u064a\u062a\u0637\u0627\u0628\u0642 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645. \u0628\u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0648\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629." },
    vat:  { seoTitle: "\u0645\u0631\u0627\u062c\u0639\u0629 \u0625\u0642\u0631\u0627\u0631 \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 (VAT 201) \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645",
            seoDesc: "\u0623\u0639\u062f\u0651 \u0625\u0642\u0631\u0627\u0631 \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 201 \u0648\u0631\u0627\u062c\u0639\u0647 \u0642\u0628\u0644 \u0627\u0644\u062a\u0642\u062f\u064a\u0645: \u0627\u0644\u0645\u062e\u0631\u062c\u0627\u062a \u062d\u0633\u0628 \u0627\u0644\u0625\u0645\u0627\u0631\u0629 \u0648\u0627\u0644\u0627\u062d\u062a\u0633\u0627\u0628 \u0627\u0644\u0639\u0643\u0633\u064a \u0648\u0627\u0644\u062a\u0639\u062f\u064a\u0644\u0627\u062a \u0648\u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0645\u062f\u062e\u0644\u0627\u062a \u0641\u064a \u062e\u0627\u0646\u0627\u062a\u0647\u0627\u060c \u0648\u0643\u0644 \u0631\u0642\u0645 \u0645\u0631\u0628\u0648\u0637 \u0628\u0641\u0627\u062a\u0648\u0631\u062a\u0647.",
            title: "\u0625\u0642\u0631\u0627\u0631 \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 201\u060c \u062e\u0627\u0646\u0629 \u0628\u062e\u0627\u0646\u0629 \u0648\u0625\u0645\u0627\u0631\u0629 \u0628\u0625\u0645\u0627\u0631\u0629" },
    ct:   { seoTitle: "\u0628\u0631\u0646\u0627\u0645\u062c \u0625\u0642\u0631\u0627\u0631 \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u2014 \u0645\u0646 \u0645\u064a\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u0625\u0644\u0649 \u0627\u0644\u0625\u0642\u0631\u0627\u0631",
            seoDesc: "\u0645\u0646 \u0645\u064a\u0632\u0627\u0646 \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629 \u0625\u0644\u0649 \u0625\u0642\u0631\u0627\u0631 \u0636\u0631\u064a\u0628\u0629 \u0634\u0631\u0643\u0627\u062a \u0645\u0641\u062d\u0648\u0635: \u0627\u0644\u062a\u0639\u062f\u064a\u0644\u0627\u062a \u0648\u0627\u0644\u0627\u062e\u062a\u064a\u0627\u0631\u0627\u062a \u0648\u0627\u062d\u062a\u0633\u0627\u0628 0%/9% \u0648\u0627\u0644\u0625\u0641\u0635\u0627\u062d\u0627\u062a\u060c \u0648\u0643\u0644 \u0628\u0646\u062f \u0645\u0633\u0646\u062f \u0625\u0644\u0649 \u0645\u0627\u062f\u062a\u0647 \u0641\u064a \u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0628\u0642\u0627\u0646\u0648\u0646 47 \u0644\u0633\u0646\u0629 2022.",
            title: "\u0625\u0642\u0631\u0627\u0631 \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0643\u0627\u0645\u0644\u0627\u064b\u060c \u0645\u0646\u0638\u0645\u0627\u064b \u0648\u0645\u0641\u062d\u0648\u0635\u0627\u064b" },
    calc: { seoTitle: "\u062d\u0627\u0633\u0628\u0629 \u063a\u0631\u0627\u0645\u0627\u062a \u0627\u0644\u062a\u0623\u062e\u0631 \u0641\u064a \u0625\u0642\u0631\u0627\u0631 \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0648\u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u2014 \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a 2026",
            seoDesc: "\u062d\u0627\u0633\u0628\u0629 \u0645\u062c\u0627\u0646\u064a\u0629 \u0644\u063a\u0631\u0627\u0645\u0627\u062a \u0627\u0644\u062a\u0623\u062e\u0631 \u0641\u064a \u062a\u0633\u062c\u064a\u0644 \u0648\u062a\u0642\u062f\u064a\u0645 \u0648\u0633\u062f\u0627\u062f \u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0648\u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0648\u0641\u0642 \u0642\u0648\u0627\u0639\u062f 2026 (14% \u0633\u0646\u0648\u064a\u0627\u064b)\u060c \u0645\u0639 \u0627\u0644\u0645\u0635\u062f\u0631 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a \u0644\u0643\u0644 \u0628\u0646\u062f." },
    acc:  { seoTitle: "\u0628\u0631\u0646\u0627\u0645\u062c \u0636\u0631\u064a\u0628\u064a \u0644\u0645\u0643\u0627\u062a\u0628 \u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629 \u0648\u0627\u0644\u0648\u0643\u0644\u0627\u0621 \u0627\u0644\u0636\u0631\u064a\u0628\u064a\u064a\u0646 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a",
            seoDesc: "\u0628\u0631\u0646\u0627\u0645\u062c \u0636\u0631\u064a\u0628\u064a \u0645\u062a\u0639\u062f\u062f \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0644\u0645\u0643\u0627\u062a\u0628 \u0627\u0644\u0645\u062d\u0627\u0633\u0628\u0629 \u0641\u064a \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a: \u0643\u0644 \u062e\u0627\u0636\u0639 \u0644\u0644\u0636\u0631\u064a\u0628\u0629 \u0648\u0641\u062a\u0631\u0629 \u0648\u0645\u0648\u0639\u062f \u0648\u0645\u0631\u0627\u062c\u0639 \u0639\u0644\u0649 \u0644\u0648\u062d\u0629 \u0648\u0627\u062d\u062f\u0629\u060c \u0648\u0625\u0642\u0631\u0627\u0631\u0627\u062a \u0627\u0644\u0642\u064a\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0648\u0636\u0631\u064a\u0628\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u062a \u0645\u0641\u062d\u0648\u0635\u0629 \u0648\u0645\u0633\u0646\u062f\u0629." },
  },
};

const raw = fs.readFileSync(F.content, "utf8");
const c = JSON.parse(raw);
let edits = 0;
for (const lang of ["en", "ar"]) {
  for (const [key, vals] of Object.entries(SEO[lang])) {
    const d = c[lang][key];
    if (!d) { console.error("STOP: content." + lang + "." + key + " not found"); process.exit(1); }
    for (const [k, v] of Object.entries(vals)) { if (d[k] !== v) { d[k] = v; edits++; } }
  }
}
if (edits) {
  let out = JSON.stringify(c, null, 1) + (raw.replace(/\r/g, "").endsWith("\n") ? "\n" : "");
  if (raw.includes("\r\n")) out = out.replace(/\n/g, "\r\n");
  fs.writeFileSync(F.content, out, "utf8");
  changed.push(F.content); console.log("PATCHED content.json (" + edits + " fields)");
} else console.log("OK      content.json (already)");

console.log("\nDONE - " + (changed.length ? "files changed: " + [...new Set(changed)].map((f) => path.relative(root, f)).join(", ") : "nothing to change"));
