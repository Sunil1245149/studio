// src/app/tools/calculator/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CalculatorPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | string>('');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        // Using function constructor for safe evaluation
        const evalResult = new Function('return ' + input)();
        setResult(evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

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
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Simple Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-md text-right text-2xl font-mono h-20 overflow-x-auto">
                  <div>{input || '0'}</div>
                  <div className="text-primary font-bold">{result}</div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {buttons.map((btn) => (
                    <Button
                      key={btn}
                      onClick={() => handleButtonClick(btn)}
                      variant={
                        btn === 'C' ? 'destructive' :
                        ['/', '*', '-', '+', '='].includes(btn) ? 'secondary' : 'default'
                      }
                      className={`text-xl font-bold ${btn === 'C' && 'col-span-4'}`}
                    >
                      {btn}
                    </Button>
                  ))}
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
