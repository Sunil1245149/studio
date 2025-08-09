"use client";

import { useLanguage } from "@/contexts/language-context";
import { toolsData } from "@/lib/tools-data";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-muted/40 text-muted-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">{t("title")}</h3>
            <p className="text-sm">{t("footerCredit")}</p>
            <p className="text-sm">{t("footerContact")}: 8459633485</p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="hover:text-foreground"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-foreground"><Github size={20} /></Link>
              <Link href="#" className="hover:text-foreground"><Linkedin size={20} /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {toolsData.map((category) => (
                <li key={category.id}>
                  <a href={`#${category.id}`} className="hover:text-foreground hover:underline">
                    {category.name[language]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-sm">
          <p>{t("footerCopyright")}</p>
        </div>
      </div>
    </footer>
  );
}
