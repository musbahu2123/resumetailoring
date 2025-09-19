import { 
  generateClassicPdf, 
  generateModernPdf, 
  generateCreativePdf, 
  generateMinimalistPdf 
} from '@/lib/templates';

export const generatePdf = (title: string, content: string, filename: string, templateId: string = 'classic'): void => {
  const doc = new jsPDF();
  
  switch (templateId) {
    case 'modern':
      generateModernPdf(doc, title, content);
      break;
    case 'creative':
      generateCreativePdf(doc, title, content);
      break;
    case 'minimalist':
      generateMinimalistPdf(doc, title, content);
      break;
    case 'classic':
    default:
      generateClassicPdf(doc, title, content);
  }
  
  doc.save(filename);
};