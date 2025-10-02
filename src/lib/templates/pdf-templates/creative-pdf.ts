import jsPDF from "jspdf";
import { parseContent, getSectionByType } from "../content-parser";
import { TemplateStyles, TemplateType, ParsedContent } from "../types";
import { formatCoverLetter } from "../cover-letter-utils";

interface CreativeOptions extends TemplateStyles {
  contact?: string;
  documentType?: TemplateType;
}

export const generateCreativePdf = (
  title: string,
  content: string,
  options?: CreativeOptions
): jsPDF => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const documentType = options?.documentType || "resume";
  if (documentType === "coverLetter") {
    return generateCreativeCoverLetter(doc, title, content, options);
  } else {
    return generateCreativeResume(doc, title, content, options);
  }
};

// Helper function to check for redundant names
function isRedundantName(line: string, title: string): boolean {
  return line.trim().toLowerCase() === title.toLowerCase();
}

// ===== FIXED CREATIVE RESUME =====
const generateCreativeResume = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: CreativeOptions
): jsPDF => {
  // Page setup with two-column layout
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const sidebarWidth = pageWidth * 0.35;
  const mainWidth = pageWidth * 0.65 - margin * 2;
  const mainStartX = sidebarWidth + margin;
  let sidebarY = 50;
  let mainY = 50;

  // Modern creative color scheme
  const theme: TemplateStyles = {
    titleColor: options?.titleColor || "#111827",
    sectionColor: options?.sectionColor || "#0D9488",
    textColor: options?.textColor || "#111827",
    lineColor: options?.lineColor || "#0D9488", // FIXED: Use for underline bars
    backgroundColor: options?.backgroundColor || "#0D9488",
    accentColor: options?.accentColor || "#4F46E5",
  };

  const parsed = parseContent(content, "resume");

  // ===== Sidebar Background =====
  doc.setFillColor(theme.backgroundColor);
  doc.rect(0, 0, sidebarWidth, pageHeight, "F");

  // ===== Candidate Name (Centered across entire page) =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(theme.titleColor);
  doc.text(title.toUpperCase(), pageWidth / 2, 25, { align: "center" });

  // ===== Contact Info (Sidebar) =====
  let contactLine = options?.contact || "";
  if (!contactLine) {
    const contactSections = getSectionByType(parsed, "contact");
    if (contactSections.length > 0) {
      contactLine = contactSections[0].content.join(" | ");
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor("#FFFFFF");
  doc.text("CONTACT", 15, sidebarY);
  sidebarY += 7;

  if (contactLine && sidebarY < pageHeight - 50) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#F8FAFC");
    const contactItems = contactLine.split("|").map((item) => item.trim());
    contactItems.forEach((item) => {
      if (sidebarY > pageHeight - 50) return;
      if (
        item.includes("@") ||
        item.includes("linkedin.com") ||
        item.includes(".com") ||
        item.includes(".in")
      ) {
        const wrappedLines = doc.splitTextToSize(item, sidebarWidth - 25);
        wrappedLines.forEach((line) => {
          if (sidebarY > pageHeight - 50) return;
          doc.text(line, 20, sidebarY);
          sidebarY += 4.5;
        });
      } else {
        doc.text(item, 20, sidebarY);
        sidebarY += 4.5;
      }
    });
    sidebarY += 10;
  }

  // ===== Skills in Sidebar =====
  const skillSections = getSectionByType(parsed, "skill");
  if (skillSections.length > 0 && sidebarY < pageHeight - 50) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor("#FFFFFF");
    doc.text("SKILLS", 15, sidebarY);
    sidebarY += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor("#F8FAFC");

    skillSections.forEach((section) => {
      let allSkills: string[] = [];

      section.content.forEach((line) => {
        // Skip section headers and empty lines
        if (line.toLowerCase().includes("skills") || !line.trim()) return;

        // Handle different skill formats
        const cleanLine = line.replace(/^[-*•]\s*/, "").trim();

        if (cleanLine.includes(",")) {
          // Comma-separated skills
          const skills = cleanLine
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          allSkills.push(...skills);
        } else if (cleanLine.includes("|")) {
          // Pipe-separated skills
          const skills = cleanLine
            .split("|")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
          allSkills.push(...skills);
        } else if (cleanLine.includes(":")) {
          // Categorized skills - extract skills after colon
          const skillsPart = cleanLine.split(":").slice(1).join(":").trim();
          if (skillsPart) {
            if (skillsPart.includes(",")) {
              const skills = skillsPart
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
              allSkills.push(...skills);
            } else {
              allSkills.push(skillsPart);
            }
          }
        } else if (cleanLine.length > 0) {
          // Single skill
          allSkills.push(cleanLine);
        }
      });

      // Remove duplicates and empty skills
      allSkills = [...new Set(allSkills)].filter((skill) => skill.length > 0);

      if (allSkills.length === 0) return;

      // Use bullet points for better readability
      allSkills.forEach((skill) => {
        if (sidebarY > pageHeight - 30) return;

        if (doc.getTextWidth(skill) > sidebarWidth - 25) {
          const wrappedSkill = doc.splitTextToSize(skill, sidebarWidth - 25);
          wrappedSkill.forEach((skillLine, index) => {
            if (sidebarY > pageHeight - 30) return;
            const prefix = index === 0 ? "• " : "  ";
            doc.text(prefix + skillLine, 20, sidebarY);
            sidebarY += 4.5;
          });
        } else {
          doc.text("• " + skill, 20, sidebarY);
          sidebarY += 4.5;
        }
      });
      sidebarY += 2;
    });
    sidebarY += 10;
  }

  // ===== Main Content Area =====

  // ===== Professional Summary =====
  const summarySections = getSectionByType(parsed, "summary");
  if (summarySections.length > 0) {
    mainY = renderMainSection(
      doc,
      "PROFESSIONAL SUMMARY",
      summarySections,
      mainStartX,
      mainY,
      mainWidth,
      pageHeight,
      theme
    );
  }

  // ===== Experience =====
  const expSections = getSectionByType(parsed, "experience");
  if (expSections.length > 0) {
    mainY = renderMainSection(
      doc,
      "EXPERIENCE",
      expSections,
      mainStartX,
      mainY,
      mainWidth,
      pageHeight,
      theme
    );
  }

  // ===== Projects =====
  const projectSections = getSectionByType(parsed, "project");
  if (projectSections.length > 0) {
    mainY = renderMainSection(
      doc,
      "PROJECTS",
      projectSections,
      mainStartX,
      mainY,
      mainWidth,
      pageHeight,
      theme
    );
  }

  // ===== Education =====
  const eduSections = getSectionByType(parsed, "education");
  if (eduSections.length > 0) {
    mainY = renderMainSection(
      doc,
      "EDUCATION",
      eduSections,
      mainStartX,
      mainY,
      mainWidth,
      pageHeight,
      theme
    );
  }

  return doc;
};

// ===== CREATIVE COVER LETTER (Fixed missing argument) =====
const generateCreativeCoverLetter = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: CreativeOptions
): jsPDF => {
  // FIX: Added default contact info (options?.contact || "") and the missing 5th argument (jobDescriptionText) as an empty string ("") to match the utility function signature.
  formatCoverLetter(doc, content, title, options?.contact || "", "");
  return doc;
};

// ===== COMPLETELY FIXED Main Section Renderer =====
function renderMainSection(
  doc: jsPDF,
  header: string,
  sections: ParsedContent["sections"],
  x: number,
  y: number,
  width: number,
  maxHeight: number,
  theme: TemplateStyles
): number {
  let currentY = y;

  if (currentY > maxHeight - 50) {
    doc.addPage();
    currentY = 50;
  }

  // FIXED: Section Header with proper theme color
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(theme.sectionColor);
  doc.text(header.toUpperCase(), x, currentY);

  // FIXED: Underline bar with SIDEBAR COLOR (not lineColor)
  doc.setFillColor(theme.backgroundColor); // FIXED: Use sidebar background color for underline bars
  doc.rect(x, currentY + 2, width * 0.4, 2, "F");
  currentY += 12;

  // FIXED: Consistent main content styling
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(theme.textColor);

  sections.forEach((section) => {
    section.content.forEach((line) => {
      if (currentY > maxHeight - 20) {
        doc.addPage();
        currentY = 50;
      }

      const cleanLine = line.trim();
      if (!cleanLine) return;

      // Handle all bullet points consistently (both experience and projects)
      if (cleanLine.startsWith("-")) {
        const bulletLine = cleanLine.replace(/^-\s+/, "").trim();
        const lines = doc.splitTextToSize(bulletLine, width - 8);

        lines.forEach((l, lineIndex) => {
          const prefix = lineIndex === 0 ? "• " : "  ";
          doc.text(prefix + l, x + 4, currentY);
          currentY += 5;
        });
      } else {
        // FIXED: All regular text (including project names) uses same styling
        const lines = doc.splitTextToSize(cleanLine, width);
        lines.forEach((l) => {
          doc.text(l, x, currentY);
          currentY += 5;
        });
      }
    });

    currentY += 8; // Space between sections
  });

  return currentY;
}
