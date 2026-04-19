import { getAyahs, getSurahs } from "@/lib/api";
import { notFound } from "next/navigation";
import SurahPageClient from "@/components/SurahPageClient";

interface SurahPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { data: surahs } = await getSurahs(1, 114);
  return surahs.map((surah) => ({
    id: surah.id.toString(),
  }));
}

export default async function SurahPage({ params }: SurahPageProps) {
  const { id } = await params;
  const surahId = parseInt(id);

  if (isNaN(surahId)) return notFound();

  try {
    const { data: ayat, surah } = await getAyahs(surahId, 1, 300);

    if (!surah) return notFound();

    return <SurahPageClient surah={surah} ayat={ayat} />;
  } catch (error) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-6 lg:py-12">
        <div className="flex flex-col items-center justify-center p-6 lg:p-12">
          <h1 className="text-xl lg:text-2xl font-bold mb-4">Surah Not Found</h1>
          <p className="text-zinc-500">There was an error loading the Surah content.</p>
          <a href="/" className="mt-4 lg:mt-8 text-emerald-600 font-bold">Back to Home</a>
        </div>
      </div>
    );
  }
}