import type { Metadata } from "next";
import { Geist, Geist_Mono, Amiri } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import SettingsSidebar from "@/components/SettingsSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Quran App - Read and Learn",
  description: "A modern Quran application built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${amiri.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Providers>
          <Navbar />
          <div className="flex flex-1 relative">
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 lg:py-12">
              {children}
            </main>
            <SettingsSidebar />
          </div>
          <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8 bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                &copy; {new Date().getFullYear()} QuranApp. Built with Next.js and Tailwind CSS.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}