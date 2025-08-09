// src/app/tools/qr-code-generator/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Download, QrCode as QrCodeIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode';
import Image from 'next/image';

export default function QrCodeGeneratorPage() {
  const [inputText, setInputText] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateQrCode = async () => {
    if (!inputText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter text or a URL to generate a QR code.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const dataUrl = await QRCode.toDataURL(inputText, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.9,
        margin: 1,
        width: 300,
      });
      setQrCodeDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Generation Failed',
        description: 'Could not generate QR code. Please try again.',
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
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>QR Code Generator</CardTitle>
              <CardDescription>
                Create QR codes for URLs, text, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Input
                  placeholder="Enter text or URL"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="text-base"
                  onKeyDown={(e) => e.key === 'Enter' && generateQrCode()}
                />
              </div>

              <Button onClick={generateQrCode} disabled={isLoading} className="w-full text-lg py-6">
                <QrCodeIcon className="mr-2" />
                {isLoading ? 'Generating...' : 'Generate QR Code'}
              </Button>

              {qrCodeDataUrl && (
                <div className="pt-4 text-center space-y-4">
                  <h3 className="text-lg font-medium">Your QR Code</h3>
                  <div className="p-4 border rounded-md bg-white inline-block">
                    <Image src={qrCodeDataUrl} alt="Generated QR Code" width={250} height={250} />
                  </div>
                  <div>
                    <Button asChild>
                        <a href={qrCodeDataUrl} download="qrcode.png">
                            <Download className="mr-2 h-4 w-4" />
                            Download PNG
                        </a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
