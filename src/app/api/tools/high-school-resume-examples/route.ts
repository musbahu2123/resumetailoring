import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      studentName,
      school,
      graduationYear,
      extracurriculars,
      volunteerWork,
      skills,
      gpa,
      targetJob,
      relevantCoursework,
      awards,
      contactInfo,
    } = await req.json();

    const prompt = `
Create a professional high school student resume based on ResumeGenius.com's proven templates.

STUDENT INFORMATION:
- Name: ${studentName}
- High School: ${school}
- Graduation Year: ${graduationYear}
- GPA: ${gpa || "Not specified"}
- Target Position: ${targetJob || "First job or internship"}
- Extracurricular Activities: ${extracurriculars}
- Volunteer Experience: ${volunteerWork || "None provided"}
- Skills: ${skills}
- Relevant Coursework: ${relevantCoursework || "Not specified"}
- Awards/Honors: ${awards || "None provided"}
- Contact Info: ${contactInfo || "Email and phone only"}

RESUME STRUCTURE REQUIREMENTS:
1. CONTACT INFORMATION
   - Student name, email, phone
   - Location (city, state)

2. RESUME OBJECTIVE
   - 2-3 sentences highlighting key skills and career goals
   - Tailored to target position if specified
   - Include GPA if provided

3. EDUCATION
   - High school name and graduation year
   - GPA if provided
   - Relevant coursework
   - Awards/honors

4. EXPERIENCE (Volunteer/Extracurricular)
   - Focus on transferable skills
   - Use action verbs (Organized, Led, Created, etc.)
   - Show impact and achievements
   - Include dates where possible

5. SKILLS SECTION
   - Categorize skills (Technical, Soft Skills, Languages)
   - Include both hard and soft skills
   - Focus on transferable abilities

6. EXTRACURRICULAR ACTIVITIES
   - Detail leadership roles and responsibilities
   - Show time commitment and achievements

CRITICAL REQUIREMENTS:
- Use ACTUAL information provided - no placeholders
- Professional, ATS-friendly format
- Focus on transferable skills and achievements
- One page maximum
- Ready to use immediately
- NO explanations or additional text

Generate a complete, professional high school resume.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a career counselor specializing in student resumes.
          
          CRITICAL RULES:
          1. Create professional high school resumes based on ResumeGenius.com templates
          2. Use ACTUAL information provided - no placeholders
          3. Focus on transferable skills and achievements
          4. Include resume objective, education, experience, skills, and activities
          5. Use action verbs and quantify achievements where possible
          6. Make it ATS-friendly and one page
          7. Ready to use immediately - no explanations`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    let resume = completion.choices[0]?.message?.content;

    if (!resume) {
      throw new Error("No content generated");
    }

    // Clean up any placeholders
    resume = resume
      .replace(/\[.*?\]/g, "")
      .replace(/Your Name/g, studentName)
      .replace(/School Name/g, school)
      .trim();

    return NextResponse.json({
      success: true,
      content: resume,
      metadata: {
        generatedAt: new Date().toISOString(),
        tool: "high-school-resume-examples",
        version: "2.0",
      },
    });
  } catch (error) {
    console.error("High school resume tool error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate high school resume",
        suggestion: "Please check your input and try again.",
      },
      { status: 500 }
    );
  }
}
