// src/app/api/tailor/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/auth";
import Job from "@/models/job";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await dbConnect();
    const { jobId } = await req.json();

    if (!jobId) {
      return NextResponse.json({ message: "Job ID is required" }, { status: 400 });
    }

    const job = await Job.findOne({ _id: jobId, userId: session.user.id });
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.credits <= 0) {
      return NextResponse.json({ message: "No credits remaining" }, { status: 402 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // 🔥 Aggressive Prompt: ATS ~90+, tailored resume, personalized cover letter
    const prompt = `
You are an expert AI career coach and professional resume writer. 
Your mission is to take the JOB DESCRIPTION and ORIGINAL RESUME, 
and output a perfectly tailored version that maximizes keyword alignment, ATS optimization, and personalization.

The response MUST be a JSON object with exactly this structure:
{
  "tailoredResume": "A plain text, ATS-optimized resume. No JSON, no markdown, no * or - bullets. 
  Use clean section headers (e.g., PROFESSIONAL SUMMARY, SKILLS, EXPERIENCE). 
  Use only spaces and line breaks for formatting, not symbols. 
  Resume must feel human-written, polished, and ready to download as-is.",
  
  "coverLetter": "A professional, engaging cover letter in plain text (max 350 words). 
  Do not use bullets, asterisks, or markdown. 
  The cover letter MUST explicitly reference the company name and role title if available in the job description, making it feel personalized.",
  
  "atsScore": "An integer 0-100 representing keyword and skill alignment with the job. 
  Always optimize strongly so that the score is typically 90 or higher, unless the original resume is extremely weak."
}

Return ONLY valid JSON. Do not include markdown, \`\`\`json fences, or extra text.

IMPORTANT: The JSON strings MUST be properly escaped. Use \\\\n for line breaks and escape quotes.

--- JOB DESCRIPTION ---
${job.jobDescriptionText}

--- ORIGINAL RESUME ---
${job.originalResumeText}
`;

    const result = await model.generateContent(prompt);
    const rawOutput = result.response.text();

    // ✅ Parse JSON safely with better error handling
    let aiOutput;
    try {
      // 1. Remove markdown fences completely
      let cleaned = rawOutput
        .replace(/^\s*```json\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      // 2. Try to extract JSON object only (more robust matching)
      const jsonMatch = cleaned.match(/(\{[\s\S]*\})/);
      if (!jsonMatch) {
        throw new Error("No JSON object found in AI response");
      }

      const jsonString = jsonMatch[0];
      
      // 3. Parse the JSON
      aiOutput = JSON.parse(jsonString);
    } catch (err) {
      console.error("❌ Failed to parse AI response:", rawOutput);
      console.error("Parse error:", err);
      
      // Try a fallback approach - manually extract fields
      try {
        const tailoredResumeMatch = rawOutput.match(/"tailoredResume"\s*:\s*"([\s\S]*?)"(?=,|\})/);
        const coverLetterMatch = rawOutput.match(/"coverLetter"\s*:\s*"([\s\S]*?)"(?=,|\})/);
        const atsScoreMatch = rawOutput.match(/"atsScore"\s*:\s*(\d+)/);
        
        if (tailoredResumeMatch && coverLetterMatch && atsScoreMatch) {
          aiOutput = {
            tailoredResume: tailoredResumeMatch[1].replace(/\\n/g, '\n'),
            coverLetter: coverLetterMatch[1].replace(/\\n/g, '\n'),
            atsScore: parseInt(atsScoreMatch[1])
          };
        } else {
          throw new Error("Could not extract fields from AI response");
        }
      } catch (fallbackError) {
        return NextResponse.json(
          { 
            message: "AI output could not be parsed, please try again.",
            rawOutput: rawOutput.substring(0, 500) + "..." // Include snippet for debugging
          },
          { status: 500 }
        );
      }
    }

    // ✅ Clean tailoredResume (strict ATS-safe cleanup)
    let tailoredResumeText = (aiOutput.tailoredResume || "")
      .replace(/[*•\-–]+\s*/g, "") // remove bullets and dashes
      .replace(/\n{3,}/g, "\n\n") // normalize excessive spacing
      .replace(/[^\S\r\n]+/g, " ") // collapse weird spaces
      .replace(/ +\n/g, "\n") // trim spaces before newlines
      .trim();

    // Force uppercase headers (common ATS sections)
    tailoredResumeText = tailoredResumeText.replace(
      /(professional summary|summary|skills|experience|education|certifications)/gi,
      (match) => match.toUpperCase()
    );

    // Clean cover letter
    const coverLetterText = (aiOutput.coverLetter || "")
      .replace(/[*•\-–]+\s*/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // ✅ Save results to the existing job document
    job.tailoredResumeText = tailoredResumeText;
    job.coverLetterText = coverLetterText;
    job.atsScore = aiOutput.atsScore || 0;
    await job.save();

    // ✅ Deduct credit
    user.credits = Math.max(user.credits - 1, 0);
    await user.save();

    return NextResponse.json(
      {
        message: "Resume and cover letter tailored successfully",
        tailoredResume: tailoredResumeText,
        coverLetter: coverLetterText,
        atsScore: aiOutput.atsScore
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
