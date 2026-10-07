import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import type { Profile } from "../store";
import { Bubbles, PourGlass } from "./ui";

const STEPS = ["Salut", "Ton style", "Sobre?"];

export default function Onboarding({ onDone }: { onDone: (p: Profile) => void }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [level, setLevel] = useState<Profile["level"]>("mixte");
  const [sober, setSober] = useState(false);

  const next = () => {
    if (step < 2) setStep(step + 1);
    else {
      const today = new Date();
      const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
        today.getDate()
      ).padStart(2, "0")}`;
      onDone({
        name: name.trim(),
        level,
        soberOptIn: sober,
        soberStart: sober ? iso : null,
        onboarded: true,
      });
    }
  };

  const levels: { id: Profile["level"]; label: string; desc: string }[] = [
    { id: "chill", label: "Chill", desc: "Simple et vite fait" },
    { id: "curieux", label: "Curieux", desc: "J'aime expérimenter un peu" },
    { id: "artiste", label: "Artiste", desc: "Je veux impressionner" },
    { id: "mixte", label: "Un peu de tout", desc: "Selon mon humeur du moment" },
  ];

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-nuit">
      <Bubbles count={16} />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-corail/25 blur-3xl pulse-glow" />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-14">
        <div className="mb-8 flex gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-lime to-soleil"
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.4 }}
              />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-1 flex-col"
          >
            {step === 0 && (
              <div className="flex flex-1 flex-col items-center text-center">
                <PourGlass color="#ff8fab" size={110} />
                <h1 className="font-display mt-6 text-4xl font-extrabold leading-tight">
                  Bienvenue dans{" "}
                  <span className="bg-gradient-to-r from-lime via-soleil to-corail bg-clip-text text-transparent">
                    Mirage
                  </span>
                </h1>
                <p className="mt-3 max-w-xs text-white/60">
                  Des mocktails fun, sans alcool, avec ce que tu as déjà chez toi. Comment on t'appelle?
                </p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ton prénom"
                  maxLength={24}
                  autoFocus
                  className="mt-8 w-full rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4 text-center text-xl font-semibold outline-none backdrop-blur placeholder:text-white/30 focus:border-lime/60"
                />
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex items-center gap-2 text-lime">
                  <Sparkles size={18} />
                  <span className="text-sm font-semibold uppercase tracking-widest">Ton style</span>
                </div>
                <h1 className="font-display text-3xl font-extrabold leading-tight">
                  {name ? `${name}, tu` : "Tu"} es plutôt quel genre de mixologue?
                </h1>
                <p className="mt-2 text-sm text-white/55">
                  Ça nous aide à te suggérer le bon niveau de complexité. Tu pourras tout explorer quand même.
                </p>
                <div className="mt-6 grid gap-3">
                  {levels.map((l) => (
                    <motion.button
                      key={l.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setLevel(l.id)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        level === l.id
                          ? "border-lime/60 bg-lime/10"
                          : "border-white/10 bg-white/[0.05]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-bold">{l.label}</span>
                        {level === l.id && (
                          <span className="rounded-full bg-lime p-1 text-nuit">
                            <Check size={14} />
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-white/55">{l.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-1 flex-col">
                <h1 className="font-display text-3xl font-extrabold leading-tight">
                  Une petite question douce
                </h1>
                <p className="mt-3 text-white/60">
                  Mirage est sobre-friendly. Si tu réduis ou arrêtes l'alcool, on peut afficher un petit
                  compteur de jours, juste pour toi, sans pression et sans jugement.
                </p>
                <p className="mt-2 text-sm text-white/45">
                  C'est 100% optionnel. Tu peux l'activer ou le retirer à tout moment dans ton profil.
                </p>
                <div className="mt-6 grid gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSober(true)}
                    className={`rounded-2xl border p-5 text-left transition-colors ${
                      sober ? "border-menthe/60 bg-menthe/10" : "border-white/10 bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold">Oui, active le compteur</span>
                      {sober && (
                        <span className="rounded-full bg-menthe p-1 text-nuit">
                          <Check size={14} />
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-white/55">
                      Je célèbre mes jours sans alcool, à mon rythme
                    </p>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSober(false)}
                    className={`rounded-2xl border p-5 text-left transition-colors ${
                      !sober ? "border-soleil/60 bg-soleil/10" : "border-white/10 bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-lg font-bold">Non merci, pas pour l'instant</span>
                      {!sober && (
                        <span className="rounded-full bg-soleil p-1 text-nuit">
                          <Check size={14} />
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-white/55">
                      Je suis juste ici pour des bons drinks
                    </p>
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={next}
          disabled={step === 0 && !name.trim()}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-lime to-soleil px-6 py-4 font-display text-lg font-extrabold text-nuit shadow-lg shadow-lime/20 disabled:opacity-40"
        >
          {step === 2 ? "C'est parti" : "Continuer"}
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
