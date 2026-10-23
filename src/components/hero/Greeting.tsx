"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { shared } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";

const INTERVAL_MS = 2400;

/** Palavras mais largas que o espaço reservado (ex.: coreano, japonês) são reduzidas até caber. */
function fitToBox(el: HTMLElement | null) {
  if (!el) return;
  const fit = () => {
    const box = el.parentElement?.parentElement; // o contêiner com a largura reservada
    if (!box) return;
    const scale = Math.min(1, box.clientWidth / el.scrollWidth);
    el.style.transform = scale < 1 ? `scale(${scale.toFixed(3)})` : "";
  };
  fit();
  document.fonts?.ready.then(fit);
}
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * "Olá!" → "Hello!" → "¡Hola!"... começando pela saudação do idioma atual.
 * Cada palavra some subindo e a próxima sobe de baixo no lugar dela.
 */
export function Greeting({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const start = lang === "en" ? 1 : 0;
  const [index, setIndex] = useState(start);

  useEffect(() => {
    setIndex(start);
    const id = setInterval(() => setIndex((i) => (i + 1) % shared.greetings.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [start]);

  const greeting = shared.greetings[index];

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.9 }}
      // Altura e largura reservadas: a troca de palavra não mexe no layout.
      className={`relative h-[1.25em] w-[5em] font-display font-semibold tracking-tight ${className}`}
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={greeting.text}
          lang={greeting.lang}
          // A palavra que sai some rápido; a que entra espera um instante, para não se sobreporem.
          initial={{ opacity: 0, y: "55%" }}
          animate={{ opacity: 1, y: "0%", transition: { duration: 0.8, delay: 0.25, ease: EASE } }}
          exit={{ opacity: 0, y: "-55%", transition: { duration: 0.4, ease: EASE } }}
          className="absolute inset-0 flex items-center whitespace-nowrap lg:justify-end"
        >
          {/* <bdi> isola a direção do texto (o árabe é escrito da direita para a esquerda) */}
          <bdi
            ref={fitToBox}
            className="inline-block origin-left bg-gradient-to-b from-fg to-fg/25 bg-clip-text text-transparent lg:origin-right"
          >
            {greeting.text}
          </bdi>
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}
