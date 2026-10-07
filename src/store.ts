import { useCallback, useState } from "react";

export interface Profile {
  name: string;
  level: "chill" | "curieux" | "artiste" | "mixte";
  soberOptIn: boolean;
  soberStart: string | null;
  onboarded: boolean;
}

const DEFAULT_PROFILE: Profile = {
  name: "",
  level: "mixte",
  soberOptIn: false,
  soberStart: null,
  onboarded: false,
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* stockage plein ou indisponible, on continue sans */
  }
}

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => read(key, initial));
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        write(key, next);
        return next;
      });
    },
    [key]
  );
  return [value, set] as const;
}

export function useProfile() {
  return useLocalStorage<Profile>("mirage:profile:v1", DEFAULT_PROFILE);
}

export function usePantry() {
  return useLocalStorage<string[]>("mirage:pantry:v1", []);
}

export function useFavorites() {
  return useLocalStorage<string[]>("mirage:favorites:v1", []);
}
