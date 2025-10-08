// app/ai-resume-builder/page.tsx - UPDATED WITH JSON-LD
import type { Metadata } from "next";
import AIResumeBuilderClient from "./AIResumeBuilderClient";

// Define Metadata outside the component for SEO
export const metadata: Metadata = {
  title: "AI Resume Builder - Free ATS-Optimized Resume Generator 2024",
  description:
    "Free AI resume builder that tailors your resume to any job description. ATS-optimized templates, instant download, and professional formatting. Get more interviews.",
  keywords: [
    "AI resume builder",
    "free resume builder",
    "ATS resume",
    "resume tailor",
    "AI resume generator",
  ],
};

// JSON-LD Schema for AI Resume Builder
const resumeBuilderSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Resume Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  description:
    "Free AI-powered resume builder that tailors your resume to any job description with ATS-optimized templates and professional formatting",
  url: "https://www.resumetailorapp.com/ai-resume-builder",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "ResumeTailorApp",
  },
  featureList: [
    "AI-powered resume tailoring",
    "ATS-optimized templates",
    "Instant download",
    "Professional formatting",
    "Free to use",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
};

/**
 * Server component that only handles metadata and delegates rendering to the client component.
 * @returns The client component for the AI Resume Builder page.
 */
export default function AIResumeBuilderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resumeBuilderSchema),
        }}
      />
      <AIResumeBuilderClient />
    </>
  );
}
