// src/app/tools/text-to-speech/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Loader2, Volume2 } from 'lucide-react';
import { textToSpeech } from '@/ai/flows/text-to-speech-flow';
import { useToast } from '@/hooks/use-toast';

export default function TextToSpeechPage() {
  const [inputText, setInputText] = useState('');
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleConvert = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input needed',
        description: 'Please enter some text to convert to speech.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setAudioDataUri(null);

    try {
      const result = await textToSpeech({ text: inputText });
      setAudioDataUri(result.audioDataUri);
    } catch (error) {
      console.error('Error converting text to speech:', error);
      toast({
        title: 'Conversion Failed',
        description: 'An error occurred while converting text to speech. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
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
              <CardTitle>Text to Speech Converter</CardTitle>
              <CardDescription>Convert written text into spoken words. Enter your text below and click convert.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type or paste your text here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={8}
                  className="text-base"
                />
                <Button onClick={handleConvert} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Convert to Speech
                    </>
                  )}
                </Button>
                {audioDataUri && (
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-2">Generated Audio</h3>
                    <audio controls src={audioDataUri} className="w-full">
                      Your browser does not support the audio element.
                    </audio>
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
