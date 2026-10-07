import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useState } from "react";
import { MOODS, recipeById } from "../data";
import { RecipeCard, SectionTitle } from "./ui";

export default function Mood({
  favorites,
  toggleFav,
  onOpenRecipe,
  preselected,
}: {
  favorites: string[];
  toggleFav: (id: string) => void;
  onOpenRecipe: (id: string) => void;
  preselected?: string;
}) {
  const [moodId, setMoodId] = useState<string | null>(preselected ?? null);
  const mood = MOODS.find((m) => m.id === moodId);

  return (
    <div className="space-y-5">
      <SectionTitle sub="Dis-nous comment tu te sens, on te propose le drink qui va avec.">
        Comment tu te sens?
      </SectionTitle>

      <div className="grid grid-cols-3 gap-2.5">
        {MOODS.map((m, i) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setMoodId(m.id)}
            className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-4 transition-colors ${
              moodId === m.id
                ? "border-pamplemousse/60 bg-pamplemousse/15"
                : "border-white/10 bg-white/[0.05]"
            }`}
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className="text-xs font-semibold leading-tight">{m.label}</span>
          </motion.button>
        ))}
      </div>

      {!mood && (
        <p className="rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-white/50">
          Choisis une humeur ci-dessus et Mirage te concocte une petite sélection sur mesure.
        </p>
      )}

      {mood && (
        <motion.div
          key={mood.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-3xl border border-pamplemousse/25 bg-gradient-to-br from-pamplemousse/15 to-transparent p-5">
            <p className="font-display text-lg font-bold">
              {mood.emoji} {mood.intro}
            </p>
            <p className="mt-2 flex gap-2 text-sm leading-relaxed text-white/65">
              <Lightbulb size={16} className="mt-0.5 shrink-0 text-soleil" />
              {mood.tip}
            </p>
          </div>

          <div className="grid gap-3">
            {mood.recipes.map((rid, i) => {
              const r = recipeById(rid);
              if (!r) return null;
              return (
                <RecipeCard
                  key={rid}
                  recipe={r}
                  index={i}
                  isFav={favorites.includes(rid)}
                  onToggleFav={() => toggleFav(rid)}
                  onOpen={() => onOpenRecipe(rid)}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
