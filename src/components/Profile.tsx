import { motion } from "framer-motion";
import { Flame, PartyPopper, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../i18n";
import { daysBetween } from "../data";
import type { Profile } from "../store";
import { SectionTitle } from "./ui";

export default function ProfileView({
  profile,
  setProfile,
  favCount,
  pantryCount,
  onReset,
}: {
  profile: Profile;
  setProfile: (p: Profile | ((prev: Profile) => Profile)) => void;
  favCount: number;
  pantryCount: number;
  onReset: () => void;
}) {
  const { t } = useI18n();
  const ui = t.ui;
  const [name, setName] = useState(profile.name);
  const showSober = profile.soberOptIn && profile.soberStart;
  const days = showSober ? daysBetween(profile.soberStart!) : 0;
  const reached = t.milestones.filter((m) => m.days <= days);

  const setSober = (on: boolean) => {
    if (on) {
      const t0 = new Date();
      const iso = `${t0.getFullYear()}-${String(t0.getMonth() + 1).padStart(2, "0")}-${String(
        t0.getDate()
      ).padStart(2, "0")}`;
      setProfile((p) => ({ ...p, soberOptIn: true, soberStart: p.soberStart ?? iso }));
    } else {
      setProfile((p) => ({ ...p, soberOptIn: false }));
    }
  };

  return (
    <div className="space-y-6">
      <SectionTitle sub={ui.profileSub}>{ui.profileTitle}</SectionTitle>

      <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
        <label className="text-xs font-semibold uppercase tracking-widest text-white/45">
          {ui.profileName}
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setProfile((p) => ({ ...p, name: name.trim() }))}
          maxLength={24}
          className="mt-2 w-full rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-lg font-semibold outline-none focus:border-lime/50"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 text-center">
          <p className="font-display text-3xl font-extrabold text-lime">{favCount}</p>
          <p className="mt-1 text-xs text-white/55">{ui.profileFavDrinks}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 text-center">
          <p className="font-display text-3xl font-extrabold text-soleil">{pantryCount}</p>
          <p className="mt-1 text-xs text-white/55">{ui.profilePantryItems}</p>
        </div>
      </div>

      <div className="rounded-3xl border border-menthe/25 bg-menthe/[0.07] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-display flex items-center gap-2 text-lg font-bold">
              <Flame size={18} className="text-menthe" /> {ui.profileSoberTitle}
            </p>
            <p className="mt-1 text-sm text-white/60">{ui.profileSoberText}</p>
          </div>
          <button
            onClick={() => setSober(!profile.soberOptIn)}
            aria-label={ui.profileSoberTitle}
            className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${
              profile.soberOptIn ? "bg-menthe" : "bg-white/15"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow ${
                profile.soberOptIn ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>

        {showSober && (
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold">{days}</span>
              <span className="text-white/60">{ui.homeDaysSober(days)}</span>
            </div>
            {reached.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {reached.map((m) => (
                  <span
                    key={m.days}
                    className="inline-flex items-center gap-1.5 rounded-full bg-menthe/15 px-3 py-1.5 text-xs font-semibold text-menthe"
                  >
                    <PartyPopper size={12} /> {m.label}
                  </span>
                ))}
              </div>
            )}
            {reached.length > 0 && (
              <p className="mt-2 text-sm italic text-white/55">
                {reached[reached.length - 1].message}
              </p>
            )}
            <button
              onClick={() => {
                const t0 = new Date();
                const iso = `${t0.getFullYear()}-${String(t0.getMonth() + 1).padStart(2, "0")}-${String(
                  t0.getDate()
                ).padStart(2, "0")}`;
                setProfile((p) => ({ ...p, soberStart: iso }));
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white/45 underline"
            >
              <RotateCcw size={12} /> {ui.profileRestart}
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold text-white/45"
      >
        {ui.profileReset}
      </button>
      <p className="pb-6 text-center text-xs text-white/30">{ui.profilePrivacy}</p>
    </div>
  );
}
