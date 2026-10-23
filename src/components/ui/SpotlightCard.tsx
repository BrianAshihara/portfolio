"use client";

import { useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

/** Card com um brilho que segue o mouse. Só atualiza variáveis CSS, sem re-render. */
export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`group relative h-full rounded-3xl border border-line bg-surface card-hover ${className}`}
    >
      <div className="spotlight pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700 ease-smooth group-hover:opacity-100" />
      <div className="spotlight-border pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-700 ease-smooth group-hover:opacity-100" />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
