// src/lib/templates/pdf-templates/minimalist-pdf.ts
import jsPDF from "jspdf";
import { parseContent, getSectionByType } from "../content-parser";
import { TemplateStyles, TemplateType, ParsedContent } from "../types";
import { formatCoverLetter } from '../cover-letter-utils';

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
  const documentType = options?.documentType || 'resume';
  
  if (documentType === 'coverLetter') {
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

  const parsed = parseContent(content, 'resume');

  // Calculate content density to adjust sizes if needed
  const totalContentLength = parsed.sections.reduce((total, section) => {
    return total + section.content.join(' ').length;
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
    wrapped.forEach((line) => {
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

  // ===== Skills ===== (Always use two columns to save space)
  const skillSections = getSectionByType(parsed, "skill");
  if (skillSections.length > 0 && y < pageHeight - 30) {
    y = renderSection(
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
      true, // Always two columns for skills
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
  formatCoverLetter(doc, content, title, options?.contact);
  return doc;
};

// === OPTIMIZED HELPER FUNCTIONS ===
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
  doc.setFont("times", "bold"); // Kept Times
  doc.setFontSize(headerFontSize);
  doc.setTextColor(0, 0, 0);
  doc.text(title.toUpperCase(), marginX, y);
  y += lineHeight;

  // Section Body
  doc.setFont("times", "normal"); // Kept Times
  doc.setFontSize(fontSize);

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
        if (y1 > pageHeight - 15) return; // Stop if at bottom
        doc.text(l, marginX + 2, y1);
        y1 += lineHeight - (compactMode ? 0.3 : 0);
      });
    });

    col2.forEach((line) => {
      const wrapped = doc.splitTextToSize(line, colWidth);
      wrapped.forEach((l) => {
        if (y2 > pageHeight - 15) return; // Stop if at bottom
        doc.text(l, col2X, y2);
        y2 += lineHeight - (compactMode ? 0.3 : 0);
      });
    });

    y = Math.max(y1, y2) + contentSpacing;
  } else {
    let linesAdded = 0;
    const maxLines = Math.floor((pageHeight - y - 10) / lineHeight);
    
    for (const line of content) {
      if (linesAdded >= maxLines) break; // Stop if no space
      
      const wrapped = doc.splitTextToSize(line, usableWidth);
      for (const l of wrapped) {
        if (y > pageHeight - 15) break; // Stop if at bottom
        if (linesAdded >= maxLines) break; // Stop if max lines reached
        
        doc.text(l, marginX, y);
        y += lineHeight - (compactMode ? 0.3 : 0);
        linesAdded++;
      }
    }
    y += contentSpacing;
  }

  return y;
}