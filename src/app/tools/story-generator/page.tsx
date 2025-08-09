// src/app/tools/story-generator/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Loader2, BookOpen, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateStory } from '@/ai/flows/story-generator';
import { Input } from '@/components/ui/input';

export default function StoryGeneratorPage() {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: 'Prompt needed',
        description: 'Please enter a prompt for the story.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setStory('');

    try {
      const result = await generateStory({ prompt });
      setStory(result.story);
    } catch (error) {
      console.error('Error generating story:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the story.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (story) {
      navigator.clipboard.writeText(story);
      setCopied(true);
      toast({ title: 'Story copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>AI Story Generator</CardTitle>
              <CardDescription>
                Give the AI a prompt and it will write a short story for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                    <Input
                        placeholder="e.g., 'A lonely robot on a distant planet...'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="text-base"
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                </div>
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Writing...
                    </>
                  ) : (
                    <>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Generate Story
                    </>
                  )}
                </Button>

                {story && (
                  <div className="pt-4 space-y-2">
                     <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Your Story</h3>
                         <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <Check className="h-5 w-5 text-green-500" />
                            ) : (
                                <Clipboard className="h-5 w-5" />
                            )}
                            <span className="sr-only">Copy story</span>
                        </Button>
                    </div>
                    <Textarea
                      readOnly
                      value={story}
                      className="bg-muted h-72 text-base leading-relaxed"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
