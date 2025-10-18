// app/cover-letter-generator/page.tsx - ENHANCED
import type { Metadata } from "next";
import CoverLetterGeneratorClient from "./CoverLetterGeneratorClient";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator - Professional Letters in 2 Minutes",
  description:
    "📝 Hire-Winning Cover Letters - AI writes personalized letters with company addressing & signatures. Beat ATS systems & impress hiring managers. Free tool.",
  keywords: [
    "AI cover letter generator",
    "cover letter writer",
    "professional cover letters",
    "free cover letter generator",
    "cover letter maker",
    "ATS cover letter",
  ],
};

// ENHANCED JSON-LD Schema for Cover Letter Generator
const coverLetterSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Cover Letter Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  permissions: "Free",
  description:
    "Free AI-powered cover letter generator that creates professional, tailored cover letters with company-specific addressing and ATS-optimized formatting",
  url: "https://www.resumetailorapp.com/cover-letter-generator",
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
    "AI-powered cover letter writing",
    "Company-specific addressing",
    "Professional signature formatting",
    "ATS-optimized structure",
    "Instant 2-minute generation",
    "Free unlimited use",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "890",
    bestRating: "5",
    worstRating: "1",
  },
  applicationSuite: "ResumeTailorApp",
};

export default function CoverLetterGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coverLetterSchema) }}
      />
      <CoverLetterGeneratorClient />
    </>
  );
}
