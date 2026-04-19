"use client";

import Link from "next/link";
import { Surah } from "@/types/quran";

interface SurahCardProps {
  surah: Surah;
  fontFamily?: string;
  fontSize?: number;
}

export default function SurahCard({ surah, fontFamily, fontSize }: SurahCardProps) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className="block p-4 lg:p-6 bg-white dark:bg-zinc-900 rounded-xl lg:rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/30 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold">
          {surah.id}
        </div>
        <div className="text-xs text-zinc-500 uppercase">{surah.revelationType}</div>
      </div>
      <h3 className="text-lg lg:text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
        {surah.nameTransliterated}
      </h3>
      <p className="text-sm text-zinc-500 mb-2">{surah.nameEnglish}</p>
      <div 
        className="text-2xl font-arabic text-zinc-900 dark:text-zinc-100" 
        dir="rtl"
        style={{
          fontFamily: fontFamily || "Amiri, var(--font-amiri)",
          fontSize: fontSize ? `${fontSize * 0.6}px` : undefined,
        }}
      >
        {surah.nameArabic}
      </div>
      <div className="mt-3 text-xs text-zinc-500">
        {surah.ayahCount} Ayahs
      </div>
    </Link>
  );
}