"use client";

import { useLanguage } from "@/contexts/language-context";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Footer({className}: {className?: string}) {
  const { t } = useLanguage();

  return (
    <footer className={cn("bg-background border-t text-foreground", className)}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
                <p>{t("footerCopyright")} | {t("footerCredit")}</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Github size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Linkedin size={20} /></Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
