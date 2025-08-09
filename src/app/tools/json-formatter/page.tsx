// src/app/tools/json-formatter/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Clipboard, Check, FileJson } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function JsonFormatterPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleFormat = () => {
    try {
      if (!inputText.trim()) {
        setOutputText('');
        return;
      }
      const parsedJson = JSON.parse(inputText);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setOutputText(formattedJson);
      toast({ title: 'JSON formatted successfully!' });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid JSON';
      setOutputText('');
      toast({
        title: 'Invalid JSON',
        description: `Could not format the text. Please check if it's valid JSON. Error: ${errorMessage}`,
        variant: 'destructive',
      });
    }
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
          <Card className="w-full max-w-4xl">
            <CardHeader>
              <CardTitle>JSON Formatter</CardTitle>
              <CardDescription>
                Paste your JSON data to format, beautify, and validate it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Input JSON</h3>
                  <Textarea
                    placeholder='Paste your JSON here... e.g., {"key":"value"}'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    rows={15}
                    className="text-sm font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Formatted Output</h3>
                  <div className="relative">
                    <Textarea
                      placeholder="Formatted JSON will appear here..."
                      value={outputText}
                      readOnly
                      rows={15}
                      className="text-sm font-mono bg-muted"
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
              <div className="mt-6 flex flex-wrap gap-2">
                <Button onClick={handleFormat}>
                  <FileJson className="mr-2 h-4 w-4" />
                  Format JSON
                </Button>
                <Button onClick={handleClear} variant="destructive">
                  Clear Text
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
