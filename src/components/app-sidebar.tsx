
'use client';

import { useLanguage } from '@/contexts/language-context';
import { toolsData } from '@/lib/tools-data';
import Link from 'next/link';
import { Hammer, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AppSidebar() {
  const { language, t } = useLanguage();
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r bg-secondary/30 hidden md:flex flex-col">
      <div className="flex h-14 items-center border-b px-6 bg-background">
        <Link href="/" className="flex items-center space-x-2">
          <Hammer className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">{t('title')}</span>
        </Link>
      </div>
      <nav className="flex-grow p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <Menu className="mr-2 h-4 w-4" />
              Sections
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {toolsData.map((category) => (
              <DropdownMenuItem key={category.id} asChild>
                <Link
                  href={`/#${category.id}`}
                  className={cn(
                    'flex items-center rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  {category.name[language]}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </aside>
  );
}
