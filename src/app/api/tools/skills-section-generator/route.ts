import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { targetJob, experience, industry, currentSkills } = await req.json();

    const prompt = `
Create a professional skills section for a resume using EXACTLY this information:

TARGET JOB: ${targetJob}
EXPERIENCE LEVEL: ${experience}
INDUSTRY: ${industry}
CURRENT SKILLS: ${currentSkills}

CRITICAL REQUIREMENTS:
1. Use ACTUAL job title and industry provided
2. Generate 8-12 relevant skills
3. Mix of technical and soft skills
4. ATS-optimized keywords
5. Industry-specific terminology
6. Categorized format (Technical Skills, Soft Skills, etc.)
7. NO asterisks, dashes, or bullet points
8. Clean comma-separated format
9. Ready to copy-paste into resume
10. NO explanations or additional text

Generate ONLY the skills section content.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a professional resume writer creating skills sections.
          
          CRITICAL RULES:
          1. Use ACTUAL job titles and industries provided
          2. Create categorized skills lists
          3. NO markdown, asterisks, dashes, or bullet points
          4. Use clean comma-separated format within categories
          5. Include both hard and soft skills
          6. ATS-optimized keywords
          7. Ready to use immediately
          8. NO explanations or additional text`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 400,
    });

    let skills = completion.choices[0]?.message?.content;

    if (!skills) {
      throw new Error("No content generated");
    }

    // Clean up any markdown or symbols
    skills = skills
      .replace(/\*\*/g, "") // Remove bold
      .replace(/\*/g, "") // Remove asterisks
      .replace(/- /g, "") // Remove dashes
      .replace(/• /g, "") // Remove bullets
      .replace(/\[.*?\]/g, "") // Remove brackets
      .trim();

    return NextResponse.json({
      success: true,
      content: skills,
      metadata: {
        generatedAt: new Date().toISOString(),
        tool: "skills-section-generator",
        version: "2.0",
      },
    });
  } catch (error) {
    console.error("Skills section tool error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate skills section",
        suggestion: "Please check your input and try again.",
      },
      { status: 500 }
    );
  }
}
