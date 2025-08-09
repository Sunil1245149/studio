import {
  Calculator,
  Percent,
  Sigma,
  FileText,
  Image as ImageIcon,
  Baseline,
  Palette,
  KeyRound,
  Shield,
  ClipboardCheck,
  QrCode,
  Timer,
  LucideIcon,
  CaseSensitive,
  FileJson,
  File,
} from 'lucide-react';

export interface Tool {
  id: string;
  name: { [key: string]: string };
  description: { [key: string]: string };
  icon: LucideIcon;
  link: string;
}

export interface ToolCategory {
  id: string;
  name: { [key:string]: string };
  tools: Tool[];
  color: string;
}

export const toolsData: ToolCategory[] = [
  {
    id: "calculators",
    name: {
      en: "Calculators",
      hi: "कैलकुलेटर",
      mr: "गणक",
    },
    color: '210 85% 60%', // Blue
    tools: [
      { id: "tool-1", name: { en: "Simple Calculator", hi: "सरल कैलकुलेटर", mr: "साधे गणक" }, description: { en: "A basic arithmetic calculator.", hi: "एक बुनियादी अंकगणितीय कैलकुलेटर।", mr: "एक मूलभूत अंकगणितीय गणक." }, icon: Calculator, link: "/tools/calculator" },
      { id: "tool-2", name: { en: "Percentage Calculator", hi: "प्रतिशत कैलकुलेटर", mr: "टक्केवारी गणक" }, description: { en: "Calculate percentages with ease.", hi: "आसानी से प्रतिशत की गणना करें।", mr: "सहजतेने टक्केवारीची गणना करा." }, icon: Percent, link: "/tools/percentage-calculator" },
      { id: "tool-3", name: { en: "Scientific Calculator", hi: "वैज्ञानिक कैलकुलेटर", mr: "वैज्ञानिक गणरेटर" }, description: { en: "Advanced calculations and functions.", hi: "उन्नत गणना और कार्य।", mr: "प्रगत गणना आणि कार्ये." }, icon: Sigma, link: "/tools/scientific-calculator" },
    ],
  },
  {
    id: "converters",
    name: {
      en: "Converters",
      hi: "कन्वर्टर्स",
      mr: "रूपांतरक",
    },
    color: '150 85% 45%', // Green
    tools: [
      { id: "tool-4", name: { en: "Text to Speech", hi: "टेक्स्ट टू स्पीच", mr: "टेक्स्ट टू स्पीच" }, description: { en: "Convert written text into spoken words.", hi: "लिखित पाठ को बोले गए शब्दों में बदलें।", mr: "लिखाण मजकूर बोललेल्या शब्दात रूपांतरित करा." }, icon: FileText, link: "/tools/text-to-speech" },
      { id: "tool-5", name: { en: "Image Converter", hi: "इमेज कन्वर्टर", mr: "प्रतिमा रूपांतरक" }, description: { en: "Convert images between formats like PNG, JPG.", hi: "छवियों को PNG, JPG जैसे प्रारूपों के बीच बदलें।", mr: "प्रतिमांना PNG, JPG सारख्या स्वरूपात रूपांतरित करा." }, icon: ImageIcon, link: "/tools/image-converter" },
      { id: "tool-6", name: { en: "Case Converter", hi: "केस कन्वर्टर", mr: "केस रूपांतरक" }, description: { en: "Change text to uppercase, lowercase etc.", hi: "टेक्स्ट को अपरकेस, लोअरकेस आदि में बदलें।", mr: "मजकूर अपरकेस, लोअरकेस इत्यादीमध्ये बदला." }, icon: CaseSensitive, link: "/tools/case-converter" },
    ],
  },
  {
    id: "generators",
    name: {
      en: "Generators",
      hi: "जेनरेटर",
      mr: "जनरेटर",
    },
    color: '260 85% 60%', // Purple
    tools: [
      { id: "tool-7", name: { en: "Color Palette Generator", hi: "रंग पैलेट जेनरेटर", mr: "रंग पॅलेट जनरेटर" }, description: { en: "Create beautiful color schemes.", hi: "सुंदर रंग योजनाएं बनाएं।", mr: "सुंदर रंग योजना तयार करा." }, icon: Palette, link: "/tools/color-palette-generator" },
      { id: "tool-8", name: { en: "Password Generator", hi: "पासवर्ड जेनरेटर", mr: "पासवर्ड जनरेटर" }, description: { en: "Generate strong, secure passwords.", hi: "मजबूत, सुरक्षित पासवर्ड बनाएं।", mr: "मजबूत, सुरक्षित पासवर्ड तयार करा." }, icon: KeyRound, link: "/tools/password-generator" },
      { id: "tool-9", name: { en: "Privacy Policy Generator", hi: "गोपनीयता नीति जेनरेटर", mr: "गोपनीयता धोरण जनरेटर" }, description: { en: "Create a privacy policy for your site.", hi: "अपनी साइट के लिए गोपनीयता नीति बनाएं।", mr: "आपल्या साइटसाठी गोपनीयता धोरण तयार करा." }, icon: Shield, link: "/tools/privacy-policy-generator" },
    ],
  },
  {
    id: 'pdf-tools',
    name: {
      en: 'PDF Tools',
      hi: 'पीडीएफ उपकरण',
      mr: 'पीडीएफ साधने',
    },
    color: '0 85% 60%', // Red
    tools: [
      {
        id: 'tool-13',
        name: {
          en: 'PDF to Text',
          hi: 'पीडीएफ से टेक्स्ट',
          mr: 'पीडीएफ ते मजकूर',
        },
        description: {
          en: 'Extract text from a PDF file.',
          hi: 'पीडीएफ फ़ाइल से टेक्स्ट निकालें।',
          mr: 'पीडीएफ फाईलमधून मजकूर काढा.',
        },
        icon: File,
        link: '/tools/pdf-to-text',
      },
    ],
  },
  {
    id: "utilities",
    name: {
      en: "Utilities",
      hi: "यूटिलिटीज",
      mr: "उपयुक्तता",
    },
    color: '30 85% 60%', // Orange
    tools: [
      { id: "tool-11", name: { en: "QR Code Generator", hi: "क्यूआर कोड जेनरेटर", mr: "QR कोड जनरेटर" }, description: { en: "Create QR codes for URLs and text.", hi: "URL और टेक्स्ट के लिए QR कोड बनाएं।", mr: "URL आणि मजकूरासाठी QR कोड तयार करा." }, icon: QrCode, link: "/tools/qr-code-generator" },
      { id: "tool-12", name: { en: "JSON Formatter", hi: "JSON फ़ॉर्मैटर", mr: "JSON स्वरूपक" }, description: { en: "Beautify and validate JSON data.", hi: "JSON डेटा को सुंदर और मान्य करें।", mr: "JSON डेटा सुंदर आणि प्रमाणित करा." }, icon: FileJson, link: "/tools/json-formatter" },
    ],
  },
];
