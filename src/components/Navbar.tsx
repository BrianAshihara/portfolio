"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const lenis = useLenis();
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const sectionIds = t.nav.items.map((item) => item.id).join(",");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setScrolled(y > 40);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sectionIds.split(",")) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    lenis?.start();
    lenis?.scrollTo(id === "top" ? 0 : `#${id}`, { duration: 1.6, offset: id === "top" ? 0 : -20 });
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
            scrolled ? "border-line bg-bg/85 shadow-2xl shadow-black/40 backdrop-blur-md" : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            onClick={go("top")}
            aria-label={t.nav.backToTop}
            className="logo-ring group relative ml-1 grid h-9 w-9 place-items-center rounded-xl"
          >
            <span className="bg-gradient-to-br from-glow via-accent-soft to-accent bg-[length:200%_200%] bg-left-top bg-clip-text font-display text-sm font-bold tracking-tight text-transparent transition-[background-position] duration-700 ease-smooth group-hover:bg-right-bottom">
              BA
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {t.nav.items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  className={`relative isolate block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-white/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 md:hidden"
          >
            <ul className="space-y-2">
              {t.nav.items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}
                >
                  <a href={`#${item.id}`} onClick={go(item.id)} className="flex items-baseline gap-4 font-display text-5xl font-semibold">
                    <span className="font-mono text-sm text-warm">0{i + 1}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
