"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { localeInfo, locales, type Locale } from "@/content";
import { useI18n } from "./i18n";
import { Icon, Scramble, reducedMotion } from "./ui";

export const SECTIONS = [
  "hero",
  "about",
  "factory",
  "cnckad",
  "mbend",
  "mrobot",
  "mtube",
  "nesting",
  "estimation",
  "mes",
  "erp",
  "service",
] as const;
export type SectionId = (typeof SECTIONS)[number];

type Nav = { active: SectionId; go: (id: SectionId | string) => void; openExplore: () => void };
const NavCtx = createContext<Nav>({ active: "hero", go: () => {}, openExplore: () => {} });
export const useNav = () => useContext(NavCtx);

type LenisLike = { scrollTo: (t: HTMLElement | number, o?: object) => void; raf: (t: number) => void; destroy: () => void; on: (e: string, cb: () => void) => void };

/** Scroll engine + page-wide effects: smooth scroll, reveal, spotlight, tilt, parallax, progress, scroll-spy. */
export function Chrome({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<SectionId>("hero");
  const [explore, setExplore] = useState(false);
  const lenis = useRef<LenisLike | null>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.remove("no-js");
    let raf = 0;
    let alive = true;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (bar.current) {
        bar.current.style.setProperty("--p", String(h > 0 ? y / h : 0));
        bar.current.classList.toggle("is-top", y < 40);
      }
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const c = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.setProperty("--py", `${-8 + c * -10}%`);
      });
    };

    // ?nosmooth turns smooth scrolling off (used for scripted screenshots)
    if (!reducedMotion() && !new URLSearchParams(location.search).has("nosmooth")) {
      import("lenis").then(({ default: Lenis }) => {
        if (!alive) return;
        const l = new Lenis({ lerp: 0.11, wheelMultiplier: 1 }) as unknown as LenisLike;
        lenis.current = l;
        l.on("scroll", onScroll);
        const loop = (t: number) => {
          l.raf(t);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Reveal-on-scroll
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // Scroll-spy: the section crossing the middle of the viewport is "active".
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id as SectionId)),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });

    // Pointer spotlight + tilt, one listener for the whole page.
    const onMove = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const spot = t?.closest?.(".spot") as HTMLElement | null;
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      const tilt = t?.closest?.(".tilt") as HTMLElement | null;
      if (tilt && !reducedMotion()) {
        const r = tilt.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
      }
    };
    const onOut = (e: PointerEvent) => {
      const tilt = (e.target as Element | null)?.closest?.(".tilt") as HTMLElement | null;
      if (tilt && !tilt.contains(e.relatedTarget as Node)) tilt.style.transform = "";
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      lenis.current?.destroy();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      io.disconnect();
      spy.disconnect();
    };
  }, []);

  // "/" or Ctrl/Cmd+K opens Explore from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest?.("input, textarea, select");
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        setExplore(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nav = useMemo<Nav>(
    () => ({
      active,
      openExplore: () => setExplore(true),
      go: (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (lenis.current) lenis.current.scrollTo(el, { offset: 0, duration: 1.4 });
        else el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
        history.replaceState(history.state, "", `#${id}`);
      },
    }),
    [active],
  );

  return (
    <NavCtx.Provider value={nav}>
      <TopBar barRef={bar} />
      <Rail />
      {children}
      {explore ? <Explore onClose={() => setExplore(false)} /> : null}
    </NavCtx.Provider>
  );
}

function TopBar({ barRef }: { barRef: React.RefObject<HTMLDivElement | null> }) {
  const { t } = useI18n();
  const { active, go, openExplore } = useNav();
  const idx = SECTIONS.indexOf(active);
  return (
    <div className="bar is-top" ref={barRef}>
      <a
        className="brand"
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          go("hero");
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/logo.png" alt="" width={30} height={33} />
        <div>
          <b>METALIX</b>
          <span>{t.ui.tagline}</span>
        </div>
      </a>
      <div className="bar__where" aria-live="polite">
        <span className="sep" />
        <span className="num">{String(idx + 1).padStart(2, "0")}</span>
        <span className="name">
          <Scramble text={t.nav[active]} />
        </span>
      </div>
      <div className="bar__actions">
        <button className="btn-ghost" onClick={openExplore} aria-haspopup="dialog">
          <Icon name="grid" />
          <span className="lbl-text">{t.ui.explore}</span>
          <kbd>/</kbd>
        </button>
        <LangSwitcher />
      </div>
      <div className="bar__progress" />
    </div>
  );
}

export function LangSwitcher() {
  const { lang, setLang, preload, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<Locale>(lang);
  const [taglines, setTaglines] = useState<Partial<Record<Locale, string>>>({});
  const root = useRef<HTMLDivElement>(null);
  const opts = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    // Fetch every language the moment the menu opens so each preview and the switch are instant.
    locales.forEach((l) => {
      preload(l);
      import("@/content").then(({ loaders }) => loaders[l]().then((d) => setTaglines((s) => ({ ...s, [l]: d.ui.tagline }))));
    });
    setHover(lang);
    const i = locales.indexOf(lang);
    requestAnimationFrame(() => opts.current[i]?.focus());
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, lang, preload]);

  const hi = locales.indexOf(hover);
  return (
    <div className="lang" ref={root}>
      <button
        className="btn-ghost lang__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.ui.language}: ${localeInfo[lang].native}`}
        onClick={() => setOpen((o) => !o)}
        onPointerEnter={() => locales.forEach(preload)}
      >
        <Icon name="globe" className="globe" />
        <span>{localeInfo[lang].short}</span>
      </button>
      {open ? (
        <div className="lang__panel" role="menu" aria-label={t.ui.language}>
          <div className="lang__head">{t.ui.language}</div>
          <ul className="lang__list">
            <li
              className="lang__hl"
              aria-hidden="true"
              style={{ height: 52, top: 0, opacity: 1, transform: `translateY(${hi * 52}px)` } as CSSProperties}
            />
            {locales.map((l, k) => (
              <li key={l}>
                <button
                  ref={(el) => {
                    opts.current[k] = el;
                  }}
                  role="menuitemradio"
                  aria-checked={l === lang}
                  lang={localeInfo[l].hreflang}
                  className="lang__opt"
                  style={{ height: 52 }}
                  onPointerEnter={() => setHover(l)}
                  onFocus={() => setHover(l)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") opts.current[(k + 1) % locales.length]?.focus();
                    if (e.key === "ArrowUp") opts.current[(k - 1 + locales.length) % locales.length]?.focus();
                  }}
                  onClick={() => {
                    setLang(l);
                    setOpen(false);
                  }}
                >
                  <span className="code">{l === "zh" ? "ZH" : localeInfo[l].short}</span>
                  <span className="native">{localeInfo[l].native}</span>
                  <Icon name="check" className="check" />
                </button>
              </li>
            ))}
          </ul>
          <div className="lang__tag" lang={localeInfo[hover].hreflang} aria-live="polite">
            <em>{taglines[hover] ?? ""}</em>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Rail() {
  const { t } = useI18n();
  const { active, go } = useNav();
  return (
    <nav aria-label={t.ui.explore}>
      <ul className="rail">
        {SECTIONS.map((id) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={id === active}
              onClick={(e) => {
                e.preventDefault();
                go(id);
              }}
            >
              <span className="lbl">{t.nav[id]}</span>
              <span className="tick" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Explore({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const { active, go } = useNav();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const list = SECTIONS.map((id, i) => ({ id, i, name: t.nav[id], hint: t.navHints[id] })).filter(
    (s) => !q || `${s.name} ${s.hint}`.toLowerCase().includes(q.toLowerCase()),
  );

  useEffect(() => {
    input.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  useEffect(() => setSel(0), [q]);

  const jump = (id: SectionId) => {
    onClose();
    requestAnimationFrame(() => go(id));
  };

  return (
    <div
      className="explore"
      role="dialog"
      aria-modal="true"
      aria-label={t.ui.explore}
      data-lenis-prevent
      onPointerDown={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        const cols = window.innerWidth > 900 ? 4 : window.innerWidth > 560 ? 2 : 1;
        if (e.key === "ArrowRight") setSel((s) => Math.min(list.length - 1, s + 1));
        if (e.key === "ArrowLeft") setSel((s) => Math.max(0, s - 1));
        if (e.key === "ArrowDown") (e.preventDefault(), setSel((s) => Math.min(list.length - 1, s + cols)));
        if (e.key === "ArrowUp") (e.preventDefault(), setSel((s) => Math.max(0, s - cols)));
        if (e.key === "Enter" && list[sel]) jump(list[sel].id);
      }}
    >
      <div className="explore__box">
        <div className="explore__search">
          <Icon name="search" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`${t.ui.explore}…`}
            aria-label={t.ui.explore}
          />
          <button className="icon-btn" onClick={onClose} aria-label={t.ui.close} style={{ color: "#fff" }}>
            <Icon name="close" />
          </button>
        </div>
        <div className="explore__grid">
          {list.map((s, k) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`tile spot${k === sel ? " is-active" : ""}${s.id === active ? " is-here" : ""}`}
              onPointerEnter={() => setSel(k)}
              onClick={(e) => {
                e.preventDefault();
                jump(s.id);
              }}
              style={{ animation: `rise .5s ${k * 30}ms var(--ease) both` }}
            >
              <span className="n">{String(s.i + 1).padStart(2, "0")}</span>
              <b>{s.name}</b>
              <small>{s.hint}</small>
              <Icon name="arrowUR" className="arrow" />
            </a>
          ))}
        </div>
        <div className="explore__foot">
          <span>↑ ↓ ← → · Enter · Esc</span>
          <span>{t.ui.shortcut}</span>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const { t, lang, setLang } = useI18n();
  const { go } = useNav();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="brandline">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo.png" alt="Metalix" width={40} height={43} style={{ mixBlendMode: "screen" }} />
          <div>
            <b>Metalix</b>
            <div>{t.footer.line}</div>
          </div>
        </div>
        <div className="langs" role="group" aria-label={t.ui.language}>
          {locales.map((l) => (
            <button key={l} aria-pressed={l === lang} lang={localeInfo[l].hreflang} onClick={() => setLang(l)}>
              {localeInfo[l].native}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
          <span>{t.footer.demo}</span>
          <a href="#hero" onClick={(e) => (e.preventDefault(), go("hero"))} style={{ color: "#fff" }}>
            {t.ui.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
