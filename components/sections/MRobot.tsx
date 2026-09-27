"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "../i18n";
import { CapTabs, Icon, SectionHead, reducedMotion, useVisible } from "../ui";

const VIDEO = "irELBj5UiWE";
const VIDEO_TITLE = "MRobot EPTA Robotic Bending Simulation";

export default function MRobot() {
  const { t } = useI18n();
  const r = t.mrobot;
  const [i, setI] = useState(0);
  // "auto": started muted by scrolling into view (browsers only allow muted autoplay).
  // "click": started by the play button, so sound is allowed.
  const [playing, setPlaying] = useState<false | "auto" | "click">(false);
  const player = useRef<HTMLIFrameElement>(null);
  const [ref, visible] = useVisible<HTMLDivElement>();

  useEffect(() => {
    if (!visible || reducedMotion()) return;
    const id = window.setTimeout(() => setI((v) => (v + 1) % r.steps.length), 3800);
    return () => window.clearTimeout(id);
  }, [i, visible, r.steps.length]);

  useEffect(() => {
    if (visible && !playing && !reducedMotion()) setPlaying("auto");
  }, [visible, playing]);

  // Pause off-screen, resume on return (YouTube iframe API via postMessage).
  useEffect(() => {
    if (!playing) return;
    player.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: visible ? "playVideo" : "pauseVideo", args: [] }),
      "*",
    );
  }, [visible, playing]);

  return (
    <section id="mrobot" className="sec theme-dark">
      <div className="wrap">
        <SectionHead index={6} eyebrow={r.eyebrow} title={r.title} lead={r.lead} />

        <h3 className="h3" data-reveal style={{ marginBottom: 22 }}>
          {r.stepsTitle}
        </h3>
        <div className="robot" ref={ref} data-reveal>
          <figure className={`media robot__video${playing ? " is-playing" : ""}`} style={{ margin: 0 }}>
            {playing ? (
              <iframe
                ref={player}
                src={`https://www.youtube-nocookie.com/embed/${VIDEO}?autoplay=1&mute=${playing === "auto" ? 1 : 0}&loop=1&playlist=${VIDEO}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
                title={VIDEO_TITLE}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              // Thumbnail only: the YouTube player (and its cookies) load when the visitor asks for it.
              <button className="robot__poster" onClick={() => setPlaying("click")} aria-label={`${t.ui.play}: ${VIDEO_TITLE}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/mrobot.webp" alt="" loading="lazy" />
                <span className="scan" />
                <span className="robot__play" aria-hidden="true">
                  <Icon name="play" />
                </span>
                <span className="robot__caption">
                  <span className="mono">▶ YouTube</span>
                  {VIDEO_TITLE}
                </span>
                <span className="robot__hud" aria-hidden="true">
                  <span className="mono">CELL · SIM</span>
                  <span className="mono">
                    {String(i + 1).padStart(2, "0")} / {String(r.steps.length).padStart(2, "0")}
                  </span>
                </span>
              </button>
            )}
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
