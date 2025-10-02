import jsPDF from "jspdf";
import {
  generateClassicPdf,
  generateModernPdf,
  generateCreativePdf,
  generateMinimalistPdf,
} from "@/lib/templates";

export const generatePdf = (
  title: string,
  content: string,
  filename: string,
  templateId: string = "classic"
): void => {
  let doc: jsPDF;

  switch (templateId) {
    case "modern":
      doc = generateModernPdf(title, content);
      break;
    case "creative":
      doc = generateCreativePdf(title, content);
      break;
    case "minimalist":
      doc = generateMinimalistPdf(title, content);
      break;
    case "classic":
    default:
      doc = generateClassicPdf(title, content);
  }

  doc.save(filename);
};
