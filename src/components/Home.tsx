import { motion } from "framer-motion";
import { ArrowRight, Flame, PartyPopper } from "lucide-react";
import { MILESTONES, MOODS, RECIPES, daysBetween, recipeById } from "../data";
import type { Profile } from "../store";
import { PourGlass } from "./ui";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "Bonne nuit";
  if (h < 12) return "Bon matin";
  if (h < 18) return "Bon après-midi";
  return "Bonsoir";
}

export default function Home({
  profile,
  favorites,
  onOpenRecipe,
  goTab,
}: {
  profile: Profile;
  favorites: string[];
  onOpenRecipe: (id: string) => void;
  goTab: (t: string) => void;
}) {
  const spotlight = RECIPES[new Date().getDate() % RECIPES.length];
  const showSober = profile.soberOptIn && profile.soberStart;
  const days = showSober ? daysBetween(profile.soberStart!) : 0;
  const nextMilestone = MILESTONES.find((m) => m.days > days);
  const favRecipes = favorites.map(recipeById).filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Hero WOW */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-nuit-2 via-[#2b1547] to-[#3d1a3f] p-6">
        <div className="spin-slow pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[conic-gradient(from_0deg,#c8f04b,#ffd23f,#ff6f61,#ff8fab,#c8f04b)] opacity-25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-menthe/20 blur-3xl pulse-glow" />
        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-white/60"
          >
            {greeting()}
            {profile.name ? `, ${profile.name}` : ""} !
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-display mt-1 text-4xl font-extrabold leading-[1.05]"
          >
            Qu'est-ce qu'on{" "}
            <span className="bg-gradient-to-r from-lime via-soleil to-corail bg-clip-text text-transparent">
              se verse
            </span>{" "}
            aujourd'hui?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-2 max-w-[240px] text-sm text-white/60"
          >
            Des drinks festifs, zéro alcool, avec ce que tu as chez toi.
          </motion.p>
          <div className="mt-4 flex justify-center py-2">
            <div className="drift">
              <PourGlass color="#ff8fab" size={96} />
            </div>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => goTab("mood")}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-display font-extrabold text-nuit"
          >
            Comment tu te sens? <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>

      {/* Drink du moment */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Le drink du moment</h2>
          <button
            onClick={() => goTab("recipes")}
            className="text-sm font-semibold text-lime"
          >
            Tout voir
          </button>
        </div>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenRecipe(spotlight.id)}
          className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-5 text-left backdrop-blur"
        >
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
            style={{ background: `${spotlight.color}66` }}
          />
          <div className="relative flex items-center gap-4">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{ background: `${spotlight.color}33` }}
            >
              🍹
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/45">
                Suggestion du jour
              </p>
              <h3 className="font-display text-xl font-bold">{spotlight.name}</h3>
              <p className="line-clamp-1 text-sm text-white/55">{spotlight.tagline}</p>
            </div>
          </div>
        </motion.button>
      </section>

      {/* Humeurs rapides */}
      <section>
        <h2 className="font-display mb-3 text-xl font-bold">Ton humeur, ton drink</h2>
        <div className="flex gap-2.5 overflow-x-auto pb-2 nice-scroll">
          {MOODS.map((m, i) => (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => goTab(`mood:${m.id}`)}
              className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3"
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-xs font-semibold">{m.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Compteur sobre */}
      {showSober && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-menthe/25 bg-gradient-to-br from-menthe/15 to-transparent p-5"
        >
          <div className="flex items-center gap-2 text-menthe">
            <Flame size={18} />
            <span className="text-sm font-semibold uppercase tracking-widest">Mon parcours</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-5xl font-extrabold">{days}</span>
            <span className="text-white/60">jour{days > 1 ? "s" : ""} sans alcool</span>
          </div>
          {nextMilestone ? (
            <p className="mt-2 text-sm text-white/60">
              Prochain palier : <span className="font-semibold text-white">{nextMilestone.label}</span>{" "}
              dans {nextMilestone.days - days} jour{nextMilestone.days - days > 1 ? "s" : ""}.
            </p>
          ) : (
            <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-menthe">
              <PartyPopper size={16} /> Un an! Tu es la preuve que c'est possible.
            </p>
          )}
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-menthe to-lime"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, (days / (nextMilestone?.days ?? 365)) * 100)}%`,
              }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </motion.section>
      )}

      {/* Favoris */}
      {favRecipes.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Tes favoris</h2>
            <button onClick={() => goTab("recipes:fav")} className="text-sm font-semibold text-lime">
              Tout voir
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 nice-scroll">
            {favRecipes.slice(0, 6).map((r) => (
              <motion.button
                key={r!.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenRecipe(r!.id)}
                className="w-36 shrink-0 rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-left"
              >
                <div
                  className="mb-2 flex h-14 items-center justify-center rounded-xl text-2xl"
                  style={{ background: `${r!.color}2e` }}
                >
                  🍹
                </div>
                <p className="font-display text-sm font-bold leading-tight">{r!.name}</p>
                <p className="mt-0.5 text-[11px] text-white/50">{r!.minutes} min</p>
              </motion.button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
