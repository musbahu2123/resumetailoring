// src/lib/templates/content-parser.ts
import { ParsedContent, TemplateSection, TemplateType } from "./types";

/**
 * Format phone numbers to standard format: (555) 123-4567
 */
function formatPhoneNumbers(text: string): string {
  return text.replace(
    /\((\d{3})\)\s*(\d{3})(\d{4})/g, 
    '($1) $2-$3'
  );
}

/**
 * Detect section type from its header/title.
 */
function detectType(header: string): TemplateSection["type"] {
  const h = header.toUpperCase();

  if (
    h.includes("PHONE") ||
    h.includes("EMAIL") ||
    h.includes("CONTACT") ||
    h.includes("LOCATION") ||
    h.includes("ADDRESS")
  ) return "contact";

  if (
    h.includes("SKILL") ||
    h.includes("TECHNOLOGY") ||
    h.includes("EXPERTISE") ||
    h.includes("LANGUAGE") ||
    h.includes("TECHNICAL")
  ) return "skill";

  if (
    h.includes("EXPERIENCE") ||
    h.includes("WORK") ||
    h.includes("EMPLOYMENT") ||
    h.includes("EMPLOY") ||
    h.includes("CAREER")
  ) return "experience";

  if (
    h.includes("EDUCATION") ||
    h.includes("DEGREE") ||
    h.includes("UNIVERSITY") ||
    h.includes("COURSE") ||
    h.includes("ACADEMIC")
  ) return "education";

  if (
    h.includes("SUMMARY") ||
    h.includes("PROFILE") ||
    h.includes("OBJECTIVE") ||
    h.includes("ABOUT")
  ) return "summary";

  if (
    h.includes("PROJECT") ||
    h.includes("PORTFOLIO") ||
    h.includes("WORK SAMPLE") ||
    h.includes("CASE STUDY")
  ) return "project";

  return "other";
}

/**
 * Check if a line looks like a section header (e.g. "EXPERIENCE").
 */
function isHeader(line: string): boolean {
  return /^(#+|SUMMARY|PROFESSIONAL SUMMARY|EXPERIENCE|WORK|EMPLOYMENT|EDUCATION|SKILLS|CONTACT|PROFILE|OBJECTIVE|PROJECTS|MISC|ADDITIONAL INFORMATION)$/i.test(
    line.trim()
  );
}

/**
 * Check if a line contains contact information
 */
function isContactInfo(line: string): boolean {
  return /(@|\.com|\.org|\.net|phone|mobile|tel:|email|@|linkedin\.|github\.)/i.test(line);
}

/**
 * Check if a line is just a name (redundant information)
 */
function isRedundantName(line: string, title: string): boolean {
  return line.trim().toLowerCase() === title.toLowerCase();
}

export const parseContent = (
  content: string,
  documentType: TemplateType = "resume"
): ParsedContent => {
  // First, format phone numbers in the entire content
  const formattedContent = formatPhoneNumbers(content);
  
  if (documentType === "coverLetter") {
    // For cover letters: treat as continuous paragraphs
    const lines = formattedContent.split("\n").filter((line) => line.trim() !== "");
    return {
      sections: [
        {
          title: "COVER LETTER",
          content: lines,
          type: "letter",
        },
      ],
      rawContent: formattedContent,
    };
  }

  // Extract title from content (first line after #)
  let resumeTitle = "";
  const titleMatch = formattedContent.match(/^#+\s*(.+)$/m);
  if (titleMatch) {
    resumeTitle = titleMatch[1].trim();
  }

  // For resumes: parse section by section
  const lines = formattedContent
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "" && !l.startsWith("=====")); // Filter out page markers

  const parsedSections: TemplateSection[] = [];
  let currentSection: TemplateSection | null = null;

  for (const line of lines) {
    if (isHeader(line)) {
      // Start a new section
      const cleanHeader = line.replace(/^#+\s*/, ""); // Remove markdown header markers
      currentSection = {
        title: cleanHeader,
        content: [],
        type: detectType(cleanHeader),
      };
      parsedSections.push(currentSection);
    } else if (currentSection) {
      // Continue the current section, but skip duplicate/redundant info
      const shouldSkip = (
        (currentSection.type !== "contact" && isContactInfo(line)) ||
        isRedundantName(line, resumeTitle)
      );
      
      if (!shouldSkip) {
        currentSection.content.push(line);
      }
    } else {
      // Skip orphaned lines that are redundant
      if (!isContactInfo(line) && !isRedundantName(line, resumeTitle)) {
        currentSection = {
          title: "ADDITIONAL INFORMATION",
          content: [line],
          type: "other",
        };
        parsedSections.push(currentSection);
      }
    }
  }

  return {
    sections: parsedSections,
    rawContent: formattedContent,
  };
};

export const getSectionByType = (
  parsed: ParsedContent,
  type: TemplateSection["type"]
): TemplateSection[] => {
  return parsed.sections.filter((section) => section.type === type);
};