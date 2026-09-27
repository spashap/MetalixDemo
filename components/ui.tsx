"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useI18n } from "./i18n";

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs `cb` once the element first scrolls into view. */
export function useInView<T extends Element>(cb: () => void, margin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null);
  const fn = useRef(cb);
  fn.current = cb;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          fn.current();
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return ref;
}

/** Tracks whether an element is on screen (for pausing canvases and loops). */
export function useVisible<T extends Element>(margin = "0px") {
  const ref = useRef<T>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, vis] as const;
}

const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=";
const CJK = "钣金切割冲压折弯套料数据流智能工厂程序机床板材零件";

/** Text that decodes itself when it changes (language switch) and on first view. */
export function Scramble({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  const { lang } = useI18n();
  const [out, setOut] = useState(text);
  const first = useRef(true);
  const raf = useRef(0);

  const run = (target: string) => {
    if (reducedMotion()) return setOut(target);
    cancelAnimationFrame(raf.current);
    const pool = lang === "zh" ? CJK : LATIN;
    const start = performance.now();
    const dur = Math.min(900, 350 + target.length * 12);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const fixed = Math.floor(p * target.length);
      let s = target.slice(0, fixed);
      for (let i = fixed; i < target.length; i++) {
        const c = target[i];
        s += c === " " || c === "\n" ? c : pool[(Math.random() * pool.length) | 0];
      }
      setOut(s);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setOut(target);
    };
    raf.current = requestAnimationFrame(tick);
  };

  const ref = useInView<HTMLSpanElement>(() => run(text));

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    run(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}

/** Animated number: counts up the numeric part of values like "30000+", "100K+", "-90%". */
export function Count({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^([^\d]*)(\d[\d,.]*)(.*)$/);
  const [shown, setShown] = useState(value);
  const ref = useInView<HTMLSpanElement>(() => {
    if (!m || reducedMotion()) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const start = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      setShown(`${pre}${Math.round(target * e)}${post}`);
      if (p < 1) requestAnimationFrame(tick);
      else setShown(value);
    };
    requestAnimationFrame(tick);
  });
  useEffect(() => setShown(value), [value]);
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  split,
  aside,
}: {
  index: number;
  eyebrow: string;
  title: string;
  lead?: string;
  split?: boolean;
  aside?: ReactNode;
}) {
  return (
    <header className={`head${split ? " head--split" : ""}`}>
      <div className="stack" style={{ gap: 18 }}>
        <div className="eyebrow" data-reveal>
          <span className="idx">{String(index).padStart(2, "0")} / 12</span>
          <Scramble text={eyebrow} />
        </div>
        <h2 className="h2" data-reveal style={{ "--d": 1 } as CSSProperties}>
          {title}
        </h2>
        {lead ? (
          <p className="lead" data-reveal style={{ "--d": 2 } as CSSProperties}>
            {lead}
          </p>
        ) : null}
      </div>
      {split ? (
        <div data-reveal style={{ "--d": 2 } as CSSProperties}>
          {aside}
        </div>
      ) : null}
    </header>
  );
}

export function Marquee({ items, dur = 40 }: { items: string[]; dur?: number }) {
  const row = (hidden: boolean) =>
    items.map((it, i) => (
      <span className="chip" key={`${hidden}-${i}`} aria-hidden={hidden || undefined}>
        {it}
      </span>
    ));
  return (
    <div className="marquee" style={{ "--dur": `${dur}s` } as CSSProperties}>
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Capability groups as auto-advancing tabs; hover or focus pauses the cycle. */
export function CapTabs({ groups }: { groups: { title: string; items: string[] }[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, visible] = useVisible<HTMLDivElement>();
  const cycle = 7000;

  useEffect(() => {
    if (paused || !visible || reducedMotion()) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % groups.length), cycle);
    return () => window.clearTimeout(id);
  }, [i, paused, visible, groups.length]);

  const g = groups[i];
  return (
    <div
      ref={ref}
      className={`captabs${paused || !visible ? " is-paused" : ""}`}
      style={{ "--cycle": `${cycle}ms` } as CSSProperties}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="captabs__list" role="tablist">
        {groups.map((grp, k) => (
          <button
            key={k}
            role="tab"
            className="captab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowRight") setI((k + 1) % groups.length);
              if (e.key === "ArrowUp" || e.key === "ArrowLeft") setI((k - 1 + groups.length) % groups.length);
            }}
          >
            <span className="num">{String(k + 1).padStart(2, "0")}</span>
            {grp.title}
            <span className="bar-fill" key={`${i}-${k}`} />
          </button>
        ))}
      </div>
      <div className="captabs__panel" role="tabpanel">
        <div className="card spot" key={i}>
          <h3 className="swap">{g.title}</h3>
          <ul className="ticks">
            {g.items.map((it, k) => (
              <li key={k} style={{ "--i": k } as CSSProperties}>
                {it}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Steps({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="steps" style={{ "--n": items.length } as CSSProperties}>
      {items.map((s, k) => (
        <div className="step" key={k} data-reveal style={{ "--d": k } as CSSProperties}>
          <div className="card spot">
            <span className="num">{String(k + 1).padStart(2, "0")}</span>
            <h4>{s.title}</h4>
            <p>{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Kpi({
  value,
  label,
  text,
  tone = "black",
  d = 0,
}: {
  value: string;
  label?: string;
  text?: string;
  tone?: "black" | "red" | "light";
  d?: number;
}) {
  const cls = tone === "red" ? "card--red" : tone === "black" ? "card--black" : "";
  return (
    <div className={`card spot kpi ${cls}`} data-reveal style={{ "--d": d } as CSSProperties}>
      <Count value={value} className="v" />
      {label ? <span className="l">{label}</span> : null}
      {text ? <span className="t">{text}</span> : null}
    </div>
  );
}

/* Minimal stroke icon set */
const paths: Record<string, ReactNode> = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUR: <path d="M7 17 17 7M9 7h8v8" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <rect x="14" y="14" width="6" height="6" rx="1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  check: <path d="m5 12 5 5 9-10" />,
  play: <path d="M8 5v14l11-7z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  prev: <path d="m15 6-6 6 6 6" />,
  next: <path d="m9 6 6 6-6 6" />,
  replay: <path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" />,
  swap: <path d="M8 7 4 12l4 5M16 7l4 5-4 5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  doc: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
    </>
  ),
  laser: (
    <>
      <path d="M12 3 8 9h8z" />
      <path d="M12 9v6" strokeDasharray="2 2" />
      <rect x="5" y="16" width="14" height="4" rx="1" />
    </>
  ),
  press: (
    <>
      <rect x="5" y="3" width="14" height="4" rx="1" />
      <path d="M12 7v5M9 12l3 3 3-3" />
      <rect x="5" y="17" width="14" height="4" rx="1" />
    </>
  ),
};

export function Icon({ name, className }: { name: keyof typeof paths | string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
