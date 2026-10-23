"use client";

import { motion } from "motion/react";
import { languages } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center rounded-full border border-line p-0.5">
      {languages.map((option) => {
        const active = option.id === lang;
        return (
          <button
            key={option.id}
            onClick={() => setLang(option.id)}
            aria-pressed={active}
            className={`relative isolate rounded-full px-2.5 py-1 font-mono text-xs transition-colors duration-500 ease-smooth ${
              active ? "text-bg" : "text-muted hover:text-fg"
            }`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-fg to-accent-soft"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
