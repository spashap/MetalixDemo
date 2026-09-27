// Proves every language has exactly the English shape: same keys, same array
// lengths, no empty strings. Exits non-zero on any mismatch.
// Run: node scripts/check-i18n.ts
import en from "../content/en.ts";
import de from "../content/de.ts";
import fr from "../content/fr.ts";
import zh from "../content/zh.ts";

const langs = { de, fr, zh } as Record<string, unknown>;
let problems = 0;
let strings = 0;

function walk(ref: unknown, other: unknown, path: string, lang: string) {
  if (typeof ref === "string") {
    if (typeof other !== "string") return report(lang, path, "missing string");
    if (!other.trim()) return report(lang, path, "empty string");
    if (lang === "de") strings++;
    return;
  }
  if (Array.isArray(ref)) {
    if (!Array.isArray(other)) return report(lang, path, "not an array");
    if (other.length !== ref.length) report(lang, path, `length ${other.length}, expected ${ref.length}`);
    ref.forEach((v, i) => walk(v, other[i], `${path}[${i}]`, lang));
    return;
  }
  const o = (other ?? {}) as Record<string, unknown>;
  for (const k of Object.keys(ref as object)) walk((ref as Record<string, unknown>)[k], o[k], path ? `${path}.${k}` : k, lang);
  for (const k of Object.keys(o)) if (!(k in (ref as object))) report(lang, `${path}.${k}`, "extra key");
}
function report(lang: string, path: string, msg: string) {
  problems++;
  console.error(`✗ ${lang}: ${path} — ${msg}`);
}

for (const [lang, dict] of Object.entries(langs)) walk(en, dict, "", lang);
if (problems) {
  console.error(`\n${problems} problem(s).`);
  process.exit(1);
}
console.log(`✓ de, fr, zh match English: ${strings} strings each.`);
