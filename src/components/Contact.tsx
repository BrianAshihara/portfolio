"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { shared, socials } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GithubIcon, LinkedinIcon, MailIcon } from "./ui/icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";

const profiles = [
  { social: socials.find((s) => s.id === "linkedin")!, Icon: LinkedinIcon },
  { social: socials.find((s) => s.id === "github")!, Icon: GithubIcon },
];

const iconBox =
  "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.03] transition-colors duration-700 ease-smooth group-hover:border-accent/50 group-hover:text-accent";
const ghostButton =
  "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors duration-700 ease-smooth hover:border-fg hover:text-fg";

/** Estrutura comum dos 3 cards: ícone no topo, nome e endereço no meio, ações embaixo. */
function CardBody({
  icon,
  label,
  handle,
  corner,
  actions,
}: {
  icon: React.ReactNode;
  label: string;
  handle: string;
  corner?: React.ReactNode;
  actions: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col p-7">
      <div className="flex items-start justify-between">
        <span className={iconBox}>{icon}</span>
        {corner}
      </div>
      <p className="mt-10 font-display text-2xl font-semibold">{label}</p>
      <p className="mt-1 font-mono text-sm break-all text-muted">{handle}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-8">{actions}</div>
    </div>
  );
}

export function Contact() {
  const lenis = useLenis();
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(shared.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(shared.gmailCompose, "_blank", "noopener");
    }
  };

  return (
    <section id="contato" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" eyebrow={t.contact.eyebrow} title={t.contact.title} />

        <div className="grid gap-4 md:grid-cols-3">
          <Reveal className="h-full">
            <SpotlightCard>
              <CardBody
                icon={<MailIcon className="h-5 w-5" />}
                label={t.contact.emailLabel}
                handle={shared.email}
                actions={
                  <>
                    <a
                      href={shared.gmailCompose}
                      target="_blank"
                      rel="noreferrer"
                      className="group/send inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fg via-[#ffe6d1] to-accent-soft bg-[length:200%_100%] bg-left px-4 py-2 text-sm font-medium text-bg transition-[background-position] duration-700 ease-smooth hover:bg-right"
                    >
                      {t.contact.send}
                      <ArrowUpRight size={16} className="transition-transform duration-700 ease-smooth group-hover/send:rotate-45" />
                    </a>
                    <button onClick={copyEmail} className={ghostButton}>
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={copied ? "ok" : "copy"}
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                        >
                          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        </motion.span>
                      </AnimatePresence>
                      {copied ? t.contact.copied : t.contact.copy}
                    </button>
                  </>
                }
              />
            </SpotlightCard>
          </Reveal>

          {profiles.map(({ social, Icon }, i) => (
            <Reveal key={social.id} delay={0.1 + i * 0.1} className="h-full">
              <a href={social.href} target="_blank" rel="noreferrer" className="block h-full">
                <SpotlightCard>
                  <CardBody
                    icon={<Icon className="h-5 w-5" />}
                    label={social.label}
                    handle={social.handle}
                    corner={
                      <ArrowUpRight className="text-muted transition-all duration-700 ease-smooth group-hover:rotate-45 group-hover:text-fg" />
                    }
                    actions={<span className={`${ghostButton} group-hover:border-fg/60 group-hover:text-fg`}>{t.contact.viewProfile}</span>}
                  />
                </SpotlightCard>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <button
            onClick={() => lenis?.scrollTo(0, { duration: 1.6 })}
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors duration-700 ease-smooth hover:border-fg hover:text-fg"
          >
            {t.nav.backToTop}
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
