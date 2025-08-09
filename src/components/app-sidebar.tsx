
'use client';

import { useLanguage } from '@/contexts/language-context';
import { toolsData } from '@/lib/tools-data';
import Link from 'next/link';
import { Hammer, Menu, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export function AppSidebar() {
  const { language, t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <aside className={cn("flex-shrink-0 border-r bg-secondary/30 hidden md:flex flex-col transition-all duration-300", isCollapsed ? "w-20" : "w-64")}>
      <div className={cn("flex h-14 items-center border-b px-6 bg-background", isCollapsed && "justify-center")}>
        <Link href="/" className="flex items-center space-x-2">
          <Hammer className="h-6 w-6 text-primary" />
          <span className={cn("font-bold text-lg", isCollapsed && "hidden")}>{t('title')}</span>
        </Link>
      </div>
      <nav className="flex-grow p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start", isCollapsed && "justify-center w-auto")}>
              <Menu className={cn("mr-2 h-4 w-4", isCollapsed && "mr-0")} />
              <span className={cn(isCollapsed && "hidden")}>Sections</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" side="right">
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
      <div className="border-t p-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="w-full justify-center">
            <PanelLeft className={cn("h-5 w-5 transition-transform", isCollapsed && "rotate-180")} />
            <span className="sr-only">{isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
          </Button>
      </div>
    </aside>
  );
}
