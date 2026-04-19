"use client";

import { useSettings, ArabicFont } from "@/context/SettingsContext";

const arabicFontOptions: { value: ArabicFont; label: string; preview: string; fontFamily: string }[] = [
  { value: "amiri", label: "Amiri", preview: "قُلۡ هُوَ ٱللَّهُ أَحَدٌ", fontFamily: "Amiri, var(--font-amiri)" },
  { value: "nastaliq", label: "Nastaliq", preview: "قُلۡ هُوَ ٱللَّهُ أَحَدٌ", fontFamily: "'Noto Naskh Arabic', 'Traditional Arabic', serif" },
  { value: "scheherazade", label: "Scheherazade", preview: "قُلۡ هُوَ ٱللَّهُ أَحَدٌ", fontFamily: "Scheherazade, 'Traditional Arabic', serif" },
];

export default function SettingsSidebar() {
  const {
    arabicFont,
    arabicFontSize,
    translationFontSize,
    setArabicFont,
    setArabicFontSize,
    setTranslationFontSize,
    sidebarOpen,
    setSidebarOpen,
  } = useSettings();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Settings</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <label className="block text-sm font-medium mb-3">Arabic Font</label>
              <div className="grid grid-cols-1 gap-2">
                {arabicFontOptions.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => setArabicFont(font.value)}
                    className={`p-3 rounded-lg border-2 transition-all text-right dir-rtl ${
                      arabicFont === font.value
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                    }`}
                  >
                    <div className="text-lg mb-1" style={{ fontFamily: font.fontFamily }}>
                      {font.preview}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">{font.label}</div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="block text-sm font-medium mb-3">
                Arabic Font Size: <span className="text-emerald-600">{arabicFontSize}px</span>
              </label>
              <input
                type="range"
                min="16"
                max="64"
                step="2"
                value={arabicFontSize}
                onChange={(e) => setArabicFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1">
                <span>16px</span>
                <span>64px</span>
              </div>
            </section>

            <section>
              <label className="block text-sm font-medium mb-3">
                Translation Font Size: <span className="text-emerald-600">{translationFontSize}px</span>
              </label>
              <input
                type="range"
                min="12"
                max="32"
                step="2"
                value={translationFontSize}
                onChange={(e) => setTranslationFontSize(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-zinc-500 mt-1">
                <span>12px</span>
                <span>32px</span>
              </div>
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}