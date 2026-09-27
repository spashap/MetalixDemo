"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { Count, SectionHead, reducedMotion, useVisible } from "../ui";
import { Seg } from "../demos/Toolpath";

// Machine lanes: [start%, width%, kind]. "wait" = idle, waiting for an NC program.
type Block = [number, number, "run" | "wait"];
const BEFORE: Block[][] = [
  [[0, 14, "run"], [14, 18, "wait"], [32, 20, "run"], [52, 22, "wait"], [74, 18, "run"]],
  [[0, 8, "wait"], [8, 22, "run"], [30, 24, "wait"], [54, 16, "run"], [70, 30, "wait"]],
  [[0, 20, "run"], [20, 26, "wait"], [46, 18, "run"], [64, 20, "wait"], [84, 16, "run"]],
  [[0, 30, "wait"], [30, 20, "run"], [50, 28, "wait"], [78, 22, "run"]],
];
const AFTER: Block[][] = [
  [[0, 31, "run"], [32, 33, "run"], [66, 34, "run"]],
  [[0, 2, "wait"], [2, 40, "run"], [43, 57, "run"]],
  [[0, 45, "run"], [46, 26, "run"], [73, 27, "run"]],
  [[0, 4, "wait"], [4, 30, "run"], [35, 35, "run"], [71, 29, "run"]],
];

export default function Mes() {
  const { t } = useI18n();
  const m = t.mes;
  const [after, setAfter] = useState(false);
  const [tick, setTick] = useState(0);
  const [ref, visible] = useVisible<HTMLDivElement>();

  useEffect(() => {
    if (!visible || reducedMotion()) return;
    const id = window.setInterval(() => setTick((v) => v + 1), 900);
    return () => window.clearInterval(id);
  }, [visible]);

  const lanes = after ? AFTER : BEFORE;
  return (
    <section id="mes" className="sec theme-dark sec--grid">
      <div className="wrap">
        <SectionHead index={10} eyebrow={m.eyebrow} title={m.title} lead={m.lead} />

        <div className="card card--black spot" data-reveal ref={ref} style={{ padding: "clamp(22px,3vw,36px)" }}>
          <h3 style={{ color: "#fff", margin: "0 0 20px", fontSize: 20 }}>{m.pipeline.title}</h3>
          <div className="pipeline">
            {m.pipeline.steps.map((s, i) => (
              <div key={i} className={`st${tick % (m.pipeline.steps.length + 1) === i ? " on" : ""}`}>
                <span className="n">{String(i + 1).padStart(2, "0")} →</span>
                {s}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 18, fontSize: 15 }}>{m.pipeline.note}</p>
        </div>

        <div className="grid g2 mt">
          {[m.tracking, m.stats].map((b, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <h3 style={{ marginTop: 0, color: "var(--salmon)" }}>{b.title}</h3>
              <ul className="ticks">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="card card--red spot" data-reveal>
            <h3 style={{ marginTop: 0 }}>{m.reports.title}</h3>
            <div className="chips">
              {m.reports.items.map((it) => (
                <span key={it} className="chip" style={{ background: "rgba(0,0,0,.18)", borderColor: "rgba(255,255,255,.2)", color: "#fff" }}>
                  {it}
                </span>
              ))}
            </div>
          </article>
          <article className="card spot" data-reveal style={{ "--d": 1 } as CSSProperties}>
            <h3 style={{ marginTop: 0, color: "var(--salmon)" }}>{m.master.title}</h3>
            <p>{m.master.text}</p>
          </article>
        </div>

        <h3 className="h3 mt" data-reveal style={{ marginBottom: 22 }}>
          {m.benefitsTitle}
        </h3>
        <div className="grid g3">
          {m.benefits.map((b, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </article>
          ))}
        </div>

        <div className="demo mt" data-reveal>
          <div className="demo__bar">
            <div className="demo__title" style={{ maxWidth: "60ch" }}>
              <span className="live">{after ? m.toggle[1] : m.toggle[0]}</span>
              <span style={{ fontWeight: 600, fontSize: 15 }}>{after ? m.after : m.before}</span>
            </div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Seg value={after ? "a" : "b"} options={[["b", m.toggle[0]], ["a", m.toggle[1]]]} onChange={(v) => setAfter(v === "a")} />
              <div className="kpi" style={{ textAlign: "right" }}>
                <Count value={m.kpi.value} className="v" />
                <span className="t" style={{ fontSize: 12 }}>
                  {m.kpi.label}
                </span>
              </div>
            </div>
          </div>
          <div className="gantt">
            {lanes.map((lane, i) => (
              <div className="gantt__row" key={i}>
                <span>{m.machinesLabel[i]}</span>
                <div className="gantt__lane">
                  {lane.map(([x, w, k], j) => (
                    <i key={j} className={k} style={{ left: `${x}%`, width: `${w}%` }} title={k === "wait" ? m.idle : undefined} />
                  ))}
                  <span className="now" />
                </div>
              </div>
            ))}
            <div className="gantt__row">
              <span />
              <div className="readout" style={{ gap: 18 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <i style={{ width: 22, height: 10, borderRadius: 3, background: "linear-gradient(90deg,var(--red),var(--red-2))" }} /> NC ▶
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <i style={{ width: 22, height: 10, borderRadius: 3, background: "repeating-linear-gradient(135deg,rgba(255,179,71,.5) 0 4px,rgba(255,179,71,.15) 4px 8px)" }} />
                  {m.idle}
                </span>
              </div>
            </div>
          </div>
          <div className="demo__note">{t.ui.illustrative}</div>
        </div>
      </div>
    </section>
  );
}
