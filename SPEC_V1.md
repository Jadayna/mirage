# Mirage, SPEC V1

**Nom de travail :** Mirage (3 noms candidats pour le lancement : Mirage, Sobre & Fun, Zéro Preuve)
**Type :** PWA mobile-first, React + Vite + Tailwind v4, framer-motion
**Repo :** https://github.com/Jadayna/mirage (main)
**Langue V1 :** bilingue FR/EN (2026-10-06). Toggle FR/EN flottant en haut à droite, visible sur tous les écrans. Langue par défaut : langue du navigateur (EN ou FR), sinon FR. Choix persisté en localStorage (`mirage:lang:v1`). Français québécois inchangé (sans tirets longs) ; anglais naturel, noms de drinks adaptés (pas du mot-à-mot).
**Backend V1 :** aucun, tout en localStorage

## Concept

Des mocktails fun, sans alcool, avec ce qu'on a déjà chez soi. Pour tout le monde, pas juste les
personnes sobres, mais sobre-friendly : rien n'est imposé, tout est disponible en option.

Le problème : les apps de mocktails existantes sont des listes de recettes mortes. Personne ne
combine garde-manger + accords de saveurs + humeur + soutien sobre optionnel.

La promesse : des drinks qui ont l'air d'une fête, pas d'un prix de consolation.

## Écrans V1

1. **Onboarding (3 étapes)** : prénom, style de mixologue (Chill / Curieux / Artiste / Mixte),
   puis proposition OPT-IN du compteur de sobriété. Ton doux, jamais moralisateur, désactivable
   à tout moment dans le profil.
2. **Accueil** : hero animé (bulles flottantes, verre qui se verse), salutation personnalisée,
   drink du moment, raccourcis humeurs, widget parcours sobre (si activé), favoris récents.
3. **Garde-manger** : ingrédients cochés par catégories (jus, pétillants, frais, herbes, épices,
   sucrants, thés). Résultats en deux groupes : "Tu peux faire ça maintenant" (0 ingrédient
   manquant) et "Il te manque juste un ingrédient" (1 manquant, nommé explicitement).
4. **Recettes** : 24 créations originales, recherche plein texte, filtres par niveau
   (Chill = 2-3 ingrédients et 2 min, Curieux = sirop ou infusion maison, Artiste = technique +
   garniture), filtre favoris. Fiche recette : verre animé qui se remplit, ingrédients,
   étapes numérotées, touche finale (garniture).
5. **Accords** : 16 duos de saveurs (pamplemousse+romarin, fraise+basilic, ananas+menthe...),
   chacun avec un conseil de pro. Toucher un accord ouvre les drinks qui l'utilisent.
6. **Humeur** : 6 humeurs (stressé, fatigué, festif, moral bas, besoin de focus, soif de fraîcheur).
   Chaque humeur propose 3 drinks + un conseil (ex : camomille et agrumes doux pour apaiser).
7. **Profil** : prénom modifiable, stats (favoris, ingrédients), toggle du compteur de sobriété,
   paliers célébrés (1, 7, 30, 90, 180, 365 jours) avec messages doux, bouton recommencer,
   reset complet de l'app.

## Design

Esthétique "jus de nuit" : fond prune profond (#160a24), accents agrumes vibrants (lime, corail,
pamplemousse, jaune soleil, menthe). Typographies Bricolage Grotesque (titres) + Inter (texte).
Bulles flottantes en arrière-plan, halo conique rotatif sur le hero, verre SVG avec animation
de versement et reflets, transitions de cartes avec framer-motion, micro-interactions sur tous
les boutons (scale au toucher), pilule animée sur la barre d'onglets. PWA : manifest +
icônes 192/512 générées (rondelle d'agrume).

## Split gratuit vs "Suprême" (phase 2, à décider avec Kayna)

Gratuit (V1, généreux) : tout ce qui est listé ci-dessus.

Suprême (payant, phase 2) :
- Packs de recettes thématiques (Fêtes, Brunch, Été...) à 2-3 $ le pack, modèle Murmure
- Créateur suprême : tu donnes 2-3 ingrédients + ton humeur, ça invente un drink original nommé.
  Quelques créations gratuites par semaine, illimité en payant
- Mode soirée : quantités en pichet, menu de soirée à partager
- Carnet de créations : sauvegarder et noter tes inventions, illimité en payant
- Zéro pub + thèmes visuels

## Roadmap backend (phase 2+)

- Comptes (lien magique, comme Murmure) pour sync multi-appareils
- Stripe (compte Axe C Studio existant) : packs thématiques + suprême
- Banque de recettes extensible côté serveur, soumissions de la communauté (modération)
- Notifications douces optionnelles (rappel du rituel du vendredi, nouveau pack)

## Notes techniques

- Persistance : localStorage, clés `mirage:profile:v1`, `mirage:pantry:v1`, `mirage:favorites:v1`, `mirage:lang:v1`
- i18n : `src/i18n/` (`types.ts`, `fr.ts`, `en.ts`, `index.tsx`) ; les données FR d'origine (`src/data.ts`) sont inchangées, l'anglais vit dans `en.ts` avec les mêmes ids
- Aucune donnée envoyée nulle part (mentionné dans le profil, argument confiance)
- PWA installable, theme-color #160a24
