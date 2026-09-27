"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { SectionHead } from "../ui";

export default function Service() {
  const { t } = useI18n();
  const s = t.service;
  const line = useRef<HTMLOListElement>(null);

  // Each milestone lights up as it scrolls into view (vertically or sideways).
  useEffect(() => {
    const root = line.current;
    if (!root) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), {
      threshold: 0.6,
    });
    root.querySelectorAll(".pt").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${i * 80}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <section id="service" className="sec theme-dark sec--grid">
      <div className="wrap">
        <SectionHead index={12} eyebrow={s.eyebrow} title={s.title} lead={s.lead} />

        <div className="card" data-reveal style={{ padding: "clamp(20px,3vw,32px)" }}>
          <h3 style={{ marginTop: 0, color: "var(--salmon)" }}>{s.pathTitle}</h3>
          <ol className="timeline" ref={line} data-lenis-prevent-horizontal>
            {s.path.map((p, i) => (
              <li className="pt" key={i}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <b>{p}</b>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid g3 mt">
          {s.cards.map((c, i) => (
            <article key={i} className="card spot" data-reveal style={{ "--d": i } as CSSProperties}>
              <h3 style={{ marginTop: 0 }}>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>

        <div className="parallax mt" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/factory.webp" alt={s.title} loading="lazy" data-parallax />
        </div>

        <div className="card mt contact" data-reveal id="contact">
          <div>
            <h3 style={{ margin: 0, fontSize: 26 }}>{s.contact.title}</h3>
            <p className="muted" style={{ marginTop: 6 }}>
              {s.contact.company}
            </p>
            <dl>
              <dt>{s.contact.telLabel}</dt>
              <dd>
                <a href="tel:+862134635192">021-34635192</a>
              </dd>
              <dt>{s.contact.emailLabel}</dt>
              <dd>
                <a href="mailto:sales@hymore.com">sales@hymore.com</a>
              </dd>
              <dt>Web</dt>
              <dd>
                <a href="https://www.metalix.net" target="_blank" rel="noreferrer">
                  www.metalix.net
                </a>
              </dd>
            </dl>
            <a className="btn btn--red" href="https://www.metalix.net" target="_blank" rel="noreferrer" style={{ marginTop: 22 }}>
              {s.contact.web} →
            </a>
          </div>
          <div className="qr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/qr.png" alt={s.contact.wechat} width={132} height={132} />
            {s.contact.wechat}
          </div>
        </div>
      </div>
    </section>
  );
}
