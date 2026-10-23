"use client";

import { useLenis } from "lenis/react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { shared, socials } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GithubIcon, LinkedinIcon } from "./ui/icons";
import { Magnetic } from "./ui/Magnetic";
import { Greeting } from "./hero/Greeting";
import { HeroBackground } from "./hero/HeroBackground";
import { HeroName } from "./hero/HeroName";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax em camadas: cargo, frase e botões se movem mais devagar que a página e somem aos poucos.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  // A saudação sobe mais rápido que o resto e some antes: dá sensação de profundidade.
  const greetingY = useTransform(scrollYProgress, [0, 1], ["0%", "-140%"]);
  const greetingOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const [first, ...rest] = shared.name.split(" ");
  const github = socials.find((s) => s.id === "github")!;
  const linkedin = socials.find((s) => s.id === "linkedin")!;

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-svh items-center overflow-hidden px-6 pt-28 pb-20">
      <HeroBackground progress={scrollYProgress} />
      <motion.div
        style={{ y, opacity }}
        className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-center"
      >
        {/* No celular a saudação vem antes do nome; no desktop, à direita */}
        <motion.div style={{ y: greetingY, opacity: greetingOpacity }} className="order-first lg:order-last">
          <Greeting className="text-4xl sm:text-5xl lg:text-[clamp(3rem,6vw,5.5rem)]" />
        </motion.div>

        <div>
          <HeroName
            scrollProgress={scrollYProgress}
            lines={[{ text: first }, { text: rest.join(" "), gradient: true }]}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex items-center gap-4 font-mono text-sm text-fg md:text-base"
          >
            <span className="text-warm">{">"}</span>
            {t.hero.roleLine}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-6 max-w-xl text-lg text-pretty text-muted md:text-xl"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projetos"
                onClick={(e) => {
                  e.preventDefault();
                  lenis?.scrollTo("#projetos", { duration: 1.4 });
                }}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-fg px-7 py-3.5 font-medium text-bg"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#ffe6d1] to-accent-soft transition-transform duration-700 ease-smooth group-hover:translate-y-0" />
                <span className="relative">{t.hero.cta}</span>
                <ArrowUpRight size={18} className="relative transition-transform duration-700 ease-smooth group-hover:rotate-45" />
              </a>
            </Magnetic>
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors hover:border-accent hover:text-fg"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={linkedin.href}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white/[0.03] text-muted transition-colors hover:border-warm hover:text-fg"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

      </motion.div>

      {/* Some logo no começo da rolagem: a pessoa já está rolando */}
      <motion.div style={{ opacity: scrollHintOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => lenis?.scrollTo("#sobre", { duration: 1.4 })}
          className="flex flex-col items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-muted uppercase"
          aria-label={t.hero.scroll}
        >
          Scroll
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-line">
            <span className="mt-1.5 h-2 w-1 animate-bounce rounded-full bg-warm" />
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}
