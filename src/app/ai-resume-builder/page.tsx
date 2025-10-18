// app/ai-resume-builder/page.tsx - ENHANCED
import type { Metadata } from "next";
import AIResumeBuilderClient from "./AIResumeBuilderClient";

export const metadata: Metadata = {
  title: "AI Resume Builder - Beat ATS & Get More Interviews (Free)",
  description:
    "🎯 Get Past Automated Screening - AI tailors your resume to any job description instantly. Recruiter-approved templates that get 3x more interviews. Free tool.",
  keywords: [
    "AI resume builder",
    "free resume builder",
    "ATS resume",
    "resume tailor",
    "AI resume generator",
    "resume maker",
  ],
};

// ENHANCED JSON-LD Schema for AI Resume Builder
const resumeBuilderSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Resume Builder",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  permissions: "Free",
  description:
    "Free AI-powered resume builder that tailors your resume to any job description with ATS-optimized templates and professional formatting",
  url: "https://www.resumetailorapp.com/ai-resume-builder",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free forever plan with instant access",
  },
  author: {
    "@type": "Organization",
    name: "ResumeTailorApp",
    url: "https://www.resumetailorapp.com",
  },
  featureList: [
    "AI-powered resume tailoring",
    "ATS-optimized templates",
    "Instant download",
    "Professional formatting",
    "Free to use",
    "Recruiter-approved designs",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1",
  },
  applicationSuite: "ResumeTailorApp",
};

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
