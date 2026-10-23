"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { content, defaultLang, type Lang, type SiteContent } from "@/data/content";

const STORAGE_KEY = "lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: SiteContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // O HTML do servidor sai sempre em português; a escolha salva é aplicada depois de montar.
  const [lang, setLangState] = useState<Lang>(defaultLang);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "pt" || saved === "en") setLangState(saved);
    } catch {
      // Sem acesso ao localStorage (ex.: aba anônima com bloqueio): fica no padrão.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = content[lang].meta.title;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignora: a troca funciona, só não fica lembrada.
    }
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang, t: content[lang] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage precisa estar dentro de <LanguageProvider>");
  return ctx;
}
