import { searchAyat } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, page } = await searchParams;
  const currentPage = parseInt(page || "1");

  if (!query) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12">
        <SearchBar />
        <div className="text-center py-12 lg:py-20">
          <p className="text-zinc-500">Please enter a search term.</p>
        </div>
      </div>
    );
  }

  try {
    const { data: results, pagination } = await searchAyat(query, currentPage);

    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12">
        <SearchBar />
        
        <header className="mb-6 lg:mb-8">
          <h1 className="text-lg lg:text-2xl font-bold">
            Search results for: <span className="text-emerald-600">"{query}"</span>
          </h1>
          <p className="text-zinc-500 text-sm lg:text-base">{pagination.total} results found</p>
        </header>

        <div className="space-y-4 lg:space-y-6">
          {results.map((ayah) => (
            <div
              key={`${ayah.surahId}-${ayah.numberInSurah}`}
              className="p-4 lg:p-6 bg-white dark:bg-zinc-900 rounded-xl lg:rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2 lg:mb-4">
                <Link 
                  href={`/surah/${ayah.surahId}`}
                  className="text-xs lg:text-sm font-bold text-emerald-600 hover:underline"
                >
                  Surah {ayah.surahId}:{ayah.numberInSurah}
                </Link>
                <div className="text-lg lg:text-2xl font-arabic" dir="rtl">{ayah.textArabic}</div>
              </div>
              <p className="text-sm lg:text-base text-zinc-700 dark:text-zinc-300">{ayah.textTranslation}</p>
            </div>
          ))}
        </div>

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
      </div>
    );
  } catch (error) {
    console.log("error",error)
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12 text-center">
        <SearchBar />
        <p className="text-red-500 mt-4">Failed to perform search. Please try again.</p>
      </div>
    );
  }
}