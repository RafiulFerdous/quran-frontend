"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a verse, keyword or Surah..."
        className="w-full px-4 lg:px-6 py-3 lg:py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl lg:rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-base lg:text-lg"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 bottom-2 px-4 lg:px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg lg:rounded-xl font-medium lg:font-bold transition-colors"
      >
        <span className="lg:hidden">Search</span>
        <span className="hidden lg:inline">Search</span>
      </button>
    </form>
  );
}