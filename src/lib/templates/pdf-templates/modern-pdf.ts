import jsPDF from "jspdf";
import { ParsedContent, TemplateStyles, TemplateType } from "../types";
import { parseContent, getSectionByType } from "../content-parser";
import { formatCoverLetter } from "../cover-letter-utils";

interface ModernOptions extends TemplateStyles {
  contact?: string;
  documentType?: TemplateType;
}

export const generateModernPdf = (
  title: string,
  content: string,
  options?: ModernOptions
): jsPDF => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const documentType = options?.documentType || "resume";

  if (documentType === "coverLetter") {
    return generateModernCoverLetter(doc, title, content, options);
  } else {
    return generateModernResume(doc, title, content, options);
  }
};

// Helper function to check for redundant names
function isRedundantName(line: string, title: string): boolean {
  return line.trim().toLowerCase() === title.toLowerCase();
}

// Helper function to split contact info into multiple lines
function splitContactInfo(contactInfo: string): string[] {
  const lines: string[] = [];
  const parts = contactInfo.split(/\s*\|\s*/); // Split by pipe with optional whitespace

  // Group parts into logical lines (2 items per line)
  for (let i = 0; i < parts.length; i += 2) {
    const lineParts = parts.slice(i, i + 2);
    if (lineParts.length > 0) {
      lines.push(lineParts.join(" | "));
    }
  }

  return lines;
}

// ===== MODERN RESUME =====
const generateModernResume = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: ModernOptions
): jsPDF => {
  const parsed = parseContent(content, "resume");

  // Page setup
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const usableWidth = pageWidth - margin * 2;
  const sidebarWidth = usableWidth * 0.28;
  const mainStartX = margin + sidebarWidth + 6;
  const maxHeight = pageHeight - margin;

  let sidebarY = margin + 40;
  let mainY = margin + 40;

  // FIXED: Theme defaults with proper color enforcement
  const theme: TemplateStyles = {
    titleColor: "#FFFFFF", // FORCE white text for header
    sectionColor: options?.sectionColor || "#000000",
    textColor: options?.textColor || "#333333",
    lineColor: options?.lineColor || "#CCCCCC",
    backgroundColor: options?.backgroundColor || "#F5F5F5",
    accentColor: options?.accentColor || "#003366",
  };

  // ===== Header Bar =====
  doc.setFillColor(theme.accentColor);
  doc.rect(0, 0, pageWidth, 35, "F");

  // FIXED: Candidate Name - HARDCODE white color to ensure it works
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor("#FFFFFF"); // HARDCODED white - no theme dependency
  const safeTitle = typeof title === "string" ? title : String(title || "");
  doc.text(safeTitle, pageWidth / 2, 18, { align: "center" });

  // Contact info
  let contactLines: string[] = [];
  if (options?.contact) {
    contactLines = splitContactInfo(options.contact);
  } else {
    const contactSections = getSectionByType(parsed, "contact");
    if (contactSections.length > 0) {
      const contactContent = contactSections[0].content.join(" ");
      contactLines = splitContactInfo(contactContent);
    }
  }

  // Render contact info with proper spacing
  if (contactLines.length > 0) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor("#E6E6E6"); // Light gray for contact info

    let contactY = 26;
    for (const line of contactLines) {
      if (contactY < 33) {
        // Ensure it fits in the header
        doc.text(line, pageWidth / 2, contactY, { align: "center" });
        contactY += 4.5;
      }
    }
  }

  // ===== Sidebar Background =====
  doc.setFillColor(theme.backgroundColor);
  doc.rect(margin, 40, sidebarWidth, pageHeight - margin - 40, "F");

  // ===== Add vertical divider line =====
  doc.setDrawColor(theme.lineColor);
  doc.line(
    margin + sidebarWidth,
    40,
    margin + sidebarWidth,
    pageHeight - margin
  );

  // ===== Sidebar Content (skills or contact info as fallback) =====
  const skillSections = getSectionByType(parsed, "skill");

  if (skillSections.length > 0) {
    sidebarY = addSkillsSidebarSection(
      doc,
      "SKILLS",
      skillSections,
      margin + 3,
      sidebarY,
      sidebarWidth - 6,
      maxHeight,
      theme
    );
  } else {
    // Fallback: Show contact info in sidebar if no skills
    const contactSections = getSectionByType(parsed, "contact");
    if (contactSections.length > 0) {
      sidebarY = addSidebarSection(
        doc,
        "CONTACT",
        contactSections,
        margin + 3,
        sidebarY,
        sidebarWidth - 6,
        maxHeight,
        theme
      );
    }
  }

  // ===== Main Sections =====
  // Filter out contact sections to avoid duplication
  const summarySections = getSectionByType(parsed, "summary");
  const experienceSections = getSectionByType(parsed, "experience");
  const educationSections = getSectionByType(parsed, "education");
  const projectSections = getSectionByType(parsed, "project");

  // Get other sections but exclude contact to prevent duplication
  const otherSections = parsed.sections.filter(
    (section) => section.type === "other"
  );

  if (summarySections.length > 0) {
    mainY = addMainSection(
      doc,
      "PROFESSIONAL SUMMARY",
      summarySections,
      mainStartX,
      mainY,
      maxHeight,
      theme
    );
  }

  if (experienceSections.length > 0) {
    mainY = addMainSection(
      doc,
      "EXPERIENCE",
      experienceSections,
      mainStartX,
      mainY + 6, // Increased spacing
      maxHeight,
      theme
    );
  }

  if (educationSections.length > 0) {
    mainY = addMainSection(
      doc,
      "EDUCATION",
      educationSections,
      mainStartX,
      mainY + 6, // Increased spacing
      maxHeight,
      theme
    );
  }

  // Process project sections - try to add to sidebar first, then main content
  if (projectSections.length > 0 && sidebarY < maxHeight - 100) {
    sidebarY = addSidebarSection(
      doc,
      "PROJECTS",
      projectSections,
      margin + 3,
      sidebarY,
      sidebarWidth - 6,
      maxHeight,
      theme
    );
  } else if (projectSections.length > 0) {
    // If no space in sidebar, add to main content
    mainY = addMainSection(
      doc,
      "PROJECTS",
      projectSections,
      mainStartX,
      mainY + 6,
      maxHeight,
      theme
    );
  }

  // Process other sections with overflow prevention
  let remainingHeight = maxHeight - mainY;
  for (const section of otherSections) {
    // Skip empty sections or sections that only contain the name (redundant)
    if (
      section.content.length === 0 ||
      (section.content.length === 1 &&
        isRedundantName(section.content[0], title))
    ) {
      continue;
    }

    if (remainingHeight < 30) break; // Stop if not enough space for another section

    const sectionHeight = estimateSectionHeight(doc, section, 125);

    if (sectionHeight > remainingHeight) {
      // Skip this section to prevent overflow
      continue;
    }

    mainY = addMainSection(
      doc,
      section.title.toUpperCase(),
      [section],
      mainStartX,
      mainY + 6, // Increased spacing
      maxHeight,
      theme
    );

    remainingHeight = maxHeight - mainY;
  }

  return doc;
};

// ===== MODERN COVER LETTER =====
const generateModernCoverLetter = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: ModernOptions
): jsPDF => {
  formatCoverLetter(doc, content, title, options?.contact || "", ""); // FIX 1: Add missing parameters
  return doc;
};

// === NEW SKILLS RENDERER FOR MODERN TEMPLATE ===
const addSkillsSidebarSection = (
  doc: jsPDF,
  header: string,
  sections: ParsedContent["sections"],
  x: number,
  y: number,
  width: number,
  maxHeight: number,
  theme: TemplateStyles
): number => {
  let currentY = y;

  // Header with Helvetica font
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(theme.sectionColor);
  doc.text(header, x, currentY);
  currentY += 5;

  // Body with Times font
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(theme.textColor);

  // Process all skills sections
  let allSkills: string[] = [];

  sections.forEach((section) => {
    section.content.forEach((line) => {
      if (line.includes(",")) {
        // Comma-separated skills: "Skill1, Skill2, Skill3"
        const skills = line
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        allSkills.push(...skills);
      } else if (line.includes("|")) {
        // Pipe-separated skills
        const skills = line
          .split("|")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        allSkills.push(...skills);
      } else if (line.includes(":")) {
        // Categorized skills: "Category: Skill1, Skill2"
        const parts = line.split(":");
        if (parts.length > 1) {
          const skillsPart = parts.slice(1).join(":").trim();
          if (skillsPart.includes(",")) {
            const skills = skillsPart
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s.length > 0);
            allSkills.push(...skills);
          } else if (skillsPart.length > 0) {
            allSkills.push(skillsPart);
          }
        }
      } else {
        // Single skill or bullet point
        const cleanSkill = line.replace(/^[-*•]\s*/, "").trim();
        if (cleanSkill.length > 0 && cleanSkill !== "SKILLS") {
          allSkills.push(cleanSkill);
        }
      }
    });
  });

  // Remove duplicates and empty skills
  allSkills = [...new Set(allSkills)].filter((skill) => skill.length > 0);

  if (allSkills.length === 0) {
    return currentY;
  }

  // FIXED: Check if we should use comma-separated format
  const shouldUseCommaFormat =
    sections.some((section) =>
      section.content.some((line) => line.includes(","))
    ) && allSkills.length > 5;

  if (shouldUseCommaFormat) {
    // ✅ Use comma-separated format (what AI outputs)
    const skillsText = allSkills.join(", ");
    const wrappedSkills = doc.splitTextToSize(skillsText, width);
    wrappedSkills.forEach((skillLine: string) => {
      // FIX 2: Add type
      if (currentY > maxHeight) return;
      doc.text(skillLine, x, currentY);
      currentY += 4.2;
    });
  } else {
    // ✅ Use bullet points for non-comma formats
    // Limit skills to 12 items max
    const displaySkills = allSkills.slice(0, 12); // <--- UPDATED THIS LINE

    displaySkills.forEach((skill: string) => {
      // FIX 3: Add type
      if (currentY > maxHeight) return;

      const lines = doc.splitTextToSize(`• ${skill}`, width);
      doc.text(lines, x, currentY);
      currentY += lines.length * 4.2;
    });
  }

  currentY += 6; // Increased spacing between sections
  return currentY;
};

// ===== Updated Helper Functions =====
const addSidebarSection = (
  doc: jsPDF,
  header: string,
  sections: ParsedContent["sections"],
  x: number,
  y: number,
  width: number,
  maxHeight: number,
  theme: TemplateStyles
): number => {
  let currentY = y;

  // Header with Helvetica font
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(theme.sectionColor);
  doc.text(header, x, currentY);
  currentY += 5;

  // Body with Times font
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(theme.textColor);

  // Limit items to prevent overflow
  const maxItems = header === "SKILLS" ? 8 : Infinity; // NOTE: This will not be used for skills since addSkillsSidebarSection is called first
  let itemCount = 0;

  sections.forEach((section) => {
    section.content.forEach((line: string) => {
      // FIX 4: Add type
      if (currentY > maxHeight || itemCount >= maxItems) return;

      // Ensure a bullet point is added if it's a contact section
      const prefix = header === "CONTACT" ? "• " : "";
      const contentLine = prefix + line;

      const lines = doc.splitTextToSize(contentLine, width);
      doc.text(lines, x, currentY);
      currentY += lines.length * 4.2; // Reduced line spacing to prevent overflow
      itemCount++;
    });
    currentY += 6; // Increased spacing between sections
  });

  return currentY;
};

const addMainSection = (
  doc: jsPDF,
  header: string,
  sections: ParsedContent["sections"],
  x: number,
  y: number,
  maxHeight: number,
  theme: TemplateStyles
): number => {
  let currentY = y;

  // Check if we need to reduce content to fit on one page
  if (currentY > maxHeight - 30) {
    return currentY; // Skip this section if no space
  }

  // Header with Helvetica font
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(theme.sectionColor);
  doc.text(header, x, currentY);
  doc.setDrawColor(theme.lineColor);
  doc.line(x, currentY + 1, x + 110, currentY + 1);
  currentY += 7;

  // Body with Times font (reduced size to prevent overflow)
  doc.setFont("times", "normal");
  doc.setFontSize(11); // Reduced from 12 to prevent overflow
  doc.setTextColor(theme.textColor);

  sections.forEach((section) => {
    if (section.title && section.title !== header) {
      doc.setFont("helvetica", "bold");
      doc.text(section.title, x, currentY);
      currentY += 5;
      doc.setFont("times", "normal");
    }

    section.content.forEach((line: string) => {
      // FIX 5: Add type
      if (currentY > maxHeight - 10) {
        return; // Stop if we're at the bottom of the page
      }

      const lines = doc.splitTextToSize(line, 125);
      doc.text(lines, x, currentY);
      currentY += lines.length * 4.5; // Slightly increased for better readability
    });

    currentY += 6; // Increased spacing between sections
  });

  return currentY;
};

// Helper function to estimate section height
const estimateSectionHeight = (
  doc: jsPDF,
  section: ParsedContent["sections"][0],
  width: number
): number => {
  let height = 0;

  // Account for section title if it exists
  if (section.title) {
    height += 12; // Title height
  }

  // Calculate height of content
  section.content.forEach((line: string) => {
    // FIX 6: Add type
    const lines = doc.splitTextToSize(line, width);
    height += lines.length * 4.5; // Slightly increased line height
  });

  height += 6; // Section spacing

  return height;
};
