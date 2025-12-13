import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.resumetailorapp.com";
  // This automatically sets the date to "Right Now" when you build
  const lastModified = new Date();

  return [
    // -------------------------------------------------------------------------
    // 1. CORE LANDING PAGES
    // -------------------------------------------------------------------------
    {
      url: baseUrl,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-resume-builder`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cover-letter-generator`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-resume-templates`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // -------------------------------------------------------------------------
    // 2. AI TOOLS PAGES (High Priority)
    // -------------------------------------------------------------------------
    {
      url: `${baseUrl}/tools/biodata-format-generator`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/two-weeks-notice-generator`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/skills-section-generator`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/maternity-leave-letter-generator`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/high-school-resume-examples`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/resignation-letter-generator`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // -------------------------------------------------------------------------
    // 3. BLOG: NEW GROWTH POSTS (All 10 Growth Posts)
    // -------------------------------------------------------------------------

    // --- Batch 2 (The 5 Newest) ---
    {
      url: `${baseUrl}/blog/resume-writer-vs-ai-resume-builder-2026`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-list-projects-and-freelance-work-on-resume-2026`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-tailor-resume-for-remote-jobs-2026`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/common-resume-mistakes-to-avoid-2026`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/career-change-resume-guide-pivot-industries-2026`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // --- Batch 1 (The Previous 5) ---
    {
      url: `${baseUrl}/blog/best-resume-formats-2026-chronological-vs-functional-vs-hybrid`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-explain-employment-gaps-on-your-resume-in-2026-ai-examples`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/ai-resume-bullet-point-generator-2026`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/what-skills-to-put-on-a-resume-in-2026-based-on-job-role-industry`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/resume-keywords-101-how-to-use-keywords-to-beat-the-ats-2026`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // -------------------------------------------------------------------------
    // 4. BLOG: REVIVED POSTS (The 5 Old Ones)
    // -------------------------------------------------------------------------
    {
      url: `${baseUrl}/blog`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/ats-resume-checklist-10-things-recruiters-look-for-2025`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-tailor-your-resume-to-any-job-description-expert-tips-to-land-more-interviews`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/free-resume-templates-that-get-interviews-2025`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/ai-resume-builder-vs-traditional-methods-resumetailorapp-gets-3x-more-interviews`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/ai-resume-builder-guide-2025`,
      lastModified: lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // -------------------------------------------------------------------------
    // 5. LEGAL PAGES
    // -------------------------------------------------------------------------
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
