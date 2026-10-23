"use client";

import Image from "next/image";
import { shared } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid items-start gap-10 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] lg:gap-16">
          <Reveal className="mx-auto w-full max-w-[240px] md:max-w-none">
            <div className="border-spin rounded-3xl bg-surface p-1.5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
                <Image
                  src={shared.photo}
                  alt={t.about.photoAlt}
                  fill
                  // A moldura tem ~280px e a foto aparece ampliada 1,6x: pede uma versão de ~450px
                  // (o dobro em telas retina) para o zoom não perder nitidez.
                  sizes="450px"
                  quality={90}
                  // Zoom ancorado no rosto: mostra da cabeça até a cintura
                  className="origin-[47%_20%] scale-[1.6] object-cover"
                  priority
                />
              </div>
            </div>
            <div className="mt-4 text-center md:text-left">
              <p className="font-display text-lg font-semibold">{shared.fullName}</p>
              <p className="font-mono text-xs text-warm">{t.hero.roleLine}</p>
            </div>
          </Reveal>

          <div>
            <div className="space-y-6 text-lg leading-relaxed text-fg md:text-xl">
              {t.about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-pretty">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {t.about.facts.map((fact, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-line bg-surface/60 p-5 card-hover">
                    <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{fact.label}</p>
                    <p className="mt-2 font-display font-medium text-fg">{fact.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
