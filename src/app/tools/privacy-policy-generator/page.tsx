// src/app/tools/privacy-policy-generator/page.tsx
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { ArrowLeft, Loader2, Shield, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generatePrivacyPolicy, GeneratePrivacyPolicyInput } from '@/ai/flows/privacy-policy-generator';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  websiteUrl: z.string().url('Please enter a valid URL.'),
  collectedData: z.string().min(3, 'Please list at least one type of data collected.'),
  contactEmail: z.string().email('Please enter a valid email address.'),
});

export default function PrivacyPolicyGeneratorPage() {
  const [policy, setPolicy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<GeneratePrivacyPolicyInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      websiteUrl: '',
      collectedData: '',
      contactEmail: '',
    },
  });

  const handleGenerate: SubmitHandler<GeneratePrivacyPolicyInput> = async (data) => {
    setIsLoading(true);
    setPolicy('');

    try {
      const result = await generatePrivacyPolicy(data);
      setPolicy(result.policy);
    } catch (error) {
      console.error('Error generating privacy policy:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the privacy policy.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    if (policy) {
      navigator.clipboard.writeText(policy);
      setCopied(true);
      toast({ title: 'Policy copied to clipboard!' });
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
              <CardTitle>Privacy Policy Generator</CardTitle>
              <CardDescription>
                Fill in the details below to generate a basic privacy policy for your website or app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleGenerate)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company / Website Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., My Awesome App" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="collectedData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What data do you collect?</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., names, emails, cookies" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email for Privacy</FormLabel>
                        <FormControl>
                          <Input placeholder="privacy@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Generate Policy
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              {policy && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Your Generated Privacy Policy</h3>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                      <span className="sr-only">Copy Policy</span>
                    </Button>
                  </div>
                  <Textarea
                    readOnly
                    value={policy}
                    className="bg-muted h-96 text-sm"
                  />
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
