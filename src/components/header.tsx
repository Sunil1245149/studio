"use client";

import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background")}>
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
