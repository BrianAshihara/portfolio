"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Line = { text: string; gradient?: boolean };

type HeroNameProps = {
  lines: Line[];
  scrollProgress: MotionValue<number>;
};

/**
 * Nome do hero: entra letra a letra e, ao rolar a página, cada linha sobe numa velocidade
 * diferente (a de cima mais rápido), criando profundidade.
 */
export function HeroName({ lines, scrollProgress }: HeroNameProps) {
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const scale = useTransform(scrollProgress, [0, 1], [1, 0.94]);

  // Degradê por letra: cada letra mostra a sua fatia de um degradê do tamanho da palavra inteira,
  // então o degradê continua contínuo mesmo com cada letra animando a sua entrada.
  useEffect(() => {
    const measure = () => {
      for (const line of lineRefs.current) {
        if (!line) continue;
        line.style.setProperty("--word-w", `${line.offsetWidth}px`);
        line.querySelectorAll<HTMLElement>("[data-letter]").forEach((el) => {
          el.style.setProperty("--x", `${el.offsetLeft}px`);
        });
      }
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  let index = 0;

  return (
    <motion.h1
      aria-label={lines.map((l) => l.text).join(" ")}
      style={{ scale }}
      className="origin-left font-display text-[clamp(3.2rem,10vw,8rem)] leading-[0.95] font-semibold tracking-tighter"
    >
      {lines.map((line, li) => {
        const start = index;
        index += line.text.length;
        return (
          <HeroLine
            key={li}
            line={line}
            lineIndex={li}
            firstLetter={start}
            progress={scrollProgress}
            lineRef={(el) => {
              if (el) lineRefs.current[li] = el;
            }}
          />
        );
      })}
    </motion.h1>
  );
}

type HeroLineProps = {
  line: Line;
  lineIndex: number;
  firstLetter: number;
  progress: MotionValue<number>;
  lineRef: (el: HTMLSpanElement | null) => void;
};

function HeroLine({ line, lineIndex, firstLetter, progress, lineRef }: HeroLineProps) {
  // Parallax em camadas: "Brian" sobe rápido, "Ashihara" na metade da velocidade, e os dois
  // mais rápido que o resto do hero. As camadas se afastam de forma visível, sem quebrar o nome.
  const y = useTransform(progress, [0, 1], [0, lineIndex === 0 ? -280 : -140]);
  // Cada linha some antes de chegar à navbar; a mais rápida some primeiro.
  const opacity = useTransform(progress, [0, lineIndex === 0 ? 0.22 : 0.4], [1, 0]);

  return (
    <motion.span style={{ y, opacity }} className="block">
      <span ref={lineRef} aria-hidden className="relative inline-block whitespace-nowrap">
        {line.text.split("").map((char, c) => (
          <span key={c} data-letter className="inline-block">
            <motion.span
              initial={{ opacity: 0, y: "0.35em" }}
              animate={{ opacity: 1, y: "0em" }}
              transition={{ duration: 0.8, delay: 0.15 + (firstLetter + c) * 0.04, ease: EASE }}
              className={`inline-block ${line.gradient ? "letter-gradient" : ""}`}
            >
              {char}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.span>
  );
}
