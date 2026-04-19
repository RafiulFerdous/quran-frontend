"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Surah } from "@/types/quran";
import SurahCard from "./SurahCard";
import { useSettings } from "@/context/SettingsContext";

interface SurahListProps {
  initialSurahs: Surah[];
}

export default function SurahList({ initialSurahs }: SurahListProps) {
  const { arabicFont, arabicFontSize } = useSettings();
  const [surahs, setSurahs] = useState<Surah[]>(initialSurahs);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreSurahs = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await fetch(`/api/surahs?page=${nextPage}&limit=12`);
      const result = await response.json();
      
      if (result.data.length === 0) {
        setHasMore(false);
      } else {
        setSurahs((prev) => [...prev, ...result.data.map((s: Surah) => ({
          id: s.id,
          nameArabic: s.nameArabic,
          nameTransliterated: s.nameTransliterated,
          nameEnglish: s.nameEnglish,
          revelationType: s.revelationType,
          ayahCount: s.ayahCount,
        }))]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more surahs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreSurahs();
    }
  }, [inView, hasMore]);

  useEffect(() => {
    setSurahs(initialSurahs);
    setPage(1);
    setHasMore(true);
  }, [initialSurahs]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {surahs.map((surah) => (
          <SurahCard 
            key={surah.id} 
            surah={surah} 
            fontFamily={
              arabicFont === "amiri" ? "Amiri, var(--font-amiri)" :
              arabicFont === "nastaliq" ? "'Noto Naskh Arabic', 'Traditional Arabic', serif" :
              "Scheherazade, 'Traditional Arabic', serif"
            }
            fontSize={arabicFontSize}
          />
        ))}
      </div>
      
      {hasMore && (
        <div ref={ref} className="flex justify-center mt-8 lg:mt-12">
          {loading && (
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      )}
    </>
  );
}