"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

// Fundo do hero ("nascer do sol"): brilho laranja no canto direito, arcos concêntricos finos
// e uma grade discreta. Parado, não custa nada; ao rolar a página, os arcos crescem e giram
// devagar e o brilho se intensifica (só transform e opacidade, que são leves de animar).
export function HeroBackground({ progress }: { progress: MotionValue<number> }) {
  const arcsScale = useTransform(progress, [0, 1], [1, 1.35]);
  const arcsRotate = useTransform(progress, [0, 1], [0, 18]);
  // Opacidade vai até 1 no máximo: começa em 0.8 (mesma intensidade de antes), sobe a 1 e depois apaga.
  const glowOpacity = useTransform(progress, [0, 0.4, 1], [0.8, 1, 0.4]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grade fina, visível só no centro-direita */}
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_60%_65%_at_70%_50%,#000_10%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Brilho principal: laranja nascendo do canto inferior direito */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_92%_78%,rgb(255_138_61/0.27),transparent_65%)]"
      />
      {/* Brilho secundário, âmbar e mais alto, para dar profundidade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_78%_30%,rgb(255_181_71/0.08),transparent_70%)]" />

      {/* Arcos concêntricos centrados fora da tela, à direita */}
      <div className="absolute top-1/2 right-0 h-[160%] translate-x-[45%] -translate-y-1/2 [mask-image:linear-gradient(to_left,transparent_5%,#000_45%)]">
        <motion.svg style={{ scale: arcsScale, rotate: arcsRotate }} className="h-full w-auto" viewBox="0 0 1000 1000" fill="none">
          {[480, 400, 320, 240, 160].map((r, i) => (
            <circle key={r} cx="500" cy="500" r={r} stroke="white" strokeOpacity={0.05 + i * 0.012} strokeWidth="1" />
          ))}
        </motion.svg>
      </div>

      {/* Transição suave para a próxima seção */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
