import { SurahResponse, AyahResponse, SearchResponse, Ayah, Surah } from "@/types/quran";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://quran-api-y23k.onrender.com/api";

interface ApiSurah {
  id: number;
  nameArabic: string;
  nameTransliterated: string;
  nameEnglish: string;
  revelationType: string;
  ayahCount: number;
}

interface ApiAyah {
  id: string;
  verseInSurah: number;
  textArabic: string;
  textTranslation: string;
}

function mapSurah(apiSurah: ApiSurah): Surah {
  return {
    id: apiSurah.id,
    nameArabic: apiSurah.nameArabic,
    nameTransliterated: apiSurah.nameTransliterated,
    nameEnglish: apiSurah.nameEnglish,
    revelationType: apiSurah.revelationType as "MECCAN" | "MEDINAN",
    ayahCount: apiSurah.ayahCount,
  };
}

function mapAyah(apiAyah: ApiAyah, surahId: number): Ayah {
  return {
    id: apiAyah.id,
    surahId,
    numberInSurah: apiAyah.verseInSurah,
    textArabic: apiAyah.textArabic,
    textTranslation: apiAyah.textTranslation,
  };
}

export async function getSurahs(page = 1, limit = 10): Promise<SurahResponse> {
  const response = await fetch(`${BASE_URL}/surahs?page=${page}&limit=${limit}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Surahs");
  }

  const result = await response.json();
  return {
    data: result.data.map(mapSurah),
    pagination: result.pagination,
  };
}

export async function getAyahs(
  surahNumber: number,
  page = 1,
  limit = 20,
): Promise<AyahResponse> {
  const response = await fetch(
    `${BASE_URL}/surahs/${surahNumber}/ayat?page=${page}&limit=${limit}`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Ayat for Surah ${surahNumber}`);
  }

  const result = await response.json();
  return {
    data: result.data.map((a: ApiAyah) => mapAyah(a, surahNumber)),
    pagination: result.pagination,
    surah: result.surah ? mapSurah(result.surah) : undefined,
  };
}

export async function searchAyat(
  query: string,
  limit = 10,
): Promise<SearchResponse> {
  const response = await fetch(
    `${BASE_URL}/ayat/search?q=${encodeURIComponent(query)}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to search Ayat");
  }

  const result = await response.json();
  return {
    data: result.data.map((a: ApiAyah) => mapAyah(a, 0)),
    pagination: result.pagination,
  };
}