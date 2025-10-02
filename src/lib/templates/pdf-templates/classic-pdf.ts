import jsPDF from "jspdf";
import { parseContent, getSectionByType } from "../content-parser";
import { TemplateStyles, TemplateType, ParsedContent } from "../types";
import { formatCoverLetter } from "../cover-letter-utils";

interface ClassicOptions extends TemplateStyles {
  contact?: string;
  documentType?: TemplateType;
}

export const generateClassicPdf = (
  title: string,
  content: string,
  options?: ClassicOptions
): jsPDF => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const documentType = options?.documentType || "resume";

  if (documentType === "coverLetter") {
    return generateClassicCoverLetter(doc, title, content, options);
  } else {
    return generateClassicResume(doc, title, content, options);
  }
};

// Helper function to check for redundant names
function isRedundantName(line: string, title: string): boolean {
  return line.trim().toLowerCase() === title.toLowerCase();
}

// ===== BALANCED CLASSIC RESUME =====
const generateClassicResume = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: ClassicOptions
): jsPDF => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 18;
  const marginX = 18;
  const usableWidth = pageWidth - marginX * 2;

  // Classic styling with smart optimization
  let lineHeight = 5.5;
  let fontSize = 11;
  let headerFontSize = 12;
  let titleFontSize = 18;
  let contactFontSize = 10;

  const theme = {
    titleColor: "#000000",
    sectionColor: "#1A1A1A",
    textColor: "#333333",
    lineColor: "#666666",
    headerBg: "#f8f8f8", // Lighter background
    ...options,
  };

  const parsed = parseContent(content, "resume");

  // Calculate content density
  const totalContentLength = parsed.sections.reduce((total, section) => {
    return total + section.content.join(" ").length;
  }, 0);

  // Only optimize if content is very long
  if (totalContentLength > 2000) {
    lineHeight = 5.2;
    fontSize = 10.5;
    headerFontSize = 11.5;
    titleFontSize = 17;
  }

  // ===== Header: Name =====
  doc.setFont("times", "bold");
  doc.setFontSize(titleFontSize);
  doc.setTextColor(theme.titleColor);
  doc.text(title, pageWidth / 2, y, { align: "center" });
  y += lineHeight + 1.5;

  // ===== Contact Info =====
  let contactLine = options?.contact || "";
  if (!contactLine) {
    const contactSections = getSectionByType(parsed, "contact");
    if (contactSections.length) {
      contactLine = contactSections[0].content.join(" | ");
    }
  }
  if (contactLine) {
    doc.setFont("times", "normal");
    doc.setFontSize(contactFontSize);
    doc.setTextColor(theme.textColor);
    const wrapped = doc.splitTextToSize(contactLine, usableWidth);
    wrapped.forEach((line: string) => {
      doc.text(line, pageWidth / 2, y, { align: "center" });
      y += lineHeight;
    });
  }

  y += 3;
  drawDivider(doc, pageWidth, y, theme.lineColor);
  y += lineHeight;

  // ===== Professional Summary =====
  const summarySections = getSectionByType(parsed, "summary");
  if (summarySections.length > 0) {
    y = renderSection(
      doc,
      "PROFESSIONAL SUMMARY",
      summarySections[0].content,
      theme,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 2000
    );
  }

  // ===== Experience =====
  const expSections = getSectionByType(parsed, "experience");
  expSections.forEach((section) => {
    y = renderSection(
      doc,
      section.title.toUpperCase(),
      section.content,
      theme,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 2000
    );
  });

  // ===== Education =====
  const eduSections = getSectionByType(parsed, "education");
  eduSections.forEach((section) => {
    y = renderSection(
      doc,
      section.title.toUpperCase(),
      section.content,
      theme,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 2000
    );
  });

  // ===== Projects =====
  const projectSections = getSectionByType(parsed, "project");
  if (projectSections.length > 0) {
    y = renderSection(
      doc,
      "PROJECTS",
      projectSections[0].content,
      theme,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 2000
    );
  }

  // ===== Skills ===== (Always use comma-separated format for space efficiency)
  const skillSections = getSectionByType(parsed, "skill");
  if (skillSections.length > 0 && y < pageHeight - 30) {
    // Only add if we have space
    y = renderSkillsSectionClassic(
      doc,
      "SKILLS",
      skillSections[0].content,
      theme,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize
    );
  }

  // ===== Other Sections =====
  const otherSections = parsed.sections.filter(
    (section) =>
      section.type === "other" &&
      section.content.length > 0 &&
      !(
        section.content.length === 1 &&
        isRedundantName(section.content[0], title)
      )
  );

  otherSections.forEach((section) => {
    y = renderSection(
      doc,
      section.title.toUpperCase(),
      section.content,
      theme,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 2000
    );
  });

  // Add page number if multi-page
  if (doc.getNumberOfPages() > 1) {
    addPageNumbers(doc);
  }

  return doc;
};

// ===== CLASSIC COVER LETTER =====
const generateClassicCoverLetter = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: ClassicOptions
): jsPDF => {
  formatCoverLetter(doc, content, title, options?.contact || "", "");
  return doc;
};

// === SIMPLIFIED SKILLS RENDERER FOR CLASSIC TEMPLATE ===
function renderSkillsSectionClassic(
  doc: jsPDF,
  title: string,
  content: string[],
  theme: any,
  y: number,
  pageWidth: number,
  pageHeight: number,
  marginX: number,
  usableWidth: number,
  lineHeight: number,
  fontSize: number,
  headerFontSize: number
): number {
  const paddingY = 1.5;
  const contentSpacing = 3;

  // Calculate the exact center position for the text
  const bgHeight = lineHeight + paddingY * 2;
  // FIX: Better vertical centering calculation
  const textY = y + bgHeight / 2 + lineHeight / 4;

  // Section Header with left-aligned but vertically centered text
  doc.setFillColor(theme.headerBg);
  doc.rect(
    marginX - 2,
    y, // Start rect exactly at current y
    usableWidth + 4,
    bgHeight, // Background bar height: lineHeight + 2 * paddingY
    "F"
  );

  doc.setFont("times", "bold");
  doc.setFontSize(headerFontSize);
  doc.setTextColor(theme.sectionColor);
  // Keep text left-aligned but now vertically centered in the bar
  doc.text(title.toUpperCase(), marginX, textY);

  y += bgHeight; // Move y to exactly after the background bar

  // Divider immediately after the bar
  drawDivider(doc, pageWidth, y, theme.lineColor);
  y += lineHeight / 2;

  // Section Body
  doc.setFont("times", "normal");
  doc.setFontSize(fontSize);
  doc.setTextColor(theme.textColor);
  y += contentSpacing / 2;

  // Process skills content - always use comma-separated format
  let allSkills: string[] = [];

  content.forEach((skillLine) => {
    if (skillLine.includes(",")) {
      // Comma-separated skills: "Skill1, Skill2, Skill3"
      const skills = skillLine
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      allSkills.push(...skills);
    } else if (skillLine.includes("|")) {
      // Pipe-separated skills (kept for robust parsing)
      const skills = skillLine
        .split("|")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      allSkills.push(...skills);
    } else if (skillLine.includes(":")) {
      // Categorized skills (kept for robust parsing)
      const parts = skillLine.split(":");
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
      const cleanSkill = skillLine.replace(/^[-*•]\s*/, "").trim();
      if (cleanSkill.length > 0 && cleanSkill !== "SKILLS") {
        allSkills.push(cleanSkill);
      }
    }
  });

  // Remove duplicates and empty skills
  allSkills = [...new Set(allSkills)].filter((skill) => skill.length > 0);

  if (allSkills.length === 0) {
    return y + contentSpacing;
  }

  // ✅ ALWAYS use comma-separated format for space efficiency
  const skillsText = allSkills.join(", ");
  const wrapped = doc.splitTextToSize(skillsText, usableWidth);

  // Check if we have enough space
  const skillsHeight = wrapped.length * (lineHeight - 0.3);
  if (y + skillsHeight > pageHeight - 15) {
    return y; // Skip if no space
  }

  wrapped.forEach((line: string) => {
    doc.text(line, marginX, y);
    y += lineHeight - 0.3; // Slightly reduced line height for compactness
  });

  y += contentSpacing;
  return y;
}

// === BALANCED HELPER FUNCTIONS ===
function renderSection(
  doc: jsPDF,
  title: string,
  content: string[],
  theme: any,
  y: number,
  pageWidth: number,
  pageHeight: number,
  marginX: number,
  usableWidth: number,
  lineHeight: number,
  fontSize: number,
  headerFontSize: number,
  twoColumns = false,
  compactMode = false
): number {
  const paddingY = compactMode ? 1.5 : 2;
  const contentSpacing = compactMode ? 4 : 5;

  if (y + lineHeight * 3 + paddingY > pageHeight - 20 && !compactMode) {
    doc.addPage();
    y = 20;
  } else if (y + lineHeight * 3 + paddingY > pageHeight - 15 && compactMode) {
    return y; // Skip section in compact mode
  }

  // Calculate the exact center position for the text
  const bgHeight = lineHeight + paddingY * 2;
  // FIX: Better vertical centering calculation
  const textY = y + bgHeight / 2 + lineHeight / 4;

  // Section Header with left-aligned but vertically centered text
  doc.setFillColor(theme.headerBg);
  doc.rect(
    marginX - 2,
    y, // Start rect exactly at current y
    usableWidth + 4,
    bgHeight, // Background bar height: lineHeight + 2 * paddingY
    "F"
  );

  doc.setFont("times", "bold");
  doc.setFontSize(headerFontSize);
  doc.setTextColor(theme.sectionColor);
  // Keep text left-aligned but now vertically centered in the bar
  doc.text(title.toUpperCase(), marginX, textY);

  y += bgHeight; // Move y to exactly after the background bar

  // Divider immediately after the bar
  drawDivider(doc, pageWidth, y, theme.lineColor);
  y += lineHeight / 2;

  // Section Body
  doc.setFont("times", "normal");
  doc.setFontSize(fontSize);
  doc.setTextColor(theme.textColor);
  y += contentSpacing / 2;

  if (twoColumns) {
    const mid = Math.ceil(content.length / 2);
    const col1 = content.slice(0, mid);
    const col2 = content.slice(mid);
    let y1 = y;
    let y2 = y;
    const colWidth = usableWidth / 2 - 5;
    const col2X = marginX + colWidth + 7;

    col1.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, colWidth);
      wrapped.forEach((l: string) => {
        if (y1 > pageHeight - 20 && !compactMode) {
          doc.addPage();
          y1 = 20;
        } else if (y1 > pageHeight - 15 && compactMode) {
          return;
        }
        // NOTE: This function does not automatically add bullet points
        // for generic sections, relying on the input content for formatting.
        doc.text(l, marginX + 2, y1);
        y1 += lineHeight;
      });
    });

    col2.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, colWidth);
      wrapped.forEach((l: string) => {
        if (y2 > pageHeight - 20 && !compactMode) {
          doc.addPage();
          y2 = 20;
        } else if (y2 > pageHeight - 15 && compactMode) {
          return;
        }
        doc.text(l, col2X, y2);
        y2 += lineHeight;
      });
    });

    y = Math.max(y1, y2);
    y += contentSpacing;
  } else {
    content.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, usableWidth);
      wrapped.forEach((l: string) => {
        if (y > pageHeight - 20 && !compactMode) {
          doc.addPage();
          y = 20;
        } else if (y > pageHeight - 15 && compactMode) {
          return;
        }
        doc.text(l, marginX, y);
        y += lineHeight;
      });
    });
    y += contentSpacing;
  }

  return y;
}

function drawDivider(doc: jsPDF, pageWidth: number, y: number, color: string) {
  doc.setDrawColor(color);
  doc.setLineWidth(0.25);
  doc.line(18, y, pageWidth - 18, y);
}

function addPageNumbers(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Page ${i} of ${pageCount}`, 200, 287, { align: "right" });
  }
}
