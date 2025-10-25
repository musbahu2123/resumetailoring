import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/auth";
import Job from "@/models/job";
import AnonymousJob from "@/models/AnonymousJob"; // Add this import
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    await dbConnect();

    const { jobId, anonymousId } = await req.json(); // Add anonymousId

    if (!jobId) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }

    let job;
    let isAnonymous = false;
    let user = null;

    // ✅ NEW: Handle anonymous users
    if (!session || !session.user) {
      if (!anonymousId) {
        return NextResponse.json(
          { message: "Anonymous ID required for free generation" },
          { status: 400 }
        );
      }

      // Find anonymous job
      job = await AnonymousJob.findOne({
        _id: jobId,
        sessionId: anonymousId,
      });

      if (!job) {
        return NextResponse.json({ message: "Job not found" }, { status: 404 });
      }

      // Check if this session already used their free credit
      const existingCompletedJob = await AnonymousJob.findOne({
        sessionId: anonymousId,
        tailoredResumeText: { $exists: true, $ne: "" },
      });

      if (
        existingCompletedJob &&
        existingCompletedJob._id.toString() !== jobId
      ) {
        return NextResponse.json(
          {
            message:
              "Free generation already used. Please sign up for more credits.",
          },
          { status: 402 }
        );
      }

      isAnonymous = true;
    } else {
      // ✅ EXISTING: Logged-in user flow (unchanged)
      job = await Job.findOne({ _id: jobId, userId: session.user.id });
      if (!job) {
        return NextResponse.json({ message: "Job not found" }, { status: 404 });
      }

      user = await User.findById(session.user.id);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      if (user.credits <= 0) {
        return NextResponse.json(
          { message: "No credits remaining" },
          { status: 402 }
        );
      }
    }

    // ✅ USE GPT-4-TURBO WHICH SUPPORTS JSON MODE
    const model = "gpt-4-turbo";

    // 🔥 EXACT SAME PROMPT - NO CHANGES
    const prompt = `
You are an expert AI career coach and professional resume writer with 25+ years of recruiting experience at top tech companies like Google. 
Your mission is to transform the ORIGINAL RESUME into a perfectly tailored version for the JOB DESCRIPTION that addresses key recruiter concerns.

CRITICAL RECRUITER INSIGHTS (from Google Recruiting Lead):
1. RESUMES MUST BE TAILORED TO THE JOB - Recruiters spend limited time, so make alignment obvious
2. ZERO TOLERANCE FOR ERRORS - No typos, grammar errors, or formatting inconsistencies
3. CONCISE & FOCUSED - Lengthy resumes are red flags; keep it to one page
4. HIGHLIGHT TRANSFERABLE SKILLS - Show how background aligns with role requirements
5. EMPHASIZE PROBLEM-SOLVING - How you tackled challenges, what you did differently, lessons learned
6. DEMONSTRATE LEADERSHIP - Not just management, but how you show up daily (sports, university, projects)
7. QUANTIFY ACHIEVEMENTS - Use metrics to show impact whenever possible
8. INCLUDE NON-TRADITIONAL BACKGROUNDS - Athletic achievements, personal projects, volunteer work

RESUME FORMATTING RULES (Strict Compliance):
1. Start with the person's name as main header (e.g., "JOHN DOE")
2. Use exact section headers: CONTACT, PROFESSIONAL SUMMARY, SKILLS, EXPERIENCE, PROJECTS, EDUCATION
3. EXPERIENCE section: Use " - " bullet points focusing on problem-solving and leadership
4. PROJECTS section: Use " - " bullet points highlighting technical implementation
5. SKILLS section: COMMA-SEPARATED format ONLY (no bullets, no pipes, no tables)
6. No markdown, no JSON, no colons as bullets, no asterisks
7. Include ALL contact information from original resume
8. Maximum one page - be ruthless about conciseness

CONTENT REQUIREMENTS:
- PROFESSIONAL SUMMARY: 2-3 lines maximum, tailored to specific role
- EXPERIENCE: 2-3 bullet points per job focusing on:
  * Problem-solving approaches and results
  * Leadership examples (formal or informal)
  * Quantifiable achievements with metrics
  * Transferable skills matching job requirements
- PROJECTS: 1-2 bullet points per project showing technical depth
- SKILLS: 8-12 relevant, comma-separated skills matching job description
- EDUCATION: Single line per degree
- Include athletic achievements, volunteer work, or non-traditional experience if relevant

COVER LETTER FORMATTING RULES:
1. Standard business letter format
2. Current date (e.g., "September 21, 2025")
3. Three-line address block:
   "Hiring Manager"
   "[Company Name]"
   "[Company Address or City, State]"
4. Salutation: "Dear Hiring Manager,"
5. 3-4 paragraphs separated by single blank lines
6. Closing: "Sincerely," followed by blank line and candidate name
7. No "Cover Letter" header, no markdown, no special formatting
8. Maximum 250 words - concise and professional
9. Emphasize problem-solving and leadership experiences

COVER LETTER CONTENT STRUCTURE:
1. First paragraph: Express interest and highlight 1-2 key transferable skills
2. Second paragraph: Specific examples of problem-solving and leadership
3. Third paragraph: Why you're a good fit for company culture and role
4. Fourth paragraph: Call to action and enthusiasm for next steps

SPELL CHECK & GRAMMAR REQUIREMENTS:
- Zero tolerance for typos, grammar errors, or capitalization mistakes
- Use consistent tense and professional language
- Ensure all company names, technologies, and terms are spelled correctly
- Verify all dates and locations are formatted consistently

PROBLEM-SOLVING & LEADERSHIP FOCUS:
For each experience bullet point, ask:
- What problem did I solve? How did I approach it differently?
- What metrics can quantify my impact?
- How did I demonstrate leadership (formal or informal)?
- What did I learn from this experience?
- How does this relate to the target role?

The response MUST be a JSON object with exactly this structure:
{
  "tailoredResume": "JOHN DOE\\n\\nCONTACT\\njohn.doe@email.com | (555) 987-6543 | Austin, TX | LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe\\n\\nPROFESSIONAL SUMMARY\\n[2-3 line tailored summary emphasizing problem-solving and leadership]\\n\\nSKILLS\\nReact, TypeScript, Node.js, AWS, RESTful APIs, Microservices, Docker, Kubernetes, SQL, MongoDB, JavaScript, HTML, CSS\\n\\nEXPERIENCE\\nWeb Developer - TechSolutions Inc. (2021-Present) Austin, TX\\n - [Problem-solving achievement with metrics]\\n - [Leadership example and impact]\\n - [Technical accomplishment aligned with job]\\n\\nJunior Developer - StartupGrid (2020-2021) Remote\\n - [Problem-solving achievement]\\n - [Leadership/initiative example]\\n\\nPROJECTS\\nPersonal Budget App\\n - [Technical implementation detail]\\n - [Problem solved or result achieved]\\n\\nEDUCATION\\nBachelor of Computer Science - University of Texas (2020) Austin, TX",
  
  "coverLetter": "September 21, 2025\\n\\nHiring Manager\\nCloudScale Technologies\\nAustin, TX\\n\\nDear Hiring Manager,\\n\\n[Paragraph 1: Interest + key transferable skills]\\n\\n[Paragraph 2: Problem-solving and leadership examples]\\n\\n[Paragraph 3: Cultural fit and role alignment]\\n\\n[Paragraph 4: Call to action and enthusiasm]\\n\\nSincerely,\\n\\nJohn Doe",
  
  "atsScore": "An integer 85-100 representing keyword alignment, skill matching, and overall quality. Score 90+ for well-tailored resumes, 95+ for exceptional alignment."
}

CRITICAL SUCCESS FACTORS:
- Every bullet point should answer "So what?" - show impact and relevance
- Transferable skills must be explicitly connected to job requirements
- Problem-solving and leadership should be evident throughout
- Zero errors - perfect spelling, grammar, and formatting
- Concise one-page resume that makes recruiter's job easy

--- JOB DESCRIPTION ---
${job.jobDescriptionText}

--- ORIGINAL RESUME ---
${job.originalResumeText}
`;

    // ✅ OPENAI API CALL - FIXED VERSION
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI career coach and professional resume writer. You MUST return valid JSON only, no other text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    const rawOutput = completion.choices[0]?.message?.content;

    if (!rawOutput) {
      throw new Error("OpenAI returned empty response");
    }

    // ✅ SAME PARSING LOGIC - NO CHANGES
    let aiOutput;
    try {
      let cleaned = rawOutput
        .replace(/^\s*```json\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      const jsonMatch = cleaned.match(/(\{[\s\S]*\})/);
      if (!jsonMatch) {
        throw new Error("No JSON object found in AI response");
      }

      aiOutput = JSON.parse(jsonMatch[0]);
    } catch (err) {
      console.error("❌ Failed to parse OpenAI response:", rawOutput);

      // Fallback parsing (same as your existing logic)
      try {
        const tailoredResumeMatch = rawOutput.match(
          /"tailoredResume"\s*:\s*"([\s\S]*?)"(?=,|\})/
        );
        const coverLetterMatch = rawOutput.match(
          /"coverLetter"\s*:\s*"([\s\S]*?)"(?=,|\})/
        );
        const atsScoreMatch = rawOutput.match(/"atsScore"\s*:\s*(\d+)/);

        if (tailoredResumeMatch && coverLetterMatch && atsScoreMatch) {
          aiOutput = {
            tailoredResume: tailoredResumeMatch[1].replace(/\\n/g, "\n"),
            coverLetter: coverLetterMatch[1].replace(/\\n/g, "\n"),
            atsScore: parseInt(atsScoreMatch[1]),
          };
        } else {
          throw new Error("Could not extract fields from AI response");
        }
      } catch (fallbackError) {
        return NextResponse.json(
          {
            message: "AI output could not be parsed, please try again.",
            rawOutput: rawOutput.substring(0, 500) + "...",
          },
          { status: 500 }
        );
      }
    }

    // ✅ SAME CLEANUP LOGIC - NO CHANGES
    let tailoredResumeText = (aiOutput.tailoredResume || "")
      .replace(/\\n/g, "\n")
      .replace(
        /^[*•\-–]\s*/gm,
        (match: string, offset: number, string: string) => {
          const before = string.substring(0, offset);
          return before.includes("SKILLS") ? match : "";
        }
      )
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[^\S\r\n]+/g, " ")
      .replace(/ +\n/g, "\n")
      .trim();

    // Force uppercase headers (compatible with content-parser)
    tailoredResumeText = tailoredResumeText.replace(
      /^(professional summary|summary|skills|experience|education|certifications|projects|contact)$/gim,
      (match: string) => match.toUpperCase()
    );

    // Additional cleanup for content-parser compatibility
    tailoredResumeText = tailoredResumeText
      .replace(/(SKILLS)\n([^A-Z])/g, "$1\n$2")
      .replace(/(PROJECTS)\n([^A-Z])/g, "$1\n$2")
      .replace(/(EXPERIENCE)\n([^A-Z])/g, "$1\n$2");

    // Clean cover letter
    const coverLetterText = (aiOutput.coverLetter || "")
      .replace(/^[*•\-–]\s*/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    // ✅ SAVE RESULTS based on user type
    if (isAnonymous) {
      // Save to AnonymousJob
      job.tailoredResumeText = tailoredResumeText;
      job.coverLetterText = coverLetterText;
      job.atsScore = aiOutput.atsScore || 0;
      await job.save();
    } else {
      // ✅ EXISTING: Save to Job and deduct credit
      job.tailoredResumeText = tailoredResumeText;
      job.coverLetterText = coverLetterText;
      job.atsScore = aiOutput.atsScore || 0;
      await job.save();

      // Deduct credit only for authenticated users
      if (user) {
        user.credits = Math.max(user.credits - 1, 0);
        await user.save();
      }
    }

    return NextResponse.json(
      {
        message: "Resume and cover letter tailored successfully",
        tailoredResume: tailoredResumeText,
        coverLetter: coverLetterText,
        atsScore: aiOutput.atsScore,
        isAnonymous: isAnonymous, // Return this to frontend
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
