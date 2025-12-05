// app/api/generate-preview/route.ts
import { NextResponse } from "next/server";
import {
  generateClassicPdf,
  generateModernPdf,
  generateCreativePdf,
  generateMinimalistPdf,
} from "@/lib/templates";
import jsPDF from "jspdf";
import { TemplateType, TemplateStyles } from "@/lib/templates/types";

// Helper: extract name & contact from resume text
function extractHeader(content: string) {
  const lines = content
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  let name = "Untitled";
  let contact = "";

  if (lines.length > 0) {
    // First line = Full Name
    name = lines[0];

    // Look for contact info in first 3–4 lines
    const contactCandidates = lines
      .slice(1, 4)
      .filter((line) => /(email|phone|linkedin|location|@)/i.test(line));

    if (contactCandidates.length > 0) {
      contact = contactCandidates.join(" | ");
    }
  }

  return { name, contact };
}

const defaultStyles: TemplateStyles = {
  titleColor: "#000000",
  sectionColor: "#000000",
  textColor: "#333333",
  lineColor: "#CCCCCC",
};

export async function POST(req: Request) {
  try {
    const { content, templateId, documentType = "resume" } = await req.json();

    if (!content || !templateId) {
      return NextResponse.json(
        { error: "Missing content or templateId" },
        { status: 400 }
      );
    }

    console.log(
      `Generating preview for ${documentType}, template: ${templateId}`
    );

    let title = "Untitled";
    let contact = "";

    // ✅ FIX: Handle different document types
    if (documentType === "resume") {
      // For resumes, extract name and contact from content
      const header = extractHeader(content);
      title = header.name;
      contact = header.contact;
    } else if (documentType === "coverLetter") {
      // For cover letters, use a generic title
      title = "Cover Letter";
      // Extract contact info from the first few lines if available
      const lines = content.split("\n").filter((line) => line.trim());
      const contactLines = lines
        .slice(0, 3)
        .filter((line) => /(email|phone|linkedin|@)/i.test(line));
      if (contactLines.length > 0) {
        contact = contactLines.join(" | ");
      }
    }

    // Generate PDF with the correct document type
    const doc = generatePdfDoc(
      title,
      content,
      templateId,
      documentType as TemplateType,
      contact
    );

    // Convert to base64
    const pdfArrayBuffer = doc.output("arraybuffer");
    const pdfBase64 = arrayBufferToBase64(pdfArrayBuffer);

    // console.log(
    //   `${documentType} preview generated successfully for ${templateId}, size: ${pdfBase64.length} bytes`
    // );

    return NextResponse.json({
      pdfData: pdfBase64,
      templateId,
      title,
      documentType,
    });
  } catch (error) {
    console.error("Preview generation error:", error);
    return NextResponse.json(
      {
        error: `Failed to generate preview: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

// Helper function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

const generatePdfDoc = (
  title: string,
  content: string,
  templateId: string,
  documentType: TemplateType,
  contact?: string
): jsPDF => {
  const commonOptions = {
    contact,
    documentType,
    ...defaultStyles,
  };

  switch (templateId) {
    case "modern":
      return generateModernPdf(title, content, commonOptions);
    case "creative":
      return generateCreativePdf(title, content, commonOptions);
    case "minimalist":
      return generateMinimalistPdf(title, content, commonOptions);
    case "classic":
    default:
      return generateClassicPdf(title, content, commonOptions);
  }
};
