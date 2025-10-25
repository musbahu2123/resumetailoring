import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Job from "@/models/job";
import AnonymousJob from "@/models/AnonymousJob"; // Add this
import mammoth from "mammoth";
import { Buffer } from "buffer";
import dbConnect from "@/lib/dbConnect";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const session = await auth();
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile") as File | null;
    const jobDescriptionText = formData.get("jobDescriptionText") as string;
    const resumeText = formData.get("resumeText") as string;

    // Validation (keep existing)
    if (!jobDescriptionText) {
      return NextResponse.json(
        { message: "Job description is required" },
        { status: 400 }
      );
    }

    let originalResumeText = resumeText;

    // File processing (keep existing logic)
    if (resumeFile) {
      const fileBuffer = await resumeFile.arrayBuffer();
      const fileExtension = resumeFile.name.split(".").pop()?.toLowerCase();

      if (fileExtension === "docx" || fileExtension === "doc") {
        const result = await mammoth.extractRawText({
          buffer: Buffer.from(fileBuffer),
        });
        originalResumeText = result.value;
      } else {
        return NextResponse.json(
          { message: "Unsupported file type. Please use DOCX or paste text." },
          { status: 400 }
        );
      }
    }

    if (!originalResumeText) {
      return NextResponse.json(
        { message: "Resume content is required" },
        { status: 400 }
      );
    }

    // ✅ NEW: Handle anonymous users
    if (!session || !session.user) {
      // Check if this session already used free credit
      const headers = new Headers(req.headers);
      const anonymousId = headers.get("x-anonymous-id") || uuidv4();

      const existingAnonymousJob = await AnonymousJob.findOne({
        sessionId: anonymousId,
        usedFreeCredit: true,
      });

      if (existingAnonymousJob) {
        return NextResponse.json(
          {
            message:
              "Free generation already used. Please sign up for more credits.",
          },
          { status: 402 }
        );
      }

      // Create anonymous job
      const newAnonymousJob = await AnonymousJob.create({
        sessionId: anonymousId,
        jobDescriptionText,
        originalResumeText,
        usedFreeCredit: true,
      });

      return NextResponse.json(
        {
          message: "Data received and saved successfully",
          jobId: newAnonymousJob._id,
          isAnonymous: true,
          anonymousId: anonymousId,
        },
        {
          status: 200,
          headers: {
            "x-anonymous-id": anonymousId,
          },
        }
      );
    }

    // ✅ EXISTING: Logged-in user flow (unchanged)
    const newJob = await Job.create({
      userId: session.user.id,
      jobDescriptionText,
      originalResumeText,
    });

    return NextResponse.json(
      {
        message: "Data received and saved successfully",
        jobId: newJob._id,
        isAnonymous: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to process your request.",
      },
      { status: 500 }
    );
  }
}
