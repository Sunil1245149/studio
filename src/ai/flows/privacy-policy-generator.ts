'use server';
/**
 * @fileOverview AI-powered privacy policy generator.
 *
 * - generatePrivacyPolicy - A function that generates a privacy policy.
 * - GeneratePrivacyPolicyInput - The input type for the generatePrivacyPolicy function.
 * - GeneratePrivacyPolicyOutput - The return type for the generatePrivacyPolicy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePrivacyPolicyInputSchema = z.object({
  companyName: z.string().describe('The name of the company or website.'),
  websiteUrl: z.string().url().describe('The URL of the website.'),
  collectedData: z.string().describe('A comma-separated list of the types of data collected (e.g., "names, email addresses, cookies, analytics").'),
  contactEmail: z.string().email().describe('The contact email for privacy concerns.'),
});
export type GeneratePrivacyPolicyInput = z.infer<typeof GeneratePrivacyPolicyInputSchema>;

const GeneratePrivacyPolicyOutputSchema = z.object({
  policy: z.string().describe('The generated privacy policy text.'),
});
export type GeneratePrivacyPolicyOutput = z.infer<typeof GeneratePrivacyPolicyOutputSchema>;

export async function generatePrivacyPolicy(
  input: GeneratePrivacyPolicyInput
): Promise<GeneratePrivacyPolicyOutput> {
  return generatePrivacyPolicyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePrivacyPolicyPrompt',
  input: {schema: GeneratePrivacyPolicyInputSchema},
  output: {schema: GeneratePrivacyPolicyOutputSchema},
  prompt: `You are a legal assistant specializing in writing privacy policies for websites.
  Generate a comprehensive but easy-to-understand privacy policy based on the following details:

  - Company/Website Name: {{{companyName}}}
  - Website URL: {{{websiteUrl}}}
  - Data Collected: {{{collectedData}}}
  - Contact Email for Privacy Matters: {{{contactEmail}}}

  The policy should include standard sections like:
  1. Introduction
  2. Information We Collect (based on the user's input)
  3. How We Use Your Information
  4. Data Sharing and Disclosure
  5. Data Security
  6. Your Rights
  7. Changes to This Policy
  8. Contact Us

  Ensure the language is clear and straightforward. The output should be a single string containing the full policy text.
  This is for informational purposes and is not legal advice. Include a disclaimer at the bottom stating this.`,
});

const generatePrivacyPolicyFlow = ai.defineFlow(
  {
    name: 'generatePrivacyPolicyFlow',
    inputSchema: GeneratePrivacyPolicyInputSchema,
    outputSchema: GeneratePrivacyPolicyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
