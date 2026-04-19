import { searchAyat } from "@/lib/api";
import SearchResults from "./SearchResults";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query, page } = await searchParams;
  const currentPage = parseInt(page || "1");

  if (!query) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12">
        <SearchResults results={[]} pagination={{ page: 1, limit: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false }} query="" currentPage={currentPage} />
      </div>
    );
  }

  try {
    const { data: results, pagination } = await searchAyat(query, currentPage);

    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12">
        <SearchResults results={results} pagination={pagination} query={query} currentPage={currentPage} />
      </div>
    );
  } catch (error) {
    console.log("error",error)
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12 text-center">
        <SearchResults results={[]} pagination={{ page: 1, limit: 10, total: 0, totalPages: 0, hasNext: false, hasPrev: false }} query={query} currentPage={currentPage} error />
      </div>
    );
  }
}