"use client";

import { motion, useSpring } from "motion/react";
import { useRef } from "react";

const spring = { stiffness: 150, damping: 20, mass: 0.4 };

/** Puxa o conteúdo levemente em direção ao cursor. */
export function Magnetic({ children, strength = 0.2 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className="inline-block">
      {children}
    </motion.div>
  );
}
