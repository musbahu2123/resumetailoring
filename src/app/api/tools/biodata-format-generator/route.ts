import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      fullName,
      experience,
      education,
      skills,
      jobTitle,
      location,
      additionalInfo,
    } = await req.json();

    const prompt = `
Transform the following raw candidate information into a professional, well-structured biodata. 

RAW INPUT DATA:
- Candidate: ${fullName}
- Desired Role: ${jobTitle || "Not specified"}
- Location: ${location || "Not specified"}
- Experience Details: ${experience}
- Education Background: ${education}
- Skills List: ${skills}
- Additional Information: ${additionalInfo || "None provided"}

TASK:
1. EXPAND experience into specific achievements and responsibilities.
2. ENHANCE education with proper academic details.
3. ORGANIZE skills into logical categories.
4. WRITE a compelling professional summary.
5. FORMAT everything cleanly and professionally.

STRUCTURE REQUIRED:

PERSONAL DETAILS:
- Full professional presentation of name and contact information
- Include location and professional title

PROFESSIONAL SUMMARY:
- 3-4 lines summarizing career achievements and expertise

WORK EXPERIENCE:
- Expand the experience into proper job entries
- 3-4 bullet points per role with measurable results

EDUCATION:
- Academic format with institution, degree, and details

SKILLS:
- Categorize and expand as needed

ADDITIONAL INFORMATION:
- Certifications, awards, languages, or other relevant details

FORMATTING RULES:
- Plain text only, NO markdown
- CAPITALIZED section headings
- Blank line between sections
- Use hyphen bullet points
- End your response IMMEDIATELY after the biodata
- DO NOT add any explanations, reflections, or notes after biodata.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a world-class resume writer and career coach.
You must output ONLY the final formatted biodata. 
Do NOT add any additional commentary, explanation, reflection, or marketing language after the biodata. 
Do not include phrases like "Enhancing this biodata" or "This biodata highlights...".
Your output must end cleanly after the last section.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.75,
      max_tokens: 2500,
    });

    let biodata = completion.choices[0]?.message?.content || "";

    // 🧹 CLEANUP — remove any trailing commentary
    // Common patterns like “Enhancing ...” or “This biodata ...”
    biodata = biodata
      .replace(/(Enhancing|This biodata|This resume|Overall).*$/gis, "")
      .trim();

    // Optionally cut off anything after the ADDITIONAL INFORMATION section
    const lastSection = biodata.lastIndexOf("ADDITIONAL INFORMATION");
    if (lastSection !== -1) {
      // Find first double line break after additional info
      const after = biodata.indexOf("\n\n", lastSection);
      if (after !== -1) {
        biodata = biodata.substring(0, after).trim();
      }
    }

    if (!biodata) {
      throw new Error("No content generated");
    }

    return NextResponse.json({
      success: true,
      content: biodata,
      metadata: {
        generatedAt: new Date().toISOString(),
        tool: "biodata-format-generator",
        version: "3.0",
      },
    });
  } catch (error) {
    console.error("Biodata tool error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate biodata",
        suggestion:
          "Please check your input and try again. If the issue persists, contact support.",
      },
      { status: 500 }
    );
  }
}
