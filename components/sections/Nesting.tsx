"use client";

import { useRef, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { CapTabs, Kpi, SectionHead } from "../ui";
import NestDemo from "../demos/NestDemo";

export default function Nesting() {
  const { t } = useI18n();
  const n = t.nesting;
  const glass = useRef<HTMLSpanElement>(null);

  return (
    <section id="nesting" className="sec theme-light sec--grid">
      <div className="wrap">
        <SectionHead index={8} eyebrow={n.eyebrow} title={n.title} lead={n.lead} />

        {/* Magnifier: the real AutoNesting Pro nest, inspectable part by part */}
        <div
          className="lens"
          data-reveal
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - r.left;
            const y = e.clientY - r.top;
            const g = glass.current;
            if (!g) return;
            const z = 2.6;
            g.style.left = `${x}px`;
            g.style.top = `${y}px`;
            g.style.backgroundSize = `${r.width * z}px ${r.height * z}px`;
            g.style.backgroundPosition = `${-x * z + 110}px ${-y * z + 110}px`;
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/nesting.webp" alt={n.title} loading="lazy" />
          <span className="lens__glass" ref={glass} style={{ backgroundImage: "url(/img/nesting.webp)" }} />
        </div>

        <div className="mt" data-reveal>
          <NestDemo />
        </div>

        <div className="mt">
          <CapTabs groups={n.groups} />
        </div>

        <div className="grid g2 mt">
          <article className="card card--black spot" data-reveal>
            <h3 style={{ marginTop: 0 }}>{n.exclusive.title}</h3>
            <p>{n.exclusive.text}</p>
          </article>
          <article className="card card--pink spot" data-reveal style={{ "--d": 1 } as CSSProperties}>
            <h3 style={{ marginTop: 0 }}>{n.proven.title}</h3>
            <p>{n.proven.text}</p>
          </article>
        </div>

        <div className="grid g3 mt">
          {n.kpis.map((k, i) => (
            <Kpi key={i} value={k.value} label={k.label} text={k.text} tone="light" d={i} />
          ))}
        </div>

        <div className="ribbon mt" data-reveal>
          <span className="dot" />
          {n.note}
        </div>
      </div>
    </section>
  );
}
