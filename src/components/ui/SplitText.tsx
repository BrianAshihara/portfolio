"use client";

import { motion } from "motion/react";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** "char" anima letra a letra (use só em textos curtos); "word" anima palavra a palavra. */
  by?: "char" | "word";
  /** "mount" anima ao carregar; "view" anima ao entrar na tela. */
  trigger?: "mount" | "view";
};

const variants = {
  hidden: { y: "110%" },
  show: { y: "0%" },
};

export function SplitText({ text, className, delay = 0, stagger, by = "word", trigger = "view" }: SplitTextProps) {
  const words = text.split(" ");

  const animateProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, margin: "-60px" } };

  const piece = (content: string, key: number) => (
    <span key={key} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span className="inline-block" variants={variants} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        {content}
      </motion.span>
    </span>
  );

  return (
    <motion.span
      aria-label={text}
      className={className}
      initial="hidden"
      {...animateProps}
      transition={{ delayChildren: delay, staggerChildren: stagger ?? (by === "char" ? 0.04 : 0.06) }}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {by === "char" ? word.split("").map(piece) : piece(word, 0)}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
