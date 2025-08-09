// src/app/tools/image-converter/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Loader2, Download, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

type TargetFormat = 'png' | 'jpeg' | 'webp';

export default function ImageConverterPage() {
  const [sourceImage, setSourceImage] = useState<File | null>(null);
  const [sourcePreview, setSourcePreview] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<TargetFormat>('png');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSourceImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourcePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setConvertedImage(null);
    }
  };

  const handleConvert = async () => {
    if (!sourceImage) {
      toast({
        title: 'No Image Selected',
        description: 'Please select an image file to convert.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setConvertedImage(null);

    const reader = new FileReader();
    reader.readAsDataURL(sourceImage);
    reader.onload = async (event) => {
        const dataUri = event.target?.result as string;

        try {
            // This is a placeholder for a real conversion logic.
            // In a real app, you would send this to a backend or use a wasm library for conversion.
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = document.createElement('img');
            
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx?.drawImage(img, 0, 0);
                const convertedDataUri = canvas.toDataURL(`image/${targetFormat}`);
                setConvertedImage(convertedDataUri);
            }
            img.src = dataUri;

        } catch (error) {
            console.error('Error converting image:', error);
            toast({
                title: 'Conversion Failed',
                description: 'An error occurred during image conversion.',
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
    if (file) {
      setSourceImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourcePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setConvertedImage(null);
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

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
              <CardTitle>Image Converter</CardTitle>
              <CardDescription>Convert your images to different formats like PNG, JPG, or WEBP.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div 
                  className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Drag & drop your image here, or <span className="text-primary font-semibold">click to browse</span>
                  </p>
                  <Input id="image-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Label htmlFor="target-format" className="text-lg">Convert to:</Label>
                    <Select value={targetFormat} onValueChange={(v) => setTargetFormat(v as TargetFormat)}>
                        <SelectTrigger id="target-format" className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="jpeg">JPEG</SelectItem>
                            <SelectItem value="webp">WEBP</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button onClick={handleConvert} disabled={isLoading || !sourceImage} className="w-full text-lg py-6">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Converting...
                    </>
                  ) : 'Convert Image'}
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h3 className="text-lg font-medium mb-2 text-center">Original Image</h3>
                        {sourcePreview ? (
                            <div className="p-2 border rounded-md bg-muted">
                                <Image src={sourcePreview} alt="Source Preview" width={500} height={500} className="rounded-md w-full h-auto object-contain" />
                            </div>
                        ) : <div className="p-2 border rounded-md bg-muted h-64 flex items-center justify-center text-muted-foreground">No image selected</div>}
                    </div>
                     <div>
                        <h3 className="text-lg font-medium mb-2 text-center">Converted Image</h3>
                        {convertedImage ? (
                            <div className="p-2 border rounded-md bg-muted">
                                 <Image src={convertedImage} alt="Converted" width={500} height={500} className="rounded-md w-full h-auto object-contain" />
                                <Button asChild className="w-full mt-4">
                                    <a href={convertedImage} download={`converted-image.${targetFormat}`}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download Image
                                    </a>
                                </Button>
                            </div>
                        ) : <div className="p-2 border rounded-md bg-muted h-64 flex items-center justify-center text-muted-foreground">Conversion result will appear here</div>}
                    </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
