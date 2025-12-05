// src/lib/templates/cover-letter-utils
import { jsPDF } from "jspdf";

/**
 * Extract company and position information from cover letter text
 */
export const extractCompanyInfo = (
  coverLetterText: string
): { company: string; position: string } => {
  let company = "the company";
  let position = "the position";

  const companyPatterns = [
    /Hiring Manager\s*\n\s*([^\n]+)/i,
    /at\s+([^,.!]+(?=\s+(company|inc|llc|corp|technologies|solutions))?[^,.!]+)/i,
    /at\s+([A-Z][a-zA-Z\s&]+)(?=\s+[A-Z]|$)/,
  ];

  for (const pattern of companyPatterns) {
    const match = coverLetterText.match(pattern);
    if (match && match[1] && match[1].trim().length > 2) {
      company = match[1].trim();
      break;
    }
  }

  const positionPatterns = [
    /(position|role|opportunity)\s+(of|as|in)\s+([^,.!]+)/i,
    /applying for the\s+([^,.!]+)/i,
    /(senior|junior|lead|principal)?\s*(frontend|backend|full.stack|software|web|mobile|application)\s+developer/i,
  ];

  for (const pattern of positionPatterns) {
    const match = coverLetterText.match(pattern);
    if (match) {
      position = match[1] ? match[1].trim() : match[0].trim();
      position = position
        .replace(/^(as|for|the|position|role|opportunity)\s+/i, "")
        .trim();
      break;
    }
  }

  return { company, position };
};

/**
 * Extract recruiter/hiring manager name from job description
 */
export const extractRecruiterName = (
  jobDescriptionText: string
): string | null => {
  if (!jobDescriptionText) return null;

  const patterns = [
    /(?:contact|reach out to|email|connect with)\s+(?:me\s+at\s+)?([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /(?:hiring manager|recruiter|talent acquisition):?\s+([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /(?:recruiter|hiring manager)\s+name:?\s+([A-Z][a-z]+ [A-Z][a-z]+)/i,
    /(?:apply to|send to|contact)\s+([A-Z][a-z]+ [A-Z][a-z]+)/i,
  ];

  for (const pattern of patterns) {
    const match = jobDescriptionText.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Parse structured cover letter content into components
 */
export const parseStructuredCoverLetter = (
  coverLetterText: string,
  candidateContactInfo?: string
): {
  contactInfo: string;
  date: string;
  company: string;
  address: string;
  salutation: string;
  body: string;
  closing: string;
  signature: string;
} => {
  const lines = coverLetterText.split("\n").filter((line) => line.trim());

  let contactInfo = candidateContactInfo || "";
  let date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  let company = "the company";
  let address = "";
  let salutation = "Dear Hiring Manager,";
  let body = "";
  let closing = "Sincerely,";
  let signature = "Candidate Name";

  // Flexible detection of contact info
  let startIndex = 0;
  const topBlock = lines.slice(0, 6).join(" ");
  if (/@/.test(topBlock) || /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(topBlock)) {
    contactInfo = lines.slice(0, 5).join("\n");
    startIndex = lines.findIndex((l) =>
      /^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/.test(l.trim())
    );
    if (startIndex === -1) startIndex = 5;
  }

  const dateLineIndex = startIndex;
  const isStructured =
    lines.length > dateLineIndex + 5 &&
    /^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/.test(lines[dateLineIndex].trim());

  if (isStructured) {
    date = lines[dateLineIndex].trim();

    if (
      lines.length > dateLineIndex + 3 &&
      lines[dateLineIndex + 1].trim() === "Hiring Manager"
    ) {
      company = lines[dateLineIndex + 2].trim();
      address = lines[dateLineIndex + 3].trim();
    }

    const salutationIndex = lines.findIndex(
      (line, index) => index > dateLineIndex && line.trim().startsWith("Dear")
    );

    if (salutationIndex !== -1) {
      salutation = lines[salutationIndex].trim();

      const closingIndex = lines.findIndex(
        (line, index) =>
          index > salutationIndex &&
          (line.trim().startsWith("Sincerely") ||
            line.trim().startsWith("Best regards") ||
            line.trim().startsWith("Respectfully"))
      );

      if (closingIndex !== -1) {
        const bodyLines = lines.slice(salutationIndex + 1, closingIndex);
        body = bodyLines.join("\n").trim();
        closing = lines[closingIndex].trim();

        if (lines.length > closingIndex + 1) {
          for (let i = closingIndex + 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              signature = lines[i].trim();
              break;
            }
          }
        }
      } else {
        body = lines
          .slice(salutationIndex + 1)
          .join("\n")
          .trim();
      }
    }
  } else {
    body = coverLetterText;
  }

  return {
    contactInfo,
    date,
    company,
    address,
    salutation,
    body,
    closing,
    signature,
  };
};

/**
 * Clean cover letter content
 */
export const cleanCoverLetterContent = (text: string): string => {
  return text
    .replace(/\bCover Letter\b/gi, "")
    .replace(/\*\*.*\*\*/g, "")
    .replace(/^=\s*Page\s*\d+\s*=$/gim, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/Sincerely,\s*\n\s*Cover Letter/gi, "Sincerely,")
    .trim();
};

/**
 * Format cover letter into PDF
 */
/**
 * Format cover letter into PDF
 */
export const formatCoverLetter = (
  doc: jsPDF,
  coverLetterText: string,
  candidateName: string,
  candidateContactInfo: string, // This is the source of truth for the header
  jobDescriptionText: string,
  contactInfo?: string
): void => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 25;
  const usableWidth = pageWidth - margin * 2;
  let y = 30;
  const lineHeight = 6;

  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);

  // Clean the text from the AI
  const cleanedText = cleanCoverLetterContent(coverLetterText);
  const recruiterName = jobDescriptionText
    ? extractRecruiterName(jobDescriptionText)
    : null;

  // Parse the structured letter from the AI (which now starts with the date)
  const { date, company, address, salutation, body, closing, signature } =
    parseStructuredCoverLetter(cleanedText);

  const finalCompany =
    company === "the company"
      ? extractCompanyInfo(cleanedText).company
      : company;
  const finalSignature =
    signature && signature !== "Candidate Name" ? signature : candidateName;
  const finalSalutation = recruiterName ? `Dear ${recruiterName},` : salutation;

  // ===== 1. CONTACT INFO (PDF HEADER) =====
  // *** CRITICAL CHANGE: We IGNORE any contact info parsed from the text.
  // We ONLY use the 'candidateContactInfo' passed into this function. ***
  const contactLines = candidateContactInfo.split("\n");
  contactLines.forEach((line) => {
    doc.text(line, margin, y);
    y += lineHeight;
  });
  y += lineHeight; // Add space after the contact block

  // ===== 2. DATE =====
  // The AI's text now starts with the date. We add it here.
  doc.text(date, margin, y);
  y += lineHeight * 2; // Space after date

  // ===== 3. EMPLOYER ADDRESS BLOCK =====
  // Add the employer address block from the parsed AI data
  doc.text("Hiring Manager", margin, y);
  doc.text(finalCompany, margin, y + lineHeight);
  if (address) {
    doc.text(address, margin, y + lineHeight * 2);
    y += lineHeight * 3; // Adjust Y position if address is present
  } else {
    y += lineHeight * 2; // Adjust Y position if no address
  }
  y += lineHeight; // Add extra space after the address block

  // ===== 4. SALUTATION =====
  doc.text(finalSalutation, margin, y);
  y += lineHeight * 2;

  // ===== 5. BODY =====
  const paragraphs = body.split("\n\n").filter((p) => p.trim());
  if (paragraphs.length > 0) {
    paragraphs.forEach((paragraph) => {
      const wrapped = doc.splitTextToSize(paragraph, usableWidth);
      wrapped.forEach((line: string) => {
        if (y > 250) return;
        doc.text(line, margin, y);
        y += lineHeight;
      });
    });
  } else {
    const wrapped = doc.splitTextToSize(body, usableWidth);
    wrapped.forEach((line: string) => {
      if (y > 250) return;
      doc.text(line, margin, y);
      y += lineHeight;
    });
  }

  // ===== 6. CLOSING =====
  y += lineHeight;
  doc.text(closing, margin, y);
  y += lineHeight * 2;

  // ===== 7. SIGNATURE =====
  doc.setFont("times", "italic");
  doc.text(finalSignature, margin, y);

  // Optional: Add a small contact line below the signature
  if (contactInfo) {
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text(contactInfo, margin, y + lineHeight);
  }
};
