import type { Language } from "@/contexts/language-context";

export const translations = {
  title: {
    en: "Tools Hub",
    hi: "टूल्स हब",
    mr: "टूल्स हब",
  },
  searchPlaceholder: {
    en: "Search for a tool...",
    hi: "एक टूल खोजें...",
    mr: "एक साधन शोधा...",
  },
  searchButton: {
    en: "Search",
    hi: "खोज",
    mr: "शोधा",
  },
  calculators: {
    en: "Calculators",
    hi: "कैलकुलेटर",
    mr: "गणक",
  },
  converters: {
    en: "Converters",
    hi: "कन्वर्टर्स",
    mr: "रूपांतरक",
  },
  generators: {
    en: "Generators",
    hi: "जेनरेटर",
    mr: "जनरेटर",
  },
  utilities: {
    en: "Utilities",
    hi: "यूटिलिटीज",
    mr: "उपयुक्तता",
  },
  popularTools: {
    en: "Popular Tools",
    hi: "लोकप्रिय उपकरण",
    mr: "लोकप्रिय साधने",
  },
  footerCredit: {
    en: "Created by Sunil Sakhare",
    hi: "सुनील सखारे द्वारा निर्मित",
    mr: "सुनील सखारे यांनी तयार केले आहे",
  },
  footerContact: {
    en: "Contact",
    hi: "संपर्क",
    mr: "संपर्क",
  },
  footerCopyright: {
    en: `© ${new Date().getFullYear()} Tools Hub Express. All Rights Reserved.`,
    hi: `© ${new Date().getFullYear()} टूल्स हब एक्सप्रेस. सर्वाधिकार सुरक्षित.`,
    mr: `© ${new Date().getFullYear()} टूल्स हब एक्सप्रेस. सर्व हक्क राखीव.`,
  },
  aiSuggestionsTitle: {
    en: "Not finding what you need? Try searching for:",
    hi: "जो आप खोज रहे हैं वह नहीं मिल रहा है? यह खोज कर देखें:",
    mr: "तुम्हाला जे हवे आहे ते सापडत नाहीये? हे शोधून पहा:",
  },
  aiLoading: {
    en: "Getting suggestions...",
    hi: "सुझाव मिल रहे हैं...",
    mr: "सूचना मिळत आहेत...",
  }
};

export type TranslationKey = keyof typeof translations;
