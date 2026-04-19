"use client";

import { useSettings } from "@/context/SettingsContext";
import { Ayah, Surah } from "@/types/quran";
import { useEffect, useState } from "react";

interface SurahViewProps {
  surah: Surah;
  ayat: Ayah[];
}

const fontMap: Record<string, string> = {
  amiri: "Amiri, var(--font-amiri)",
  nastaliq: "'Noto Naskh Arabic', 'Traditional Arabic', serif",
  scheherazade: "Scheherazade, 'Traditional Arabic', serif",
};

export default function SurahView({ surah, ayat }: SurahViewProps) {
  const { arabicFont, arabicFontSize, translationFontSize } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fontFamily = fontMap[arabicFont] || fontMap.amiri;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 lg:py-12">
      <header className="text-center mb-8 lg:mb-16 p-6 lg:p-12 bg-white dark:bg-zinc-900 rounded-2xl lg:rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="text-emerald-600 font-bold mb-2 lg:mb-4 text-sm lg:text-base">Surah {surah.id}</div>
        <h1 className="text-2xl lg:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-1 lg:mb-2">
          {surah.nameTransliterated}
        </h1>
        <p className="text-base lg:text-xl text-zinc-500 mb-4 lg:mb-6">{surah.nameEnglish}</p>
        <div className="text-3xl lg:text-5xl font-arabic text-zinc-900 dark:text-zinc-100" dir="rtl" style={{ fontFamily }}>
          {surah.nameArabic}
        </div>
        <div className="mt-4 lg:mt-8 flex justify-center gap-2 lg:gap-4 text-xs lg:text-sm font-medium text-zinc-500 uppercase tracking-widest">
          <span>{surah.revelationType}</span>
          <span>•</span>
          <span>{surah.ayahCount} Ayahs</span>
        </div>
      </header>

      <div className="space-y-4 lg:space-y-8">
        {ayat.map((ayah) => (
          <div
            key={ayah.id}
            className="group p-4 lg:p-8 bg-white dark:bg-zinc-900 rounded-xl lg:rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-4 lg:mb-8">
              <div className="w-6 lg:w-8 h-6 lg:h-8 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex-shrink-0">
                {ayah.numberInSurah}
              </div>
              <div
                className="leading-loose text-right text-zinc-900 dark:text-zinc-100 flex-1"
                dir="rtl"
                style={{
                  fontFamily,
                  fontSize: mounted ? `${arabicFontSize}px` : undefined,
                }}
              >
                {ayah.textArabic}
              </div>
            </div>
            <div
              className="leading-relaxed text-zinc-700 dark:text-zinc-300"
              style={{
                fontSize: mounted ? `${translationFontSize}px` : undefined,
              }}
            >
              {ayah.textTranslation}
            </div>
            {ayah.textTransliterated && (
              <div className="mt-2 lg:mt-4 text-sm text-zinc-500 italic">
                {ayah.textTransliterated}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}