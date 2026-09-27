import type { Dict } from "./en";
import type { Locale } from "./locales";

export type { Dict };
export * from "./locales";

// Each language is its own chunk: the page ships only the current one and
// fetches another the moment the visitor opens the language switcher.
export const loaders: Record<Locale, () => Promise<Dict>> = {
  en: () => import("./en").then((m) => m.default),
  de: () => import("./de").then((m) => m.default),
  fr: () => import("./fr").then((m) => m.default),
  zh: () => import("./zh").then((m) => m.default),
};
