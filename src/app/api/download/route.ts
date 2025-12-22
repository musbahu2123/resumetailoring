//src/app/api/download/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  generateClassicPdf,
  generateModernPdf,
  generateCreativePdf,
  generateMinimalistPdf,
} from "@/lib/templates";
import jsPDF from "jspdf";
import { TemplateType, TemplateStyles } from "@/lib/templates/types";

// --- Helper: extract name & contact from resume text ---
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
      .filter((line) => /(email|phone|linkedin|location)/i.test(line));

    if (contactCandidates.length > 0) {
      contact = contactCandidates.join(" | ");
    }
  }

  return { name, contact };
}

// Define default styles that match what all templates expect
const defaultStyles: TemplateStyles = {
  titleColor: "#000000",
  sectionColor: "#000000",
  textColor: "#333333",
  lineColor: "#CCCCCC",
};

export async function POST(req: Request) {
  try {
    const session = await auth();

    const { tailoredResumeText, coverLetterText, documentType, templateId } =
      await req.json();

    if (
      (!tailoredResumeText && !coverLetterText) ||
      !templateId ||
      !documentType
    ) {
      return NextResponse.json(
        {
          message:
            "Missing required document text, template ID, or document type",
        },
        { status: 400 }
      );
    }

    // ✅ FIX: Use the correct content based on documentType
    let content: string;
    let filename: string;

    if (documentType === "resume") {
      content = tailoredResumeText;
      filename = "tailored-resume.pdf";
    } else if (documentType === "coverLetter") {
      content = coverLetterText;
      filename = "cover-letter.pdf";
    } else {
      return NextResponse.json(
        { message: "Invalid document type" },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        { message: `No ${documentType} content available to download` },
        { status: 400 }
      );
    }

    console.log(`Downloading ${documentType} with template: ${templateId}`);

    // 📌 For resumes, extract name/contact instead of hardcoding
    let title = "Untitled";
    let contact = "";

    if (documentType === "resume") {
      const header = extractHeader(content);
      title = header.name;
      contact = header.contact;
    } else {
      title = "Cover Letter";
      // For cover letters, extract contact info if available
      const lines = content.split("\n").filter((line) => line.trim());
      const contactLines = lines
        .slice(0, 3)
        .filter((line) => /(email|phone|linkedin|@)/i.test(line));
      if (contactLines.length > 0) {
        contact = contactLines.join(" | ");
      }
    }

    // Generate PDF document (pass documentType, name, and contact)
    const doc = generatePdfDoc(
      title,
      content,
      templateId,
      documentType as TemplateType,
      contact
    );

    // Convert to buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Disposition", `attachment; filename=${filename}`);

    // console.log(
    //   `✅ Successfully generated ${documentType} download: ${filename}`
    // );
    return new NextResponse(pdfBuffer, { status: 200, headers });
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}

// --- Helper function to select template ---
const generatePdfDoc = (
  title: string,
  content: string,
  templateId: string,
  documentType: TemplateType,
  contact?: string
): jsPDF => {
  // Common options with all required TemplateStyles properties
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
