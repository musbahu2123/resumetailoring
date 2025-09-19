// /src/lib/templates/cover-letter-utils.ts
export const extractCompanyInfo = (coverLetterText: string): { company: string; position: string } => {
  let company = 'the company';
  let position = 'the position';
  
  // Extract company name (multiple patterns)
  const companyPatterns = [
    /at\s+([^,.!]+(?=\s+(company|inc|llc|corp|technologies|solutions))?[^,.!]+)/i,
    /at\s+([A-Z][a-zA-Z\s&]+)(?=\s+[A-Z]|$)/,
    /company:\s*([^\n,.!]+)/i,
    /opportunity at\s+([^,.!]+)/i
  ];
  
  for (const pattern of companyPatterns) {
    const match = coverLetterText.match(pattern);
    if (match) {
      company = match[1].trim();
      break;
    }
  }
  
  // Extract position title
  const positionPatterns = [
    /(position|role|opportunity)\s+(of|as|in)\s+([^,.!]+)/i,
    /applying for the\s+([^,.!]+)/i,
    /(frontend|backend|full.stack|software)\s+developer/i,
    /(web|mobile|application)\s+developer/i
  ];
  
  for (const pattern of positionPatterns) {
    const match = coverLetterText.match(pattern);
    if (match) {
      position = match[1] ? match[1].trim() : match[0].trim();
      break;
    }
  }
  
  return { company, position };
};

export const formatCoverLetter = (
  doc: jsPDF, 
  coverLetterText: string, 
  candidateName: string,
  contactInfo?: string
): void => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const usableWidth = pageWidth - (margin * 2);
  let y = 30;
  const lineHeight = 6;

  // Set Times New Roman, 12pt throughout
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  // Extract company info from the letter content
  const { company, position } = extractCompanyInfo(coverLetterText);

  // ===== Date =====
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  doc.text(currentDate, margin, y);
  y += lineHeight * 2;

  // ===== Employer Address =====
  doc.text("Hiring Manager", margin, y);
  doc.text(company, margin, y + lineHeight);
  doc.text("Company Address", margin, y + lineHeight * 2);
  y += lineHeight * 4;

  // ===== Salutation =====
  doc.text("Dear Hiring Manager,", margin, y);
  y += lineHeight * 2;

  // ===== Letter Content =====
  const paragraphs = coverLetterText.split('\n\n').filter(p => p.trim());
  
  paragraphs.forEach(paragraph => {
    if (paragraph.trim()) {
      // Clean up the paragraph (remove salutation/closing if they appear in middle)
      const cleanParagraph = paragraph
        .replace(/^(dear|sincerely|dear hiring manager|best regards),?/i, '')
        .trim();
      
      if (cleanParagraph) {
        const wrapped = doc.splitTextToSize(cleanParagraph, usableWidth);
        wrapped.forEach(line => {
          if (y > 250) return; // Ensure one-page only
          doc.text(line, margin, y);
          y += lineHeight;
        });
        y += lineHeight; // Space between paragraphs
      }
    }
  });

  // ===== Closing =====
  y += lineHeight;
  doc.text("Sincerely,", margin, y);
  y += lineHeight * 2;
  doc.setFont("times", "bold");
  doc.text(candidateName, margin, y);
  
  // Add contact info if available
  if (contactInfo) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text(contactInfo, margin, y + lineHeight);
  }
};