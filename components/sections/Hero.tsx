"use client";

import dynamic from "next/dynamic";
import { useRef, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { useNav } from "../chrome";
import { Icon, useVisible } from "../ui";
import type { HeroStats } from "../demos/HeroCanvas";

const HeroCanvas = dynamic(() => import("../demos/HeroCanvas"), { ssr: false });

const PRODUCTS = ["AutoNesting Pro", "Common-Line Cutting", "cncKad", "Estimation", "MBend", "MRobot", "MTube", "JobTrack", "ERP/MES API"];

export default function Hero() {
  const { t } = useI18n();
  const { go } = useNav();
  const [ref, visible] = useVisible<HTMLElement>();
  const [stats, setStats] = useState<HeroStats>({ phase: 0, parts: 0, length: 0 });
  const bed = useRef<HTMLDivElement>(null);

  const hudPhase = stats.phase === 3 ? 3 : stats.phase;
  return (
    <section
      id="hero"
      ref={ref}
      className="hero theme-dark"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        bed.current?.style.setProperty("--rx", `${x * 6}deg`);
        bed.current?.style.setProperty("--ry", `${-y * 6}deg`);
      }}
    >
      <div className="hero__canvas">
        <div className="bed" ref={bed}>
          <HeroCanvas running={visible} onStats={setStats} />
        </div>
      </div>
      <svg className="hero__rings" viewBox="0 0 400 400" aria-hidden="true">
        <g>
          <circle cx="200" cy="200" r="196" strokeWidth="0.6" strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="150" strokeWidth="0.8" strokeOpacity="0.5" />
        </g>
        <g>
          <circle cx="200" cy="200" r="175" strokeWidth="1.5" strokeDasharray="60 30 4 30" strokeOpacity="0.6" />
          <circle cx="200" cy="200" r="110" strokeWidth="0.6" strokeDasharray="1 4" />
        </g>
      </svg>
      <div className="hero__shade" />

      <div className="wrap">
        <div className="hero__eyebrow">
          <span>{t.hero.eyebrow[0]}</span>
          <i />
          <span>{t.hero.eyebrow[1]}</span>
        </div>
        <h1>
          {t.hero.title.map((line, i) => (
            <span className="line" key={`${line}-${i}`}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="lead">{t.hero.lead}</p>
        <div className="hero__cta">
          <a className="btn btn--red" href="#about" onClick={(e) => (e.preventDefault(), go("about"))}>
            {t.hero.cta} <Icon name="arrow" />
          </a>
          <a className="btn btn--line" href="#factory" onClick={(e) => (e.preventDefault(), go("factory"))}>
            {t.hero.cta2}
          </a>
        </div>
        <div className="hero__products">
          <div className="chips">
            {PRODUCTS.map((p, i) => (
              <span className="chip" key={p} style={{ animation: `fadeUp .7s ${0.7 + i * 0.05}s var(--ease) both` } as CSSProperties}>
                {p}
              </span>
            ))}
          </div>
          <div className="hero__tag">{t.ui.tagline}</div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="mouse" />
        {t.ui.scroll}
      </div>
      <div className="hero__hud" aria-hidden="true">
        {t.hero.hud.map((h, i) => (
          <div key={h} className={i === hudPhase ? "on" : ""}>
            {h}
            <b>{i === hudPhase ? "●" : "○"}</b>
          </div>
        ))}
        <div>
          Parts
          <b>{String(stats.parts).padStart(2, "0")}</b>
        </div>
        <div>
          Path m
          <b>{stats.length.toFixed(1)}</b>
        </div>
      </div>
    </section>
  );
}
