'use server';
/**
 * @fileOverview A flow for converting a PDF to text.
 *
 * - pdfToText - A function that converts a PDF file into text.
 * - PdfToTextInput - The input type for the pdfToText function.
 * - PdfToTextOutput - The return type for the pdfToText function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PdfToTextInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file as a data URI that must include a MIME type of 'application/pdf' and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type PdfToTextInput = z.infer<typeof PdfToTextInputSchema>;

const PdfToTextOutputSchema = z.object({
  text: z.string().describe('The extracted text from the PDF.'),
});
export type PdfToTextOutput = z.infer<typeof PdfToTextOutputSchema>;

export async function pdfToText(input: PdfToTextInput): Promise<PdfToTextOutput> {
  return pdfToTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToTextPrompt',
  input: { schema: PdfToTextInputSchema },
  output: { schema: PdfToTextOutputSchema },
  prompt: `Extract all the text from the following PDF document.

PDF: {{media url=pdfDataUri}}`,
});

const pdfToTextFlow = ai.defineFlow(
  {
    name: 'pdfToTextFlow',
    inputSchema: PdfToTextInputSchema,
    outputSchema: PdfToTextOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
