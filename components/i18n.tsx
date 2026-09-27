"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { localeInfo, loaders, type Dict, type Locale } from "@/content";

type I18n = {
  lang: Locale;
  t: Dict;
  setLang: (l: Locale) => void;
  preload: (l: Locale) => void;
};

const Ctx = createContext<I18n | null>(null);

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n outside provider");
  return v;
}

// The language switches in place: no page reload, scroll position kept, text
// re-scrambles into the new language. The URL still changes (/en → /de) so the
// link is shareable and each language is a real, indexable page.
export function I18nProvider({ lang: initialLang, dict, children }: { lang: Locale; dict: Dict; children: ReactNode }) {
  const [state, setState] = useState({ lang: initialLang, t: dict });
  const cache = useRef<Partial<Record<Locale, Dict>>>({ [initialLang]: dict });
  const [wipe, setWipe] = useState(0);

  const load = useCallback(async (l: Locale) => {
    const hit = cache.current[l];
    if (hit) return hit;
    const d = await loaders[l]();
    cache.current[l] = d;
    return d;
  }, []);

  const preload = useCallback((l: Locale) => void load(l), [load]);

  const setLang = useCallback(
    async (l: Locale) => {
      if (l === state.lang) return;
      const d = await load(l);
      setWipe((k) => k + 1);
      window.setTimeout(() => setState({ lang: l, t: d }), 260);
    },
    [state.lang, load],
  );

  useEffect(() => {
    const { lang, t } = state;
    document.documentElement.lang = localeInfo[lang].hreflang;
    document.title = t.meta.title;
    document.cookie = `lang=${lang};path=/;max-age=31536000;samesite=lax`;
    const url = `/${lang}${window.location.hash}`;
    if (window.location.pathname !== `/${lang}`) window.history.replaceState(window.history.state, "", url);
  }, [state]);

  useEffect(() => {
    if (!wipe) return;
    const id = window.setTimeout(() => setWipe(0), 950);
    return () => window.clearTimeout(id);
  }, [wipe]);

  return (
    <Ctx.Provider value={{ lang: state.lang, t: state.t, setLang, preload }}>
      {children}
      {wipe ? <div className="lang-wipe" key={wipe} aria-hidden="true" /> : null}
    </Ctx.Provider>
  );
}
