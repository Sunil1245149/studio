// src/app/tools/percentage-calculator/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CalculationType = 'percentOf' | 'isWhatPercentOf' | 'percentageChange';

export default function PercentageCalculatorPage() {
  const [calculationType, setCalculationType] = useState<CalculationType>('percentOf');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Please enter valid numbers.');
      return;
    }

    let calculatedResult = '';
    try {
      switch (calculationType) {
        case 'percentOf':
          calculatedResult = `${(num1 / 100) * num2}`;
          break;
        case 'isWhatPercentOf':
          if (num2 === 0) {
            calculatedResult = 'Cannot divide by zero.';
          } else {
            calculatedResult = `${(num1 / num2) * 100}%`;
          }
          break;
        case 'percentageChange':
          if (num1 === 0) {
            calculatedResult = 'Cannot calculate change from zero.';
          } else {
            const change = ((num2 - num1) / num1) * 100;
            calculatedResult = `${change.toFixed(2)}%`;
          }
          break;
        default:
          calculatedResult = 'Invalid calculation type.';
      }
    } catch (error) {
      calculatedResult = 'Error in calculation.';
    }
    setResult(calculatedResult);
  };
  
  const reset = () => {
    setValue1('');
    setValue2('');
    setResult('');
  }

  const renderInputs = () => {
    switch (calculationType) {
      case 'percentOf':
        return (
          <>
            <div className="flex items-center space-x-2">
              <Input
                id="percent"
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                placeholder="e.g. 10"
              />
              <Label htmlFor="percent" className="whitespace-nowrap">% of</Label>
              <Input
                id="of"
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                placeholder="e.g. 50"
              />
            </div>
          </>
        );
      case 'isWhatPercentOf':
        return (
          <div className="flex items-center space-x-2">
            <Input
              id="valueA"
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="e.g. 5"
            />
            <Label htmlFor="valueA" className="whitespace-nowrap">is what % of</Label>
            <Input
              id="valueB"
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="e.g. 50"
            />
          </div>
        );
      case 'percentageChange':
        return (
          <div className="flex items-center space-x-2">
            <Label htmlFor="from" className="whitespace-nowrap">From</Label>
            <Input
              id="from"
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="e.g. 50"
            />
            <Label htmlFor="to" className="whitespace-nowrap">to</Label>
            <Input
              id="to"
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="e.g. 60"
            />
          </div>
        );
      default:
        return null;
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
              <CardTitle>Percentage Calculator</CardTitle>
              <CardDescription>Calculate percentages with various options.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="calc-type">Calculation Type</Label>
                  <Select
                    value={calculationType}
                    onValueChange={(value) => {
                      setCalculationType(value as CalculationType);
                      reset();
                    }}
                  >
                    <SelectTrigger id="calc-type">
                      <SelectValue placeholder="Select calculation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentOf">What is X% of Y?</SelectItem>
                      <SelectItem value="isWhatPercentOf">X is what percent of Y?</SelectItem>
                      <SelectItem value="percentageChange">Percentage change from X to Y</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  {renderInputs()}
                </div>

                <div className="flex space-x-2">
                  <Button onClick={calculate} className="flex-grow">Calculate</Button>
                  <Button onClick={reset} variant="outline" className="flex-grow">Reset</Button>
                </div>

                {result && (
                  <div className="p-4 bg-muted rounded-md text-center text-xl font-mono">
                    <span className="font-bold">Result: </span>
                    <span className="text-primary">{result}</span>
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
