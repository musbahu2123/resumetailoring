//src/lib/templates/content-parser
import { ParsedContent, TemplateSection, TemplateType } from "./types";

function formatPhoneNumbers(text: string): string {
  return text;
}

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

function isHeader(line: string): boolean {
  const trimmedLine = line.trim();
  if (trimmedLine.startsWith("#")) return true;

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
    /^ADDITIONAL INFORMATION$/i,
  ];

  return headerPatterns.some((pattern) => pattern.test(trimmedLine));
}

function isContactInfo(line: string): boolean {
  return /(@|\.com|\.org|\.net|phone|mobile|tel:|email|linkedin\.|github\.)/i.test(
    line
  );
}

function isRedundantName(line: string, title: string): boolean {
  return line.trim().toLowerCase() === title.toLowerCase();
}

function removeRedundantHeaders(
  sections: TemplateSection[]
): TemplateSection[] {
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

function normalizeSkillsContent(content: string[]): string[] {
  if (content.length === 0) return [];
  const merged = content.join(" ").trim();
  if (!merged || merged === "SKILLS" || merged === "SKILLS SECTION") return [];

  if (merged.includes(",")) {
    const skills = merged
      .split(",")
      .map((s) => s.trim())
      .filter(
        (s) =>
          s.length > 0 &&
          !s.startsWith("-") &&
          !s.startsWith("•") &&
          !s.startsWith("*") &&
          s !== "SKILLS" &&
          !s.includes("---") &&
          !s.includes("e.g.") &&
          !/^[•*\-]\s+/.test(s)
      );
    if (skills.length > 0) return skills;
  }

  const bulletLines = content
    .map((line) => line.trim())
    .filter((line) => /^[-*•]\s+/.test(line));
  if (bulletLines.length > 0) {
    const skills = bulletLines
      .map((line) => line.replace(/^[-*•]\s+/, "").trim())
      .filter((s) => s.length > 0 && s !== "SKILLS" && !s.includes(":"));
    if (skills.length > 0) return skills;
  }

  if (content.length > 1) {
    const skills = content
      .map((line) => line.trim())
      .filter(
        (s) =>
          s.length > 0 &&
          s !== "SKILLS" &&
          !s.includes("---") &&
          !s.includes(":") &&
          !/^[•*\-]\s+/.test(s) &&
          s.length < 50
      );
    if (skills.length > 0) return skills;
  }

  if (content.length === 1 && merged !== "SKILLS") {
    const separators = /[,|/]| and | & /;
    if (separators.test(merged)) {
      const skills = merged
        .split(separators)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      if (skills.length > 0) return skills;
    }
    if (!/^[•*\-]\s+/.test(merged)) {
      return [merged];
    }
  }

  return [];
}

function parseProjectContent(content: string[]): string[] {
  if (content.length === 0) return [];
  const result: string[] = [];
  let currentProject: string[] = [];

  for (const line of content) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const isProjectTitle =
      trimmedLine.startsWith("- ") &&
      (trimmedLine.includes(":") ||
        trimmedLine.includes(" - ") ||
        /App|Application|Platform|System|Project|Campaign|Website|Portal/i.test(
          trimmedLine
        ));

    if (isProjectTitle && currentProject.length > 0) {
      result.push(currentProject.join("\n"));
      currentProject = [trimmedLine.replace(/^-\s+/, "")];
    } else if (currentProject.length === 0 || !isProjectTitle) {
      const processedLine =
        currentProject.length === 0
          ? trimmedLine.replace(/^-\s+/, "")
          : trimmedLine;
      currentProject.push(processedLine);
    }
  }

  if (currentProject.length > 0) {
    result.push(currentProject.join("\n"));
  }

  return result.length > 0 ? result : content;
}

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
        /(Inc|Corp|LLC|Ltd|Company|Software|Technologies|Solutions)/i.test(
          trimmedLine
        ) ||
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

export const parseContent = (
  content: string,
  documentType: TemplateType = "resume"
): ParsedContent => {
  const formattedContent = formatPhoneNumbers(content);

  if (documentType === "coverLetter") {
    const lines = formattedContent
      .split("\n")
      .filter((line) => line.trim() !== "");
    return {
      sections: [{ title: "COVER LETTER", content: lines, type: "other" }],
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
      if (currentSection) {
        parsedSections.push(currentSection);
      }
      const cleanHeader = line.replace(/^#+\s*/, "");
      currentSection = {
        title: cleanHeader,
        content: [],
        type: detectType(cleanHeader),
      };
    } else if (currentSection) {
      const shouldSkip =
        (currentSection.type !== "contact" &&
          currentSection.type !== "skill" &&
          isContactInfo(line)) ||
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
        currentSection = null;
      }
    }
  }

  if (currentSection) {
    parsedSections.push(currentSection);
  }

  for (const section of parsedSections) {
    if (section.type === "project")
      section.content = parseProjectContent(section.content);
    if (section.type === "experience")
      section.content = normalizeExperienceContent(section.content);
    if (section.type === "skill")
      section.content = normalizeSkillsContent(section.content);
  }

  parsedSections = removeRedundantHeaders(parsedSections);

  return { sections: parsedSections, rawContent: formattedContent };
};

export const getSectionByType = (
  parsed: ParsedContent,
  type: TemplateSection["type"]
): TemplateSection[] => {
  return parsed.sections.filter((section) => section.type === type);
};
