// src/app/api/enhance-resume/route.ts (NEW FILE)
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/auth";
import User from "@/models/user";
import AnonymousJob from "@/models/AnonymousJob";
import dbConnect from "@/lib/dbConnect";

// Initialize OpenAI client (same as your existing route)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    await dbConnect();

    const { resumeText, anonymousId } = await req.json();

    if (!resumeText) {
      return NextResponse.json(
        { message: "Resume text is required" },
        { status: 400 }
      );
    }

    let isAnonymous = false;
    let user = null;

    // ✅ Handle authentication (same pattern as your existing route)
    if (!session || !session.user) {
      if (!anonymousId) {
        return NextResponse.json(
          { message: "Anonymous ID required for free generation" },
          { status: 400 }
        );
      }

      // Check if anonymous user already used their free credit
      const existingCompletedJob = await AnonymousJob.findOne({
        sessionId: anonymousId,
        tailoredResumeText: { $exists: true, $ne: "" },
      });

      if (existingCompletedJob) {
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
      // ✅ Logged-in user flow
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

    // ✅ AI Enhancement Prompt (Based on your Google recruiter insights)
    const model = "gpt-4-turbo";

    const prompt = `
You are an expert AI career coach and professional resume writer with 25+ years of recruiting experience at top tech companies like Google. 
Your mission is to ENHANCE and OPTIMIZE the provided resume content using professional recruiting standards.

CRITICAL RECRUITER INSIGHTS (from Google Recruiting Lead):
1. ZERO TOLERANCE FOR ERRORS - No typos, grammar errors, or formatting inconsistencies
2. CONCISE & FOCUSED - Lengthy resumes are red flags; keep it to one page
3. EMPHASIZE PROBLEM-SOLVING - How you tackled challenges, what you did differently, lessons learned
4. DEMONSTRATE LEADERSHIP - Not just management, but how you show up daily (sports, university, projects)
5. QUANTIFY ACHIEVEMENTS - Use metrics to show impact whenever possible
6. INCLUDE NON-TRADITIONAL BACKGROUNDS - Athletic achievements, personal projects, volunteer work

RESUME FORMATTING RULES (Strict Compliance):
1. Start with the person's name as main header (e.g., "JOHN DOE")
2. Use exact section headers: CONTACT, PROFESSIONAL SUMMARY, SKILLS, EXPERIENCE, PROJECTS, EDUCATION
3. EXPERIENCE section: Use " - " bullet points focusing on problem-solving and leadership
4. PROJECTS section: Use " - " bullet points highlighting technical implementation
5. SKILLS section: COMMA-SEPARATED format ONLY (no bullets, no pipes, no tables)
6. No markdown, no JSON, no colons as bullets, no asterisks
7. Include ALL contact information from original resume
8. Maximum one page - be ruthless about conciseness

ENHANCEMENT FOCUS AREAS:
- PROFESSIONAL SUMMARY: Create 2-3 line compelling summary if missing
- EXPERIENCE BULLETS: Transform into problem-solving focused statements with metrics
- SKILLS: Organize and prioritize relevant technical and soft skills
- PROJECTS: Emphasize technical depth and business impact
- ACHIEVEMENTS: Add quantifiable results wherever possible
- LEADERSHIP: Highlight leadership examples (formal or informal)

PROBLEM-SOLVING & LEADERSHIP TRANSFORMATION:
For each experience bullet point, transform it to answer:
- What problem did I solve? How did I approach it differently?
- What metrics can quantify my impact?
- How did I demonstrate leadership (formal or informal)?
- What did I learn from this experience?

The response MUST be a JSON object with exactly this structure:
{
  "tailoredResume": "JOHN DOE\\n\\nCONTACT\\njohn.doe@email.com | (555) 987-6543 | Austin, TX | LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe\\n\\nPROFESSIONAL SUMMARY\\n[2-3 line enhanced summary emphasizing problem-solving and leadership]\\n\\nSKILLS\\nReact, TypeScript, Node.js, AWS, RESTful APIs, Microservices, Docker, Kubernetes, SQL, MongoDB, JavaScript, HTML, CSS\\n\\nEXPERIENCE\\nWeb Developer - TechSolutions Inc. (2021-Present) Austin, TX\\n - [Enhanced problem-solving achievement with metrics]\\n - [Enhanced leadership example and impact]\\n - [Enhanced technical accomplishment]\\n\\nJunior Developer - StartupGrid (2020-2021) Remote\\n - [Enhanced problem-solving achievement]\\n - [Enhanced leadership/initiative example]\\n\\nPROJECTS\\nPersonal Budget App\\n - [Enhanced technical implementation detail]\\n - [Enhanced problem solved or result achieved]\\n\\nEDUCATION\\nBachelor of Computer Science - University of Texas (2020) Austin, TX",
  
  "atsScore": "An integer 85-100 representing resume quality, formatting, and professional standards. Score 90+ for well-structured resumes, 95+ for exceptional content."
}

CRITICAL SUCCESS FACTORS:
- Every bullet point should answer "So what?" - show impact and relevance
- Problem-solving and leadership should be evident throughout
- Zero errors - perfect spelling, grammar, and formatting
- Concise one-page resume that makes recruiter's job easy

--- ORIGINAL RESUME TO ENHANCE ---
${resumeText}
`;

    // ✅ OpenAI API Call
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

    // ✅ Parse AI Response (same logic as your existing route)
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

      // Fallback parsing
      try {
        const tailoredResumeMatch = rawOutput.match(
          /"tailoredResume"\s*:\s*"([\s\S]*?)"(?=,|\})/
        );
        const atsScoreMatch = rawOutput.match(/"atsScore"\s*:\s*(\d+)/);

        if (tailoredResumeMatch && atsScoreMatch) {
          aiOutput = {
            tailoredResume: tailoredResumeMatch[1].replace(/\\n/g, "\n"),
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

    // ✅ Clean up resume text (same as your existing route)
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

    // ✅ Save results for anonymous users (same pattern as your existing route)
    if (isAnonymous) {
      const anonymousJob = new AnonymousJob({
        sessionId: anonymousId,
        originalResumeText: resumeText,
        tailoredResumeText: tailoredResumeText,
        atsScore: aiOutput.atsScore || 0,
        createdAt: new Date(),
      });
      await anonymousJob.save();
    } else {
      // Deduct credit only for authenticated users
      if (user) {
        user.credits = Math.max(user.credits - 1, 0);
        await user.save();
      }
    }

    return NextResponse.json(
      {
        message: "Resume enhanced successfully",
        tailoredResume: tailoredResumeText,
        coverLetter: "", // Empty cover letter for standalone enhancement
        atsScore: aiOutput.atsScore,
        isAnonymous: isAnonymous,
        hasCoverLetter: false, // Important: No cover letter for standalone
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
