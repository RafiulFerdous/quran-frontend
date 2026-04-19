import { getSurahs } from "@/lib/api";
import SurahList from "@/components/SurahList";
import SearchBar from "@/components/SearchBar";

export default async function HomePage() {
  const { data: surahs } = await getSurahs(1, 12);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-12">
      <header className="text-center mb-8 lg:mb-16">
        <h1 className="text-3xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-4 lg:mb-6 tracking-tight">
          Al-Quran <span className="text-emerald-600">Al-Kareem</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base lg:text-lg mb-8 lg:mb-12">
          Explore the divine revelations of the Holy Quran with translations and
          transliterations.
        </p>
        <SearchBar />
      </header>

      <SurahList initialSurahs={surahs} />
    </div>
  );
}