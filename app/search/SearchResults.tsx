"use client";

import { useSettings } from "@/context/SettingsContext";
import { Ayah, Pagination } from "@/types/quran";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

interface SearchResultsProps {
  results: Ayah[];
  pagination: Pagination;
  query: string;
  currentPage: number;
  error?: boolean;
}

const fontMap: Record<string, string> = {
  amiri: "Amiri, var(--font-amiri)",
  nastaliq: "'Noto Naskh Arabic', 'Traditional Arabic', serif",
  scheherazade: "Scheherazade, 'Traditional Arabic', serif",
};

export default function SearchResults({ results, pagination, query, currentPage, error }: SearchResultsProps) {
  const { arabicFont, arabicFontSize, translationFontSize } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fontFamily = fontMap[arabicFont] || fontMap.amiri;

  return (
    <>
      <SearchBar />
      
      <header className="mb-6 lg:mb-8">
        <h1 className="text-lg lg:text-2xl font-bold">
          Search results for: <span className="text-emerald-600">"{query}"</span>
        </h1>
        {!error && pagination.total > 0 && (
          <p className="text-zinc-500 text-sm lg:text-base">{pagination.total} results found</p>
        )}
      </header>

      {error ? (
        <p className="text-red-500 mt-4">Failed to perform search. Please try again.</p>
      ) : results.length === 0 ? (
        <div className="text-center py-12 lg:py-20">
          <p className="text-zinc-500">No results found.</p>
        </div>
      ) : (
        <div className="space-y-4 lg:space-y-6">
          {results.map((ayah) => (
            <div
              key={`${ayah.surahId}-${ayah.numberInSurah}`}
              className="p-4 lg:p-6 bg-white dark:bg-zinc-900 rounded-xl lg:rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2 lg:mb-4">
                <div className="flex flex-col">
                  <Link 
                    href={`/surah/${ayah.surahId}`}
                    className="text-xs lg:text-sm font-bold text-emerald-600 hover:underline"
                  >
                    {ayah.surahNameTransliterated || `Surah ${ ayah.surahId}`}
                  </Link>
                  <span className="text-xs text-zinc-500">{ayah.surahNameEnglish}</span>
                </div>
                <div 
                  className="text-lg lg:text-2xl font-arabic" 
                  dir="rtl"
                  style={{
                    fontFamily,
                    fontSize: mounted ? `${arabicFontSize * 0.6}px` : undefined,
                  }}
                >
                  {ayah.textArabic}
                </div>
              </div>
              <p 
                className="text-sm lg:text-base text-zinc-700 dark:text-zinc-300"
                style={{
                  fontSize: mounted ? `${translationFontSize}px` : undefined,
                }}
              >
                {ayah.textTranslation}
              </p>
            </div>
          ))}
        </div>
      )}

      {pagination.totalPages > 1 && (
        <div className="mt-8 lg:mt-12 flex justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/search?q=${query}&page=${currentPage - 1}`}
              className="px-3 lg:px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-emerald-500 transition-colors text-sm"
            >
              Previous
            </Link>
          )}
          <span className="px-3 lg:px-4 py-2 font-medium text-sm">
            Page {currentPage} of {pagination.totalPages}
          </span>
          {pagination.hasNext && (
            <Link
              href={`/search?q=${query}&page=${currentPage + 1}`}
              className="px-3 lg:px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-emerald-500 transition-colors text-sm"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </>
  );
}