/* Contexte i18n : langue persistée, détection navigateur, toggle FR/EN. */

import { motion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { en } from "./en";
import { fr } from "./fr";
import { LANG_STORAGE_KEY, type Lang, type LocaleData } from "./types";

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("en")) return "en";
  if (nav.startsWith("fr")) return "fr";
  return "fr";
}

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: LocaleData;
  recipeById: (id: string) => LocaleData["recipes"][number] | undefined;
}

const Ctx = createContext<I18nCtx>({
  lang: "fr",
  setLang: () => {},
  t: fr,
  recipeById: (id) => fr.recipes.find((r) => r.id === id),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, JSON.stringify(l));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang ]);

  const t = lang === "en" ? en : fr;
  const recipeById = useCallback(
    (id: string) => t.recipes.find((r) => r.id === id),
    [t]
  );

  return <Ctx.Provider value={{ lang, setLang, t, recipeById }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  return useContext(Ctx);
}

/* Petit toggle FR/EN flottant, visible sur tous les écrans. */
export function LangToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <motion.button
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      onClick={() => setLang(lang === "fr" ? "en" : "fr")}
      aria-label={t.ui.toggleLangLabel}
      className="fixed right-4 top-4 z-50 flex items-center gap-0.5 rounded-full border border-white/15 bg-nuit/70 p-1 backdrop-blur-xl"
    >
      {(["fr", "en"] as Lang[]).map((l) => (
        <span
          key={l}
          className={`relative rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors ${
            lang === l ? "text-nuit" : "text-white/50"
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-lime to-soleil"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative">{l}</span>
        </span>
      ))}
    </motion.button>
  );
}
