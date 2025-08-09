'use server';
/**
 * @fileOverview AI-powered search assistant flow that suggests alternative search terms.
 *
 * - suggestAlternativeSearches - A function that generates alternative search suggestions.
 * - SuggestAlternativeSearchesInput - The input type for the suggestAlternativeSearches function.
 * - SuggestAlternativeSearchesOutput - The return type for the suggestAlternativeSearches function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativeSearchesInputSchema = z.object({
  originalSearchTerm: z.string().describe('The user\u0027s original search term.'),
});
export type SuggestAlternativeSearchesInput = z.infer<typeof SuggestAlternativeSearchesInputSchema>;

const SuggestAlternativeSearchesOutputSchema = z.object({
  suggestedTerms: z
    .array(z.string())
    .describe('An array of suggested alternative search terms.'),
});
export type SuggestAlternativeSearchesOutput = z.infer<typeof SuggestAlternativeSearchesOutputSchema>;

export async function suggestAlternativeSearches(
  input: SuggestAlternativeSearchesInput
): Promise<SuggestAlternativeSearchesOutput> {
  return suggestAlternativeSearchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativeSearchesPrompt',
  input: {schema: SuggestAlternativeSearchesInputSchema},
  output: {schema: SuggestAlternativeSearchesOutputSchema},
  prompt: `You are a search assistant designed to suggest alternative search terms. The user
   has provided the following search term: {{{originalSearchTerm}}}.

   Suggest 3 alternative search terms that the user might use to find the tool they need.
   Return the terms as a JSON array of strings.
   For example:
   [ \"image resizer\", \"photo editor\", \"picture converter\"]`,
});

const suggestAlternativeSearchesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativeSearchesFlow',
    inputSchema: SuggestAlternativeSearchesInputSchema,
    outputSchema: SuggestAlternativeSearchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
