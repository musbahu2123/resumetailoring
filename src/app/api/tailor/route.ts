//src/app/api/tailor/route.ts (FIXED VERSION)
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

    // 🔥 UPDATED: Better prompt with clear formatting instructions
    const prompt = `
You are an expert AI career coach and professional resume writer. 
Your mission is to take the JOB DESCRIPTION and ORIGINAL RESUME, 
and output a perfectly tailored version that maximizes keyword alignment, ATS optimization, and personalization.

CRITICAL FORMATTING RULES:
1. Start with the person's name as the main header (e.g., JOHN DOE)
2. Use clean section headers (e.g., CONTACT, PROFESSIONAL SUMMARY, SKILLS, EXPERIENCE, PROJECTS, EDUCATION)
3. For EXPERIENCE section: Each job entry should have dash bullet points for accomplishments
4. For PROJECTS section: Each project should have dash bullet points for descriptions
5. Use EXACTLY this bullet point format: " - " (space dash space) at the start of each bullet point
6. Do NOT use colons, asterisks, or any other bullet symbols
7. Resume must be in plain text, no markdown, no JSON
8. INCLUDE ALL CONTACT INFORMATION from the original resume (email, phone, location, LinkedIn, GitHub)

CRITICAL SKILLS SECTION RULES:
1. The SKILLS section MUST use COMMA-SEPARATED format ONLY
2. Do NOT use tables, bullet points, pipes, or any other format for skills
3. Skills should be listed in a single line separated by commas
4. Include 8-15 relevant skills tailored to the job description
5. Do NOT leave the skills section empty

CRITICAL COVER LETTER FORMATTING RULES:
1. The cover letter must follow standard business letter format
2. Start with the current date (e.g., "September 21, 2025")
3. Include company address block with exactly these three lines:
   - "Hiring Manager"
   - "[Company Name]" 
   - "[Company Address or City, State]"
4. Use proper salutation: "Dear Hiring Manager,"
5. Structure content into 3-4 clear paragraphs separated by single blank lines
6. End with proper closing: "Sincerely," followed by a blank line and then the candidate name
7. DO NOT include "Cover Letter" as a header anywhere in the content
8. DO NOT include any markdown, asterisks, or special formatting
9. The signature should be just the candidate name, no additional text
10. Maximum 300 words, concise and professional

The response MUST be a JSON object with exactly this structure:
{
  "tailoredResume": "[Person's Full Name]\\n\\nCONTACT\\n[Email] | [Phone] | [Location] | LinkedIn: [LinkedIn URL] | GitHub: [GitHub URL]\\n\\nPROFESSIONAL SUMMARY\\n[Summary text]\\n\\nEXPERIENCE\\n[Company] ([Dates]) [Location]\\n - [Accomplishment 1]\\n - [Accomplishment 2]\\n - [Accomplishment 3]\\n\\n[Company] ([Dates]) [Location]\\n - [Accomplishment 1]\\n - [Accomplishment 2]\\n\\nPROJECTS\\n[Project Name]: [Brief description]\\n - [Technical detail 1]\\n - [Technical detail 2]\\n - [Result/impact]\\n\\n[Another Project Name]: [Brief description]\\n - [Technical detail 1]\\n - [Technical detail 2]\\n\\nEDUCATION\\n[Degree] [University] ([Year]) [Location]\\n\\nSKILLS\\n[Skill 1], [Skill 2], [Skill 3], [Skill 4], [Skill 5], [Skill 6]",
  
  "coverLetter": "September 21, 2025\\n\\nHiring Manager\\n[Company Name]\\n[Company Location]\\n\\nDear Hiring Manager,\\n\\n[First paragraph: Introduction and expression of interest]\\n\\n[Second paragraph: Key qualifications and achievements]\\n\\n[Third paragraph: Why you're a good fit for the company]\\n\\n[Fourth paragraph: Closing and call to action]\\n\\nSincerely,\\n\\n[Candidate Name]",
  
  "atsScore": "An integer 0-100 representing keyword and skill alignment with the job. 
  Always optimize strongly so that the score is typically 90 or higher, unless the original resume is extremely weak."
}

IMPORTANT: 
- Return ONLY valid JSON with no extra text before or after
- Use double backslashes for newlines (\\n) in the JSON strings
- Ensure the JSON is perfectly formatted and parseable
- For the cover letter, use the exact structure shown above
- For the resume, the SKILLS section MUST use comma-separated format only
- Skills should be relevant to both the original resume and job description

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

    // ✅ FIXED: Smarter cleanup that preserves skills
    let tailoredResumeText = (aiOutput.tailoredResume || "")
      .replace(/\\n/g, '\n') // Convert escaped newlines first
      .replace(/^[*•\-–]\s*/gm, (match, offset, string) => {
        // Only remove bullets that are NOT in the SKILLS section
        const before = string.substring(0, offset);
        return before.includes('SKILLS') ? match : '';
      })
      .replace(/\n{3,}/g, "\n\n") // normalize excessive spacing
      .replace(/[^\S\r\n]+/g, " ") // collapse weird spaces
      .replace(/ +\n/g, "\n") // trim spaces before newlines
      .trim();

    // Force uppercase headers (common ATS sections)
    tailoredResumeText = tailoredResumeText.replace(
      /^(professional summary|summary|skills|experience|education|certifications|projects|contact)$/gim,
      (match) => match.toUpperCase()
    );

    // Temporary debug to confirm
    console.log('=== CLEANUP DEBUG ===');
    console.log('Original AI output:', aiOutput.tailoredResume);
    console.log('After cleanup:', tailoredResumeText);
    console.log('Contains SKILLS after cleanup:', tailoredResumeText.includes('SKILLS'));

    // Clean cover letter
    const coverLetterText = (aiOutput.coverLetter || "")
      .replace(/^[*•\-–]\s*/gm, "") // Also fix for cover letter
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