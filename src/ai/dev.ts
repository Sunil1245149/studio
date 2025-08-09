import { config } from 'dotenv';
config();

import '@/ai/flows/search-assistant.ts';
import '@/ai/flows/text-to-speech-flow.ts';
import '@/ai/schemas/text-to-speech-schemas.ts';
import '@/ai/flows/color-palette-generator.ts';
import '@/ai/flows/privacy-policy-generator.ts';
import '@/ai/flows/pdf-to-text-flow.ts';
import '@/ai/flows/story-generator.ts';
