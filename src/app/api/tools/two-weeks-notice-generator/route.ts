import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      employeeName,
      jobTitle,
      companyName,
      managerName,
      lastWorkingDay,
      letterType,
      reason,
      specificReason,
      offerTransitionHelp,
      includeGratitude,
    } = await req.json();

    const prompt = `
Create a professional two weeks notice resignation letter using EXACTLY this information:

EMPLOYEE: ${employeeName}
JOB TITLE: ${jobTitle}
COMPANY: ${companyName}
MANAGER: ${managerName}
LAST DAY: ${lastWorkingDay}
FORMAT: ${letterType}
REASON: ${reason} ${specificReason ? `- ${specificReason}` : ""}
HELP TRANSITION: ${offerTransitionHelp}
INCLUDE GRATITUDE: ${includeGratitude}

IMPORTANT: Use the ACTUAL information above. DO NOT use [brackets] or placeholders.

Generate a complete letter with:
- Current date
- Proper business letter format
- Clear resignation statement
- Appropriate tone for ${letterType}
- ${
      offerTransitionHelp === "Yes"
        ? "Offer to help with transition"
        : "No need to offer transition help"
    }
- ${
      includeGratitude === "Yes"
        ? "Include appreciation"
        : "No need for gratitude"
    }
- Professional closing

The letter should be ready to send immediately with all real information filled in.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an HR professional writing resignation letters.
          
          CRITICAL RULES:
          1. NEVER use placeholder text like [Name], [Company], or [Address]
          2. ALWAYS use the actual names and details provided
          3. Create complete letters with all information filled in
          4. Use proper business letter format with current date
          5. Make it ready to send immediately
          6. No explanations or additional text
          
          If you don't have address information, omit it rather than using placeholders.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    let noticeLetter = completion.choices[0]?.message?.content;

    if (!noticeLetter) {
      throw new Error("No content generated");
    }

    // Aggressive cleanup of any remaining placeholders
    noticeLetter = noticeLetter
      .replace(/\[.*?\]/g, "") // Remove all bracket placeholders
      .replace(/Your Name/g, employeeName)
      .replace(/Company Name/g, companyName)
      .replace(/Manager Name/g, managerName)
      .replace(/Job Title/g, jobTitle)
      .replace(/Employee Name/g, employeeName)
      .replace(/Manager's Name/g, managerName)
      .trim();

    return NextResponse.json({
      success: true,
      content: noticeLetter,
      metadata: {
        generatedAt: new Date().toISOString(),
        tool: "two-weeks-notice-generator",
        templateType: letterType,
      },
    });
  } catch (error) {
    console.error("Two weeks notice tool error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate two weeks notice",
        suggestion: "Please check your input and try again.",
      },
      { status: 500 }
    );
  }
}
