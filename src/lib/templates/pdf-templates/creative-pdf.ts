// src/lib/templates/pdf-templates/creative-pdf.ts
import jsPDF from "jspdf";
import { parseContent, getSectionByType } from "../content-parser";
import { TemplateStyles, TemplateType, ParsedContent } from "../types";
import { formatCoverLetter } from '../cover-letter-utils';

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
  const documentType = options?.documentType || 'resume';
  
  if (documentType === 'coverLetter') {
    return generateCreativeCoverLetter(doc, title, content, options);
  } else {
    return generateCreativeResume(doc, title, content, options);
  }
};

// Helper function to check for redundant names
function isRedundantName(line: string, title: string): boolean {
  return line.trim().toLowerCase() === title.toLowerCase();
}

// ===== ENHANCED CREATIVE RESUME =====
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
  const lineHeight = 5.5;

  // Modern creative color scheme
  const theme: TemplateStyles = {
    titleColor: options?.titleColor || "#111827",
    sectionColor: options?.sectionColor || "#0D9488",
    textColor: options?.textColor || "#111827",
    lineColor: options?.lineColor || "#0D9488",
    backgroundColor: options?.backgroundColor || "#0D9488",
    accentColor: options?.accentColor || "#4F46E5",
  };

  const parsed = parseContent(content, 'resume');

  // ===== Sidebar Background =====
  doc.setFillColor(theme.backgroundColor);
  doc.rect(0, 0, sidebarWidth, pageHeight, 'F');

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
      contactLine = contactSections[0].content.join("  |  ");
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
    
    const contactItems = contactLine.split('|').map(item => item.trim());
    contactItems.forEach((item) => {
      if (sidebarY > pageHeight - 50) return;
      
      if (item.includes('@') || item.includes('linkedin.com') || item.includes('.com') || item.includes('.in')) {
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
      section.content.forEach((line) => {
        if (sidebarY > pageHeight - 30) return;
        
        const cleanLine = line.replace(/[:\-]/g, ',').replace(/\s+/g, ' ');
        const skills = cleanLine.split(',').map(s => s.trim()).filter(s => s);
        
        skills.forEach((skill) => {
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
  expSections.forEach((section) => {
    mainY = renderMainSection(
      doc,
      "EXPERIENCE",
      [section],
      mainStartX,
      mainY,
      mainWidth,
      pageHeight,
      theme,
      true
    );
  });

  // ===== Education =====
  const eduSections = getSectionByType(parsed, "education");
  eduSections.forEach((section) => {
    mainY = renderMainSection(
      doc,
      "EDUCATION",
      [section],
      mainStartX,
      mainY,
      mainWidth,
      pageHeight,
      theme
    );
  });

  // ===== Projects =====
  const projectSections = getSectionByType(parsed, "project");
  projectSections.forEach((section) => {
    mainY = renderMainSection(
      doc,
      "PROJECTS",
      [section],
      mainStartX,
      mainY,
      mainWidth,
      pageHeight,
      theme,
      false,
      true
    );
  });

  return doc;
};

// ===== CREATIVE COVER LETTER =====
const generateCreativeCoverLetter = (
  doc: jsPDF,
  title: string,
  content: string,
  options?: CreativeOptions
): jsPDF => {
  formatCoverLetter(doc, content, title, options?.contact);
  return doc;
};

// ===== Main Section Renderer =====
function renderMainSection(
  doc: jsPDF,
  header: string,
  sections: ParsedContent['sections'],
  x: number,
  y: number,
  width: number,
  maxHeight: number,
  theme: TemplateStyles,
  isExperience = false,
  isProject = false
): number {
  let currentY = y;
  const isSummary = header === "PROFESSIONAL SUMMARY";

  if (currentY > maxHeight - 50) {
    doc.addPage();
    currentY = 50;
  }

  // Main Header with thick accent bar
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(theme.sectionColor);
  doc.text(header.toUpperCase(), x, currentY);
  
  // Thick accent bar instead of thin line
  doc.setFillColor(theme.sectionColor);
  doc.rect(x, currentY + 2, width * 0.4, 3, 'F');
  
  currentY += 12;

  // Main Content
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  doc.setTextColor(theme.textColor);

  sections.forEach((section) => {
    // For experience sections, show title (company) in bold
    if (isExperience && section.title && section.title !== header) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(section.title, x, currentY);
      currentY += 7;
      doc.setFont("times", "normal");
      doc.setFontSize(11);
    }

    section.content.forEach((line) => {
      if (currentY > maxHeight - 20) {
        doc.addPage();
        currentY = 50;
      }
      
      // Skip dashes and clean up formatting
      const cleanLine = line.replace(/^-\s*/, '').trim();
      if (!cleanLine) return;
      
      const lines = doc.splitTextToSize(cleanLine, width);
      
      // For experience, only add bullets to job title lines, not descriptions
      const isJobTitleLine = isExperience && cleanLine.includes('|');
      
      lines.forEach((l, lineIndex) => {
        const shouldUseBullet = (isProject || isJobTitleLine) && lineIndex === 0;
        const prefix = shouldUseBullet ? "• " : "";
        
        doc.text(prefix + l, x, currentY);
        currentY += 5;
      });
    });
    currentY += 6;
  });
  return currentY;
}