import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      employeeName,
      companyName,
      position,
      lastDay,
      reason,
      tone,
      managerName,
      offerHelp,
    } = await req.json();

    const prompt = `
Create a professional resignation letter using EXACTLY this information:

EMPLOYEE: ${employeeName}
POSITION: ${position}
COMPANY: ${companyName}
MANAGER: ${managerName || "Hiring Manager"}
LAST DAY: ${lastDay}
REASON: ${reason || "Pursuing new opportunities"}
TONE: ${tone}
OFFER HELP: ${offerHelp || "Yes"}

CRITICAL REQUIREMENTS:
1. Use ACTUAL names and details - no placeholders
2. Professional business letter format
3. Clear resignation statement with last working day
4. Appropriate tone: ${tone}
5. Express gratitude for the opportunity
6. ${
      offerHelp === "Yes"
        ? "Offer transition assistance"
        : "No need to offer help"
    }
7. Professional closing and signature
8. Ready to send immediately
9. NO explanations or additional text

Generate ONLY the resignation letter content.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an HR professional writing resignation letters.
          
          CRITICAL RULES:
          1. Use ACTUAL information provided - no placeholders like [Name] or [Company]
          2. Create professional business letters ready to send
          3. Match the specified tone (Professional, Friendly, Formal)
          4. Include clear resignation statement with dates
          5. Express appropriate gratitude
          6. Offer transition help if requested
          7. Stop after signature - no explanations
          8. Ready to use immediately`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    let letter = completion.choices[0]?.message?.content;

    if (!letter) {
      throw new Error("No content generated");
    }

    // Clean up any placeholders
    letter = letter
      .replace(/\[.*?\]/g, "")
      .replace(/Your Name/g, employeeName)
      .replace(/Company Name/g, companyName)
      .replace(/Manager Name/g, managerName || "Hiring Manager")
      .replace(/Position Title/g, position)
      .trim();

    return NextResponse.json({
      success: true,
      content: letter,
      metadata: {
        generatedAt: new Date().toISOString(),
        tool: "resignation-letter-generator",
        version: "2.0",
      },
    });
  } catch (error) {
    console.error("Resignation letter tool error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate resignation letter",
        suggestion: "Please check your input and try again.",
      },
      { status: 500 }
    );
  }
}
