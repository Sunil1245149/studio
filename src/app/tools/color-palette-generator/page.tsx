// src/app/tools/color-palette-generator/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Loader2, Palette, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateColorPalette } from '@/ai/flows/color-palette-generator';

export default function ColorPaletteGeneratorPage() {
  const [description, setDescription] = useState('');
  const [palette, setPalette] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({
        title: 'Description needed',
        description: 'Please enter a description for the color palette.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setPalette([]);

    try {
      const result = await generateColorPalette({ description });
      setPalette(result.colors);
    } catch (error) {
      console.error('Error generating color palette:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the color palette.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    toast({ title: `Copied ${color} to clipboard!` });
    setTimeout(() => setCopiedColor(null), 2000);
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
              <CardTitle>Color Palette Generator</CardTitle>
              <CardDescription>
                Describe a theme or mood, and let AI generate a color palette for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="e.g., 'A serene beach at sunset'"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-base"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <Button onClick={handleGenerate} disabled={isLoading} className="sm:w-auto w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Palette className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>

                {palette.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4 text-center">Generated Palette</h3>
                    <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden border">
                      {palette.map((color) => (
                        <div key={color} className="flex-1 p-4 text-center" style={{ backgroundColor: color }}>
                          <div className="bg-background/70 rounded-md p-2 flex items-center justify-center gap-2 backdrop-blur-sm">
                            <span className="font-mono text-sm uppercase">{color}</span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7"
                              onClick={() => handleCopy(color)}
                            >
                              {copiedColor === color ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                              <span className="sr-only">Copy color</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
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
