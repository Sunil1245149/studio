
"use client";

import { LanguageSelector } from "./language-selector";
import { ThemeToggle } from "./theme-toggle";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Hammer, Menu } from "lucide-react";
import Link from "next/link";
import { toolsData } from "@/lib/tools-data";

export function Header() {
  const { t, language } = useLanguage();

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background")}>
      <div className="container flex h-14 items-center">
         <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
                <Hammer className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">{t('title')}</span>
            </Link>
         </div>
        <div className="md:hidden ml-auto">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 pt-6">
                <nav className="grid gap-2 text-lg font-medium p-4">
                    <Link
                      href="/"
                      className="flex items-center gap-2 text-lg font-semibold mb-4 px-2"
                    >
                      <Hammer className="h-6 w-6 text-primary" />
                      <span className="font-bold">{t('title')}</span>
                    </Link>
                    {toolsData.map((category) => (
                        <Link
                            key={category.id}
                            href={`/#${category.id}`}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            {category.name[language]}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
          </Sheet>
        </div>
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
            {toolsData.map((category) => (
                <Link
                    key={category.id}
                    href={`/#${category.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    {category.name[language]}
                </Link>
            ))}
        </nav>
        <div className="hidden md:flex items-center justify-end space-x-2">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
