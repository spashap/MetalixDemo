"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { CapTabs, Icon, Kpi, SectionHead, reducedMotion, useVisible } from "../ui";

const Bend3D = dynamic(() => import("../demos/Bend3D"), { ssr: false });

export default function MBend() {
  const { t } = useI18n();
  const m = t.mbend;
  const [step, setStep] = useState(0); // 0 flat · 1–4 bends done · 5 finished part
  const [auto, setAuto] = useState(true);
  const [deg, setDeg] = useState(0);
  const [active, setActive] = useState(0);
  const [near, setNear] = useState(false);
  const [ref, visible] = useVisible<HTMLDivElement>("300px");

  useEffect(() => {
    if (visible) setNear(true);
  }, [visible]);

  useEffect(() => {
    if (!auto || !visible || reducedMotion()) return;
    const id = window.setTimeout(() => setStep((s) => (s + 1) % 6), step === 5 ? 5000 : step === 0 ? 1600 : 3000);
    return () => window.clearTimeout(id);
  }, [step, auto, visible]);

  const labels = [m.demo.flat, ...[1, 2, 3, 4].map((n) => `${m.demo.bend} ${n}`), m.demo.done];

  return (
    <section id="mbend" className="sec theme-light sec--grid">
      <div className="wrap">
        <SectionHead
          index={5}
          eyebrow={m.eyebrow}
          title={m.title}
          lead={m.lead}
          split
          aside={
            <figure className="media tilt" style={{ margin: 0, aspectRatio: "780/450" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/mbend.webp" alt={m.mediaCaption} loading="lazy" />
              <span className="scan" />
              <figcaption>{m.mediaCaption}</figcaption>
            </figure>
          }
        />

        <div className="demo theme-dark" ref={ref} data-reveal>
          <div className="demo__bar">
            <div className="demo__title">
              <span className="live">3D</span>
              {m.demo.title}
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div className="bend-steps" role="group" aria-label={m.demo.title}>
                {labels.map((l, i) => (
                  <button key={i} aria-pressed={step === i} onClick={() => (setStep(i), setAuto(false))}>
                    {l}
                  </button>
                ))}
              </div>
              <button className="icon-btn" onClick={() => setAuto((a) => !a)} aria-label={auto ? t.ui.pause : t.ui.play}>
                <Icon name={auto ? "pause" : "play"} />
              </button>
            </div>
          </div>
          <div className="bend3d">
            {near ? (
              <Bend3D
                step={step}
                onAngle={(d, a) => {
                  setDeg(d);
                  setActive(a);
                }}
              />
            ) : null}
            <div className="angle">
              {step >= 5 ? m.demo.done : `${m.demo.bend} ${Math.min(4, active + 1)}`}
              <b>{deg}°</b>
            </div>
            <div className="hint">{m.demo.hint}</div>
          </div>
        </div>

        <div className="mt">
          <CapTabs groups={m.groups} />
        </div>

        <div className="card card--black mt spot" data-reveal style={{ padding: "clamp(24px,3.5vw,44px)" }}>
          <h3 style={{ color: "#fff", fontSize: "clamp(22px,2.4vw,30px)", margin: "0 0 10px" }}>{m.banner.title}</h3>
          <p style={{ fontSize: 17 }}>{m.banner.text}</p>
        </div>

        <div className="grid g3 mt">
          {m.kpis.map((k, i) => {
            const [label, text] = k.text.split(" · ");
            return <Kpi key={i} value={k.value} label={label} text={text} d={i} />;
          })}
        </div>

        <h3 className="h3 mt" data-reveal style={{ marginBottom: 22 }}>
          {m.coreTitle}
        </h3>
        <div className="grid g4">
          {m.core.map((c, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ fontSize: 18 }}>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
