"use client";

import { SettingsProvider } from "@/context/SettingsContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}