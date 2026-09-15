import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import usePointerMotion from "../hooks/usePointerMotion";
export default function HeroParticleNetwork() {
  const canvas = useRef(null);
  const reduced = useReducedMotion();
  const pointerEnabled = usePointerMotion();
  useEffect(() => {
    const el = canvas.current,
      hero = el.closest(".hero"),
      ctx = el.getContext("2d");
    if (!ctx) return;
    let width = 0,
      height = 0,
      frame = 0,
      visible = false,
      last = 0;
    const pointer = { x: -1000, y: -1000 };
    const nodes = Array.from({ length: 24 }, (_, i) => ({
      x: ((i * 73 + 19) % 101) / 101,
      y: ((i * 47 + 11) % 97) / 97,
      phase: i * 1.7,
    }));
    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const count = width < 651 ? 7 : width < 851 ? 13 : 24;
      const points = nodes.slice(0, count).map((n) => {
        const drift =
          reduced || width < 851 ? 0 : Math.sin(time * 0.00014 + n.phase) * 3;
        const x = n.x * width + drift,
          y = n.y * height + drift;
        return { x, y, near: Math.hypot(x - pointer.x, y - pointer.y) < 100 };
      });
      points.forEach((p, i) => {
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j],
            distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < 130) {
            ctx.strokeStyle = `rgba(155,155,162,${(1 - distance / 130) * 0.14})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = p.near
          ? "rgba(237,24,37,.45)"
          : "rgba(185,185,193,.27)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.near ? 1.8 : 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    const tick = (time) => {
      if (!visible || document.hidden) return;
      if (time - last > 32) {
        draw(time);
        last = time;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      draw(0);
      if (visible && !document.hidden && !reduced && width >= 851)
        frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const r = el.getBoundingClientRect();
      width = r.width;
      height = r.height;
      const dpr = Math.min(devicePixelRatio, 2);
      el.width = width * dpr;
      el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      start();
    };
    const move = (e) => {
      if (!pointerEnabled) return;
      const r = el.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const reset = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    observer.observe(hero);
    const resizer = new ResizeObserver(resize);
    resizer.observe(el);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    document.addEventListener("visibilitychange", start);
    resize();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      document.removeEventListener("visibilitychange", start);
    };
  }, [reduced, pointerEnabled]);
  return <canvas ref={canvas} className="hero-network" aria-hidden="true" />;
}
