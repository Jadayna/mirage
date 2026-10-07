/* Données Mirage : garde-manger, recettes, accords, humeurs. */

export type Level = "chill" | "curieux" | "artiste";

export interface PantryCategory {
  id: string;
  label: string;
  icon: string;
  items: { id: string; label: string }[];
}

export const PANTRY: PantryCategory[] = [
  {
    id: "jus",
    label: "Jus",
    icon: "🧃",
    items: [
      { id: "jus-orange", label: "Jus d'orange" },
      { id: "jus-pamplemousse", label: "Jus de pamplemousse" },
      { id: "jus-ananas", label: "Jus d'ananas" },
      { id: "jus-canneberge", label: "Jus de canneberge" },
      { id: "jus-pomme", label: "Jus de pomme" },
      { id: "jus-mangue", label: "Jus de mangue" },
      { id: "jus-cerise", label: "Jus de cerise" },
      { id: "limonade", label: "Limonade" },
    ],
  },
  {
    id: "petillant",
    label: "Pétillants",
    icon: "🫧",
    items: [
      { id: "eau-petillante", label: "Eau pétillante" },
      { id: "soda-citron-lime", label: "Soda citron-lime" },
      { id: "ginger-ale", label: "Ginger ale" },
      { id: "tonic", label: "Tonic" },
      { id: "cola", label: "Cola" },
      { id: "kombucha", label: "Kombucha nature" },
      { id: "eau-coco", label: "Eau de coco" },
    ],
  },
  {
    id: "frais",
    label: "Frais",
    icon: "🍋",
    items: [
      { id: "citron", label: "Citron" },
      { id: "lime", label: "Lime" },
      { id: "orange-fraiche", label: "Orange" },
      { id: "pamplemousse-frais", label: "Pamplemousse" },
      { id: "ananas-frais", label: "Ananas frais" },
      { id: "fraises", label: "Fraises" },
      { id: "framboises", label: "Framboises" },
      { id: "bleuets", label: "Bleuets" },
      { id: "mangue-fraiche", label: "Mangue" },
      { id: "peche", label: "Pêche" },
      { id: "melon-deau", label: "Melon d'eau" },
      { id: "concombre", label: "Concombre" },
      { id: "pomme-fraiche", label: "Pomme" },
    ],
  },
  {
    id: "herbes",
    label: "Herbes",
    icon: "🌿",
    items: [
      { id: "menthe", label: "Menthe" },
      { id: "basilic", label: "Basilic" },
      { id: "romarin", label: "Romarin" },
      { id: "thym", label: "Thym" },
      { id: "sauge", label: "Sauge" },
    ],
  },
  {
    id: "epices",
    label: "Épices",
    icon: "✨",
    items: [
      { id: "gingembre", label: "Gingembre frais" },
      { id: "cannelle", label: "Cannelle" },
      { id: "vanille", label: "Vanille" },
      { id: "cardamome", label: "Cardamome" },
      { id: "curcuma", label: "Curcuma" },
      { id: "piment-tajin", label: "Tajín ou piment doux" },
      { id: "poivre-rose", label: "Poivre rose" },
      { id: "clou-girofle", label: "Clou de girofle" },
    ],
  },
  {
    id: "sucrants",
    label: "Sucrants",
    icon: "🍯",
    items: [
      { id: "sirop-simple", label: "Sirop simple" },
      { id: "grenadine", label: "Grenadine" },
      { id: "miel", label: "Miel" },
      { id: "sirop-erable", label: "Sirop d'érable" },
      { id: "lait-coco", label: "Lait de coco" },
    ],
  },
  {
    id: "thes",
    label: "Thés et infusions",
    icon: "🍵",
    items: [
      { id: "the-vert", label: "Thé vert" },
      { id: "the-noir", label: "Thé noir" },
      { id: "camomille", label: "Camomille" },
      { id: "hibiscus", label: "Hibiscus" },
      { id: "the-menthe", label: "Thé à la menthe" },
      { id: "matcha", label: "Matcha" },
      { id: "cold-brew", label: "Café infusé à froid" },
    ],
  },
];

export const INGREDIENT_LABEL: Record<string, string> = {};
for (const cat of PANTRY) for (const it of cat.items) INGREDIENT_LABEL[it.id] = it.label;

export interface Recipe {
  id: string;
  name: string;
  tagline: string;
  level: Level;
  minutes: number;
  color: string;
  ingredients: { id: string; qty: string }[];
  steps: string[];
  garnish: string;
  moods: string[];
  glass: string;
}

export const LEVEL_LABEL: Record<Level, string> = {
  chill: "Chill",
  curieux: "Curieux",
  artiste: "Artiste",
};

export const LEVEL_DESC: Record<Level, string> = {
  chill: "2 ou 3 ingrédients, prêt en 2 minutes",
  curieux: "Un petit sirop ou une infusion maison",
  artiste: "Technique et garniture qui impressionnent",
};

export const RECIPES: Recipe[] = [
  {
    id: "soleil-levant",
    name: "Soleil Levant",
    tagline: "Le réveil qui donne le sourire, piquant juste comme il faut.",
    level: "chill",
    minutes: 2,
    color: "#ffd23f",
    ingredients: [
      { id: "jus-orange", qty: "180 ml" },
      { id: "gingembre", qty: "1 fine tranche" },
      { id: "miel", qty: "1 c. à thé" },
      { id: "eau-petillante", qty: "60 ml" },
    ],
    steps: [
      "Râpe le gingembre directement dans le verre et écrase-le un peu à la cuillère.",
      "Ajoute le miel et le jus d'orange, brasse jusqu'à ce que le miel soit dissous.",
      "Remplis de glace, allonge d'eau pétillante, brasse doucement.",
    ],
    garnish: "Une rondelle d'orange sur le bord du verre",
    moods: ["fatigue", "focus"],
    glass: "Grand verre",
  },
  {
    id: "pamplemousse-romarin",
    name: "Pamplemousse Romarin Fizz",
    tagline: "Amer, herbacé, pétillant. Le préféré des fins de journée.",
    level: "chill",
    minutes: 3,
    color: "#ff8fab",
    ingredients: [
      { id: "jus-pamplemousse", qty: "150 ml" },
      { id: "romarin", qty: "1 brin" },
      { id: "miel", qty: "1 c. à thé" },
      { id: "eau-petillante", qty: "100 ml" },
    ],
    steps: [
      "Frotte le brin de romarin entre tes mains pour réveiller les arômes, puis dépose-le dans le verre.",
      "Verse le jus de pamplemousse et le miel, brasse bien.",
      "Glace, eau pétillante, et laisse le romarin infuser 1 minute.",
    ],
    garnish: "Le brin de romarin + un suprême de pamplemousse",
    moods: ["stresse", "festif"],
    glass: "Verre à vin",
  },
  {
    id: "fraise-basilic",
    name: "Fraise Basilic Smash",
    tagline: "L'été dans un verre, même en plein mois de février.",
    level: "chill",
    minutes: 4,
    color: "#ff6f61",
    ingredients: [
      { id: "fraises", qty: "5, en morceaux" },
      { id: "basilic", qty: "4 feuilles" },
      { id: "citron", qty: "Le jus d'un demi" },
      { id: "limonade", qty: "150 ml" },
    ],
    steps: [
      "Écrase les fraises et le basilic au fond du verre avec le jus de citron.",
      "Ajoute de la glace pilée si tu en as, sinon des cubes.",
      "Allonge de limonade bien froide et brasse.",
    ],
    garnish: "Une fraise entière et une feuille de basilic",
    moods: ["festif", "moral-bas"],
    glass: "Verre old fashioned",
  },
  {
    id: "concombre-lime",
    name: "Concombre Lime Cooler",
    tagline: "Fraîcheur de spa, zéro effort.",
    level: "chill",
    minutes: 3,
    color: "#6fe3b5",
    ingredients: [
      { id: "concombre", qty: "6 rondelles" },
      { id: "lime", qty: "Le jus d'une demie" },
      { id: "menthe", qty: "6 feuilles" },
      { id: "sirop-simple", qty: "15 ml" },
      { id: "eau-petillante", qty: "150 ml" },
    ],
    steps: [
      "Écrase doucement le concombre et la menthe dans le verre.",
      "Ajoute le jus de lime et le sirop simple, remplis de glace.",
      "Allonge d'eau pétillante.",
    ],
    garnish: "Un long ruban de concombre enroulé dans le verre",
    moods: ["stresse", "focus", "fraicheur"],
    glass: "Grand verre",
  },
  {
    id: "ananas-menthe",
    name: "Ananas Menthe Pétillant",
    tagline: "Vacances tropicales, sans prendre l'avion.",
    level: "chill",
    minutes: 2,
    color: "#ffe14d",
    ingredients: [
      { id: "jus-ananas", qty: "150 ml" },
      { id: "menthe", qty: "8 feuilles" },
      { id: "lime", qty: "Le jus d'un quart" },
      { id: "eau-petillante", qty: "100 ml" },
    ],
    steps: [
      "Claque la menthe entre tes mains et mets-la dans le verre.",
      "Verse le jus d'ananas et le jus de lime sur de la glace.",
      "Couronne d'eau pétillante.",
    ],
    garnish: "Un plumet d'ananas ou une feuille de menthe",
    moods: ["festif", "fraicheur", "fatigue"],
    glass: "Verre highball",
  },
  {
    id: "bleuet-citron",
    name: "Bleuet Citron Fizz",
    tagline: "Violet profond, goût franc, allure de cocktail de bar.",
    level: "chill",
    minutes: 4,
    color: "#8b7cf6",
    ingredients: [
      { id: "bleuets", qty: "1 poignée" },
      { id: "citron", qty: "Le jus d'un demi" },
      { id: "sirop-simple", qty: "15 ml" },
      { id: "eau-petillante", qty: "150 ml" },
    ],
    steps: [
      "Écrase les bleuets avec le jus de citron et le sirop.",
      "Passe au tamis si tu veux un drink limpide, ou garde la pulpe pour le style rustique.",
      "Glace et eau pétillante.",
    ],
    garnish: "Quelques bleuets frais qui flottent",
    moods: ["moral-bas", "festif"],
    glass: "Coupe ou verre à vin",
  },
  {
    id: "mangue-gingembre",
    name: "Mangue Gingembre Ale",
    tagline: "Doux, piquant, impossible à manquer.",
    level: "chill",
    minutes: 2,
    color: "#ffb347",
    ingredients: [
      { id: "jus-mangue", qty: "150 ml" },
      { id: "gingembre", qty: "1 fine tranche" },
      { id: "lime", qty: "Le jus d'un quart" },
      { id: "ginger-ale", qty: "100 ml" },
    ],
    steps: [
      "Écrase la tranche de gingembre au fond du verre.",
      "Ajoute le jus de mangue et le jus de lime sur de la glace.",
      "Allonge de ginger ale bien froid.",
    ],
    garnish: "Un cube de mangue sur un pic",
    moods: ["fatigue", "moral-bas"],
    glass: "Verre highball",
  },
  {
    id: "pomme-cannelle",
    name: "Pomme Cannelle Froide",
    tagline: "Le verger d'automne, servi sur glace.",
    level: "chill",
    minutes: 2,
    color: "#e8a94e",
    ingredients: [
      { id: "jus-pomme", qty: "180 ml" },
      { id: "cannelle", qty: "1 pincée" },
      { id: "citron", qty: "Le jus d'un quart" },
      { id: "eau-petillante", qty: "60 ml" },
    ],
    steps: [
      "Verse le jus de pomme sur de la glace avec le jus de citron.",
      "Saupoudre la cannelle et brasse.",
      "Un trait d'eau pétillante pour la légèreté.",
    ],
    garnish: "Un bâton de cannelle comme touillette",
    moods: ["moral-bas", "stresse"],
    glass: "Grand verre",
  },
  {
    id: "calin-chaud",
    name: "Câlin Chaud",
    tagline: "Une doudou en tasse, à la camomille et au miel.",
    level: "curieux",
    minutes: 8,
    color: "#f6d98b",
    ingredients: [
      { id: "camomille", qty: "1 sachet ou 1 c. à soupe" },
      { id: "miel", qty: "2 c. à thé" },
      { id: "citron", qty: "1 rondelle + un trait de jus" },
      { id: "gingembre", qty: "2 fines tranches" },
    ],
    steps: [
      "Fais infuser la camomille et le gingembre 5 minutes dans l'eau frémissante.",
      "Retire le sachet, ajoute le miel et brasse jusqu'à dissolution.",
      "La rondelle de citron, et bois lentement.",
    ],
    garnish: "La rondelle de citron qui flotte",
    moods: ["stresse", "moral-bas"],
    glass: "Grande tasse",
  },
  {
    id: "hibiscus-framboise",
    name: "Hibiscus Framboise",
    tagline: "Rouge rubis, acidulé, terriblement photogénique.",
    level: "curieux",
    minutes: 10,
    color: "#e0455a",
    ingredients: [
      { id: "hibiscus", qty: "2 c. à soupe de fleurs séchées" },
      { id: "framboises", qty: "1 poignée" },
      { id: "sirop-simple", qty: "20 ml" },
      { id: "lime", qty: "Le jus d'une demie" },
      { id: "eau-petillante", qty: "100 ml" },
    ],
    steps: [
      "Infuse l'hibiscus 6 minutes dans 250 ml d'eau chaude, puis laisse tiédir.",
      "Écrase les framboises avec le sirop et le jus de lime au fond du verre.",
      "Verse l'infusion refroidie sur de la glace, allonge d'eau pétillante.",
    ],
    garnish: "Des framboises fraîches et une fleur d'hibiscus si tu en as",
    moods: ["festif", "moral-bas", "fraicheur"],
    glass: "Grand verre",
  },
  {
    id: "the-vert-agrumes",
    name: "Thé Vert Agrumes Glacé",
    tagline: "Clarté en verre, avec juste ce qu'il faut de caféine douce.",
    level: "curieux",
    minutes: 12,
    color: "#a8d86b",
    ingredients: [
      { id: "the-vert", qty: "2 sachets" },
      { id: "orange-fraiche", qty: "Le jus d'une demie" },
      { id: "citron", qty: "Le jus d'un quart" },
      { id: "miel", qty: "1 c. à thé" },
      { id: "menthe", qty: "4 feuilles" },
    ],
    steps: [
      "Infuse le thé vert 3 minutes dans l'eau à 80 degrés, pas bouillante.",
      "Ajoute le miel pendant que c'est chaud, puis laisse refroidir.",
      "Verse sur de la glace avec les jus d'agrumes et la menthe.",
    ],
    garnish: "Une feuille de menthe et une demi-rondelle d'orange",
    moods: ["focus", "fatigue", "fraicheur"],
    glass: "Grand verre",
  },
  {
    id: "peche-thym",
    name: "Pêche Thym Spritz",
    tagline: "Le brunch du dimanche, en version pétillante.",
    level: "curieux",
    minutes: 10,
    color: "#ffc98b",
    ingredients: [
      { id: "peche", qty: "1, en morceaux" },
      { id: "thym", qty: "2 brins" },
      { id: "sirop-simple", qty: "15 ml" },
      { id: "citron", qty: "Le jus d'un quart" },
      { id: "eau-petillante", qty: "150 ml" },
    ],
    steps: [
      "Fais un sirop éclair : chauffe la pêche, le thym et le sirop 5 minutes à feu doux, puis écrase.",
      "Passe au tamis, laisse tiédir.",
      "2 c. à soupe de ce sirop sur de la glace, jus de citron, eau pétillante.",
    ],
    garnish: "Un brin de thym frais",
    moods: ["festif", "moral-bas"],
    glass: "Verre à vin",
  },
  {
    id: "cerise-vanille",
    name: "Cerise Vanille Cola",
    tagline: "Le soda de ton enfance, en version adulte assumée.",
    level: "curieux",
    minutes: 5,
    color: "#a63d4f",
    ingredients: [
      { id: "jus-cerise", qty: "60 ml" },
      { id: "vanille", qty: "Quelques gouttes d'extrait" },
      { id: "lime", qty: "Le jus d'un quart" },
      { id: "cola", qty: "180 ml, bien froid" },
    ],
    steps: [
      "Mélange le jus de cerise, la vanille et le jus de lime au fond du verre.",
      "Remplis de glace.",
      "Verse le cola doucement le long du verre pour garder les bulles.",
    ],
    garnish: "Une spirale de zeste de lime",
    moods: ["moral-bas", "festif"],
    glass: "Grand verre",
  },
  {
    id: "coco-lime-frappe",
    name: "Coco Lime Frappé",
    tagline: "Crémeux, glacé, la paille est obligatoire.",
    level: "curieux",
    minutes: 6,
    color: "#f2ecd8",
    ingredients: [
      { id: "lait-coco", qty: "120 ml" },
      { id: "ananas-frais", qty: "1 tasse en cubes" },
      { id: "lime", qty: "Le jus d'une demie" },
      { id: "miel", qty: "1 c. à thé" },
    ],
    steps: [
      "Mets tout au mélangeur avec une tasse de glace.",
      "Mix jusqu'à consistance de slush.",
      "Sers aussitôt, ça fond vite et c'est parfait comme ça.",
    ],
    garnish: "Un triangle d'ananas sur le bord",
    moods: ["festif", "fraicheur", "fatigue"],
    glass: "Verre tiki ou grand verre",
  },
  {
    id: "matcha-lime",
    name: "Matcha Lime Coco",
    tagline: "Vert électrique, énergie propre, goût qui surprend.",
    level: "curieux",
    minutes: 5,
    color: "#7bc96f",
    ingredients: [
      { id: "matcha", qty: "1 c. à thé" },
      { id: "eau-coco", qty: "150 ml" },
      { id: "lime", qty: "Le jus d'une demie" },
      { id: "miel", qty: "1 c. à thé" },
    ],
    steps: [
      "Fouette le matcha avec 2 c. à soupe d'eau chaude jusqu'à ce qu'il soit mousseux.",
      "Ajoute le miel, puis l'eau de coco froide et le jus de lime.",
      "Secoue au shaker ou brasse énergiquement sur glace.",
    ],
    garnish: "Un voile de matcha saupoudré sur le dessus",
    moods: ["focus", "fatigue"],
    glass: "Grand verre",
  },
  {
    id: "erable-tonic",
    name: "Érable Café Tonic",
    tagline: "Le préféré des hipsters, et tu vas comprendre pourquoi.",
    level: "curieux",
    minutes: 4,
    color: "#8a5a33",
    ingredients: [
      { id: "cold-brew", qty: "90 ml" },
      { id: "sirop-erable", qty: "15 ml" },
      { id: "tonic", qty: "120 ml" },
      { id: "orange-fraiche", qty: "1 large zeste" },
    ],
    steps: [
      "Remplis un grand verre de glace et verse le tonic.",
      "Ajoute le sirop d'érable, brasse doucement.",
      "Verse le cold brew par-dessus pour l'effet étagé, exprime le zeste au-dessus.",
    ],
    garnish: "Le zeste d'orange exprimé",
    moods: ["focus", "festif"],
    glass: "Grand verre",
  },
  {
    id: "jardin-enchante",
    name: "Jardin Enchanté",
    tagline: "Botanique, poivré, servi comme au bar à cocktails.",
    level: "artiste",
    minutes: 8,
    color: "#9be8c0",
    ingredients: [
      { id: "concombre", qty: "5 rondelles" },
      { id: "basilic", qty: "5 feuilles" },
      { id: "jus-pomme", qty: "90 ml" },
      { id: "citron", qty: "Le jus d'un demi" },
      { id: "poivre-rose", qty: "4 grains écrasés" },
      { id: "tonic", qty: "90 ml" },
    ],
    steps: [
      "Écrase le concombre, le basilic et le poivre rose au shaker.",
      "Ajoute le jus de pomme, le jus de citron et de la glace, secoue 10 secondes.",
      "Filtre sur glace fraîche dans un verre old fashioned, allonge de tonic.",
    ],
    garnish: "Une feuille de basilic flottante et 2 grains de poivre rose",
    moods: ["festif", "stresse"],
    glass: "Verre old fashioned",
  },
  {
    id: "fiesta-grenadine",
    name: "Fiesta Grenadine",
    tagline: "Coucher de soleil en verre, couches parfaites garanties.",
    level: "artiste",
    minutes: 7,
    color: "#ff5e5e",
    ingredients: [
      { id: "jus-orange", qty: "120 ml" },
      { id: "jus-ananas", qty: "60 ml" },
      { id: "grenadine", qty: "30 ml" },
      { id: "ginger-ale", qty: "60 ml" },
    ],
    steps: [
      "Remplis un verre highball de glace jusqu'en haut.",
      "Verse le jus d'orange puis le jus d'ananas.",
      "Verse la grenadine lentement le long d'une cuillère pour l'effet coucher de soleil, puis le ginger ale.",
    ],
    garnish: "Une brochette d'ananas et une cerise au marasquin si tu en as",
    moods: ["festif", "moral-bas"],
    glass: "Verre highball",
  },
  {
    id: "curcuma-dore",
    name: "Curcuma Doré Glacé",
    tagline: "Golden latte en version fraîche, douceur épicée.",
    level: "artiste",
    minutes: 10,
    color: "#f0b429",
    ingredients: [
      { id: "lait-coco", qty: "150 ml" },
      { id: "curcuma", qty: "1/2 c. à thé" },
      { id: "cannelle", qty: "1 pincée" },
      { id: "gingembre", qty: "1 fine tranche" },
      { id: "miel", qty: "2 c. à thé" },
      { id: "vanille", qty: "Quelques gouttes" },
      { id: "poivre-rose", qty: "1 grain" },
    ],
    steps: [
      "Chauffe doucement le lait de coco avec le curcuma, la cannelle, le gingembre et le poivre, sans bouillir.",
      "Ajoute le miel et la vanille hors du feu, laisse tiédir puis filtre.",
      "Refroidis 30 minutes au frigo, sers sur beaucoup de glace.",
    ],
    garnish: "Un voile de cannelle",
    moods: ["stresse", "moral-bas"],
    glass: "Petit verre",
  },
  {
    id: "sauge-pamplemousse",
    name: "Sauge Pamplemousse",
    tagline: "L'accord dont tu ne savais pas que tu avais besoin.",
    level: "artiste",
    minutes: 9,
    color: "#f4a7b9",
    ingredients: [
      { id: "sauge", qty: "4 feuilles" },
      { id: "pamplemousse-frais", qty: "2 suprêmes" },
      { id: "jus-pamplemousse", qty: "120 ml" },
      { id: "miel", qty: "1 c. à thé" },
      { id: "eau-petillante", qty: "90 ml" },
    ],
    steps: [
      "Fais chauffer doucement le miel avec les feuilles de sauge et 2 c. à soupe d'eau, 3 minutes. Laisse tiédir.",
      "Écrase les suprêmes au fond du verre, ajoute le sirop de sauge filtré et le jus.",
      "Glace, eau pétillante, et une feuille de sauge entière.",
    ],
    garnish: "Une feuille de sauge passée rapidement à la poêle, elle devient croustillante",
    moods: ["festif", "stresse"],
    glass: "Verre à vin",
  },
  {
    id: "pomme-cardamome",
    name: "Pomme Cardamome Épicée",
    tagline: "Chaud ou froid, c'est l'automne qui se boit.",
    level: "artiste",
    minutes: 12,
    color: "#d98e4a",
    ingredients: [
      { id: "jus-pomme", qty: "200 ml" },
      { id: "cardamome", qty: "3 gousses écrasées" },
      { id: "thym", qty: "1 brin" },
      { id: "citron", qty: "Le jus d'un quart" },
      { id: "ginger-ale", qty: "60 ml" },
    ],
    steps: [
      "Fais frémir le jus de pomme avec la cardamome et le thym 8 minutes.",
      "Filtre, ajoute le jus de citron, laisse tiédir.",
      "Sers sur glace allongé de ginger ale, ou chaud en tasse.",
    ],
    garnish: "Un brin de thym et une gousse de cardamome",
    moods: ["moral-bas", "stresse"],
    glass: "Verre old fashioned ou tasse",
  },
  {
    id: "melon-tajin",
    name: "Melon Tajín Glacé",
    tagline: "Sucré, salé, piquant. Le trio qui réveille tout.",
    level: "artiste",
    minutes: 7,
    color: "#ff7b8f",
    ingredients: [
      { id: "melon-deau", qty: "2 tasses en cubes" },
      { id: "menthe", qty: "6 feuilles" },
      { id: "lime", qty: "Le jus d'une demie" },
      { id: "piment-tajin", qty: "1/2 c. à thé + pour le rebord" },
      { id: "eau-petillante", qty: "100 ml" },
    ],
    steps: [
      "Givre le rebord du verre : passe une lime sur le bord, trempe dans le Tajín.",
      "Mix le melon, la menthe, le jus de lime et le Tajín avec de la glace.",
      "Verse dans le verre givré, allonge d'eau pétillante.",
    ],
    garnish: "Un triangle de melon saupoudré de Tajín",
    moods: ["festif", "fraicheur", "fatigue"],
    glass: "Verre old fashioned",
  },
  {
    id: "canneberge-epicee",
    name: "Canneberge Orange Épicée",
    tagline: "Le drink des Fêtes, mais tu peux le boire en juillet aussi.",
    level: "artiste",
    minutes: 12,
    color: "#c0392b",
    ingredients: [
      { id: "jus-canneberge", qty: "150 ml" },
      { id: "orange-fraiche", qty: "Le jus d'une demie + 1 zeste" },
      { id: "clou-girofle", qty: "2 clous" },
      { id: "cannelle", qty: "1 bâton" },
      { id: "ginger-ale", qty: "90 ml" },
    ],
    steps: [
      "Fais frémir le jus de canneberge avec le zeste, les clous et la cannelle 8 minutes.",
      "Filtre et laisse refroidir complètement.",
      "Sur glace avec le jus d'orange, allonge de ginger ale.",
    ],
    garnish: "Le bâton de cannelle et une rondelle d'orange",
    moods: ["festif", "moral-bas"],
    glass: "Verre à vin",
  },
  {
    id: "kombucha-peche",
    name: "Kombucha Pêche Gingembre",
    tagline: "Fermenté, fruité, avec du caractère.",
    level: "artiste",
    minutes: 8,
    color: "#f7b267",
    ingredients: [
      { id: "kombucha", qty: "150 ml" },
      { id: "peche", qty: "1/2, en fines tranches" },
      { id: "gingembre", qty: "1 fine tranche" },
      { id: "thym", qty: "1 brin" },
      { id: "citron", qty: "Le jus d'un quart" },
    ],
    steps: [
      "Laisse infuser la pêche, le gingembre et le thym dans le kombucha 5 minutes au frigo.",
      "Verse sur de la glace avec le jus de citron.",
      "Garde les tranches de pêche dans le verre, elles sont délicieuses à la fin.",
    ],
    garnish: "Les tranches de pêche et le brin de thym",
    moods: ["focus", "festif", "fraicheur"],
    glass: "Grand verre",
  },
];

export const recipeById = (id: string) => RECIPES.find((r) => r.id === id);

/* ---------- Accords de saveurs ---------- */

export interface Pairing {
  id: string;
  a: string;
  b: string;
  note: string;
  recipes: string[];
}

export const PAIRINGS: Pairing[] = [
  { id: "p1", a: "Pamplemousse", b: "Romarin", note: "L'amertume du pamplemousse adore le côté résineux du romarin. Frotte le brin entre tes mains avant de servir.", recipes: ["pamplemousse-romarin", "sauge-pamplemousse"] },
  { id: "p2", a: "Fraise", b: "Basilic", note: "Le basilic révèle le côté poivré de la fraise. Écrase-les ensemble, jamais au mélangeur.", recipes: ["fraise-basilic", "jardin-enchante"] },
  { id: "p3", a: "Ananas", b: "Menthe", note: "Le duo tropical par excellence. La menthe claquée entre les mains libère dix fois plus d'arômes.", recipes: ["ananas-menthe", "coco-lime-frappe"] },
  { id: "p4", a: "Concombre", b: "Lime", note: "Fraîcheur de spa instantanée. Le concombre adoucit l'acidité de la lime.", recipes: ["concombre-lime", "jardin-enchante"] },
  { id: "p5", a: "Pêche", b: "Thym", note: "Le thym donne à la pêche un petit côté gastronomique inattendu. Essaie en sirop éclair.", recipes: ["peche-thym", "kombucha-peche"] },
  { id: "p6", a: "Mangue", b: "Gingembre", note: "Le piquant du gingembre réveille la douceur de la mangue. Une tranche fine suffit.", recipes: ["mangue-gingembre"] },
  { id: "p7", a: "Pomme", b: "Cannelle", note: "Le classique d'automne. Une pincée dans un jus froid change tout.", recipes: ["pomme-cannelle", "pomme-cardamome"] },
  { id: "p8", a: "Canneberge", b: "Orange", note: "L'orange arrondit l'acidité de la canneberge. Ajoute une épice chaude et c'est la fête.", recipes: ["canneberge-epicee"] },
  { id: "p9", a: "Cerise", b: "Vanille", note: "La vanille transforme la cerise en dessert. Quelques gouttes d'extrait, pas plus.", recipes: ["cerise-vanille"] },
  { id: "p10", a: "Bleuet", b: "Citron", note: "Le citron fait exploser la couleur et le goût du bleuet. Écrase-les ensemble.", recipes: ["bleuet-citron"] },
  { id: "p11", a: "Hibiscus", b: "Framboise", note: "Deux rouges qui s'additionnent : acidulé, floral, magnifique en verre.", recipes: ["hibiscus-framboise"] },
  { id: "p12", a: "Café", b: "Érable", note: "L'érable adoucit l'amertume du café mieux que le sucre. Essaie avec du tonic, promis.", recipes: ["erable-tonic"] },
  { id: "p13", a: "Melon d'eau", b: "Tajín", note: "Sucré, salé, piquant : le trio mexicain qui rend le melon complètement addictif.", recipes: ["melon-tajin"] },
  { id: "p14", a: "Noix de coco", b: "Lime", note: "La lime coupe le côté riche de la coco. La base de tous les drinks crémeux réussis.", recipes: ["coco-lime-frappe", "matcha-lime"] },
  { id: "p15", a: "Thé vert", b: "Agrumes", note: "Les agrumes adoucissent l'astringence du thé vert. Infuse court, sers glacé.", recipes: ["the-vert-agrumes"] },
  { id: "p16", a: "Sauge", b: "Pamplemousse", note: "La sauge donne au pamplemousse une profondeur presque fumée. En sirop tiède, c'est magique.", recipes: ["sauge-pamplemousse"] },
];

/* ---------- Humeurs ---------- */

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  intro: string;
  tip: string;
  recipes: string[];
}

export const MOODS: Mood[] = [
  {
    id: "stresse",
    label: "Stressé",
    emoji: "😮‍💨",
    intro: "On ralentit. Ces drinks sont pensés pour apaiser, pas pour stimuler.",
    tip: "La camomille, le romarin et les agrumes doux aident à redescendre. Bois lentement, c'est la moitié de l'effet.",
    recipes: ["calin-chaud", "pamplemousse-romarin", "concombre-lime"],
  },
  {
    id: "fatigue",
    label: "Fatigué",
    emoji: "🥱",
    intro: "Pas de caféine qui cogne ici, juste des saveurs qui réveillent en douceur.",
    tip: "Le gingembre et les agrumes donnent un coup de fouet naturel, sans le crash d'après.",
    recipes: ["soleil-levant", "mangue-gingembre", "matcha-lime"],
  },
  {
    id: "festif",
    label: "Festif",
    emoji: "🎉",
    intro: "Des verres qui ont l'air de la fête, parce que sobre ne veut pas dire plate.",
    tip: "Le secret d'un drink festif : un beau verre, de la glace en masse et une garniture qui dépasse.",
    recipes: ["fiesta-grenadine", "fraise-basilic", "melon-tajin"],
  },
  {
    id: "moral-bas",
    label: "Moral bas",
    emoji: "🌧️",
    intro: "Doucement. Voici des drinks réconfortants, comme un câlin en verre.",
    tip: "Les saveurs douces et chaudes réconfortent. Et si ça ne va vraiment pas, parler à quelqu'un compte plus qu'un drink.",
    recipes: ["calin-chaud", "curcuma-dore", "cerise-vanille"],
  },
  {
    id: "focus",
    label: "Besoin de focus",
    emoji: "🎯",
    intro: "Clarté et fraîcheur, pour les après-midis qui n'en finissent plus.",
    tip: "Le thé vert et le matcha offrent une énergie stable. Évite les drinks trop sucrés quand tu dois te concentrer.",
    recipes: ["the-vert-agrumes", "matcha-lime", "kombucha-peche"],
  },
  {
    id: "fraicheur",
    label: "Soif de fraîcheur",
    emoji: "🧊",
    intro: "Glacé, croquant, désaltérant. L'hydratation n'a jamais été aussi le fun.",
    tip: "Le concombre et la menthe sont les champions de la fraîcheur. Beaucoup de glace, toujours.",
    recipes: ["concombre-lime", "melon-tajin", "ananas-menthe"],
  },
];

/* ---------- Compteur de sobriété ---------- */

export const MILESTONES = [
  { days: 1, label: "Premier jour", message: "Le premier jour est le plus courageux. Bravo." },
  { days: 7, label: "Une semaine", message: "Sept jours de suite. Tu construis quelque chose de solide." },
  { days: 30, label: "Un mois", message: "Un mois complet. Prends le temps de le célébrer." },
  { days: 90, label: "Trois mois", message: "Trois mois. Tes nouvelles habitudes prennent racine." },
  { days: 180, label: "Six mois", message: "La moitié d'une année. Impressionnant, pour vrai." },
  { days: 365, label: "Un an", message: "Un an. Tu es la preuve que c'est possible." },
];

export function daysBetween(from: string, to: Date = new Date()): number {
  const a = new Date(from + "T00:00:00");
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000));
}
