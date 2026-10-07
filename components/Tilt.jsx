"use client";
import { useRef } from "react";

/**
 * Wrapper con tilt 3D + glare neón al pasar el cursor.
 * Uso: <Tilt className="glass rounded-2xl ...">...</Tilt>
 */
export default function Tilt({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * (max + 2)}deg) translateY(-6px)`;
      el.style.setProperty("--glare-x", `${px * 100}%`);
      el.style.setProperty("--glare-y", `${py * 100}%`);
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card relative ${className}`}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
