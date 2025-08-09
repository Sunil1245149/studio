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
           <SidebarMenuButton asChild className="w-full justify-start">
             <Link href={`/#${category.id}`}>
               {category.name[language]}
             </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
