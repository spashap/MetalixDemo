"use client";

import { useEffect, useRef } from "react";

type Pt = [number, number];
type Contour = { pts: Pt[]; len: number; cum: number[] };
type Part = { contours: Contour[]; dx: number; dy: number; done: boolean; doneAt: number };
export type HeroStats = { phase: 0 | 1 | 2 | 3; parts: number; length: number };

const W = 1600;
const H = 900;

function contour(pts: Pt[]): Contour {
  const closed = [...pts, pts[0]];
  const cum = [0];
  for (let i = 1; i < closed.length; i++) {
    const [ax, ay] = closed[i - 1];
    const [bx, by] = closed[i];
    cum.push(cum[i - 1] + Math.hypot(bx - ax, by - ay));
  }
  return { pts: closed, len: cum[cum.length - 1], cum };
}
const circle = (cx: number, cy: number, r: number, n = 40): Pt[] =>
  Array.from({ length: n }, (_, i) => [cx + r * Math.cos((i / n) * Math.PI * 2), cy + r * Math.sin((i / n) * Math.PI * 2)]);
function rrect(x: number, y: number, w: number, h: number, r: number): Pt[] {
  const out: Pt[] = [];
  const arc = (cx: number, cy: number, a0: number) => {
    for (let i = 0; i <= 6; i++) {
      const a = a0 + (i / 6) * (Math.PI / 2);
      out.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
  };
  arc(x + w - r, y + r, -Math.PI / 2);
  arc(x + w - r, y + h - r, 0);
  arc(x + r, y + h - r, Math.PI / 2);
  arc(x + r, y + r, Math.PI);
  return out;
}
function stadium(x: number, y: number, w: number, h: number): Pt[] {
  return rrect(x, y, w, h, h / 2);
}

function makePart(kind: number, x: number, y: number, w: number, h: number): Contour[] {
  const holes: Pt[][] = [];
  let outer: Pt[];
  switch (kind) {
    case 0: // mounting plate
      outer = rrect(x, y, w, h, 10);
      holes.push(circle(x + 18, y + 18, 7, 16), circle(x + w - 18, y + 18, 7, 16), circle(x + 18, y + h - 18, 7, 16), circle(x + w - 18, y + h - 18, 7, 16));
      holes.push(stadium(x + w * 0.3, y + h * 0.42, w * 0.4, h * 0.16));
      break;
    case 1: {
      // flange ring
      const r = Math.min(w, h) / 2;
      outer = circle(x + w / 2, y + h / 2, r, 56);
      holes.push(circle(x + w / 2, y + h / 2, r * 0.45, 40));
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        holes.push(circle(x + w / 2 + Math.cos(a) * r * 0.74, y + h / 2 + Math.sin(a) * r * 0.74, 6, 12));
      }
      break;
    }
    case 2: // L bracket
      outer = [
        [x, y],
        [x + w * 0.38, y],
        [x + w * 0.38, y + h * 0.62],
        [x + w, y + h * 0.62],
        [x + w, y + h],
        [x, y + h],
      ];
      holes.push(circle(x + w * 0.19, y + h * 0.25, 8, 16), circle(x + w * 0.75, y + h * 0.81, 8, 16));
      break;
    case 3: // gusset
      outer = [
        [x, y + h],
        [x, y + 14],
        [x + 14, y],
        [x + w * 0.35, y],
        [x + w, y + h * 0.65],
        [x + w, y + h],
      ];
      holes.push(circle(x + w * 0.3, y + h * 0.62, Math.min(w, h) * 0.14, 24));
      break;
    default: // vent panel
      outer = rrect(x, y, w, h, 6);
      for (let i = 0; i < 4; i++) holes.push(stadium(x + w * 0.15, y + h * (0.16 + i * 0.19), w * 0.7, h * 0.08));
  }
  return [...holes.map(contour), contour(outer)];
}

function layout(): Part[] {
  const parts: Part[] = [];
  const cols = 6;
  const rows = 4;
  const cw = 1380 / cols;
  const ch = 760 / rows;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      if (Math.random() < 0.08) continue;
      const kind = (Math.random() * 5) | 0;
      const w = cw * (0.7 + Math.random() * 0.2);
      const h = ch * (0.7 + Math.random() * 0.2);
      const x = 110 + c * cw + (cw - w) / 2;
      const y = 70 + r * ch + (ch - h) / 2;
      parts.push({
        contours: makePart(kind, x, y, w, h),
        dx: (Math.random() - 0.5) * 900,
        dy: -500 - Math.random() * 400,
        done: false,
        doneAt: 0,
      });
    }
  // cut in a serpentine order, like a real sequence optimiser would
  return parts.sort((a, b) => {
    const ay = Math.floor(a.contours[a.contours.length - 1].pts[0][1] / ch);
    const by = Math.floor(b.contours[b.contours.length - 1].pts[0][1] / ch);
    if (ay !== by) return ay - by;
    const ax = a.contours[a.contours.length - 1].pts[0][0];
    const bx = b.contours[b.contours.length - 1].pts[0][0];
    return ay % 2 ? bx - ax : ax - bx;
  });
}

function pointAt(c: Contour, d: number): Pt {
  let i = 1;
  while (i < c.cum.length - 1 && c.cum[i] < d) i++;
  const t = (d - c.cum[i - 1]) / Math.max(1e-6, c.cum[i] - c.cum[i - 1]);
  const [ax, ay] = c.pts[i - 1];
  const [bx, by] = c.pts[i];
  return [ax + (bx - ax) * t, ay + (by - ay) * t];
}

function tracePartial(ctx: CanvasRenderingContext2D, c: Contour, d: number) {
  ctx.beginPath();
  ctx.moveTo(c.pts[0][0], c.pts[0][1]);
  let i = 1;
  while (i < c.cum.length && c.cum[i] <= d) {
    ctx.lineTo(c.pts[i][0], c.pts[i][1]);
    i++;
  }
  const [px, py] = pointAt(c, d);
  ctx.lineTo(px, py);
}

export default function HeroCanvas({ onStats, running }: { onStats: (s: HeroStats) => void; running: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const runRef = useRef(running);
  runRef.current = running;
  const statsCb = useRef(onStats);
  statsCb.current = onStats;

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = 1;
    let scale = 1;
    let ox = 0;
    let oy = 0;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      cv.width = r.width * dpr;
      cv.height = r.height * dpr;
      scale = Math.max(r.width / W, r.height / H);
      ox = (r.width - W * scale) / 2;
      oy = (r.height - H * scale) / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    let parts = layout();
    let mode: "laser" | "punch" = "laser";
    let phase: HeroStats["phase"] = 0;
    let phaseStart = performance.now();
    let pi = 0;
    let ci = 0;
    let dist = 0;
    let cutTotal = 0;
    let head: Pt = [W / 2, -60];
    let rapidFrom: Pt | null = null;
    let rapidT = 0;
    const sparks: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const hits: Pt[] = [];
    let last = performance.now();
    let raf = 0;
    let lastStats = 0;

    const speed = 520; // units / second
    const setPhase = (p: HeroStats["phase"]) => {
      phase = p;
      phaseStart = performance.now();
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!runRef.current || reduce) {
        last = now;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const pt = (now - phaseStart) / 1000;

      // ── simulation ──
      if (phase === 0 && pt > 1.4) setPhase(mode === "laser" ? 1 : 2);
      if ((phase === 1 || phase === 2) && pi < parts.length) {
        const part = parts[pi];
        const c = part.contours[ci];
        if (rapidFrom) {
          rapidT += dt * 3.2;
          const t = Math.min(1, rapidT);
          const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          head = [rapidFrom[0] + (c.pts[0][0] - rapidFrom[0]) * e, rapidFrom[1] + (c.pts[0][1] - rapidFrom[1]) * e];
          if (t >= 1) rapidFrom = null;
        } else {
          const step = speed * dt * (mode === "punch" ? 1.4 : 1);
          const before = dist;
          dist = Math.min(c.len, dist + step);
          cutTotal += dist - before;
          head = pointAt(c, dist);
          if (mode === "punch") {
            const pitch = 16;
            for (let d = Math.ceil(before / pitch) * pitch; d <= dist; d += pitch) hits.push(pointAt(c, d));
          } else {
            for (let k = 0; k < 3; k++)
              sparks.push({ x: head[0], y: head[1], vx: (Math.random() - 0.5) * 260, vy: (Math.random() - 0.3) * 260, life: 1 });
          }
          if (dist >= c.len) {
            dist = 0;
            ci++;
            if (ci >= part.contours.length) {
              part.done = true;
              part.doneAt = now;
              ci = 0;
              pi++;
            }
            if (pi < parts.length) {
              rapidFrom = head;
              rapidT = 0;
            }
          }
        }
        if (pi >= parts.length) setPhase(3);
      }
      if (phase === 3 && pt > 2.2) {
        parts = layout();
        mode = mode === "laser" ? "punch" : "laser";
        pi = ci = 0;
        dist = 0;
        hits.length = 0;
        rapidFrom = head;
        rapidT = 0;
        setPhase(0);
      }

      // ── render ──
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, dpr * ox, dpr * oy);

      // sheet
      ctx.fillStyle = "#121317";
      ctx.fillRect(60, 30, W - 120, H - 60);
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 60; x <= W - 60; x += 40) (ctx.moveTo(x, 30), ctx.lineTo(x, H - 30));
      for (let y = 30; y <= H - 30; y += 40) (ctx.moveTo(60, y), ctx.lineTo(W - 60, y));
      ctx.stroke();

      const nestIn = phase === 0 ? Math.min(1, pt / 1.3) : 1;
      const ease = 1 - Math.pow(1 - nestIn, 3);
      const unload = phase === 3 ? Math.min(1, pt / 1.8) : 0;

      parts.forEach((p, idx) => {
        const offX = phase === 0 ? p.dx * (1 - ease) : phase === 3 ? unload * unload * 1400 : 0;
        const offY = phase === 0 ? p.dy * (1 - ease) : 0;
        const alpha = phase === 0 ? ease : 1 - unload;
        ctx.save();
        ctx.translate(offX, offY);
        ctx.globalAlpha = alpha;
        const outer = p.contours[p.contours.length - 1];
        if (p.done) {
          const age = Math.min(1, (now - p.doneAt) / 900);
          ctx.fillStyle = `rgba(185,195,210,${0.1 + 0.06 * (1 - age)})`;
          ctx.beginPath();
          outer.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          p.contours.slice(0, -1).forEach((h) => h.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))));
          ctx.fill("evenodd");
        }
        p.contours.forEach((c, k) => {
          const isCur = idx === pi && k === ci && (phase === 1 || phase === 2) && !rapidFrom;
          const cut = p.done || idx < pi || (idx === pi && k < ci);
          ctx.beginPath();
          c.pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          if (cut) {
            const age = p.done ? Math.min(1, (now - p.doneAt) / 1400) : 0;
            ctx.strokeStyle = age < 1 ? `rgba(255,${150 + 60 * age},${70 + 150 * age},${0.95 - age * 0.3})` : "rgba(120,190,235,0.65)";
            ctx.lineWidth = 1.8;
          } else {
            ctx.strokeStyle = "rgba(255,255,255,0.16)";
            ctx.setLineDash([4, 6]);
            ctx.lineWidth = 1;
          }
          ctx.stroke();
          ctx.setLineDash([]);
          if (isCur && mode === "laser") {
            tracePartial(ctx, c, dist);
            ctx.strokeStyle = "#ffb347";
            ctx.lineWidth = 2.6;
            ctx.shadowColor = "rgba(255,120,40,0.95)";
            ctx.shadowBlur = 14;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        });
        ctx.restore();
      });

      // punch hits
      if (hits.length && phase !== 3) {
        ctx.fillStyle = "rgba(255,143,134,0.9)";
        hits.forEach(([x, y]) => ctx.fillRect(x - 4, y - 4, 8, 8));
      }

      // rapid traverse
      if (rapidFrom && (phase === 1 || phase === 2) && pi < parts.length) {
        const target = parts[pi].contours[ci].pts[0];
        ctx.strokeStyle = "rgba(30,167,232,0.5)";
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.moveTo(head[0], head[1]);
        ctx.lineTo(target[0], target[1]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // sparks
      ctx.globalCompositeOperation = "lighter";
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= dt * 2.4;
        s.vy += 600 * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(255,${160 + 80 * s.life},${60 * s.life},${s.life})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 0.025, s.y - s.vy * 0.025);
        ctx.stroke();
      }

      // head
      if (phase === 1 || phase === 2) {
        const [hx, hy] = head;
        const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, mode === "laser" ? 46 : 30);
        g.addColorStop(0, mode === "laser" ? "rgba(255,255,255,1)" : "rgba(255,200,200,0.9)");
        g.addColorStop(0.15, mode === "laser" ? "rgba(255,170,80,0.9)" : "rgba(209,35,41,0.7)");
        g.addColorStop(1, "rgba(255,80,20,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(hx, hy, 46, 0, Math.PI * 2);
        ctx.fill();
        if (mode === "punch") {
          ctx.strokeStyle = "rgba(255,255,255,0.8)";
          ctx.strokeRect(hx - 9, hy - 9, 18, 18);
        }
      }
      ctx.globalCompositeOperation = "source-over";

      if (now - lastStats > 120) {
        lastStats = now;
        statsCb.current({
          phase: phase === 0 ? 0 : phase === 1 ? 1 : phase === 2 ? 2 : 3,
          parts: parts.filter((p) => p.done).length,
          length: cutTotal / 1000,
        });
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" />;
}
