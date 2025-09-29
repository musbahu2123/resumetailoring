// src/lib/templates/content-parser.ts
import { ParsedContent, TemplateSection, TemplateType } from "./types";

/**
 * Format phone numbers to standard format: (555) 123-4567
 */
function formatPhoneNumbers(text: string): string {
  return text.replace(/\((\d{3})\)\s*(\d{3})(\d{4})/g, "($1) $2-$3");
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
  )
    return "contact";

  if (
    h.includes("SKILL") ||
    h.includes("TECHNOLOGY") ||
    h.includes("EXPERTISE") ||
    h.includes("LANGUAGE") ||
    h.includes("TECHNICAL")
  )
    return "skill";

  if (
    h.includes("EXPERIENCE") ||
    h.includes("WORK") ||
    h.includes("EMPLOYMENT") ||
    h.includes("EMPLOY") ||
    h.includes("CAREER")
  )
    return "experience";

  if (
    h.includes("EDUCATION") ||
    h.includes("DEGREE") ||
    h.includes("UNIVERSITY") ||
    h.includes("COURSE") ||
    h.includes("ACADEMIC")
  )
    return "education";

  if (
    h.includes("SUMMARY") ||
    h.includes("PROFILE") ||
    h.includes("OBJECTIVE") ||
    h.includes("ABOUT")
  )
    return "summary";

  if (
    h.includes("PROJECT") ||
    h.includes("PORTFOLIO") ||
    h.includes("WORK SAMPLE") ||
    h.includes("CASE STUDY")
  )
    return "project";

  return "other";
}

/**
 * Check if a line looks like a section header (e.g. "EXPERIENCE").
 */
function isHeader(line: string): boolean {
  const trimmedLine = line.trim();
  
  // Handle markdown headers
  if (trimmedLine.startsWith("#")) return true;

  // Handle plain text headers - make it more flexible
  const headerPatterns = [
    /^SUMMARY$/i,
    /^PROFESSIONAL SUMMARY$/i, 
    /^EXPERIENCE$/i,
    /^WORK$/i,
    /^EMPLOYMENT$/i,
    /^EDUCATION$/i,
    /^SKILLS?$/i,
    /^CONTACT$/i,
    /^PROFILE$/i,
    /^OBJECTIVE$/i,
    /^PROJECTS$/i,
    /^MISC$/i,
    /^ADDITIONAL INFORMATION$/i
  ];

  return headerPatterns.some(pattern => pattern.test(trimmedLine));
}

/**
 * Check if a line contains contact information
 */
function isContactInfo(line: string): boolean {
  return /(@|\.com|\.org|\.net|phone|mobile|tel:|email|linkedin\.|github\.)/i.test(line);
}

/**
 * Check if a line is just a name (redundant information)
 */
function isRedundantName(line: string, title: string): boolean {
  return line.trim().toLowerCase() === title.toLowerCase();
}

/**
 * Remove redundant headers that duplicate section titles
 */
function removeRedundantHeaders(sections: TemplateSection[]): TemplateSection[] {
  const seenHeaders = new Set<string>();
  const filteredSections: TemplateSection[] = [];

  for (const section of sections) {
    const normalizedTitle = section.title.toUpperCase().trim();

    if (!seenHeaders.has(normalizedTitle)) {
      seenHeaders.add(normalizedTitle);
      filteredSections.push(section);
    } else {
      const existingSection = filteredSections.find(
        (s) => s.title.toUpperCase().trim() === normalizedTitle
      );
      if (existingSection) {
        existingSection.content = [
          ...existingSection.content,
          ...section.content,
        ];
      }
    }
  }

  return filteredSections;
}

/**
 * Enhanced robust skills parser with STRICT comma-separated enforcement
 */
function normalizeSkillsContent(content: string[]): string[] {
  if (content.length === 0) return [];

  // Merge all into one string for splitting
  const merged = content.join(" ").trim();
  
  // Handle empty skills case
  if (!merged || merged === "SKILLS" || merged === "SKILLS SECTION") return [];

  // 1. STRICT: Handle comma-separated format (what our AI should output)
  if (merged.includes(',')) {
    const skills = merged.split(',')
      .map(s => s.trim())
      .filter(s => {
        // Filter out any bullet points, section headers, or invalid entries
        return s.length > 0 && 
               !s.startsWith('-') && 
               !s.startsWith('•') && 
               !s.startsWith('*') &&
               s !== 'SKILLS' && 
               !s.includes('---') && 
               !s.includes('e.g.') &&
               !/^[•*\-]\s+/.test(s);
      });
    
    if (skills.length > 0) return skills;
  }

  // 2. Handle cases where AI still outputs bullets despite our prompt
  const bulletLines = content
    .map((line) => line.trim())
    .filter((line) => /^[-*•]\s+/.test(line));

  if (bulletLines.length > 0) {
    const skills = bulletLines
      .map((line) => line.replace(/^[-*•]\s+/, "").trim())
      .filter(s => s.length > 0 && s !== 'SKILLS' && !s.includes(':'));
    
    if (skills.length > 0) return skills;
  }

  // 3. Handle multi-line where each line might be a skill (fallback)
  if (content.length > 1) {
    const skills = content
      .map((line) => line.trim())
      .filter((s) => {
        return s.length > 0 && 
               s !== 'SKILLS' && 
               !s.includes('---') && 
               !s.includes(':') &&
               !/^[•*\-]\s+/.test(s) &&
               s.length < 50; // Avoid long paragraphs
      });
    
    if (skills.length > 0) return skills;
  }

  // 4. Ultimate fallback: if it's a single line that's not just "SKILLS", try to parse it
  if (content.length === 1 && merged !== 'SKILLS') {
    // Try to split by common separators as fallback
    const separators = /[,|/]| and | & /;
    if (separators.test(merged)) {
      const skills = merged.split(separators)
        .map(s => s.trim())
        .filter(s => s.length > 0);
      if (skills.length > 0) return skills;
    }
    
    // If no separators found but content exists and doesn't look like a bullet, return as single skill
    if (!/^[•*\-]\s+/.test(merged)) {
      return [merged];
    }
  }

  return [];
}

/**
 * FIXED: Enhanced project parser that correctly identifies project titles vs details
 */
function parseProjectContent(content: string[]): string[] {
  if (content.length === 0) return [];

  const result: string[] = [];
  let currentProject: string[] = [];

  for (const line of content) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Check if this line is a project title (starts with dash but contains project name pattern)
    const isProjectTitle = 
      trimmedLine.startsWith('- ') &&
      (trimmedLine.includes(':') ||
       trimmedLine.includes(' - ') ||
       /App|Application|Platform|System|Project|Campaign|Website|Portal/i.test(trimmedLine));

    // If we find a new project title and we have accumulated content, save the previous project
    if (isProjectTitle && currentProject.length > 0) {
      result.push(currentProject.join('\n'));
      currentProject = [trimmedLine.replace(/^-\s+/, '')]; // Remove the dash from project title
    } 
    // If it's the first line or a project detail, add to current project
    else if (currentProject.length === 0 || !isProjectTitle) {
      // For project details, keep the dash; for project titles, remove the dash
      const processedLine = currentProject.length === 0 ? 
        trimmedLine.replace(/^-\s+/, '') : // Remove dash from project title (if first line has one)
        trimmedLine; // Keep dash for project details (which are already parsed lines)
      
      currentProject.push(processedLine);
    }
  }

  // Don't forget the last project
  if (currentProject.length > 0) {
    result.push(currentProject.join('\n'));
  }

  // Fallback: if no projects were detected with the above logic, return original content
  return result.length > 0 ? result : content;
}

/**
 * Enhanced experience parser
 */
function normalizeExperienceContent(content: string[]): string[] {
  const hasDashBullets = content.some((line) => line.trim().startsWith("- "));

  if (hasDashBullets) {
    const result: string[] = [];
    let currentEntry: string[] = [];

    for (const line of content) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      const isJobHeader =
        /(19|20)\d{2}.*(Present|\d{4})/i.test(trimmedLine) ||
        /(Inc|Corp|LLC|Ltd|Company|Software|Technologies|Solutions)/i.test(trimmedLine) ||
        /[A-Z][a-z]+, [A-Z]{2}/.test(trimmedLine);

      if (isJobHeader && currentEntry.length > 0) {
        result.push(currentEntry.join("\n"));
        currentEntry = [trimmedLine];
      } else {
        currentEntry.push(trimmedLine);
      }
    }

    if (currentEntry.length > 0) {
      result.push(currentEntry.join("\n"));
    }

    return result.length > 0 ? result : content;
  }

  return content;
}

/**
 * Enhanced main parser to handle multi-line skills sections better
 */
export const parseContent = (
  content: string,
  documentType: TemplateType = "resume"
): ParsedContent => {
  const formattedContent = formatPhoneNumbers(content);

  if (documentType === "coverLetter") {
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

  let resumeTitle = "";
  const titleMatch = formattedContent.match(/^#+\s*(.+)$/m);
  if (titleMatch) {
    resumeTitle = titleMatch[1].trim();
  }

  const lines = formattedContent
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l !== "" && !l.startsWith("====="));

  let parsedSections: TemplateSection[] = [];
  let currentSection: TemplateSection | null = null;

  for (const line of lines) {
    if (isHeader(line)) {
      const cleanHeader = line.replace(/^#+\s*/, "");
      currentSection = {
        title: cleanHeader,
        content: [],
        type: detectType(cleanHeader),
      };
      parsedSections.push(currentSection);
    } else if (currentSection) {
      const shouldSkip =
        (currentSection.type !== "contact" && isContactInfo(line)) ||
        isRedundantName(line, resumeTitle);

      if (!shouldSkip) {
        currentSection.content.push(line);
      }
    } else {
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

  // Post-process sections
  for (const section of parsedSections) {
    if (section.type === "project") {
      section.content = parseProjectContent(section.content);
    }
    if (section.type === "experience") {
      section.content = normalizeExperienceContent(section.content);
    }
    if (section.type === "skill") {
      section.content = normalizeSkillsContent(section.content);
    }
  }

  parsedSections = removeRedundantHeaders(parsedSections);

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