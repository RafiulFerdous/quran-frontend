"use client";

import { Ayah, Surah } from "@/types/quran";
import SurahView from "./SurahView";

interface SurahPageClientProps {
  surah: Surah;
  ayat: Ayah[];
}

export default function SurahPageClient({ surah, ayat }: SurahPageClientProps) {
  return <SurahView surah={surah} ayat={ayat} />;
}