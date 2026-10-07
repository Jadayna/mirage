import { motion } from "framer-motion";
import { Clock, Heart } from "lucide-react";
import { useMemo } from "react";
import { useI18n } from "../i18n";
import type { Level, Recipe } from "../data";

/* ---------- Bulles flottantes d'arrière-plan ---------- */

const BUBBLE_COLORS = ["#c8f04b", "#ff6f61", "#ff8fab", "#ffd23f", "#6fe3b5"];

export function Bubbles({ count = 14 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = 8 + Math.random() * 46;
        return {
          id: i,
          left: Math.random() * 100,
          size,
          duration: 9 + Math.random() * 14,
          delay: -Math.random() * 20,
          color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
          opacity: 0.12 + Math.random() * 0.3,
        };
      }),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at 30% 30%, ${b.color}, transparent 70%)`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            ["--bubble-o" as string]: b.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Badge de niveau ---------- */

const LEVEL_STYLES: Record<Level, string> = {
  chill: "bg-lime/15 text-lime border-lime/30",
  curieux: "bg-soleil/15 text-soleil border-soleil/30",
  artiste: "bg-pamplemousse/15 text-pamplemousse border-pamplemousse/30",
};

export function LevelBadge({ level }: { level: Level }) {
  const { t } = useI18n();
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${LEVEL_STYLES[level]}`}
    >
      {t.levelLabel[level]}
    </span>
  );
}

/* ---------- Verre avec animation de versement ---------- */

export function PourGlass({ color, size = 120 }: { color: string; size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size * 1.25 }}>
      <svg viewBox="0 0 100 125" width={size} height={size * 1.25} className="drop-shadow-lg">
        <path
          d="M18 8 L82 8 L62 62 L55 62 L55 108 L45 108 L45 62 L38 62 Z"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <ellipse cx="50" cy="112" rx="22" ry="5" fill="rgba(255,255,255,0.14)" />
        <clipPath id="glassClip">
          <path d="M22 12 L78 12 L60 58 L40 58 Z" />
        </clipPath>
        <g clipPath="url(#glassClip)">
          <motion.rect
            x="18"
            width="64"
            fill={color}
            opacity="0.85"
            initial={{ y: 60, height: 0 }}
            animate={{ y: 14, height: 48 }}
            transition={{ duration: 1.6, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
          />
          <motion.ellipse
            cx="50"
            cy="14"
            rx="30"
            ry="5"
            fill={color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 1.7 }}
          />
          <rect x="18" width="14" height="60" y="0" className="pour-shine" opacity="0.5" />
        </g>
        <circle cx="38" cy="40" r="2.5" fill="rgba(255,255,255,0.5)">
          <animate attributeName="cy" values="52;30" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="58" cy="44" r="2" fill="rgba(255,255,255,0.5)">
          <animate attributeName="cy" values="54;28" dur="2.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0" dur="2.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="48" cy="46" r="1.6" fill="rgba(255,255,255,0.5)">
          <animate attributeName="cy" values="55;32" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ---------- Carte recette ---------- */

export function RecipeCard({
  recipe,
  isFav,
  onToggleFav,
  onOpen,
  missing,
  index = 0,
}: {
  recipe: Recipe;
  isFav: boolean;
  onToggleFav: () => void;
  onOpen: () => void;
  missing?: string[];
  index?: number;
}) {
  const { t } = useI18n();
  const ui = t.ui;
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.4), ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      onClick={onOpen}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-4 text-left backdrop-blur-sm transition-colors hover:border-white/25"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl transition-opacity"
        style={{ background: `${recipe.color}55` }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <LevelBadge level={recipe.level} />
            <span className="inline-flex items-center gap-1 text-xs text-white/50">
              <Clock size={12} /> {ui.minutesShort(recipe.minutes)}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold leading-tight">{recipe.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/60">{recipe.tagline}</p>
          {missing && missing.length > 0 && (
            <p className="mt-2 text-xs font-medium text-soleil">
              {ui.cardMissing(missing.map((m) => t.ingredientLabel[m] ?? m).join(", "))}
            </p>
          )}
          {missing && missing.length === 0 && (
            <p className="mt-2 text-xs font-semibold text-lime">{ui.cardReady}</p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFav();
          }}
          aria-label={isFav ? ui.recipeDetailFavRemove : ui.recipeDetailFavAdd}
          className={`shrink-0 rounded-full p-2 transition-transform active:scale-90 ${
            isFav ? "bg-corail/20 text-corail" : "bg-white/10 text-white/50 hover:text-white"
          }`}
        >
          <motion.span
            key={String(isFav)}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
            className="block"
          >
            <Heart size={18} fill={isFav ? "currentColor" : "none"} />
          </motion.span>
        </button>
      </div>
    </motion.button>
  );
}

/* ---------- Titre de section ---------- */

export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-2xl font-bold">{children}</h2>
      {sub && <p className="mt-1 text-sm text-white/55">{sub}</p>}
    </div>
  );
}
