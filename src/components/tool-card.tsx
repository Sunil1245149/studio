"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import type { Tool } from '@/lib/tools-data';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const { language } = useLanguage();

  return (
    <Link href={tool.link} className="group block">
      <Card className="h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/60 hover:-translate-y-1.5 border-2 border-transparent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">
            {tool.name[language] || tool.name['en']}
          </CardTitle>
          <div className="p-2 bg-secondary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <tool.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
            {tool.description[language] || tool.description['en']}
          </p>
          <div className="flex items-center text-sm text-primary font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Use tool</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
