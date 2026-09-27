export const locales = ["en", "de", "fr", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeInfo: Record<Locale, { native: string; short: string; hreflang: string }> = {
  en: { native: "English", short: "EN", hreflang: "en" },
  de: { native: "Deutsch", short: "DE", hreflang: "de" },
  fr: { native: "Français", short: "FR", hreflang: "fr" },
  zh: { native: "中文", short: "中文", hreflang: "zh-Hans" },
};

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);
