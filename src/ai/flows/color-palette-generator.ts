'use server';
/**
 * @fileOverview AI-powered color palette generator.
 *
 * - generateColorPalette - A function that generates a color palette.
 * - GenerateColorPaletteInput - The input type for the generateColorPalette function.
 * - GenerateColorPaletteOutput - The return type for the generateColorPalette function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateColorPaletteInputSchema = z.object({
  description: z.string().describe('A description of the desired color palette theme (e.g., "warm sunset", "ocean vibes").'),
});
export type GenerateColorPaletteInput = z.infer<typeof GenerateColorPaletteInputSchema>;

const GenerateColorPaletteOutputSchema = z.object({
  colors: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/))
    .length(5)
    .describe('An array of 5 hex color codes.'),
});
export type GenerateColorPaletteOutput = z.infer<typeof GenerateColorPaletteOutputSchema>;

export async function generateColorPalette(
  input: GenerateColorPaletteInput
): Promise<GenerateColorPaletteOutput> {
  return generateColorPaletteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateColorPalettePrompt',
  input: {schema: GenerateColorPaletteInputSchema},
  output: {schema: GenerateColorPaletteOutputSchema},
  prompt: `You are a color palette expert. Based on the user's description of "{{{description}}}", 
  generate a beautiful and harmonious color palette of 5 colors.
  Return the colors as an array of hex codes.`,
});

const generateColorPaletteFlow = ai.defineFlow(
  {
    name: 'generateColorPaletteFlow',
    inputSchema: GenerateColorPaletteInputSchema,
    outputSchema: GenerateColorPaletteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
