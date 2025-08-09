// src/app/tools/case-converter/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Clipboard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CaseConverterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleConversion = (type: string) => {
    let result = '';
    switch (type) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'titlecase':
        result = inputText.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'sentencecase':
        result = inputText.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
        break;
    }
    setOutputText(result);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      toast({ title: 'Copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
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
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>Case Converter</CardTitle>
              <CardDescription>
                Convert text to various cases like uppercase, lowercase, title case, and sentence case.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Input</h3>
                  <Textarea
                    placeholder="Type or paste your text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={10}
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Output</h3>
                  <div className="relative">
                    <Textarea
                      placeholder="Result will appear here..."
                      value={outputText}
                      readOnly
                      rows={10}
                      className="text-base bg-muted"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      onClick={handleCopy}
                      disabled={!outputText}
                    >
                      {copied ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clipboard className="h-5 w-5" />
                      )}
                      <span className="sr-only">Copy to clipboard</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => handleConversion('uppercase')}>UPPERCASE</Button>
                  <Button onClick={() => handleConversion('lowercase')}>lowercase</Button>
                  <Button onClick={() => handleConversion('titlecase')}>Title Case</Button>
                  <Button onClick={() => handleConversion('sentencecase')}>Sentence case</Button>
                </div>
                <Button onClick={handleClear} variant="destructive">Clear Text</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
