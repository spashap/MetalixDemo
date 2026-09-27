"use client";

import { useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { Icon, SectionHead } from "../ui";

export default function MTube() {
  const { t } = useI18n();
  const m = t.mtube;
  const [x, setX] = useState(50);
  return (
    <section id="mtube" className="sec theme-light">
      <div className="wrap">
        <SectionHead index={7} eyebrow={m.eyebrow} title={m.title} lead={m.lead} />

        <div data-reveal>
          <div className="compare" style={{ "--x": `${x}%` } as CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/mtube-sim.webp" alt={m.media[1]} loading="lazy" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="top" src="/img/mtube-design.webp" alt={m.media[0]} loading="lazy" />
            <span className="lab l">{m.media[0]}</span>
            <span className="lab r">{m.media[1]}</span>
            <span className="handle">
              <span className="knob">
                <Icon name="swap" />
              </span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              aria-label={m.compareHint}
            />
          </div>
          <p className="muted mono" style={{ fontSize: 12, marginTop: 10 }}>
            ⟷ {m.compareHint}
          </p>
        </div>

        <div className="grid g3 mt">
          {m.cards.map((c, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <span className="num">{c.tag}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>

        <div className="card card--black mt" data-reveal style={{ padding: "clamp(22px,3vw,36px)" }}>
          <h3 style={{ color: "#fff", margin: "0 0 18px", fontSize: 22 }}>{m.flowTitle}</h3>
          <div className="chev">
            {m.flow.map((s, i) => (
              <div key={i} className="chev__item" style={{ "--i": i } as CSSProperties}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid g2 mt">
          {m.extras.map((c, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <h3 style={{ marginTop: 0 }}>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
