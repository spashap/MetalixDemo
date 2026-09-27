"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { Marquee, SectionHead, reducedMotion, useVisible } from "../ui";

const CAD = ["Creo", "SOLIDWORKS", "Inventor", "AutoCAD", "EPLAN", "Tekla", "STEP", "IGES", "DXF", "DWG"];

export default function Erp() {
  const { t } = useI18n();
  const e = t.erp;
  const [hot, setHot] = useState<{ side: "in" | "out"; i: number } | null>(null);
  const [auto, setAuto] = useState(0);
  const [ref, visible] = useVisible<HTMLDivElement>();

  // Without a pointer, the hub pulses through each data item on its own.
  useEffect(() => {
    if (!visible || hot || reducedMotion()) return;
    const id = window.setInterval(() => setAuto((a) => (a + 1) % 10), 1300);
    return () => window.clearInterval(id);
  }, [visible, hot]);
  const cur = hot ?? { side: auto % 2 ? "out" : "in", i: Math.floor(auto / 2) % 5 };

  const ys = [16, 33, 50, 67, 84];
  return (
    <section id="erp" className="sec theme-light sec--grid">
      <div className="wrap">
        <SectionHead index={11} eyebrow={e.eyebrow} title={e.title} lead={e.lead} />

        <div className="hub" ref={ref} data-reveal>
          <svg className="hub__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {ys.map((y, i) => (
              <g key={i}>
                <path d={`M36 ${y} C 43 ${y}, 44 50, 50 50`} vectorEffect="non-scaling-stroke" />
                <path d={`M50 50 C 56 50, 57 ${y}, 64 ${y}`} vectorEffect="non-scaling-stroke" />
                {cur.side === "in" && cur.i === i ? (
                  <path className="pulse" d={`M36 ${y} C 43 ${y}, 44 50, 50 50`} vectorEffect="non-scaling-stroke" pathLength={260} />
                ) : null}
                {cur.side === "out" && cur.i === i ? (
                  <path className="pulse back" d={`M50 50 C 56 50, 57 ${y}, 64 ${y}`} vectorEffect="non-scaling-stroke" pathLength={260} />
                ) : null}
              </g>
            ))}
          </svg>
          <div className="hub__col">
            <div className="card">
              <h3 style={{ color: "var(--red)" }}>{e.receive.title}</h3>
              <ul>
                {e.receive.items.map((it, i) => (
                  <li
                    key={it}
                    className={cur.side === "in" && cur.i === i ? "on" : ""}
                    onPointerEnter={() => setHot({ side: "in", i })}
                    onPointerLeave={() => setHot(null)}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="hub__core">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="70" fill="var(--card)" stroke="var(--line-2)" />
              <g className="spin">
                <circle cx="100" cy="100" r="86" fill="none" stroke="var(--red-2)" strokeWidth="1.5" strokeDasharray="40 14 4 14" />
              </g>
              <g className="spin rev">
                <circle cx="100" cy="100" r="96" fill="none" stroke="var(--blue)" strokeWidth="1" strokeDasharray="2 6" />
              </g>
            </svg>
            <div className="label">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo.png" alt="" />
              {e.hub}
            </div>
          </div>
          <div className="hub__col hub__col--out">
            <div className="card card--black">
              <h3>{e.writeBack.title}</h3>
              <ul>
                {e.writeBack.items.map((it, i) => (
                  <li
                    key={it}
                    className={cur.side === "out" && cur.i === i ? "on" : ""}
                    onPointerEnter={() => setHot({ side: "out", i })}
                    onPointerLeave={() => setHot(null)}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="muted mono" style={{ fontSize: 12, marginTop: 12, textAlign: "center" }}>
          ERP / MES ⇄ {e.hub} ⇄ {e.shopFloor}
        </p>

        <div className="methods mt" data-reveal>
          <span className="grid-bg" />
          <h3 style={{ position: "relative" }}>{e.methods.title}</h3>
          <ol style={{ position: "relative" }}>
            {e.methods.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ol>
        </div>

        <div className="mt" data-reveal>
          <p style={{ fontWeight: 800, marginBottom: 4 }}>{e.cadLink.title}</p>
          <p className="muted" style={{ marginBottom: 14 }}>
            {e.cadLink.text}
          </p>
          <Marquee items={CAD} dur={30} />
        </div>

        <div className="grid g2 mt">
          <article className="card card--pink spot" data-reveal>
            <h3 style={{ marginTop: 0 }}>{e.proven.title}</h3>
            <p>{e.proven.text}</p>
          </article>
          <article className="card card--black spot" data-reveal style={{ "--d": 1 } as CSSProperties}>
            <h3 style={{ marginTop: 0 }}>{e.fourSteps.title}</h3>
            <ol className="mini-steps">
              {e.fourSteps.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p style={{ marginTop: 12 }}>{e.fourSteps.text}</p>
          </article>
        </div>

        <h3 className="h3 mt" data-reveal style={{ marginBottom: 22 }}>
          {e.openTitle}
        </h3>
        <div className="grid g4">
          {e.open.map((o, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <h3 style={{ marginTop: 0, fontSize: 18 }}>{o.title}</h3>
              <p>{o.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
