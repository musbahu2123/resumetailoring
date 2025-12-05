// src/lib/templates/index.ts
export { generateClassicPdf } from "./pdf-templates/classic-pdf";
export { generateModernPdf } from "./pdf-templates/modern-pdf";
export { generateCreativePdf } from "./pdf-templates/creative-pdf";
export { generateMinimalistPdf } from "./pdf-templates/minimalist-pdf";

export type {
  TemplateType,
  TemplateId,
  ParsedContent,
  TemplateStyles,
} from "./types";
export { parseContent, getSectionByType } from "./content-parser";
export { extractCompanyInfo, formatCoverLetter } from "./cover-letter-utils";
