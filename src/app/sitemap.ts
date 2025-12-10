import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.resumetailorapp.com";

  return [
    // Core Pages
    {
      url: baseUrl,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ai-resume-builder`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cover-letter-generator`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-resume-templates`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // AI Tools Pages (HIGH PRIORITY)
    {
      url: `${baseUrl}/tools/biodata-format-generator`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/two-weeks-notice-generator`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/skills-section-generator`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/maternity-leave-letter-generator`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/high-school-resume-examples`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools/resignation-letter-generator`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Blog Section
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Individual Blog Posts (MEDIUM-HIGH PRIORITY)
    {
      url: `${baseUrl}/blog/ats-resume-checklist-10-things-recruiters-look-for-2025`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-tailor-your-resume-to-any-job-description-expert-tips-to-land-more-interviews`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/free-resume-templates-that-get-interviews-2025`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/ai-resume-builder-vs-traditional-methods-resumetailorapp-gets-3x-more-interviews`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/ai-resume-builder-guide-2025`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // Legal Pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date("2025-12-10"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
