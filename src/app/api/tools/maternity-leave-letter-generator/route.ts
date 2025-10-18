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
      managerName,
      dueDate,
      startDate,
      expectedDuration,
      jobTitle,
      letterType,
      handoverPlan,
      contactDuringLeave,
      additionalNotes,
    } = await req.json();

    const prompt = `
Create a professional maternity leave letter using EXACTLY the information provided below. DO NOT use placeholder text like [Company Name] or [Your Name] - use the actual details provided.

EMPLOYEE INFORMATION:
- Employee Name: ${employeeName}
- Job Title: ${jobTitle}
- Company Name: ${companyName}
- Manager Name: ${managerName}
- Due Date: ${dueDate}
- Leave Start Date: ${startDate}
- Expected Duration: ${expectedDuration}
- Handover Plan: ${handoverPlan || "Will ensure smooth transition before leave"}
- Contact Preference: ${contactDuringLeave || "Fully offline"}
- Additional Notes: ${additionalNotes || "None provided"}
- Letter Type: ${letterType}

CRITICAL INSTRUCTIONS:
1. USE THE ACTUAL NAMES AND DETAILS PROVIDED - no placeholder text
2. Format as a professional business letter
3. Include proper date (use current date format)
4. Use appropriate tone for the letter type
5. Include all key information: dates, duration, handover plans
6. Specify communication boundaries
7. End with professional closing and signature
8. DO NOT add any explanations or concluding statements

Generate the complete letter using the actual information provided.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an HR professional writing maternity leave letters. 
          CRITICAL RULES:
          1. ALWAYS use the actual names and details provided - NEVER use placeholder text like [Name] or [Company]
          2. Create complete, ready-to-use letters with all real information filled in
          3. Use proper business letter format with current date
          4. Stop after the signature - no additional text
          5. Make it professional and polished`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    let letter = completion.choices[0]?.message?.content;

    if (!letter) {
      throw new Error("No content generated");
    }

    // Clean up any placeholder text that might still be there
    letter = letter
      .replace(/\[.*?\]/g, "") // Remove any bracket placeholders
      .replace(/Your Name/g, employeeName)
      .replace(/Company Name/g, companyName)
      .replace(/Manager Name/g, managerName)
      .replace(/Job Title/g, jobTitle)
      .trim();

    return NextResponse.json({
      success: true,
      content: letter,
      metadata: {
        generatedAt: new Date().toISOString(),
        tool: "maternity-leave-letter-generator",
        version: "2.1",
      },
    });
  } catch (error) {
    console.error("Maternity leave tool error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate maternity leave letter",
        suggestion: "Please check your input and try again.",
      },
      { status: 500 }
    );
  }
}
