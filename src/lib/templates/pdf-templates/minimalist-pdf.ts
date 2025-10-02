// src/lib/templates/pdf-templates/minimalist-pdf.ts
import jsPDF from "jspdf";
import { parseContent, getSectionByType } from "../content-parser";
import { TemplateStyles, TemplateType, ParsedContent } from "../types";
import { formatCoverLetter } from "../cover-letter-utils";

interface MinimalistOptions extends TemplateStyles {
  contact?: string;
  documentType?: TemplateType;
}

export const generateMinimalistPdf = (
  title: string,
  content: string,
  options?: MinimalistOptions
): jsPDF => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const documentType = options?.documentType || "resume";

  if (documentType === "coverLetter") {
    return generateMinimalistCoverLetter(doc, title, content, options);
  } else {
    return generateMinimalistResume(doc, title, content, options);
  }
};

// Helper function to check for redundant names
function isRedundantName(line: string, title: string): boolean {
  return line.trim().toLowerCase() === title.toLowerCase();
}

// ===== OPTIMIZED MINIMALIST RESUME =====
const generateMinimalistResume = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: MinimalistOptions
): jsPDF => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 18; // Reduced from 20
  const marginX = 18; // Reduced from 20
  const usableWidth = pageWidth - marginX * 2;

  // Optimized spacing for one-page resume
  let lineHeight = 5.5; // Reduced from 6
  let fontSize = 11; // Reduced from 12
  let titleFontSize = 18; // Reduced from 20
  let contactFontSize = 10; // Reduced from 11
  let headerFontSize = 12; // Reduced from 13

  const parsed = parseContent(content, "resume");

  // Calculate content density to adjust sizes if needed
  const totalContentLength = parsed.sections.reduce((total, section) => {
    return total + section.content.join(" ").length;
  }, 0);

  // Further optimize if content is very long
  if (totalContentLength > 1800) {
    lineHeight = 5.2;
    fontSize = 10.5;
    titleFontSize = 17;
    headerFontSize = 11.5;
  }

  // ===== Header: Name =====
  doc.setFont("times", "bold"); // Kept Times for professional look
  doc.setFontSize(titleFontSize);
  doc.setTextColor(0, 0, 0);
  doc.text(title, pageWidth / 2, y, { align: "center" });
  y += lineHeight + 1.5; // Reduced spacing

  // ===== Contact Info =====
  let contactLine = options?.contact || "";
  if (!contactLine) {
    const contactSections = getSectionByType(parsed, "contact");
    if (contactSections.length) {
      contactLine = contactSections[0].content.join(" | ");
    }
  }
  if (contactLine) {
    doc.setFont("times", "normal"); // Kept Times
    doc.setFontSize(contactFontSize);
    const wrapped = doc.splitTextToSize(contactLine, usableWidth);
    wrapped.forEach((line: string) => {
      // FIX 1: Add type
      doc.text(line, pageWidth / 2, y, { align: "center" });
      y += lineHeight - 0.5; // Reduced spacing
    });
  }

  y += lineHeight - 1; // Reduced spacing

  // ===== Professional Summary =====
  const summarySections = getSectionByType(parsed, "summary");
  if (summarySections.length > 0) {
    y = renderSection(
      doc,
      "PROFESSIONAL SUMMARY",
      summarySections[0].content,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 1800
    );
  }

  // ===== Experience =====
  const expSections = getSectionByType(parsed, "experience");
  expSections.forEach((section) => {
    y = renderSection(
      doc,
      section.title.toUpperCase(),
      section.content,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 1800
    );
  });

  // ===== Education =====
  const eduSections = getSectionByType(parsed, "education");
  eduSections.forEach((section) => {
    y = renderSection(
      doc,
      section.title.toUpperCase(),
      section.content,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 1800
    );
  });

  // ===== Projects =====
  const projectSections = getSectionByType(parsed, "project");
  if (projectSections.length > 0 && y < pageHeight - 40) {
    y = renderSection(
      doc,
      "PROJECTS",
      projectSections[0].content,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      false,
      totalContentLength > 1800
    );
  }

  // ===== Skills ===== (Fixed two-column logic)
  const skillSections = getSectionByType(parsed, "skill");
  if (skillSections.length > 0 && y < pageHeight - 30) {
    y = renderSkillsSection(
      doc,
      "SKILLS",
      skillSections[0].content,
      y,
      pageWidth,
      pageHeight,
      marginX,
      usableWidth,
      lineHeight,
      fontSize,
      headerFontSize,
      totalContentLength > 1800
    );
  }

  return doc;
};

// ===== MINIMALIST COVER LETTER =====
const generateMinimalistCoverLetter = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: MinimalistOptions
): jsPDF => {
  formatCoverLetter(doc, content, title, options?.contact || "", ""); // FIX 8: Add missing parameters
  return doc;
};

// === NEW FIXED SKILLS RENDERER ===
function renderSkillsSection(
  doc: jsPDF,
  title: string,
  content: string[],
  y: number,
  pageWidth: number,
  pageHeight: number,
  marginX: number,
  usableWidth: number,
  lineHeight: number,
  fontSize: number,
  headerFontSize: number,
  compactMode = false
): number {
  const contentSpacing = compactMode ? 4 : 5;

  // Don't add new page - optimize to fit on one page
  if (y + lineHeight * 2 > pageHeight - 20) {
    return y; // Skip section if no space
  }

  // Section Header
  doc.setFont("times", "bold");
  doc.setFontSize(headerFontSize);
  doc.setTextColor(0, 0, 0);
  doc.text(title.toUpperCase(), marginX, y);
  y += lineHeight;

  // Section Body
  doc.setFont("times", "normal");
  doc.setFontSize(fontSize);

  // FIX: Handle skills content properly - flatten and process all skills
  let allSkills: string[] = [];

  // Process content array to extract individual skills
  content.forEach((skillLine) => {
    if (skillLine.includes(",")) {
      // Comma-separated skills: "Skill1, Skill2, Skill3"
      const skills = skillLine
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      allSkills.push(...skills);
    } else if (skillLine.includes("|")) {
      // Table format skills: "Skill1 | Skill2 | Skill3"
      const skills = skillLine
        .split("|")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      allSkills.push(...skills);
    } else if (skillLine.includes("Skills:")) {
      // Categorized skills: "Professional Skills: Skill1, Skill2"
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
    return y + contentSpacing; // Skip if no skills
  }

  // FIXED: Check if we should use comma-separated format or bullet points
  // Check if any original line contained a comma AND there are enough skills for a block
  const shouldUseCommaFormat =
    content.some((line) => line.includes(",")) && allSkills.length > 5;

  if (shouldUseCommaFormat) {
    // ✅ Use comma-separated format (what AI outputs)
    const skillsText = allSkills.join(", ");
    const wrapped = doc.splitTextToSize(skillsText, usableWidth);
    wrapped.forEach((line: string) => {
      // FIX 2: Add type
      if (y > pageHeight - 15) return;
      doc.text(line, marginX, y);
      y += lineHeight - (compactMode ? 0.3 : 0);
    });
  } else {
    // ✅ Use two-column bullet points for non-comma formats
    const mid = Math.ceil(allSkills.length / 2);
    const col1 = allSkills.slice(0, mid);
    const col2 = allSkills.slice(mid);

    let y1 = y;
    let y2 = y;
    const colWidth = usableWidth / 2 - 5;
    const col2X = marginX + colWidth + 7;

    // Render first column
    col1.forEach((skill) => {
      if (y1 > pageHeight - 15) return;
      // FIX: Add bullet point only in this block
      const wrapped = doc.splitTextToSize(`• ${skill}`, colWidth);
      wrapped.forEach((line: string) => {
        // FIX 3: Add type
        if (y1 > pageHeight - 15) return;
        doc.text(line, marginX + 2, y1);
        y1 += lineHeight - (compactMode ? 0.3 : 0);
      });
    });

    // Render second column
    col2.forEach((skill) => {
      if (y2 > pageHeight - 15) return;
      // FIX: Add bullet point only in this block
      const wrapped = doc.splitTextToSize(`• ${skill}`, colWidth);
      wrapped.forEach((line: string) => {
        // FIX 4: Add type
        if (y2 > pageHeight - 15) return;
        doc.text(line, col2X, y2);
        y2 += lineHeight - (compactMode ? 0.3 : 0);
      });
    });

    y = Math.max(y1, y2);
  }

  return y + contentSpacing;
}

// === OPTIMIZED HELPER FUNCTIONS (KEEP EXISTING FOR OTHER SECTIONS) ===
function renderSection(
  doc: jsPDF,
  title: string,
  content: string[],
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
  const contentSpacing = compactMode ? 4 : 5;

  // Don't add new page - optimize to fit on one page
  if (y + lineHeight * 2 > pageHeight - 20) {
    return y; // Skip section if no space
  }

  // Section Header
  doc.setFont("times", "bold");
  doc.setFontSize(headerFontSize);
  doc.setTextColor(0, 0, 0);
  doc.text(title.toUpperCase(), marginX, y);
  y += lineHeight;

  // Section Body
  doc.setFont("times", "normal");
  doc.setFontSize(fontSize);

  if (twoColumns) {
    // FIX: Only use twoColumns for non-skills sections that need it
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
        // FIX 5: Add type
        if (y1 > pageHeight - 15) return;
        doc.text(l, marginX + 2, y1);
        y1 += lineHeight - (compactMode ? 0.3 : 0);
      });
    });

    col2.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, colWidth);
      wrapped.forEach((l: string) => {
        // FIX 6: Add type
        if (y2 > pageHeight - 15) return;
        doc.text(l, col2X, y2);
        y2 += lineHeight - (compactMode ? 0.3 : 0);
      });
    });

    y = Math.max(y1, y2) + contentSpacing;
  } else {
    let linesAdded = 0;
    const maxLines = Math.floor((pageHeight - y - 10) / lineHeight);

    for (const line of content) {
      if (linesAdded >= maxLines) break;

      const wrapped = doc.splitTextToSize(line, usableWidth);
      for (const l of wrapped) {
        // FIX 7: This is already typed by the for-of loop
        if (y > pageHeight - 15) break;
        if (linesAdded >= maxLines) break;

        doc.text(l, marginX, y);
        y += lineHeight - (compactMode ? 0.3 : 0);
        linesAdded++;
      }
    }
    y += contentSpacing;
  }

  return y;
}
