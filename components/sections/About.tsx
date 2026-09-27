"use client";

import type { CSSProperties } from "react";
import { useI18n } from "../i18n";
import { Count, Marquee, SectionHead } from "../ui";

export default function About() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <section id="about" className="sec theme-light sec--grid">
      <div className="wrap">
        <SectionHead index={2} eyebrow={a.eyebrow} title={a.title} lead={a.lead} />

        <div className="grid g4">
          {a.stats.map((s, i) => (
            <div key={i} className="card spot kpi stat" data-reveal style={{ "--d": i } as CSSProperties}>
              <span className="glow" />
              <Count value={s.value} className="v" />
              <span className="l">{s.label}</span>
              <span className="t">{s.text}</span>
            </div>
          ))}
        </div>

        <figure className="quote mt" data-reveal>
          <span className="mark" aria-hidden="true">“</span>
          <blockquote>{a.quote.text}</blockquote>
          <cite>{a.quote.by}</cite>
        </figure>

        <h3 className="h3 mt" data-reveal style={{ marginBottom: 22 }}>
          {a.whyTitle}
        </h3>
        <div className="grid g2">
          {a.why.map((w, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </article>
          ))}
        </div>

        <div className="mt" data-reveal>
          <p className="muted" style={{ fontSize: 14, marginBottom: 12, fontWeight: 600 }}>
            {a.machinesTitle}
          </p>
          <Marquee items={a.machines} dur={45} />
        </div>
      </div>
    </section>
  );
}
