// src/app/tools/pdf-to-text/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Loader2, File, UploadCloud, Clipboard, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { pdfToText } from '@/ai/flows/pdf-to-text-flow';
import { Textarea } from '@/components/ui/textarea';

export default function PdfToTextPage() {
  const [sourcePdf, setSourcePdf] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSourcePdf(file);
      setExtractedText('');
    } else {
      toast({
        title: 'Invalid File Type',
        description: 'Please select a PDF file.',
        variant: 'destructive',
      });
    }
  };

  const handleExtract = async () => {
    if (!sourcePdf) {
      toast({
        title: 'No PDF Selected',
        description: 'Please select a PDF file to extract text from.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setExtractedText('');

    const reader = new FileReader();
    reader.readAsDataURL(sourcePdf);
    reader.onload = async (event) => {
        const dataUri = event.target?.result as string;

        try {
            const result = await pdfToText({ pdfDataUri: dataUri });
            setExtractedText(result.text);
        } catch (error) {
            console.error('Error extracting text from PDF:', error);
            toast({
                title: 'Extraction Failed',
                description: 'An error occurred during text extraction.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };
    reader.onerror = () => {
        setIsLoading(false);
        toast({
            title: 'File Read Error',
            description: 'Could not read the selected file.',
            variant: 'destructive',
        });
    }
  };
  
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSourcePdf(file);
      setExtractedText('');
    } else {
      toast({
        title: 'Invalid File Type',
        description: 'Please drop a PDF file.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleCopy = () => {
    if (extractedText) {
      navigator.clipboard.writeText(extractedText);
      setCopied(true);
      toast({ title: 'Copied to clipboard!' });
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
          <Card className="w-full max-w-3xl">
            <CardHeader>
              <CardTitle>PDF to Text Extractor</CardTitle>
              <CardDescription>Upload a PDF to extract its text content using AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById('pdf-upload')?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Drag & drop your PDF here, or <span className="text-primary font-semibold">click to browse</span>
                  </p>
                  <Input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                </div>
                
                {sourcePdf && (
                    <div className="text-center text-sm text-muted-foreground">
                        Selected file: <span className="font-medium text-foreground">{sourcePdf.name}</span>
                    </div>
                )}

                <Button onClick={handleExtract} disabled={isLoading || !sourcePdf} className="w-full text-lg py-6">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <File className="mr-2 h-5 w-5" />
                      Extract Text
                    </>
                  )}
                </Button>

                {extractedText && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">Extracted Text</h3>
                         <Button
                            size="icon"
                            variant="ghost"
                            onClick={handleCopy}
                            disabled={!extractedText}
                        >
                            {copied ? (
                                <Check className="h-5 w-5 text-green-500" />
                            ) : (
                                <Clipboard className="h-5 w-5" />
                            )}
                            <span className="sr-only">Copy to clipboard</span>
                        </Button>
                    </div>
                    <Textarea
                      placeholder="Extracted text will appear here..."
                      value={extractedText}
                      readOnly
                      rows={15}
                      className="text-base bg-muted"
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
