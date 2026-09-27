"use client";

import type { CSSProperties } from "react";
import { useI18n } from "../i18n";
import { CapTabs, Kpi, SectionHead } from "../ui";
import Toolpath from "../demos/Toolpath";

export default function CncKad() {
  const { t } = useI18n();
  const c = t.cnckad;
  return (
    <section id="cnckad" className="sec theme-light">
      <div className="wrap">
        <SectionHead index={4} eyebrow={c.eyebrow} title={c.title} lead={c.lead} />

        <div className="grid g2">
          {(["punch", "laser"] as const).map((img, i) => (
            <figure key={img} className="media tilt" data-reveal style={{ "--d": i, margin: 0, aspectRatio: "872/545" } as CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/img/${img}.webp`} alt={c.media[i]} loading="lazy" />
              <figcaption>{c.media[i]}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt theme-dark" data-reveal style={{ borderRadius: "var(--radius-lg)" }}>
          <Toolpath />
        </div>

        <div className="mt">
          <CapTabs groups={c.groups} />
        </div>

        <div className="card card--black mt" data-reveal style={{ padding: "clamp(22px,3vw,36px)" }}>
          <h3 style={{ color: "#fff", margin: "0 0 16px" }}>{c.oneStep.title}</h3>
          <div className="chips">
            {c.oneStep.items.map((it) => (
              <span
                className="chip"
                key={it}
                style={{ background: "rgba(255,255,255,.05)", borderColor: "rgba(255,255,255,.14)", color: "#e1e2e6" }}
              >
                {it}
              </span>
            ))}
          </div>
        </div>

        <div className="grid g3 mt">
          {c.kpis.map((k, i) => (
            <Kpi key={i} value={k.value} label={k.label} text={k.text} d={i} />
          ))}
        </div>

        <div className="ribbon mt" data-reveal>
          <span className="dot" />
          {c.note}
        </div>
      </div>
    </section>
  );
}
