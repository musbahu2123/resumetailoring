// src/lib/templates/pdf-templates/classic-pdf.ts
import jsPDF from "jspdf";
import { parseContent, getSectionByType } from "../content-parser";
import { TemplateStyles, TemplateType, ParsedContent } from "../types";
import { formatCoverLetter } from '../cover-letter-utils';

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
  const documentType = options?.documentType || 'resume';
  
  if (documentType === 'coverLetter') {
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

  const parsed = parseContent(content, 'resume');

  // Calculate content density
  const totalContentLength = parsed.sections.reduce((total, section) => {
    return total + section.content.join(' ').length;
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
    wrapped.forEach((line) => {
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

  // ===== Skills ===== (Use two columns only if needed)
  const skillSections = getSectionByType(parsed, "skill");
  if (skillSections.length > 0) {
    const useTwoColumns = totalContentLength > 1800 || y > pageHeight - 50;
    y = renderSection(
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
      headerFontSize,
      useTwoColumns,
      totalContentLength > 2000
    );
  }

  // ===== Other Sections =====
  const otherSections = parsed.sections.filter(section => 
    section.type === 'other' && 
    section.content.length > 0 &&
    !(section.content.length === 1 && isRedundantName(section.content[0], title))
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
  formatCoverLetter(doc, content, title, options?.contact);
  return doc;
};

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
  const paddingY = compactMode ? 2.5 : 3;
  const contentSpacing = compactMode ? 4 : 5;

  if (y + lineHeight * 3 + paddingY > pageHeight - 20 && !compactMode) {
    doc.addPage();
    y = 20;
  } else if (y + lineHeight * 3 + paddingY > pageHeight - 15 && compactMode) {
    return y; // Skip section in compact mode
  }

  // Section Header with subtle background
  doc.setFillColor(theme.headerBg);
  doc.rect(
    marginX - 2,
    y - paddingY,
    usableWidth + 4,
    lineHeight + paddingY * 2,
    "F"
  );

  doc.setFont("times", "bold");
  doc.setFontSize(headerFontSize);
  doc.setTextColor(theme.sectionColor);
  doc.text(title.toUpperCase(), marginX, y + paddingY);
  y += lineHeight + paddingY * 2;

  // Divider
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
      wrapped.forEach((l) => {
        if (y1 > pageHeight - 20 && !compactMode) {
          doc.addPage();
          y1 = 20;
        } else if (y1 > pageHeight - 15 && compactMode) {
          return;
        }
        doc.text(l, marginX + 2, y1);
        y1 += lineHeight;
      });
    });

    col2.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, colWidth);
      wrapped.forEach((l) => {
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
      wrapped.forEach((l) => {
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