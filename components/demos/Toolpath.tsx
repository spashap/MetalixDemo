"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { Icon, reducedMotion, useVisible } from "../ui";

// A bracket with holes. Inner contours are cut first and the outer contour last,
// as a real cutting sequence does, so the part never drops before its holes are done.
const CONTOURS = [
  "M170 150 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0",
  "M586 150 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0",
  "M300 230 h200 a24 24 0 0 1 0 48 h-200 a24 24 0 0 1 0 -48",
  "M360 110 h80 v60 h-80 z",
  "M120 80 h560 a20 20 0 0 1 20 20 v120 l-60 60 v40 a20 20 0 0 1 -20 20 h-420 a20 20 0 0 1 -20 -20 v-40 l-60 -60 v-120 a20 20 0 0 1 20 -20 z",
];

export default function Toolpath() {
  const { t } = useI18n();
  const d = t.cnckad.demo;
  const [mode, setMode] = useState<"laser" | "punch">("laser");
  const [playing, setPlaying] = useState(true);
  const [readout, setReadout] = useState({ c: 0, hits: 0 });
  const [wrap, visible] = useVisible<HTMLDivElement>();
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const head = useRef<SVGGElement>(null);
  const hitsG = useRef<SVGGElement>(null);

  useEffect(() => {
    const els = paths.current.filter(Boolean) as SVGPathElement[];
    const lens = els.map((p) => p.getTotalLength());
    const total = lens.reduce((a, b) => a + b, 0);
    let dist = 0;
    let hits = 0;
    let last = performance.now();
    let raf = 0;
    let pause = 0;
    const reset = () => {
      dist = 0;
      hits = 0;
      els.forEach((p, i) => {
        p.style.strokeDasharray = `${lens[i]}`;
        p.style.strokeDashoffset = `${lens[i]}`;
        p.classList.remove("cool");
      });
      if (hitsG.current) hitsG.current.innerHTML = "";
    };
    reset();
    if (reducedMotion()) {
      els.forEach((p) => {
        p.style.strokeDashoffset = "0";
        p.classList.add("cool");
      });
      return;
    }
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!playing || !visible) return;
      if (pause > 0) {
        pause -= dt;
        if (pause <= 0) reset();
        return;
      }
      const before = dist;
      dist = Math.min(total, dist + dt * (mode === "laser" ? 380 : 460));
      let acc = 0;
      let cur = 0;
      els.forEach((p, i) => {
        const local = Math.max(0, Math.min(lens[i], dist - acc));
        p.style.strokeDashoffset = `${mode === "laser" ? lens[i] - local : lens[i]}`;
        if (local >= lens[i]) p.classList.add("cool");
        if (dist > acc) cur = i;
        if (mode === "punch" && hitsG.current) {
          const pitch = 14;
          const lb = Math.max(0, before - acc);
          for (let s = Math.ceil(lb / pitch) * pitch; s <= local; s += pitch) {
            const pt = p.getPointAtLength(s);
            const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            r.setAttribute("x", String(pt.x - 6));
            r.setAttribute("y", String(pt.y - 6));
            r.setAttribute("width", "12");
            r.setAttribute("height", "12");
            r.setAttribute("class", "hit");
            hitsG.current.appendChild(r);
            hits++;
          }
        }
        acc += lens[i];
      });
      let start = 0;
      for (let i = 0; i < cur; i++) start += lens[i];
      const pt = els[cur].getPointAtLength(Math.min(lens[cur], dist - start));
      head.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      setReadout({ c: cur + 1, hits });
      if (dist >= total) pause = 1.8;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, playing, visible]);

  return (
    <div className="demo toolpath" ref={wrap}>
      <div className="demo__bar">
        <div className="demo__title">
          <span className="live">LIVE</span>
          {d.title}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Seg value={mode} options={[["laser", d.laser], ["punch", d.punch]]} onChange={setMode} />
          <button className="icon-btn" onClick={() => setPlaying((p) => !p)} aria-label={playing ? t.ui.pause : t.ui.play}>
            <Icon name={playing ? "pause" : "play"} />
          </button>
        </div>
      </div>
      <svg viewBox="0 0 800 400" role="img" aria-label={d.title}>
        <defs>
          <pattern id="tp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,.05)" />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#tp-grid)" />
        {CONTOURS.map((c, i) => (
          <path key={`p${i}`} d={c} className="part" fillRule="evenodd" />
        ))}
        {CONTOURS.map((c, i) => (
          <path
            key={`c${i}-${mode}`}
            d={c}
            className="cut"
            ref={(el) => {
              paths.current[i] = el;
            }}
          />
        ))}
        <g ref={hitsG} />
        <g ref={head} transform="translate(120 80)">
          <circle r="16" fill={mode === "laser" ? "rgba(255,170,80,.28)" : "rgba(209,35,41,.3)"} />
          {mode === "laser" ? (
            <circle r="4" fill="#fff" />
          ) : (
            <rect x="-7" y="-7" width="14" height="14" fill="none" stroke="#fff" strokeWidth="2" />
          )}
        </g>
      </svg>
      <div className="demo__bar" style={{ borderBottom: 0, borderTop: "1px solid var(--line)" }}>
        <div className="readout">
          <span>
            {d.readout[0]}
            <b>
              {readout.c}/{CONTOURS.length}
            </b>
          </span>
          <span>
            {d.readout[1]}
            <b>{mode === "punch" ? readout.hits : "—"}</b>
          </span>
          <span>
            {d.readout[2]}
            <b>{readout.c}</b>
          </span>
        </div>
        <span className="muted mono" style={{ fontSize: 11 }}>
          {t.ui.illustrative}
        </span>
      </div>
    </div>
  );
}

/** Segmented control with a sliding highlight. */
export function Seg<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hl, setHl] = useState({ left: 4, width: 0 });
  const labels = options.map((o) => o[1]).join("|");
  useEffect(() => {
    const b = ref.current?.querySelector<HTMLButtonElement>(`[data-v="${value}"]`);
    if (b) setHl({ left: b.offsetLeft, width: b.offsetWidth });
  }, [value, labels]);
  return (
    <div className="seg" ref={ref}>
      <span className="hl" style={{ left: hl.left, width: hl.width }} />
      {options.map(([v, label]) => (
        <button key={v} data-v={v} aria-pressed={value === v} onClick={() => onChange(v)}>
          {label}
        </button>
      ))}
    </div>
  );
}
