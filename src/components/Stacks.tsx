"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SectionHeading } from "./ui/SectionHeading";

const iconUrl = (icon: string) => `https://skillicons.dev/icons?i=${icon}`;

export function Stacks() {
  const { t } = useLanguage();

  return (
    <section id="stacks" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          eyebrow={t.stacks.eyebrow}
          title={t.stacks.title}
          description={t.stacks.description}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {t.stacks.groups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: gi * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-3xl border border-line bg-surface p-6 card-hover"
            >
              <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-muted uppercase transition-colors duration-700 ease-smooth group-hover:text-warm">
                {group.title}
              </p>
              <ul className="space-y-3.5">
                {group.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <img
                      src={iconUrl(item.icon)}
                      alt=""
                      width={28}
                      height={28}
                      loading="lazy"
                      className="h-7 w-7 rounded-md transition-transform duration-700 ease-smooth group-hover:scale-110"
                    />
                    <span className="text-sm">{item.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
