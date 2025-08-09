/**
 * @fileOverview Schemas and types for the text-to-speech flow.
 *
 * - TextToSpeechInputSchema - The Zod schema for the text-to-speech input.
 * - TextToSpeechInput - The TypeScript type for the text-to-speech input.
 * - TextToSpeechOutputSchema - The Zod schema for the text-to-speech output.
 * - TextToSpeechOutput - The TypeScript type for the text-to-speech output.
 */
import { z } from 'genkit';

export const TextToSpeechInputSchema = z.string();
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

export const TextToSpeechOutputSchema = z.object({
  audioDataUri: z.string().describe('The base64 encoded WAV audio file as a data URI.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;
