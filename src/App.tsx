import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake, Home as HomeIcon, Refrigerator, Sparkles, User, Wine } from "lucide-react";
import { useState } from "react";
import { recipeById } from "./data";
import { Bubbles } from "./components/ui";
import Home from "./components/Home";
import Mood from "./components/Mood";
import Onboarding from "./components/Onboarding";
import Pairings from "./components/Pairings";
import Pantry from "./components/Pantry";
import ProfileView from "./components/Profile";
import { RecipeDetail, RecipeList } from "./components/Recipes";
import { useFavorites, usePantry, useProfile } from "./store";

type Tab = "home" | "pantry" | "recipes" | "pairings" | "mood" | "profile";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Accueil", icon: <HomeIcon size={21} /> },
  { id: "pantry", label: "Garde-manger", icon: <Refrigerator size={21} /> },
  { id: "recipes", label: "Recettes", icon: <Wine size={21} /> },
  { id: "pairings", label: "Accords", icon: <Sparkles size={21} /> },
  { id: "mood", label: "Humeur", icon: <HeartHandshake size={21} /> },
];

export default function App() {
  const [profile, setProfile] = useProfile();
  const [pantry, setPantry] = usePantry();
  const [favorites, setFavorites] = useFavorites();
  const [tab, setTab] = useState<Tab>("home");
  const [moodPreset, setMoodPreset] = useState<string | undefined>(undefined);
  const [favOnly, setFavOnly] = useState(false);
  const [openRecipeId, setOpenRecipeId] = useState<string | null>(null);

  const toggleItem = (id: string) =>
    setPantry((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const toggleFav = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const goTab = (t: string) => {
    if (t.startsWith("mood:")) {
      setMoodPreset(t.split(":")[1]);
      setTab("mood");
    } else if (t === "recipes:fav") {
      setFavOnly(true);
      setTab("recipes");
    } else {
      if (t === "recipes") setFavOnly(false);
      if (t === "mood") setMoodPreset(undefined);
      setTab(t as Tab);
    }
    setOpenRecipeId(null);
    window.scrollTo({ top: 0 });
  };

  const resetAll = () => {
    if (!window.confirm("Tout effacer et recommencer? Ton garde-manger, tes favoris et ton profil seront vidés.")) return;
    localStorage.removeItem("mirage:profile:v1");
    localStorage.removeItem("mirage:pantry:v1");
    localStorage.removeItem("mirage:favorites:v1");
    window.location.reload();
  };

  if (!profile.onboarded) {
    return <Onboarding onDone={(p) => setProfile(p)} />;
  }

  const openRecipe = openRecipeId ? recipeById(openRecipeId) : undefined;

  return (
    <div className="relative min-h-dvh bg-nuit text-white">
      <Bubbles count={10} />

      <div className="relative z-10 mx-auto w-full max-w-md px-5 pb-32 pt-6">
        <AnimatePresence mode="wait">
          <motion.main
            key={openRecipeId ? `detail-${openRecipeId}` : `${tab}-${moodPreset ?? ""}-${favOnly}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            {openRecipe ? (
              <RecipeDetail
                recipe={openRecipe}
                isFav={favorites.includes(openRecipe.id)}
                onToggleFav={() => toggleFav(openRecipe.id)}
                onBack={() => setOpenRecipeId(null)}
              />
            ) : tab === "home" ? (
              <Home
                profile={profile}
                favorites={favorites}
                onOpenRecipe={setOpenRecipeId}
                goTab={goTab}
              />
            ) : tab === "pantry" ? (
              <Pantry
                pantry={pantry}
                toggleItem={toggleItem}
                favorites={favorites}
                toggleFav={toggleFav}
                onOpenRecipe={setOpenRecipeId}
              />
            ) : tab === "recipes" ? (
              <RecipeList
                favorites={favorites}
                toggleFav={toggleFav}
                onOpenRecipe={setOpenRecipeId}
                favOnly={favOnly}
              />
            ) : tab === "pairings" ? (
              <Pairings onOpenRecipe={setOpenRecipeId} />
            ) : tab === "mood" ? (
              <Mood
                favorites={favorites}
                toggleFav={toggleFav}
                onOpenRecipe={setOpenRecipeId}
                preselected={moodPreset}
              />
            ) : (
              <ProfileView
                profile={profile}
                setProfile={setProfile}
                favCount={favorites.length}
                pantryCount={pantry.length}
                onReset={resetAll}
              />
            )}
          </motion.main>
        </AnimatePresence>
      </div>

      {/* Barre d'onglets */}
      {!openRecipe && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-nuit/85 backdrop-blur-xl">
          <div className="pb-safe mx-auto grid max-w-md grid-cols-6 px-2 pb-2 pt-2">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => goTab(t.id)}
                  className="relative flex flex-col items-center gap-1 rounded-2xl py-2"
                >
                  {active && (
                    <motion.span
                      layoutId="tab-pill"
                      className="absolute inset-0 rounded-2xl bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className={`relative ${active ? "text-lime" : "text-white/45"}`}>
                    {t.icon}
                  </span>
                  <span
                    className={`relative text-[10px] font-semibold ${
                      active ? "text-lime" : "text-white/45"
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => goTab("profile")}
              className="relative flex flex-col items-center gap-1 rounded-2xl py-2"
            >
              {tab === "profile" && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-2xl bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className={`relative ${tab === "profile" ? "text-lime" : "text-white/45"}`}>
                <User size={21} />
              </span>
              <span
                className={`relative text-[10px] font-semibold ${
                  tab === "profile" ? "text-lime" : "text-white/45"
                }`}
              >
                Profil
              </span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
