export interface Surah {
  id: number;
  nameArabic: string;
  nameTransliterated: string;
  nameEnglish: string;
  revelationType: "MECCAN" | "MEDINAN";
  ayahCount: number;
}

export interface Ayah {
  id: string;
  surahId: number;
  numberInSurah: number;
  textArabic: string;
  textTranslation: string;
  textTransliterated?: string;
  surahNameEnglish?: string;
  surahNameTransliterated?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SurahResponse {
  data: Surah[];
  pagination: Pagination;
}

export interface AyahResponse {
  data: Ayah[];
  pagination: Pagination;
  surah?: Surah;
}

export interface SearchResponse {
  data: Ayah[];
  pagination: Pagination;
}