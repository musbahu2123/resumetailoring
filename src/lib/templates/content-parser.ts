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

/**
 * Intelligently parse project content for any resume (general solution)
 */
function parseProjectContent(content: string[]): string[] {
  if (content.length === 0) return content;
  
  // If content already has bullet points or clear structure, return as is
  if (content.some(line => line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().startsWith('*'))) {
    return content.map(line => line.trim());
  }
  
  // Join all content to analyze the full text
  const fullText = content.join(' ');
  
  // Strategy 1: Look for natural sentence boundaries with proper punctuation
  const sentenceRegex = /([^.!?]+[.!?])\s+(?=[A-Z])|([^.!?]+)$/g;
  const sentences: string[] = [];
  let match;
  
  while ((match = sentenceRegex.exec(fullText)) !== null) {
    if (match[1]) sentences.push(match[1].trim());
    if (match[2]) sentences.push(match[2].trim());
  }
  
  if (sentences.length > 1 && sentences.every(s => s.length > 10 && s.length < 200)) {
    return sentences;
  }
  
  // Strategy 2: Look for common project patterns and technical phrases
  const commonBulletStarters = [
    'built', 'developed', 'implemented', 'utilized', 'designed', 
    'created', 'deployed', 'integrated', 'optimized', 'led', 
    'managed', 'collaborated', 'wrote', 'architected', 'configured',
    'maintained', 'enhanced', 'automated', 'migrated', 'refactored'
  ];
  
  const result: string[] = [];
  let currentItem = '';
  
  for (const line of content) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    // Check if this line starts with a common bullet starter (case insensitive)
    const lowerLine = trimmedLine.toLowerCase();
    const startsWithBulletStarter = commonBulletStarters.some(starter => 
      lowerLine.startsWith(starter) || 
      lowerLine.startsWith(starter + ' ') ||
      lowerLine.includes(' ' + starter + ' ')
    );
    
    // Also check for project title patterns (short, might be capitalized)
    const mightBeProjectTitle = 
      trimmedLine.length < 50 && 
      !startsWithBulletStarter &&
      (trimmedLine === trimmedLine.toUpperCase() || 
       !trimmedLine.includes(' ') ||
       /^[A-Z][a-z]+([A-Z][a-z]+)*$/.test(trimmedLine));
    
    if ((startsWithBulletStarter || mightBeProjectTitle) && currentItem) {
      result.push(currentItem.trim());
      currentItem = trimmedLine;
    } else {
      if (currentItem) {
        currentItem += ' ' + trimmedLine;
      } else {
        currentItem = trimmedLine;
      }
    }
  }
  
  // Add the last item
  if (currentItem) {
    result.push(currentItem.trim());
  }
  
  // If we found structured items, return them
  if (result.length > 0) {
    return result;
  }
  
  // Strategy 3: Split by line breaks that seem intentional
  if (content.length > 1) {
    // If we have multiple lines but they don't form complete sentences together
    const averageLength = fullText.length / content.length;
    if (averageLength < 80) { // Lines are relatively short
      return content.map(line => line.trim()).filter(line => line.length > 0);
    }
  }
  
  // Final fallback: return as single item
  return [fullText];
}

/**
 * Normalize experience section content
 */
function normalizeExperienceContent(content: string[]): string[] {
  const result: string[] = [];
  let currentEntry = '';
  
  for (const line of content) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    // Look for job entry patterns (dates, company names, locations)
    const isJobHeader = 
      /(19|20)\d{2}.*(Present|\d{4})/i.test(trimmedLine) || // Date ranges
      /(Inc|Corp|LLC|Ltd|Company|Software|Technologies|Solutions)/i.test(trimmedLine) || // Company indicators
      /[A-Z][a-z]+, [A-Z]{2}/.test(trimmedLine); // City, State pattern
    
    if (isJobHeader && currentEntry) {
      result.push(currentEntry.trim());
      currentEntry = trimmedLine;
    } else {
      if (currentEntry) {
        currentEntry += ' ' + trimmedLine;
      } else {
        currentEntry = trimmedLine;
      }
    }
  }
  
  if (currentEntry) {
    result.push(currentEntry.trim());
  }
  
  return result.length > 0 ? result : content;
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

  // Post-process sections to handle specific formatting issues
  for (const section of parsedSections) {
    if (section.type === "project") {
      section.content = parseProjectContent(section.content);
    }
    
    if (section.type === "experience") {
      section.content = normalizeExperienceContent(section.content);
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