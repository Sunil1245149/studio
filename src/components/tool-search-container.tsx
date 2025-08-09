"use client";

import React, { useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Search, Loader2, Sparkles } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ToolCard } from './tool-card';
import { toolsData, Tool, ToolCategory } from '@/lib/tools-data';
import { useLanguage } from '@/contexts/language-context';
import { suggestAlternativeSearches } from '@/ai/flows/search-assistant';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';

type FormValues = {
  query: string;
};

export function ToolSearchContainer() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormValues>();

  const handleSearch: SubmitHandler<FormValues> = async (data) => {
    setIsAiLoading(true);
    setAiSuggestions([]);
    try {
      const result = await suggestAlternativeSearches({ originalSearchTerm: data.query });
      setAiSuggestions(result.suggestedTerms);
    } catch (error) {
      console.error("AI suggestion error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return toolsData;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    
    return toolsData
      .map(category => {
        const filteredTools = category.tools.filter(tool =>
          tool.name[language]?.toLowerCase().includes(lowercasedQuery) ||
          tool.description[language]?.toLowerCase().includes(lowercasedQuery) ||
          tool.name['en']?.toLowerCase().includes(lowercasedQuery)
        );
        return { ...category, tools: filteredTools };
      })
      .filter(category => category.tools.length > 0);
  }, [searchQuery, language]);

  const defaultActiveAccordionItems = useMemo(() => filteredData.map(c => c.id), [filteredData]);
  
  return (
    <div className="space-y-8">
      <div className="text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary font-headline">
          {t('title')}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Over 200+ tools to make your life easier.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleSearch)} className="max-w-2xl mx-auto flex items-center space-x-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
            {...register('query')}
            placeholder={t('searchPlaceholder')}
            className="pl-10 text-base py-6 rounded-full"
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <Button type="submit" variant="default" disabled={isAiLoading} className="rounded-full">
          {isAiLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4 md:mr-2" />
          )}
          <span className="hidden md:inline">{t('searchButton')}</span>
        </Button>
      </form>

      {isAiLoading && <p className="text-center text-muted-foreground">{t('aiLoading')}</p>}

      {aiSuggestions.length > 0 && (
        <Card className="max-w-2xl mx-auto bg-primary/10 border-primary/20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="text-base font-medium flex items-center gap-2">
                <Sparkles className="text-primary"/>
                {t('aiSuggestionsTitle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((suggestion, index) => (
                <Button key={index} variant="secondary" size="sm" onClick={() => setSearchQuery(suggestion)}>
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Accordion type="multiple" defaultValue={defaultActiveAccordionItems} className="w-full space-y-4">
        {filteredData.map((category: ToolCategory, categoryIndex) => (
          <AccordionItem value={category.id} key={category.id} id={category.id} className="border-none animate-fade-in-up" style={{ animationDelay: `${0.4 + categoryIndex * 0.1}s` }}>
            <AccordionTrigger 
              className="px-6 py-4 text-xl font-semibold text-primary-foreground hover:no-underline rounded-lg shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: `hsl(${category.color})` }}
            >
              <span className="text-primary-foreground">{category.name[language] || category.name['en']}</span>
            </AccordionTrigger>
            <AccordionContent className="p-6 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tools.map((tool: Tool, toolIndex) => (
                  <div key={tool.id} className="animate-fade-in-up" style={{ animationDelay: `${toolIndex * 0.05}s`}}>
                    <ToolCard tool={tool} categoryColor={category.color} />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {filteredData.length === 0 && searchQuery && (
         <div className="text-center py-16 animate-fade-in-up">
            <p className="text-xl font-semibold">No tools found for "{searchQuery}"</p>
            <p className="text-muted-foreground mt-2">Try searching for something else or check your spelling.</p>
        </div>
      )}
    </div>
  );
}
