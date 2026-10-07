import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Clock, Heart, Search, Wine } from "lucide-react";
import { useMemo, useState } from "react";
import {
  INGREDIENT_LABEL,
  LEVEL_DESC,
  LEVEL_LABEL,
  RECIPES,
  type Level,
  type Recipe,
} from "../data";
import { LevelBadge, PourGlass, RecipeCard, SectionTitle } from "./ui";

const FILTERS: { id: Level | "all" | "fav"; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "chill", label: "Chill" },
  { id: "curieux", label: "Curieux" },
  { id: "artiste", label: "Artiste" },
  { id: "fav", label: "Favoris" },
];

export function RecipeList({
  favorites,
  toggleFav,
  onOpenRecipe,
  favOnly,
}: {
  favorites: string[];
  toggleFav: (id: string) => void;
  onOpenRecipe: (id: string) => void;
  favOnly?: boolean;
}) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Level | "all" | "fav">(favOnly ? "fav" : "all");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return RECIPES.filter((r) => {
      if (filter === "fav" && !favorites.includes(r.id)) return false;
      if (filter !== "all" && filter !== "fav" && r.level !== filter) return false;
      if (!needle) return true;
      const hay = `${r.name} ${r.tagline} ${r.ingredients
        .map((i) => INGREDIENT_LABEL[i.id] ?? "")
        .join(" ")}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [q, filter, favorites]);

  return (
    <div className="space-y-4">
      <SectionTitle sub="24 créations originales, zéro alcool, 100% fun.">
        Recettes
      </SectionTitle>

      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cherche un drink ou un ingrédient..."
          className="w-full rounded-2xl border border-white/12 bg-white/[0.06] py-3.5 pl-11 pr-4 text-[15px] outline-none placeholder:text-white/30 focus:border-lime/50"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 nice-scroll">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f.id
                ? "border-lime bg-lime/20 text-lime"
                : "border-white/12 bg-white/[0.04] text-white/60"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filter !== "all" && filter !== "fav" && (
        <p className="text-xs text-white/45">{LEVEL_DESC[filter as Level]}</p>
      )}

      <div className="grid gap-3">
        <AnimatePresence mode="popLayout">
          {list.map((r, i) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              index={i}
              isFav={favorites.includes(r.id)}
              onToggleFav={() => toggleFav(r.id)}
              onOpen={() => onOpenRecipe(r.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {list.length === 0 && (
        <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center text-sm text-white/55">
          Rien trouvé pour ça. Essaie un autre mot, ou explore les accords de saveurs pour
          t'inspirer.
        </p>
      )}
    </div>
  );
}

export function RecipeDetail({
  recipe,
  isFav,
  onToggleFav,
  onBack,
}: {
  recipe: Recipe;
  isFav: boolean;
  onToggleFav: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold"
        >
          <ArrowLeft size={16} /> Retour
        </button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleFav}
          aria-label="Favori"
          className={`rounded-full p-2.5 ${isFav ? "bg-corail/20 text-corail" : "bg-white/10 text-white/50"}`}
        >
          <Heart size={20} fill={isFav ? "currentColor" : "none"} />
        </motion.button>
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 p-6 text-center"
        style={{ background: `linear-gradient(160deg, ${recipe.color}2e, transparent 60%)` }}
      >
        <div className="flex justify-center">
          <PourGlass color={recipe.color} size={120} />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <LevelBadge level={recipe.level} />
          <span className="inline-flex items-center gap-1 text-xs text-white/50">
            <Clock size={12} /> {recipe.minutes} min
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-white/50">
            <Wine size={12} /> {recipe.glass}
          </span>
        </div>
        <h1 className="font-display mt-3 text-3xl font-extrabold">{recipe.name}</h1>
        <p className="mx-auto mt-2 max-w-xs text-white/60">{recipe.tagline}</p>
      </div>

      <section>
        <h2 className="font-display mb-3 text-xl font-bold">Ingrédients</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing, i) => (
            <motion.li
              key={ing.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06 }}
              className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3"
            >
              <span className="font-medium">{INGREDIENT_LABEL[ing.id] ?? ing.id}</span>
              <span className="text-sm text-white/55">{ing.qty}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display mb-3 text-xl font-bold">Préparation</h2>
        <ol className="space-y-3">
          {recipe.steps.map((s, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex gap-3"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-nuit"
                style={{ background: recipe.color }}
              >
                {i + 1}
              </span>
              <p className="pt-0.5 text-[15px] leading-relaxed text-white/80">{s}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <div className="rounded-2xl border border-soleil/25 bg-soleil/10 p-4">
        <p className="text-sm">
          <span className="font-bold text-soleil">La touche finale : </span>
          <span className="text-white/75">{recipe.garnish}.</span>
        </p>
      </div>

      <p className="pb-4 text-center text-xs text-white/35">
        Niveau {LEVEL_LABEL[recipe.level]} : {LEVEL_DESC[recipe.level].toLowerCase()}
      </p>
    </motion.div>
  );
}
