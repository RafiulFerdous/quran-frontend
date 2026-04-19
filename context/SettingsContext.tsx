"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

export type ArabicFont = "amiri" | "nastaliq" | "scheherazade";

export interface Settings {
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
  sidebarOpen: boolean;
}

interface SettingsContextType extends Settings {
  setArabicFont: (font: ArabicFont) => void;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const defaultSettings: Settings = {
  arabicFont: "amiri",
  arabicFontSize: 32,
  translationFontSize: 18,
  sidebarOpen: true,
};

const STORAGE_KEY = "quran-settings";

function loadSettings(): Settings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) };
  } catch {}
  return defaultSettings;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings, mounted]);

  const setArabicFont = useCallback((arabicFont: ArabicFont) => {
    setSettings((s) => ({ ...s, arabicFont }));
  }, []);

  const setArabicFontSize = useCallback((arabicFontSize: number) => {
    setSettings((s) => ({ ...s, arabicFontSize: Math.max(16, Math.min(64, arabicFontSize)) }));
  }, []);

  const setTranslationFontSize = useCallback((translationFontSize: number) => {
    setSettings((s) => ({ ...s, translationFontSize: Math.max(12, Math.min(32, translationFontSize)) }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setSettings((s) => ({ ...s, sidebarOpen: !s.sidebarOpen }));
  }, []);

  const setSidebarOpen = useCallback((sidebarOpen: boolean) => {
    setSettings((s) => ({ ...s, sidebarOpen }));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        setArabicFont,
        setArabicFontSize,
        setTranslationFontSize,
        toggleSidebar,
        setSidebarOpen,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}