"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { Icon, SectionHead, reducedMotion, useVisible } from "../ui";

export default function Factory() {
  const { t } = useI18n();
  const f = t.factory;
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [ref, visible] = useVisible<HTMLDivElement>();
  const n = f.steps.length;

  useEffect(() => {
    if (!playing || !visible || reducedMotion()) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % n), 4200);
    return () => window.clearTimeout(id);
  }, [i, playing, visible, n]);

  const icons = ["doc", "laser", "press"];
  return (
    <section id="factory" className="sec theme-dark sec--grid">
      <div className="wrap">
        <SectionHead index={3} eyebrow={f.eyebrow} title={f.title} lead={f.lead} />

        <div className="flow" ref={ref} data-reveal>
          <div className="flow__track" style={{ "--f": i / (n - 1) } as CSSProperties}>
            <span className="rail-fill" />
            {f.steps.map((s, k) => (
              <button
                key={k}
                className={`flow__node${k === i ? " is-on" : k < i ? " is-done" : ""}`}
                onClick={() => (setI(k), setPlaying(false))}
                aria-pressed={k === i}
              >
                <span className="ring">{String(k + 1).padStart(2, "0")}</span>
                <span className="t">{s.title}</span>
              </button>
            ))}
          </div>

          <div className="card flow__panel spot" aria-live="polite">
            <div className="flow__big swap" key={`n${i}`}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="swap" key={`t${i}-${f.steps[i].title}`}>
              <h3>{f.steps[i].title}</h3>
              <p>{f.steps[i].text}</p>
            </div>
            <div className="flow__ctrl">
              <button className="icon-btn" aria-label="Previous" onClick={() => (setI((i - 1 + n) % n), setPlaying(false))}>
                <Icon name="prev" />
              </button>
              <button className="icon-btn" aria-label={playing ? t.ui.pause : t.ui.play} onClick={() => setPlaying((p) => !p)}>
                <Icon name={playing ? "pause" : "play"} />
              </button>
              <button className="icon-btn" aria-label="Next" onClick={() => (setI((i + 1) % n), setPlaying(false))}>
                <Icon name="next" />
              </button>
            </div>
          </div>
          {/* Every step stays in the document for search engines and screen readers */}
          <ol className="sr-only">
            {f.steps.map((s, k) => (
              <li key={k}>
                {s.title}: {s.text}
              </li>
            ))}
          </ol>
        </div>

        <div className="grid g3 mt">
          {f.kpis.map((k, idx) => (
            <div
              key={idx}
              className={`card spot kpi ${idx < 2 ? "card--red" : ""}`}
              data-reveal
              style={{ "--d": idx, background: idx === 1 ? "var(--red)" : undefined } as CSSProperties}
            >
              <span className="l" style={{ fontSize: 22, fontWeight: 800 }}>
                {k.title}
              </span>
              <span className="t">{k.text}</span>
            </div>
          ))}
        </div>

        <div className="pipe3 mt">
          {f.flow.map((s, k) => (
            <FlowCard key={k} k={k} icon={icons[k]} title={s.title} text={s.text} last={k === f.flow.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowCard({ k, icon, title, text, last }: { k: number; icon: string; title: string; text: string; last: boolean }) {
  const [a, b] = text.split(" · ");
  return (
    <>
      <div className="card spot" data-reveal style={{ "--d": k * 2 } as CSSProperties}>
        <Icon name={icon} />
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p className="muted" style={{ fontSize: 14.5 }}>
          {a}
          {b ? (
            <>
              <br />
              {b}
            </>
          ) : null}
        </p>
      </div>
      {!last ? (
        <div className="arrow" data-reveal style={{ "--d": k * 2 + 1 } as CSSProperties} aria-hidden="true">
          <svg viewBox="0 0 40 16">
            <path d="M0 8h36" stroke="currentColor" strokeWidth="2" />
            <path d="m30 2 6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" style={{ strokeDasharray: "none", animation: "none" }} />
          </svg>
        </div>
      ) : null}
    </>
  );
}
