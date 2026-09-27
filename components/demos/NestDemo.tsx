"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { Icon, useInView } from "../ui";
import { Seg } from "./Toolpath";

// Illustrative nest on a 1000 × 500 sheet. Same 28 parts, two strategies:
// bounding-box ("rectangular") nesting versus true-shape nesting, where
// triangles interlock and discs sit inside the ring holes, leaving a reusable remnant.
type Kind = "tri" | "ring" | "disc" | "rect";
type Place = { x: number; y: number; r: number } | null;

const SHAPES: Record<Kind, { d: string; area: number; color: string }> = {
  tri: { d: "M0 140 L0 0 L200 140 Z", area: 14000, color: "#f0a3ec" },
  ring: { d: "M140 70a70 70 0 1 1-140 0a70 70 0 1 1 140 0ZM108 70a38 38 0 1 0-76 0a38 38 0 1 0 76 0Z", area: 10857, color: "#ff6a2b" },
  disc: { d: "M60 30a30 30 0 1 1-60 0a30 30 0 1 1 60 0Z", area: 2827, color: "#26dcee" },
  rect: { d: "M0 0H90V40H0Z", area: 3600, color: "#1fae6b" },
};

const PARTS: Kind[] = [
  ...Array<Kind>(12).fill("tri"),
  ...Array<Kind>(3).fill("ring"),
  ...Array<Kind>(3).fill("disc"),
  ...Array<Kind>(10).fill("rect"),
];

function layouts(): Record<"rect" | "true", Place[]> {
  const rect: Place[] = [];
  const tru: Place[] = [];
  let tri = 0;
  let ring = 0;
  let disc = 0;
  let rc = 0;
  PARTS.forEach((k) => {
    if (k === "tri") {
      const i = tri++;
      rect.push({ x: 10 + (i % 4) * 210, y: 10 + Math.floor(i / 4) * 150, r: 0 });
      const pair = Math.floor(i / 2);
      const px = 10 + (pair % 2) * 205;
      const py = 10 + Math.floor(pair / 2) * 160;
      tru.push(i % 2 ? { x: px + 200, y: py + 140, r: 180 } : { x: px, y: py, r: 0 });
    } else if (k === "ring") {
      const i = ring++;
      rect.push({ x: 850, y: 10 + i * 150, r: 0 });
      tru.push({ x: 420, y: 10 + i * 160, r: 0 });
    } else if (k === "disc") {
      const i = disc++;
      rect.push(null); // no room left for a bounding box
      tru.push({ x: 460, y: 50 + i * 160, r: 0 });
    } else {
      const i = rc++;
      rect.push(null);
      tru.push({ x: 575 + (i % 3) * 95, y: 10 + Math.floor(i / 3) * 45, r: 0 });
    }
  });
  return { rect, true: tru };
}
const LAYOUT = layouts();
const SHEET = 980 * 480;
const REMNANT = "M570 190H990V490H570Z M860 10H990V190H860Z";
const REMNANT_AREA = 420 * 300 + 130 * 180;

export default function NestDemo() {
  const { t } = useI18n();
  const d = t.nesting.demo;
  const [mode, setMode] = useState<"rect" | "true">("rect");
  const [run, setRun] = useState(0);
  const [placed, setPlaced] = useState(false);
  const ref = useInView<HTMLDivElement>(() => setRun(1));

  useEffect(() => {
    if (!run) return;
    setPlaced(false);
    const id = window.setTimeout(() => setPlaced(true), 80);
    return () => window.clearTimeout(id);
  }, [run, mode]);

  const layout = LAYOUT[mode];
  const count = layout.filter(Boolean).length;
  const partArea = PARTS.reduce((s, k, i) => s + (layout[i] ? SHAPES[k].area : 0), 0);
  const used = mode === "true" ? SHEET - REMNANT_AREA : SHEET;
  const util = placed ? partArea / used : 0;

  return (
    <div className="demo nest theme-dark" ref={ref}>
      <div className="demo__bar">
        <div className="demo__title">
          <span className="live">LIVE</span>
          {d.title}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <Seg value={mode} options={[["rect", d.rect], ["true", d.true]]} onChange={(m) => (setMode(m), setRun((r) => r + 1))} />
          <button className="btn btn--red btn--sm" onClick={() => setRun((r) => r + 1)}>
            <Icon name="replay" /> {d.run}
          </button>
        </div>
      </div>
      <svg viewBox="0 0 1000 500" role="img" aria-label={d.title}>
        <defs>
          <pattern id="remnant" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="12" height="12" fill="rgba(30,167,232,.08)" />
            <path d="M0 0V12" stroke="rgba(30,167,232,.45)" strokeWidth="2" />
          </pattern>
        </defs>
        <rect className="sheet" x="1" y="1" width="998" height="498" rx="6" />
        {mode === "true" ? (
          <path d={REMNANT} fill="url(#remnant)" style={{ opacity: placed ? 1 : 0, transition: "opacity .8s 1.2s" }} />
        ) : null}
        {PARTS.map((k, i) => {
          const p = layout[i];
          const scatter = { x: 1040 + (i % 4) * 30, y: 30 + ((i * 97) % 420), r: (i * 47) % 360 };
          const at = placed && p ? p : scatter;
          const style: CSSProperties = {
            transform: `translate(${at.x}px, ${at.y}px) rotate(${at.r}deg)`,
            transformBox: "view-box",
            transformOrigin: "0 0",
            opacity: placed && !p ? 0 : 1,
            transitionDelay: `${i * 35}ms`,
          };
          return <path key={i} className="p" d={SHAPES[k].d} fill={SHAPES[k].color} fillRule="evenodd" style={style} />;
        })}
      </svg>
      <div className="demo__bar" style={{ borderBottom: 0, borderTop: "1px solid var(--line)" }}>
        <div className="readout" style={{ alignItems: "center" }}>
          <span>
            {d.utilization}
            <b>{Math.round(util * 100)}%</b>
          </span>
          <span className="gauge" aria-hidden="true">
            <i style={{ transform: `scaleX(${util})` }} />
          </span>
          <span>
            {d.parts}
            <b>
              {placed ? count : 0}/{PARTS.length}
            </b>
          </span>
        </div>
        <span className="muted mono" style={{ fontSize: 11 }}>
          {t.ui.illustrative}
        </span>
      </div>
    </div>
  );
}
