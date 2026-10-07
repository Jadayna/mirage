import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FlaskConical, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../i18n";
import { SectionTitle } from "./ui";

export default function Pairings({ onOpenRecipe }: { onOpenRecipe: (id: string) => void }) {
  const { t, recipeById } = useI18n();
  const ui = t.ui;
  const [openId, setOpenId] = useState<string | null>(null);
  const open = t.pairings.find((p) => p.id === openId);

  return (
    <div className="space-y-4">
      <SectionTitle sub={ui.pairingsSub}>{ui.pairingsTitle}</SectionTitle>

      <div className="grid grid-cols-2 gap-3">
        {t.pairings.map((p, i) => (
          <motion.button
            key={p.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.35) }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpenId(p.id)}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 text-left"
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="rounded-full bg-lime/15 px-2.5 py-1 text-xs font-bold text-lime">
                {p.a}
              </span>
              <span className="font-display text-lg font-extrabold text-corail">+</span>
              <span className="rounded-full bg-corail/15 px-2.5 py-1 text-xs font-bold text-corail">
                {p.b}
              </span>
            </div>
            <p className="mt-2.5 line-clamp-2 text-center text-xs leading-relaxed text-white/55">
              {p.note}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-[2rem] border border-white/15 bg-nuit-2 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-lime/15 px-3 py-1.5 text-sm font-bold text-lime">
                    {open.a}
                  </span>
                  <span className="font-display text-xl font-extrabold text-corail">+</span>
                  <span className="rounded-full bg-corail/15 px-3 py-1.5 text-sm font-bold text-corail">
                    {open.b}
                  </span>
                </div>
                <button
                  onClick={() => setOpenId(null)}
                  className="rounded-full bg-white/10 p-2"
                  aria-label={ui.pairingsClose}
                >
                  <X size={16} />
                </button>
              </div>
              <p className="mt-4 flex gap-2 text-[15px] leading-relaxed text-white/75">
                <FlaskConical size={18} className="mt-0.5 shrink-0 text-soleil" />
                {open.note}
              </p>
              <p className="font-display mt-5 text-sm font-bold uppercase tracking-widest text-white/45">
                {ui.pairingsDrinks}
              </p>
              <div className="mt-2 space-y-2">
                {open.recipes.map((rid) => {
                  const r = recipeById(rid);
                  if (!r) return null;
                  return (
                    <button
                      key={rid}
                      onClick={() => {
                        setOpenId(null);
                        onOpenRecipe(rid);
                      }}
                      className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-left"
                    >
                      <span className="font-semibold">{r.name}</span>
                      <ArrowRight size={16} className="text-white/40" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
