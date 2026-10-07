"use client";
import { useEffect, useRef } from "react";

/**
 * Campo de partículas nocturnas (verde césped #00FF00 / cyan #00A2E8)
 * Canvas fijo, transparente y sin pointer-events: no bloquea lectura ni clics.
 */
export default function NightParticles({ count = 90 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 2.2,
      green: Math.random() < 0.55,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -0.08 - Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.8,
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.001 * d.speed + d.phase));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.green
          ? `rgba(0, 255, 0, ${0.55 * tw})`
          : `rgba(0, 162, 232, ${0.55 * tw})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = d.green ? "rgba(0,255,0,0.8)" : "rgba(0,162,232,0.8)";
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    if (reduceMotion) {
      draw(0);
      return () => window.removeEventListener("resize", resize);
    }

    const tick = (t) => {
      for (const d of dots) {
        d.x += d.vx + Math.sin(t * 0.0004 + d.phase) * 0.15;
        d.y += d.vy;
        if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; }
        if (d.x < -10) d.x = w + 10;
        if (d.x > w + 10) d.x = -10;
      }
      draw(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas id="night-particles" ref={ref} aria-hidden="true" />;
}
