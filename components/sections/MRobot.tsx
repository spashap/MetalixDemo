"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { CapTabs, SectionHead, reducedMotion, useVisible } from "../ui";

export default function MRobot() {
  const { t } = useI18n();
  const r = t.mrobot;
  const [i, setI] = useState(0);
  const [ref, visible] = useVisible<HTMLDivElement>();

  useEffect(() => {
    if (!visible || reducedMotion()) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % r.steps.length), 3800);
    return () => window.clearTimeout(id);
  }, [i, visible, r.steps.length]);

  return (
    <section id="mrobot" className="sec theme-dark">
      <div className="wrap">
        <SectionHead index={6} eyebrow={r.eyebrow} title={r.title} lead={r.lead} />

        <h3 className="h3" data-reveal style={{ marginBottom: 22 }}>
          {r.stepsTitle}
        </h3>
        <div className="robot" ref={ref} data-reveal>
          <figure className="media" style={{ margin: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/mrobot.webp" alt={r.title} loading="lazy" />
            <span className="scan" />
            <div className="robot__hud" aria-hidden="true">
              <span className="mono">CELL · SIM</span>
              <span className="mono">
                {String(i + 1).padStart(2, "0")} / {String(r.steps.length).padStart(2, "0")}
              </span>
            </div>
          </figure>
          <ol className="robot__steps">
            {r.steps.map((s, k) => (
              <li key={k} className={k === i ? "on" : k < i ? "done" : ""}>
                <button onClick={() => setI(k)} aria-pressed={k === i}>
                  <span className="n">{String(k + 1).padStart(2, "0")}</span>
                  <b>{s.title}</b>
                  <span className="t">{s.text}</span>
                  <span className="prog" key={`${i}-${k}`} />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt">
          <CapTabs groups={r.groups} />
        </div>

        <div className="grid g3 mt">
          {r.kpis.map((k, idx) => (
            <div key={idx} className={`card spot kpi ${idx === 0 ? "card--red" : ""}`} data-reveal style={{ "--d": idx } as CSSProperties}>
              <span className="l" style={{ fontSize: 22, fontWeight: 800 }}>
                {k.title}
              </span>
              <span className="t">{k.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
