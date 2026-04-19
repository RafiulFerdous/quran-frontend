"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { searchAyat } from "@/lib/api";
import { Ayah, Pagination } from "@/types/quran";
import SearchResults from "./SearchResults";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const pageParam = searchParams.get("page") || "1";
  const currentPage = parseInt(pageParam);

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Ayah[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false });
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setResults([]);
        setPagination({ page: 1, limit: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false });
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const { data, pagination: pag } = await searchAyat(query, currentPage);
        setResults(data);
        setPagination(pag);
      } catch (err) {
        console.error("Search error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [query, currentPage]);

  return (
    <SearchResults 
      results={results} 
      pagination={pagination} 
      query={query} 
      currentPage={currentPage} 
      error={error}
      loading={loading}
    />
  );
}

function SearchLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12">
      <div className="max-w-2xl mx-auto relative mb-8">
        <input
          type="text"
          placeholder="Search for a verse, keyword or Surah..."
          className="w-full px-4 lg:px-6 py-3 lg:py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl lg:rounded-2xl shadow-sm text-base lg:text-lg"
          disabled
        />
        <button className="absolute right-2 top-2 bottom-2 px-4 lg:px-6 bg-emerald-600 text-white rounded-lg lg:rounded-xl font-medium lg:font-bold">
          Search
        </button>
      </div>
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-500 mt-4">Loading...</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}