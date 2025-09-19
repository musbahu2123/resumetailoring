// src/lib/templates/pdf-templates/modern-pdf.ts
import jsPDF from 'jspdf';
import { ParsedContent, TemplateStyles, TemplateType } from '../types';
import { parseContent, getSectionByType } from '../content-parser';
import { formatCoverLetter } from '../cover-letter-utils';

interface ModernOptions extends TemplateStyles {
  contact?: string;
  documentType?: TemplateType;
}

export const generateModernPdf = (
  title: string,
  content: string,
  options?: ModernOptions
): jsPDF => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const documentType = options?.documentType || 'resume';
  
  if (documentType === 'coverLetter') {
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
      lines.push(lineParts.join(' | '));
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
  const parsed = parseContent(content, 'resume');

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

  // Theme defaults - updated for modern corporate look
  const theme: TemplateStyles = {
    titleColor: options?.titleColor || '#FFFFFF',
    sectionColor: options?.sectionColor || '#000000', // Black for modern look
    textColor: options?.textColor || '#333333',
    lineColor: options?.lineColor || '#CCCCCC',
    backgroundColor: options?.backgroundColor || '#F5F5F5', // Light gray sidebar
    accentColor: options?.accentColor || '#003366', // Dark navy header
  };

  // ===== Header Bar =====
  doc.setFillColor(theme.accentColor);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Candidate Name - using Helvetica for modern look
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(theme.titleColor);
  const safeTitle = typeof title === 'string' ? title : String(title || '');
  doc.text(safeTitle, pageWidth / 2, 18, { align: 'center' });

  // Contact info - FIXED: Better handling of contact information
  let contactLines: string[] = [];
  if (options?.contact) {
    contactLines = splitContactInfo(options.contact);
  } else {
    const contactSections = getSectionByType(parsed, 'contact');
    if (contactSections.length > 0) {
      // Split contact info into logical lines to prevent overflow
      const contactContent = contactSections[0].content.join(' ');
      contactLines = splitContactInfo(contactContent);
    }
  }

  // Render contact info with proper spacing
  if (contactLines.length > 0) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11); // KEPT the standard 11pt size as requested
    doc.setTextColor('#E6E6E6');
    
    let contactY = 26;
    for (const line of contactLines) {
      if (contactY < 33) { // Ensure it fits in the header
        doc.text(line, pageWidth / 2, contactY, { align: 'center' });
        contactY += 4.5; // Proper line spacing for 11pt font
      }
    }
  }

  // ===== Sidebar Background =====
  doc.setFillColor(theme.backgroundColor);
  doc.rect(margin, 40, sidebarWidth, pageHeight - margin - 40, 'F');
  
  // ===== Add vertical divider line =====
  doc.setDrawColor(theme.lineColor);
  doc.line(margin + sidebarWidth, 40, margin + sidebarWidth, pageHeight - margin);

  // ===== Sidebar Content (skills or contact info as fallback) =====
  const skillSections = getSectionByType(parsed, 'skill');
  
  if (skillSections.length > 0) {
    sidebarY = addSidebarSection(
      doc,
      'SKILLS',
      skillSections,
      margin + 3,
      sidebarY,
      sidebarWidth - 6,
      maxHeight,
      theme
    );
  } else {
    // Fallback: Show contact info in sidebar if no skills
    const contactSections = getSectionByType(parsed, 'contact');
    if (contactSections.length > 0) {
      sidebarY = addSidebarSection(
        doc,
        'CONTACT',
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
  const summarySections = getSectionByType(parsed, 'summary');
  const experienceSections = getSectionByType(parsed, 'experience');
  const educationSections = getSectionByType(parsed, 'education');
  const projectSections = getSectionByType(parsed, 'project');
  
  // Get other sections but exclude contact to prevent duplication
  const otherSections = parsed.sections.filter(section => 
    section.type === 'other'
  );

  if (summarySections.length > 0) {
    mainY = addMainSection(
      doc,
      'PROFESSIONAL SUMMARY',
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
      'EXPERIENCE',
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
      'EDUCATION',
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
      'PROJECTS',
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
      'PROJECTS',
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
    if (section.content.length === 0 || 
        (section.content.length === 1 && isRedundantName(section.content[0], title))) {
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
  formatCoverLetter(doc, content, title, options?.contact);
  return doc;
};

// ===== Updated Helper Functions =====
const addSidebarSection = (
  doc: jsPDF,
  header: string,
  sections: ParsedContent['sections'],
  x: number,
  y: number,
  width: number,
  maxHeight: number,
  theme: TemplateStyles
): number => {
  let currentY = y;

  // Header with Helvetica font
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(theme.sectionColor);
  doc.text(header, x, currentY);
  currentY += 5;

  // Body with Times font
  doc.setFont('times', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(theme.textColor);

  // Limit skills to 8 items max
  const maxItems = header === 'SKILLS' ? 8 : Infinity;
  let itemCount = 0;
  
  sections.forEach((section) => {
    section.content.forEach((line) => {
      if (currentY > maxHeight || itemCount >= maxItems) return;
      
      const lines = doc.splitTextToSize(line, width);
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
  sections: ParsedContent['sections'],
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
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(theme.sectionColor);
  doc.text(header, x, currentY);
  doc.setDrawColor(theme.lineColor);
  doc.line(x, currentY + 1, x + 110, currentY + 1);
  currentY += 7;

  // Body with Times font (reduced size to prevent overflow)
  doc.setFont('times', 'normal');
  doc.setFontSize(11); // Reduced from 12 to prevent overflow
  doc.setTextColor(theme.textColor);

  sections.forEach((section) => {
    if (section.title && section.title !== header) {
      doc.setFont('helvetica', 'bold');
      doc.text(section.title, x, currentY);
      currentY += 5;
      doc.setFont('times', 'normal');
    }

    section.content.forEach((line) => {
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
  section: ParsedContent['sections'][0],
  width: number
): number => {
  let height = 0;
  
  // Account for section title if it exists
  if (section.title) {
    height += 12; // Title height
  }
  
  // Calculate height of content
  section.content.forEach((line) => {
    const lines = doc.splitTextToSize(line, width);
    height += lines.length * 4.5; // Slightly increased line height
  });
  
  height += 6; // Section spacing
  
  return height;
};