"use client";

import { useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { SectionHead, Steps } from "../ui";
import { Seg } from "../demos/Toolpath";

// Illustrative cost model: shows *how* each driver reacts to the inputs, in
// relative units (reference part = 100). Not real prices.
const MAT = [
  { price: 1, density: 7.85, gas: 0.6, speed: 1 },
  { price: 3.4, density: 7.9, gas: 1.8, speed: 0.75 },
  { price: 2.6, density: 2.7, gas: 1.4, speed: 1.2 },
];
const COLORS = ["#d12329", "#ff8f86", "#ffb347", "#1ea7e8", "#8d8f97"];

function model(qty: number, th: number, m: number) {
  const k = MAT[m];
  const material = 0.9 * th * k.density * k.price; // sheet area fixed
  const speed = (k.speed * 6) / Math.pow(th, 0.85);
  const machining = 38 / speed;
  const piercing = 14 * (0.4 + th * 0.25);
  const energy = (machining * 0.35 + piercing * 0.2) * k.gas;
  const bending = 6 + 180 / qty; // setup amortised over the batch
  return [material, machining, piercing, energy, bending];
}
const BASE = model(50, 3, 0).reduce((a, b) => a + b, 0);

export default function Estimation() {
  const { t } = useI18n();
  const e = t.estimation;
  const [qty, setQty] = useState(50);
  const [th, setTh] = useState(3);
  const [mat, setMat] = useState(0);

  const parts = model(qty, th, mat);
  const total = parts.reduce((a, b) => a + b, 0);
  const max = Math.max(...parts);
  const index = Math.round((total / BASE) * 100);

  return (
    <section id="estimation" className="sec theme-light">
      <div className="wrap">
        <SectionHead index={9} eyebrow={e.eyebrow} title={e.title} lead={e.lead} />

        <div className="grid g3">
          {e.factors.map((f, i) => (
            <article key={i} className={`card spot ${i === 5 ? "card--pink" : ""}`} data-reveal style={{ "--d": i } as CSSProperties}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>

        <div className="demo mt" data-reveal>
          <div className="demo__bar">
            <div className="demo__title">
              <span className="live">LIVE</span>
              {e.demo.title}
            </div>
          </div>
          <div className="cost">
            <div className="cost__controls">
              <label>
                <span>
                  {e.demo.quantity} <output>{qty}</output>
                </span>
                <input
                  type="range"
                  min={1}
                  max={500}
                  value={qty}
                  onChange={(ev) => setQty(Number(ev.target.value))}
                  style={{ "--v": `${(qty / 500) * 100}%` } as CSSProperties}
                />
              </label>
              <label>
                <span>
                  {e.demo.thickness} <output>{th.toFixed(1)} mm</output>
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={12}
                  step={0.5}
                  value={th}
                  onChange={(ev) => setTh(Number(ev.target.value))}
                  style={{ "--v": `${((th - 0.5) / 11.5) * 100}%` } as CSSProperties}
                />
              </label>
              <div style={{ display: "grid", gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{e.demo.material}</span>
                <Seg
                  value={String(mat)}
                  options={e.demo.materials.map((l, i) => [String(i), l] as [string, string])}
                  onChange={(v) => setMat(Number(v))}
                />
              </div>
            </div>
            <div className="cost__bars" aria-live="polite">
              {parts.map((v, i) => (
                <div className="cost__row" key={i}>
                  <span>{e.demo.parts[i]}</span>
                  <span className="track">
                    <i style={{ transform: `scaleX(${v / max})`, background: COLORS[i] }} />
                  </span>
                  <output>{Math.round((v / total) * 100)}%</output>
                </div>
              ))}
              <div className="cost__total">
                <span style={{ fontWeight: 700 }}>{e.demo.total}</span>
                <b>{index}</b>
              </div>
            </div>
          </div>
          <div className="demo__note">{t.ui.illustrative} · 100 = 50 × 3 mm {e.demo.materials[0]}</div>
        </div>

        <div className="grid g3 mt">
          {e.uses.map((u, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <h3 style={{ marginTop: 0, color: "var(--red)" }}>{u.title}</h3>
              <p>{u.text}</p>
            </article>
          ))}
        </div>

        <figure className="quote mt" data-reveal>
          <span className="mark" aria-hidden="true">“</span>
          <blockquote>{e.quote.text}</blockquote>
          <cite>{e.quote.by}</cite>
        </figure>

        <h3 className="h3 mt" data-reveal style={{ marginBottom: 22 }}>
          {e.stepsTitle}
        </h3>
        <Steps items={e.steps} />
      </div>
    </section>
  );
}
