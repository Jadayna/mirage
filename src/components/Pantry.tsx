import { AnimatePresence, motion } from "framer-motion";
import { Check, Refrigerator, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "../i18n";
import { RecipeCard, SectionTitle } from "./ui";

export default function Pantry({
  pantry,
  toggleItem,
  favorites,
  toggleFav,
  onOpenRecipe,
}: {
  pantry: string[];
  toggleItem: (id: string) => void;
  favorites: string[];
  toggleFav: (id: string) => void;
  onOpenRecipe: (id: string) => void;
}) {
  const { t, recipeById } = useI18n();
  const ui = t.ui;
  const [openCat, setOpenCat] = useState<string | null>(t.pantry[0].id);

  const { ready, almost } = useMemo(() => {
    const ready: { id: string; missing: string[] }[] = [];
    const almost: { id: string; missing: string[] }[] = [];
    for (const r of t.recipes) {
      const missing = r.ingredients.map((i) => i.id).filter((id) => !pantry.includes(id));
      if (missing.length === 0) ready.push({ id: r.id, missing });
      else if (missing.length === 1) almost.push({ id: r.id, missing });
    }
    return { ready, almost };
  }, [pantry, t]);

  return (
    <div className="space-y-6">
      <SectionTitle sub={ui.pantrySub}>{ui.pantryTitle}</SectionTitle>

      <div className="flex items-center gap-2 rounded-2xl border border-lime/25 bg-lime/10 px-4 py-3">
        <Refrigerator size={18} className="shrink-0 text-lime" />
        <p className="text-sm">
          <span className="font-bold text-lime">{pantry.length}</span> {ui.pantryCount(pantry.length)}
        </p>
        {pantry.length > 0 && (
          <button
            onClick={() => pantry.forEach(toggleItem)}
            className="ml-auto text-xs font-semibold text-white/50 underline"
          >
            {ui.pantryClear}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {t.pantry.map((cat) => {
          const count = cat.items.filter((i) => pantry.includes(i.id)).length;
          const open = openCat === cat.id;
          return (
            <div key={cat.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <button
                onClick={() => setOpenCat(open ? null : cat.id)}
                className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="font-display font-bold">{cat.label}</span>
                {count > 0 && (
                  <span className="rounded-full bg-lime/20 px-2 py-0.5 text-xs font-bold text-lime">
                    {count}
                  </span>
                )}
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  className="ml-auto text-white/40"
                >
                  ▾
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex flex-wrap gap-2 px-4 pb-4">
                      {cat.items.map((item) => {
                        const on = pantry.includes(item.id);
                        return (
                          <motion.button
                            key={item.id}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => toggleItem(item.id)}
                            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                              on
                                ? "border-lime bg-lime/20 text-lime"
                                : "border-white/12 bg-white/[0.04] text-white/70"
                            }`}
                          >
                            {on && <Check size={14} />}
                            {item.label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {pantry.length > 0 && (
        <div className="space-y-6 pt-2">
          {ready.length > 0 && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={18} className="text-lime" />
                <h2 className="font-display text-xl font-bold">{ui.pantryReady(ready.length)}</h2>
              </div>
              <div className="grid gap-3">
                {ready.map(({ id, missing }, i) => {
                  const r = recipeById(id)!;
                  return (
                    <RecipeCard
                      key={id}
                      recipe={r}
                      index={i}
                      missing={missing}
                      isFav={favorites.includes(id)}
                      onToggleFav={() => toggleFav(id)}
                      onOpen={() => onOpenRecipe(id)}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {almost.length > 0 && (
            <section>
              <h2 className="font-display mb-3 text-xl font-bold">
                {ui.pantryAlmost(almost.length)}
              </h2>
              <div className="grid gap-3">
                {almost.map(({ id, missing }, i) => {
                  const r = recipeById(id)!;
                  return (
                    <RecipeCard
                      key={id}
                      recipe={r}
                      index={i}
                      missing={missing}
                      isFav={favorites.includes(id)}
                      onToggleFav={() => toggleFav(id)}
                      onOpen={() => onOpenRecipe(id)}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {ready.length === 0 && almost.length === 0 && (
            <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center text-sm text-white/55">
              {ui.pantryEmpty}
            </p>
          )}
        </div>
      )}

      {pantry.length === 0 && (
        <p className="rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-white/50">
          {ui.pantryZero}
          <span className="mt-2 block text-xs text-white/35">{ui.pantryZeroTip}</span>
        </p>
      )}
    </div>
  );
}
