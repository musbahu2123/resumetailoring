export const toolsConfig = {
  "biodata-format-generator": {
    id: "biodata-format-generator",
    name: "Biodata Format Generator",
    description:
      "Create professional, ATS-optimized biodata formats instantly with AI",
    meta: {
      title: "AI Biodata Format Generator - Free Professional Templates 2025",
      description:
        "Create ATS-optimized biodata formats instantly with AI. Professional templates for job applications in South Asia and globally. Free download.",
    },
    inputs: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      {
        name: "jobTitle",
        label: "Current Job Title",
        type: "text",
        required: false,
      },
      { name: "location", label: "Location", type: "text", required: false },
      {
        name: "experience",
        label: "Work Experience",
        type: "textarea",
        required: true,
      },
      {
        name: "education",
        label: "Education",
        type: "textarea",
        required: true,
      },
      { name: "skills", label: "Key Skills", type: "textarea", required: true },
      {
        name: "additionalInfo",
        label: "Additional Information (Certifications, Awards, etc.)",
        type: "textarea",
        required: false,
      },
    ],
    apiEndpoint: "/api/tools/biodata-format-generator",
  },

  "two-weeks-notice-generator": {
    id: "two-weeks-notice-generator",
    name: "Two Weeks Notice Generator",
    description:
      "Create professional resignation letters with proper notice period for any situation",
    meta: {
      title:
        "Two Weeks Notice Generator - Professional Resignation Letter Templates 2025",
      description:
        "Generate professional two weeks notice letters instantly. 4 template types: Simple, Professional, Formal, and Email formats. HR-approved and ready to send.",
    },
    inputs: [
      {
        name: "employeeName",
        label: "Your Full Name",
        type: "text",
        required: true,
      },
      {
        name: "jobTitle",
        label: "Your Job Title",
        type: "text",
        required: true,
      },
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      {
        name: "managerName",
        label: "Manager's Name",
        type: "text",
        required: true,
      },
      {
        name: "lastWorkingDay",
        label: "Last Working Day",
        type: "text",
        required: true,
      },
      {
        name: "letterType",
        label: "Letter Format",
        type: "select",
        options: [
          "Simple & Direct",
          "Professional & Appreciative",
          "Formal & Traditional",
          "Email Format",
        ],
        required: true,
      },
      {
        name: "reason",
        label: "Reason for Leaving",
        type: "select",
        options: [
          "New job opportunity",
          "Career change",
          "Personal reasons",
          "Relocation",
          "Further education",
          "Not specified",
        ],
        required: false,
      },
      {
        name: "specificReason",
        label: "Specific Reason Details (Optional)",
        type: "textarea",
        required: false,
      },
      {
        name: "offerTransitionHelp",
        label: "Offer Transition Help?",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
      {
        name: "includeGratitude",
        label: "Include Gratitude?",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
    ],
    apiEndpoint: "/api/tools/two-weeks-notice-generator",
  },

  "skills-section-generator": {
    id: "skills-section-generator",
    name: "Skills Section Generator",
    description:
      "Generate professional skills sections tailored to your target job",
    meta: {
      title: "AI Skills Section Generator - Resume Skills Builder",
      description:
        "Create ATS-optimized skills sections for your resume. AI-powered skill recommendations based on your experience.",
    },
    inputs: [
      {
        name: "targetJob",
        label: "Target Job Title",
        type: "text",
        required: true,
      },
      {
        name: "experience",
        label: "Your Experience Level",
        type: "select",
        options: ["Entry Level", "Mid Level", "Senior Level"],
        required: true,
      },
      { name: "industry", label: "Industry", type: "text", required: true },
      {
        name: "currentSkills",
        label: "Your Current Skills",
        type: "textarea",
        required: true,
      },
    ],
    apiEndpoint: "/api/tools/skills-section-generator",
  },

  "maternity-leave-letter-generator": {
    id: "maternity-leave-letter-generator",
    name: "Maternity Leave Letter Generator",
    description:
      "Create professional maternity leave application letters for any situation",
    meta: {
      title: "Maternity Leave Letter Generator - Professional Templates 2025",
      description:
        "Generate professional maternity leave letters instantly. Proper formatting, legally compliant, and HR-approved templates for all scenarios.",
    },
    inputs: [
      {
        name: "employeeName",
        label: "Your Full Name",
        type: "text",
        required: true,
      },
      {
        name: "jobTitle",
        label: "Your Job Title",
        type: "text",
        required: true,
      },
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      {
        name: "managerName",
        label: "Manager's Name",
        type: "text",
        required: true,
      },
      { name: "dueDate", label: "Due Date", type: "text", required: true },
      {
        name: "startDate",
        label: "Leave Start Date",
        type: "text",
        required: true,
      },
      {
        name: "expectedDuration",
        label: "Expected Duration",
        type: "text",
        required: true,
      },
      {
        name: "letterType",
        label: "Letter Type",
        type: "select",
        options: [
          "Standard Request to Employer",
          "Detailed Letter to Manager",
          "Notification to Colleagues",
          "Notification to Clients",
          "Teacher's Maternity Leave",
          "Early Maternity Leave",
          "Leave Extension Request",
          "Resignation After Leave",
        ],
        required: true,
      },
      {
        name: "handoverPlan",
        label: "Handover Plan (optional)",
        type: "textarea",
        required: false,
      },
      {
        name: "contactDuringLeave",
        label: "Contact During Leave",
        type: "select",
        options: [
          "Fully offline",
          "Available for emergencies",
          "Checking emails occasionally",
        ],
        required: false,
      },
      {
        name: "additionalNotes",
        label: "Additional Notes (optional)",
        type: "textarea",
        required: false,
      },
    ],
    apiEndpoint: "/api/tools/maternity-leave-letter-generator",
  },

  "high-school-resume-examples": {
    id: "high-school-resume-examples",
    name: "High School Resume Maker",
    description:
      "Create professional resumes for students with little or no work experience",
    meta: {
      title: "High School Resume Examples - Student Resume Builder 2025",
      description:
        "Generate professional resumes for high school students. Perfect for first jobs, internships, college applications, and scholarships. ATS-friendly templates.",
    },
    inputs: [
      {
        name: "studentName",
        label: "Student Name",
        type: "text",
        required: true,
      },
      { name: "school", label: "High School", type: "text", required: true },
      {
        name: "graduationYear",
        label: "Graduation Year",
        type: "text",
        required: true,
      },
      { name: "gpa", label: "GPA (Optional)", type: "text", required: false },
      {
        name: "targetJob",
        label: "Target Job/Internship",
        type: "text",
        required: false,
      },
      {
        name: "extracurriculars",
        label: "Extracurricular Activities",
        type: "textarea",
        required: true,
      },
      {
        name: "volunteerWork",
        label: "Volunteer Work",
        type: "textarea",
        required: false,
      },
      {
        name: "skills",
        label: "Skills & Abilities",
        type: "textarea",
        required: true,
      },
      {
        name: "relevantCoursework",
        label: "Relevant Coursework",
        type: "textarea",
        required: false,
      },
      {
        name: "awards",
        label: "Awards & Honors",
        type: "textarea",
        required: false,
      },
      {
        name: "contactInfo",
        label: "Contact Information",
        type: "textarea",
        required: false,
      },
    ],
    apiEndpoint: "/api/tools/high-school-resume-examples",
  },
  "resignation-letter-generator": {
    id: "resignation-letter-generator",
    name: "Resignation Letter Generator",
    description: "Create professional resignation letters for any situation",
    meta: {
      title:
        "Resignation Letter Generator - Professional Quitting Letter Templates 2025",
      description:
        "Generate professional resignation letters instantly. Maintain positive relationships with proper notice and appropriate tone for any situation.",
    },
    inputs: [
      {
        name: "employeeName",
        label: "Your Full Name",
        type: "text",
        required: true,
      },
      {
        name: "position",
        label: "Your Position",
        type: "text",
        required: true,
      },
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        required: true,
      },
      {
        name: "managerName",
        label: "Manager's Name",
        type: "text",
        required: false,
      },
      {
        name: "lastDay",
        label: "Last Working Day",
        type: "text",
        required: true,
      },
      {
        name: "tone",
        label: "Letter Tone",
        type: "select",
        options: ["Professional", "Friendly", "Formal"],
        required: true,
      },
      {
        name: "reason",
        label: "Reason for Leaving",
        type: "select",
        options: [
          "New job opportunity",
          "Career change",
          "Personal reasons",
          "Relocation",
          "Further education",
          "Health reasons",
          "Pursuing new opportunities",
        ],
        required: false,
      },
      {
        name: "specificReason",
        label: "Specific Reason Details (Optional)",
        type: "textarea",
        required: false,
      },
      {
        name: "offerHelp",
        label: "Offer Transition Help?",
        type: "select",
        options: ["Yes", "No"],
        required: true,
      },
    ],
    apiEndpoint: "/api/tools/resignation-letter-generator",
  },
} as const;
