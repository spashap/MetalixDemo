"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { Icon, reducedMotion, useVisible } from "../ui";

// ── Part geometry (SVG units) ──────────────────────────────────────────────
// A plate with two round holes, a square cut-out and a rectangular slot.
// Inner features are always machined before the outer contour, so the part
// stays held in the sheet until the very last hit.
type Pt = [number, number];
const ROUND = [
  { cx: 192, cy: 150, r: 22 },
  { cx: 608, cy: 150, r: 22 },
];
const RECTS = [
  { x: 360, y: 110, w: 80, h: 60 },
  { x: 300, y: 232, w: 200, h: 40 },
];
const OUTER: Pt[] = [
  [100, 80],
  [700, 80],
  [700, 220],
  [640, 280],
  [640, 320],
  [160, 320],
  [160, 280],
  [100, 220],
];

const circlePath = ({ cx, cy, r }: (typeof ROUND)[number]) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0`;
const rectPath = ({ x, y, w, h }: (typeof RECTS)[number]) => `M${x} ${y} h${w} v${h} h${-w} z`;
const outerPath = `M${OUTER.map((p) => p.join(" ")).join(" L")} Z`;

// Laser: holes, then the outer contour
const CONTOURS = [...ROUND.map(circlePath), ...RECTS.map(rectPath), outerPath];

// ── Punch strategy ─────────────────────────────────────────────────────────
// Tools: round Ø14, square 14, rectangular 30 × 8. Every hit overlaps the last.
type Tool = 0 | 1 | 2; // round · square · rectangular
type Hit = { x: number; y: number; tool: Tool; rot: number; feature: number };
const RT = 7; // round tool radius
const SQ = 14; // square tool side
const RL = 30; // rectangular tool length
const RW = 8; // rectangular tool width

function spread(from: number, to: number, maxStep: number) {
  const len = to - from;
  if (len <= 0) return [from + len / 2];
  const n = Math.ceil(len / maxStep) + 1;
  return Array.from({ length: n }, (_, i) => from + (len * i) / (n - 1));
}

function buildHits(): Hit[] {
  const hits: Hit[] = [];
  let feature = 0;

  // Round holes: spiral from the centre outwards, then a finishing ring on the edge.
  for (const { cx, cy, r } of ROUND) {
    const rMax = r - RT;
    const turns = 2;
    const thetaMax = turns * 2 * Math.PI;
    const a = rMax / thetaMax;
    hits.push({ x: cx, y: cy, tool: 0, rot: 0, feature });
    let th = 0.9;
    while (th < thetaMax) {
      const rr = a * th;
      hits.push({ x: cx + rr * Math.cos(th), y: cy + rr * Math.sin(th), tool: 0, rot: 0, feature });
      th += Math.min(0.9, 8 / Math.max(rr, 3));
    }
    const ring = Math.ceil((2 * Math.PI * rMax) / 8);
    for (let i = 0; i < ring; i++) {
      const t = thetaMax + (i / ring) * 2 * Math.PI;
      hits.push({ x: cx + rMax * Math.cos(t), y: cy + rMax * Math.sin(t), tool: 0, rot: 0, feature });
    }
    feature++;
  }

  // Rectangular holes: square tool, snake along X, row by row.
  for (const { x, y, w, h } of RECTS) {
    const xs = spread(x + SQ / 2, x + w - SQ / 2, SQ - 3);
    const ys = spread(y + SQ / 2, y + h - SQ / 2, SQ - 3);
    ys.forEach((yy, row) => {
      const line = row % 2 ? [...xs].reverse() : xs;
      line.forEach((xx) => hits.push({ x: xx, y: yy, tool: 1, rot: 0, feature }));
    });
    feature++;
  }

  // Outer contour: rectangular tool along each edge, on the scrap side, rotated to the edge.
  // At convex corners the strip runs one tool-width past the vertex so the corner web is
  // punched out too; at concave corners it stops at the vertex so it never bites the part.
  const n = OUTER.length;
  const dir = (i: number) => {
    const [px, py] = OUTER[i];
    const [qx, qy] = OUTER[(i + 1) % n];
    const len = Math.hypot(qx - px, qy - py);
    return [(qx - px) / len, (qy - py) / len, len] as const;
  };
  const convex = (v: number) => {
    const [ax, ay] = dir((v - 1 + n) % n);
    const [bx, by] = dir(v);
    return ax * by - ay * bx > 0;
  };
  for (let i = 0; i < n; i++) {
    const [px, py] = OUTER[i];
    const [dx, dy, len] = dir(i);
    const nx = dy; // outward normal (points listed clockwise on screen)
    const ny = -dx;
    const rot = (Math.atan2(dy, dx) * 180) / Math.PI;
    const from = RL / 2 - (convex(i) ? RW : 0);
    const to = len - RL / 2 + (convex((i + 1) % n) ? RW : 0);
    for (const s of spread(from, to, RL - 6)) {
      hits.push({ x: px + dx * s + nx * (RW / 2), y: py + dy * s + ny * (RW / 2), tool: 2, rot, feature });
    }
  }
  return hits;
}
const HITS = buildHits();
const FEATURES = ROUND.length + RECTS.length + 1;

export default function Toolpath() {
  const { t } = useI18n();
  const d = t.cnckad.demo;
  const [mode, setMode] = useState<"laser" | "punch">("punch");
  const [playing, setPlaying] = useState(true);
  const [readout, setReadout] = useState({ c: 0, hits: 0, tool: 0 as Tool });
  const [wrap, visible] = useVisible<HTMLDivElement>();
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const head = useRef<SVGGElement>(null);
  const hitsG = useRef<SVGGElement>(null);
  const toolShapes = useRef<(SVGElement | null)[]>([]);

  // ── Laser ──
  useEffect(() => {
    if (mode !== "laser") return;
    const els = paths.current.filter(Boolean) as SVGPathElement[];
    const lens = els.map((p) => p.getTotalLength());
    const total = lens.reduce((a, b) => a + b, 0);
    let dist = 0;
    let last = performance.now();
    let raf = 0;
    let pause = 0;
    const reset = () => {
      dist = 0;
      els.forEach((p, i) => {
        p.style.strokeDasharray = `${lens[i]}`;
        p.style.strokeDashoffset = `${lens[i]}`;
        p.classList.remove("cool");
      });
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
      dist = Math.min(total, dist + dt * 380);
      let acc = 0;
      let cur = 0;
      els.forEach((p, i) => {
        const local = Math.max(0, Math.min(lens[i], dist - acc));
        p.style.strokeDashoffset = `${lens[i] - local}`;
        if (local >= lens[i]) p.classList.add("cool");
        if (dist > acc) cur = i;
        acc += lens[i];
      });
      let start = 0;
      for (let i = 0; i < cur; i++) start += lens[i];
      const pt = els[cur].getPointAtLength(Math.min(lens[cur], dist - start));
      head.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      setReadout({ c: cur + 1, hits: 0, tool: 0 });
      if (dist >= total) pause = 1.8;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode, playing, visible]);

  // ── Punch ──
  useEffect(() => {
    if (mode !== "punch") return;
    const g = hitsG.current;
    if (!g) return;
    const marks = Array.from(g.children) as SVGElement[];
    let n = 0;
    let acc = 0;
    let last = performance.now();
    let raf = 0;
    let pause = 0;
    const showTool = (i: number) => {
      const h = HITS[Math.min(i, HITS.length - 1)];
      toolShapes.current.forEach((el, k) => el?.setAttribute("visibility", k === h.tool ? "visible" : "hidden"));
      head.current?.setAttribute("transform", `translate(${h.x} ${h.y}) rotate(${h.rot})`);
    };
    const reset = () => {
      n = 0;
      marks.forEach((m) => m.classList.remove("on", "cur"));
      showTool(0);
    };
    reset();
    if (reducedMotion()) {
      marks.forEach((m) => m.classList.add("on"));
      return;
    }
    const rate = 42; // hits per second
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
      acc += dt * rate;
      while (acc >= 1 && n < HITS.length) {
        acc -= 1;
        marks[n - 1]?.classList.remove("cur");
        marks[n].classList.add("on", "cur");
        n++;
      }
      if (n > 0) {
        showTool(n - 1);
        const h = HITS[n - 1];
        setReadout({ c: h.feature + 1, hits: n, tool: h.tool });
      }
      if (n >= HITS.length) {
        marks[n - 1]?.classList.remove("cur");
        pause = 2.2;
      }
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
          <Seg value={mode} options={[["punch", d.punch], ["laser", d.laser]]} onChange={setMode} />
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
        <path d={CONTOURS.slice().reverse().join(" ")} className="part" fillRule="evenodd" />
        {mode === "laser"
          ? CONTOURS.map((c, i) => (
              <path
                key={`c${i}`}
                d={c}
                className="cut"
                ref={(el) => {
                  paths.current[i] = el;
                }}
              />
            ))
          : null}
        {mode === "punch" ? (
          <g ref={hitsG}>
            {HITS.map((h, i) =>
              h.tool === 0 ? (
                <circle key={i} className="hit" cx={h.x} cy={h.y} r={RT} />
              ) : (
                <rect
                  key={i}
                  className="hit"
                  x={h.tool === 1 ? -SQ / 2 : -RL / 2}
                  y={h.tool === 1 ? -SQ / 2 : -RW / 2}
                  width={h.tool === 1 ? SQ : RL}
                  height={h.tool === 1 ? SQ : RW}
                  transform={`translate(${h.x} ${h.y}) rotate(${h.rot})`}
                />
              ),
            )}
          </g>
        ) : null}
        <g ref={head} transform={`translate(${HITS[0].x} ${HITS[0].y})`}>
          {mode === "laser" ? (
            <>
              <circle r="16" fill="rgba(255,170,80,.28)" />
              <circle r="4" fill="#fff" />
            </>
          ) : (
            <>
              <circle r="22" fill="rgba(255,212,0,.12)" />
              <circle
                ref={(el) => {
                  toolShapes.current[0] = el;
                }}
                r={RT + 1}
                className="tool"
              />
              <rect
                ref={(el) => {
                  toolShapes.current[1] = el;
                }}
                x={-SQ / 2 - 1}
                y={-SQ / 2 - 1}
                width={SQ + 2}
                height={SQ + 2}
                className="tool"
                visibility="hidden"
              />
              <rect
                ref={(el) => {
                  toolShapes.current[2] = el;
                }}
                x={-RL / 2 - 1}
                y={-RW / 2 - 1}
                width={RL + 2}
                height={RW + 2}
                className="tool"
                visibility="hidden"
              />
            </>
          )}
        </g>
      </svg>
      <div className="demo__bar" style={{ borderBottom: 0, borderTop: "1px solid var(--line)" }}>
        <div className="readout">
          <span>
            {d.readout[0]}
            <b>
              {readout.c}/{FEATURES}
            </b>
          </span>
          <span>
            {d.readout[1]}
            <b>{mode === "punch" ? `${readout.hits}/${HITS.length}` : "—"}</b>
          </span>
          {mode === "punch" ? (
            <span>
              {d.tool}
              <b className="tool-name">{d.tools[readout.tool]}</b>
            </span>
          ) : (
            <span>
              {d.readout[2]}
              <b>{readout.c}</b>
            </span>
          )}
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
    const place = () => {
      const b = ref.current?.querySelector<HTMLButtonElement>(`[data-v="${value}"]`);
      if (b) setHl({ left: b.offsetLeft, width: b.offsetWidth });
    };
    place();
    document.fonts?.ready.then(place);
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
