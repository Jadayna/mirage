/* Types partagés pour l'i18n FR/EN de Mirage. */

import type {
  Level,
  Mood,
  Pairing,
  PantryCategory,
  Recipe,
} from "../data";

export type Lang = "fr" | "en";

/** Toutes les chaînes d'interface, avec fonctions pour les pluriels. */
export interface UIStrings {
  // Navigation
  tabHome: string;
  tabPantry: string;
  tabRecipes: string;
  tabPairings: string;
  tabMood: string;
  tabProfile: string;
  toggleLangLabel: string;

  // Onboarding
  obSteps: string[];
  obWelcome: string;
  obWelcomeSub: string;
  obNamePlaceholder: string;
  obStyleEyebrow: string;
  obStyleTitle: (name: string) => string;
  obStyleSub: string;
  obLevels: { id: string; label: string; desc: string }[];
  obSoberTitle: string;
  obSoberText: string;
  obSoberNote: string;
  obSoberYes: string;
  obSoberYesDesc: string;
  obSoberNo: string;
  obSoberNoDesc: string;
  obContinue: string;
  obGo: string;

  // Accueil
  greetNight: string;
  greetMorning: string;
  greetAfternoon: string;
  greetEvening: string;
  homeTitleA: string;
  homeTitleB: string;
  homeSub: string;
  homeMoodCta: string;
  homeSpotlight: string;
  homeSeeAll: string;
  homeTodayPick: string;
  homeMoodTitle: string;
  homeJourney: string;
  homeDaysSober: (n: number) => string;
  homeNextMilestone: (label: string, left: number) => string;
  homeOneYear: string;
  homeFavs: string;

  // Garde-manger
  pantryTitle: string;
  pantrySub: string;
  pantryCount: (n: number) => string;
  pantryClear: string;
  pantryReady: (n: number) => string;
  pantryAlmost: (n: number) => string;
  pantryEmpty: string;
  pantryZero: string;
  pantryZeroTip: string;

  // Recettes
  recipesTitle: string;
  recipesSub: string;
  recipesSearch: string;
  recipesEmpty: string;
  filterAll: string;
  filterFav: string;
  recipeDetailBack: string;
  recipeDetailFavAdd: string;
  recipeDetailFavRemove: string;
  recipeDetailIngredients: string;
  recipeDetailMethod: string;
  recipeDetailFinish: string;
  recipeDetailLevel: (label: string, desc: string) => string;
  cardMissing: (items: string) => string;
  cardReady: string;

  // Accords
  pairingsTitle: string;
  pairingsSub: string;
  pairingsClose: string;
  pairingsDrinks: string;

  // Humeur
  moodTitle: string;
  moodSub: string;
  moodEmpty: string;

  // Profil
  profileTitle: string;
  profileSub: string;
  profileName: string;
  profileFavDrinks: string;
  profilePantryItems: string;
  profileSoberTitle: string;
  profileSoberText: string;
  profileRestart: string;
  profileReset: string;
  profileResetConfirm: string;
  profilePrivacy: string;

  // Divers
  minutesShort: (n: number) => string;
}

export interface LocaleData {
  lang: Lang;
  pantry: PantryCategory[];
  recipes: Recipe[];
  pairings: Pairing[];
  moods: Mood[];
  milestones: { days: number; label: string; message: string }[];
  levelLabel: Record<Level, string>;
  levelDesc: Record<Level, string>;
  ingredientLabel: Record<string, string>;
  ui: UIStrings;
}

export const LANG_STORAGE_KEY = "mirage:lang:v1";
