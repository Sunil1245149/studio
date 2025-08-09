'use client';

import { useLanguage } from '@/contexts/language-context';
import { toolsData } from '@/lib/tools-data';
import Link from 'next/link';
import { Hammer } from 'lucide-react';

export function AppSidebar() {
  const { language, t } = useLanguage();
  return (
    <aside className="w-64 flex-shrink-0 border-r bg-background hidden md:flex flex-col">
       <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center space-x-2">
            <Hammer className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">{t("title")}</span>
        </Link>
       </div>
       <nav className="flex-grow p-4">
        <ul className="space-y-2">
            {toolsData.map((category) => (
                <li key={category.id}>
                <Link
                    href={`/#${category.id}`}
                    className="flex items-center rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                    {category.name[language]}
                </Link>
                </li>
            ))}
        </ul>
       </nav>
    </aside>
  );
}
