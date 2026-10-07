/* Locale française : réutilise les données existantes (inchangées). */

import {
  INGREDIENT_LABEL,
  LEVEL_DESC,
  LEVEL_LABEL,
  MILESTONES,
  MOODS,
  PAIRINGS,
  PANTRY,
  RECIPES,
} from "../data";
import type { LocaleData } from "./types";

export const fr: LocaleData = {
  lang: "fr",
  pantry: PANTRY,
  recipes: RECIPES,
  pairings: PAIRINGS,
  moods: MOODS,
  milestones: MILESTONES,
  levelLabel: LEVEL_LABEL,
  levelDesc: LEVEL_DESC,
  ingredientLabel: INGREDIENT_LABEL,
  ui: {
    tabHome: "Accueil",
    tabPantry: "Garde-manger",
    tabRecipes: "Recettes",
    tabPairings: "Accords",
    tabMood: "Humeur",
    tabProfile: "Profil",
    toggleLangLabel: "Langue",

    obSteps: ["Salut", "Ton style", "Sobre?"],
    obWelcome: "Bienvenue dans",
    obWelcomeSub:
      "Des mocktails fun, sans alcool, avec ce que tu as déjà chez toi. Comment on t'appelle?",
    obNamePlaceholder: "Ton prénom",
    obStyleEyebrow: "Ton style",
    obStyleTitle: (name) => (name ? `${name}, tu` : "Tu") + " es plutôt quel genre de mixologue?",
    obStyleSub:
      "Ça nous aide à te suggérer le bon niveau de complexité. Tu pourras tout explorer quand même.",
    obLevels: [
      { id: "chill", label: "Chill", desc: "Simple et vite fait" },
      { id: "curieux", label: "Curieux", desc: "J'aime expérimenter un peu" },
      { id: "artiste", label: "Artiste", desc: "Je veux impressionner" },
      { id: "mixte", label: "Un peu de tout", desc: "Selon mon humeur du moment" },
    ],
    obSoberTitle: "Une petite question douce",
    obSoberText:
      "Mirage est sobre-friendly. Si tu réduis ou arrêtes l'alcool, on peut afficher un petit compteur de jours, juste pour toi, sans pression et sans jugement.",
    obSoberNote:
      "C'est 100% optionnel. Tu peux l'activer ou le retirer à tout moment dans ton profil.",
    obSoberYes: "Oui, active le compteur",
    obSoberYesDesc: "Je célèbre mes jours sans alcool, à mon rythme",
    obSoberNo: "Non merci, pas pour l'instant",
    obSoberNoDesc: "Je suis juste ici pour des bons drinks",
    obContinue: "Continuer",
    obGo: "C'est parti",

    greetNight: "Bonne nuit",
    greetMorning: "Bon matin",
    greetAfternoon: "Bon après-midi",
    greetEvening: "Bonsoir",
    homeTitleA: "Qu'est-ce qu'on",
    homeTitleB: "aujourd'hui?",
    homeSub: "Des drinks festifs, zéro alcool, avec ce que tu as chez toi.",
    homeMoodCta: "Comment tu te sens?",
    homeSpotlight: "Le drink du moment",
    homeSeeAll: "Tout voir",
    homeTodayPick: "Suggestion du jour",
    homeMoodTitle: "Ton humeur, ton drink",
    homeJourney: "Mon parcours",
    homeDaysSober: (n) => `jour${n > 1 ? "s" : ""} sans alcool`,
    homeNextMilestone: (label, left) =>
      `Prochain palier : ${label} dans ${left} jour${left > 1 ? "s" : ""}.`,
    homeOneYear: "Un an! Tu es la preuve que c'est possible.",
    homeFavs: "Tes favoris",

    pantryTitle: "Ton garde-manger",
    pantrySub: "Coche ce que tu as chez toi, on s'occupe du reste.",
    pantryCount: (n) => `ingrédient${n > 1 ? "s" : ""} coché${n > 1 ? "s" : ""}`,
    pantryClear: "Tout effacer",
    pantryReady: (n) => `Tu peux faire ça maintenant (${n})`,
    pantryAlmost: (n) => `Il te manque juste un ingrédient (${n})`,
    pantryEmpty:
      "Hmm, avec ça on ne peut rien assembler pour l'instant. Coche encore quelques trucs, surtout des jus et de l'eau pétillante, et la magie va opérer.",
    pantryZero:
      "Coche tes ingrédients ci-dessus et Mirage te dira quels drinks tu peux te verser sans sortir de chez toi. Promis, c'est le fun.",
    pantryZeroTip: "Astuce : la glace, on assume que tu en as.",

    recipesTitle: "Recettes",
    recipesSub: "24 créations originales, zéro alcool, 100% fun.",
    recipesSearch: "Cherche un drink ou un ingrédient...",
    recipesEmpty:
      "Rien trouvé pour ça. Essaie un autre mot, ou explore les accords de saveurs pour t'inspirer.",
    filterAll: "Tous",
    filterFav: "Favoris",
    recipeDetailBack: "Retour",
    recipeDetailFavAdd: "Ajouter aux favoris",
    recipeDetailFavRemove: "Retirer des favoris",
    recipeDetailIngredients: "Ingrédients",
    recipeDetailMethod: "Préparation",
    recipeDetailFinish: "La touche finale : ",
    recipeDetailLevel: (label, desc) => `Niveau ${label} : ${desc.toLowerCase()}`,
    cardMissing: (items) => `Il te manque juste : ${items}`,
    cardReady: "Tu as tout ce qu'il faut",

    pairingsTitle: "Accords de saveurs",
    pairingsSub:
      "Des duos qui marchent à tout coup. Touche un accord pour voir les drinks qui l'utilisent.",
    pairingsClose: "Fermer",
    pairingsDrinks: "Drinks avec cet accord",

    moodTitle: "Comment tu te sens?",
    moodSub: "Dis-nous comment tu te sens, on te propose le drink qui va avec.",
    moodEmpty:
      "Choisis une humeur ci-dessus et Mirage te concocte une petite sélection sur mesure.",

    profileTitle: "Ton profil",
    profileSub: "Tout est modifiable, rien n'est imposé.",
    profileName: "Ton prénom",
    profileFavDrinks: "drinks favoris",
    profilePantryItems: "ingrédients au garde-manger",
    profileSoberTitle: "Compteur de sobriété",
    profileSoberText:
      "Un petit suivi doux, juste pour toi. Tu peux le retirer n'importe quand.",
    profileRestart: "Recommencer le compteur à aujourd'hui",
    profileReset: "Recommencer l'app à zéro",
    profileResetConfirm:
      "Tout effacer et recommencer? Ton garde-manger, tes favoris et ton profil seront vidés.",
    profilePrivacy: "Mirage garde tout sur ton téléphone. Rien n'est envoyé nulle part.",

    minutesShort: (n) => `${n} min`,
  },
};
