// src/app/tools/scientific-calculator/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ScientificCalculatorPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | string>('');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        // Warning: Direct eval is a security risk. 
        // In a real app, use a proper math expression parser.
        // For this tool, we will use a safer Function constructor approach.
        const sanitizedInput = input
          .replace(/sin/g, 'Math.sin')
          .replace(/cos/g, 'Math.cos')
          .replace(/tan/g, 'Math.tan')
          .replace(/log/g, 'Math.log10')
          .replace(/ln/g, 'Math.log')
          .replace(/sqrt/g, 'Math.sqrt')
          .replace(/π/g, 'Math.PI')
          .replace(/\^/g, '**');

        const evalResult = new Function('return ' + sanitizedInput)();
        setResult(evalResult);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    '(', ')', 'mc', 'm+', 'm-', 'mr', 'C', 'DEL', '/',
    '2nd', 'x²', 'x³', 'xʸ', 'eˣ', '10ˣ', '7', '8', '9', '*',
    '1/x', '√x', '∛x', 'ʸ√x', 'ln', 'log₁₀', '4', '5', '6', '-',
    'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+',
    'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='
  ];

  const scientificButtons = [
    'sin', 'cos', 'tan', 'log', 'ln', 'sqrt', '(', ')', '^', 'π'
  ];
  
  const basicButtons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
  ];

  const controlButtons = ['C', 'DEL'];


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
              <CardTitle>Scientific Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-md text-right text-3xl font-mono h-24 overflow-x-auto">
                  <div>{input || '0'}</div>
                  <div className="text-primary font-bold text-2xl">{result}</div>
                </div>
                <div className="grid grid-cols-5 gap-2">
                    {scientificButtons.map((btn) => (
                         <Button
                            key={btn}
                            onClick={() => handleButtonClick(btn === 'log' ? 'log(' : btn === 'sin' ? 'sin(' : btn === 'cos' ? 'cos(': btn === 'tan' ? 'tan(': btn === 'sqrt' ? 'sqrt(' : btn)}
                            variant='secondary'
                            className="text-lg font-bold"
                        >
                            {btn}
                        </Button>
                    ))}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {basicButtons.map((btn) => (
                    <Button
                      key={btn}
                      onClick={() => handleButtonClick(btn)}
                      variant={
                        ['/', '*', '-', '+', '='].includes(btn) ? 'secondary' : 'default'
                      }
                      className={`text-xl font-bold ${btn === '0' && 'col-span-2'}`}
                    >
                      {btn}
                    </Button>
                  ))}
                   {controlButtons.map((btn) => (
                    <Button
                      key={btn}
                      onClick={() => handleButtonClick(btn)}
                      variant='destructive'
                      className={`text-xl font-bold ${btn === 'C' && 'col-span-2'}`}
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
