"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// A tray folded in four bends. Tooling stays fixed on the X axis; the part is
// repositioned so each bend line sits under the punch — as on a real press brake.
type Bend = { rotY: number; pos: THREE.Vector3; axis: "x" | "z"; sign: number };
const T = 2.2; // sheet thickness (scene units)

const BENDS: Bend[] = [
  { rotY: Math.PI / 2, pos: new THREE.Vector3(0, 0, -100), axis: "z", sign: -1 }, // left
  { rotY: -Math.PI / 2, pos: new THREE.Vector3(0, 0, -100), axis: "z", sign: 1 }, // right
  { rotY: 0, pos: new THREE.Vector3(0, 0, -60), axis: "x", sign: -1 }, // front
  { rotY: Math.PI, pos: new THREE.Vector3(0, 0, -60), axis: "x", sign: 1 }, // back
];

export default function Bend3D({ step, onAngle }: { step: number; onAngle: (deg: number, active: number) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;
  const angleCb = useRef(onAngle);
  angleCb.current = onAngle;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setFailed(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(34, 16 / 9, 1, 3000);
    const orbit = { az: 0.75, el: 0.5, r: 600, taz: 0.75, tel: 0.5 };

    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(200, 400, 250);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -300, right: 300, top: 300, bottom: -300 });
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xff5a5a, 1.4);
    rim.position.set(-300, 120, -250);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x4fc3ff, 0.8);
    fill.position.set(300, 60, -100);
    scene.add(fill);

    const grid = new THREE.GridHelper(900, 36, 0x3a3c44, 0x23252b);
    grid.position.y = -92;
    scene.add(grid);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(900, 900), new THREE.ShadowMaterial({ opacity: 0.35 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -91.9;
    floor.receiveShadow = true;
    scene.add(floor);

    // ── part ──
    const steel = new THREE.MeshStandardMaterial({ color: 0xc3c9d1, metalness: 0.9, roughness: 0.32 });
    const edge = new THREE.LineBasicMaterial({ color: 0x0b0c0e, transparent: true, opacity: 0.35 });
    const box = (w: number, h: number, d: number, x: number, y: number, z: number) => {
      const g = new THREE.BoxGeometry(w, h, d);
      const m = new THREE.Mesh(g, steel);
      m.position.set(x, y, z);
      m.castShadow = m.receiveShadow = true;
      m.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), edge));
      return m;
    };
    const part = new THREE.Group();
    part.add(box(200, T, 120, 0, 0, 0));
    const pivots: THREE.Group[] = [];
    const flange = (px: number, pz: number, mesh: THREE.Mesh) => {
      const p = new THREE.Group();
      p.position.set(px, 0, pz);
      p.add(mesh);
      part.add(p);
      pivots.push(p);
    };
    flange(-100, 0, box(30, T, 120, -15, 0, 0));
    flange(100, 0, box(30, T, 120, 15, 0, 0));
    flange(0, 60, box(200, T, 40, 0, 0, 20));
    flange(0, -60, box(200, T, 40, 0, 0, -20));
    // holes in the base read as a real part
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x0b0c0e });
    [-60, 60].forEach((x) => {
      const h = new THREE.Mesh(new THREE.CircleGeometry(9, 32), holeMat);
      h.rotation.x = -Math.PI / 2;
      h.position.set(x, T / 2 + 0.05, 0);
      part.add(h);
    });
    scene.add(part);

    // ── tooling ──
    const toolMat = new THREE.MeshStandardMaterial({ color: 0x2a2d34, metalness: 0.6, roughness: 0.45 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xd12329, metalness: 0.3, roughness: 0.4, emissive: 0x400000 });
    const tooling = new THREE.Group();
    const punchShape = new THREE.Shape();
    punchShape.moveTo(0, 0);
    punchShape.lineTo(-10, 26);
    punchShape.lineTo(-10, 90);
    punchShape.lineTo(10, 90);
    punchShape.lineTo(10, 26);
    punchShape.closePath();
    const punchGeo = new THREE.ExtrudeGeometry(punchShape, { depth: 300, bevelEnabled: false });
    punchGeo.translate(0, 0, -150);
    const punch = new THREE.Mesh(punchGeo, toolMat);
    punch.rotation.y = Math.PI / 2;
    punch.castShadow = true;
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(300, 6, 21), redMat);
    stripe.position.y = 70;
    const punchG = new THREE.Group();
    punchG.add(punch, stripe);
    tooling.add(punchG);
    const dieShape = new THREE.Shape();
    dieShape.moveTo(-26, -T / 2);
    dieShape.lineTo(-6, -T / 2);
    dieShape.lineTo(0, -12);
    dieShape.lineTo(6, -T / 2);
    dieShape.lineTo(26, -T / 2);
    dieShape.lineTo(26, -60);
    dieShape.lineTo(-26, -60);
    dieShape.closePath();
    const dieGeo = new THREE.ExtrudeGeometry(dieShape, { depth: 300, bevelEnabled: false });
    dieGeo.translate(0, 0, -150);
    const die = new THREE.Mesh(dieGeo, toolMat);
    die.rotation.y = Math.PI / 2;
    die.receiveShadow = true;
    tooling.add(die);
    const laserLine = new THREE.Mesh(
      new THREE.BoxGeometry(320, 0.6, 0.6),
      new THREE.MeshBasicMaterial({ color: 0xff4d4d, transparent: true, opacity: 0.9 }),
    );
    laserLine.position.y = T / 2 + 0.4;
    tooling.add(laserLine);
    scene.add(tooling);

    // ── state machine ──
    const angles = [0, 0, 0, 0];
    let shown = 0; // bends currently completed on screen
    let anim: { from: number; to: number; t: number } | null = null;
    let punchY = 60;
    const targetPos = new THREE.Vector3();
    let targetRotY = 0;
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const setFlange = (i: number, a: number) => {
      angles[i] = a;
      const b = BENDS[i];
      if (b.axis === "z") pivots[i].rotation.z = b.sign * a;
      else pivots[i].rotation.x = b.sign * a;
    };
    const alignTo = (i: number) => {
      const b = BENDS[Math.max(0, Math.min(3, i))];
      targetRotY = b.rotY;
      targetPos.copy(b.pos);
    };
    alignTo(0);
    part.rotation.y = targetRotY;
    part.position.copy(targetPos);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // drag to orbit
    let drag: { x: number; y: number } | null = null;
    const down = (e: PointerEvent) => {
      drag = { x: e.clientX, y: e.clientY };
      el.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      orbit.taz -= (e.clientX - drag.x) * 0.008;
      orbit.tel = Math.max(0.12, Math.min(1.3, orbit.tel + (e.clientY - drag.y) * 0.006));
      drag = { x: e.clientX, y: e.clientY };
    };
    const up = () => (drag = null);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    let last = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible) return;

      const want = Math.min(4, stepRef.current);
      const finished = stepRef.current >= 5;
      if (!anim && want !== shown) {
        if (want === shown + 1 && !reduce) anim = { from: shown, to: want, t: 0 };
        else {
          for (let i = 0; i < 4; i++) setFlange(i, i < want ? Math.PI / 2 : 0);
          shown = want;
          alignTo(Math.min(3, want));
        }
      }
      let active = Math.min(3, shown);
      let deg = shown > 0 ? 90 : 0;
      if (anim) {
        const i = anim.from; // bend being made
        active = i;
        anim.t += dt / 2.6;
        const t = Math.min(1, anim.t);
        alignTo(i);
        if (t < 0.3) punchY = 60;
        else if (t < 0.42) punchY = 60 - ((t - 0.3) / 0.12) * 58;
        else if (t < 0.82) {
          const k = ease((t - 0.42) / 0.4);
          setFlange(i, (k * Math.PI) / 2);
          punchY = 2 - k * 6;
        } else punchY = -4 + ((t - 0.82) / 0.18) * 64;
        deg = Math.round((angles[i] * 180) / Math.PI);
        if (t >= 1) {
          setFlange(i, Math.PI / 2);
          shown = anim.to;
          anim = null;
          punchY = 60;
        }
      } else if (shown < 4) alignTo(shown);

      // part pose: move to tooling, or float free when finished
      if (finished && !anim) {
        targetPos.set(0, 30, 0);
        targetRotY = part.rotation.y + dt * 0.5;
      }
      part.position.lerp(targetPos, 1 - Math.pow(0.001, dt));
      part.rotation.y += (targetRotY - part.rotation.y) * (1 - Math.pow(0.002, dt));
      const toolsOn = !finished;
      tooling.visible = toolsOn || tooling.scale.y > 0.02;
      const ts = tooling.scale.y + ((toolsOn ? 1 : 0) - tooling.scale.y) * (1 - Math.pow(0.01, dt));
      tooling.scale.set(1, ts, 1);
      punchG.position.y = punchY + T / 2;
      (laserLine.material as THREE.MeshBasicMaterial).opacity = 0.5 + 0.4 * Math.sin(now / 150);

      orbit.az += (orbit.taz - orbit.az) * 0.12;
      orbit.el += (orbit.tel - orbit.el) * 0.12;
      if (!drag && !reduce) orbit.taz += dt * 0.06;
      camera.position.set(
        orbit.r * Math.cos(orbit.el) * Math.sin(orbit.az),
        orbit.r * Math.sin(orbit.el),
        orbit.r * Math.cos(orbit.el) * Math.cos(orbit.az),
      );
      camera.lookAt(0, 10, 0);
      renderer.render(scene, camera);
      angleCb.current(finished ? 90 : deg, active);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      renderer.dispose();
      pmrem.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  if (failed) return <div style={{ position: "absolute", inset: 0, background: "url(/img/mbend.webp) center/cover" }} />;
  return <div ref={host} style={{ position: "absolute", inset: 0 }} />;
}
