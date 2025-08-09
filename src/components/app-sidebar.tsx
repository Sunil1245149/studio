'use client';

import { useLanguage } from '@/contexts/language-context';
import { toolsData } from '@/lib/tools-data';
import Link from 'next/link';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

export function AppSidebar() {
  const { language } = useLanguage();
  return (
    <SidebarMenu>
      {toolsData.map((category) => (
        <SidebarMenuItem key={category.id}>
           <Link href={`/#${category.id}`} className="w-full">
            <SidebarMenuButton className="w-full justify-start">
               {category.name[language]}
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
