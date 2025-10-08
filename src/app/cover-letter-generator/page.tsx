// app/cover-letter-generator/page.tsx - UPDATED WITH JSON-LD
import type { Metadata } from "next";
import CoverLetterGeneratorClient from "./CoverLetterGeneratorClient";

export const metadata: Metadata = {
  title: "AI Cover Letter Generator - Free Professional Cover Letter Writer",
  description:
    "Free AI cover letter generator. Create professional, tailored cover letters with company addressing and signatures. ATS-optimized templates in minutes.",
  keywords: [
    "AI cover letter generator",
    "cover letter writer",
    "professional cover letters",
    "free cover letter generator",
  ],
};

// JSON-LD Schema for Cover Letter Generator
const coverLetterSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Cover Letter Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  description:
    "Free AI-powered cover letter generator that creates professional, tailored cover letters with company-specific addressing and ATS-optimized formatting",
  url: "https://www.resumetailorapp.com/cover-letter-generator",
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
    "AI-powered cover letter writing",
    "Company-specific tailoring",
    "Professional formatting",
    "ATS optimization",
    "Instant generation",
    "Free to use",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    ratingCount: "890",
  },
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
