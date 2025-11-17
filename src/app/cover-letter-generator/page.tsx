// app/cover-letter-generator/page.tsx - UPDATED SEO VERSION
import type { Metadata } from "next";
import CoverLetterGeneratorClient from "./CoverLetterGeneratorClient";

// -----------------------------
// SEO Metadata
// -----------------------------
export const metadata: Metadata = {
  title:
    "AI Cover Letter Generator - Create a Professional Cover Letter in 2 Minutes",
  description:
    "Generate a tailored, professional cover letter instantly. AI adds company addressing, hiring manager details, polished formatting, and a professional signature. 100% ATS-optimized.",
  keywords: [
    "AI cover letter generator",
    "cover letter writer",
    "professional cover letters",
    "free cover letter generator",
    "cover letter maker",
    "ATS cover letter",
    "cover letter with company address",
    "hire-winning cover letters",
    "cover letter and resume generator",
  ],
  openGraph: {
    title: "AI Cover Letter Generator - Professional Letters in 2 Minutes",
    description:
      "Create a tailored, ATS-optimized cover letter instantly with AI. Includes company addressing, hiring manager details, and a polished signature.",
    type: "website",
    url: "https://www.resumetailorapp.com/cover-letter-generator",
    images: [
      {
        url: "/og/cover-letter-generator.png",
        width: 1200,
        height: 630,
        alt: "AI Cover Letter Generator by ResumeTailorApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Cover Letter Generator - Free & Professional",
    description:
      "Generate tailored cover letters in minutes. Free, fast, ATS-optimized, company-formatted cover letters.",
    images: ["/og/cover-letter-generator.png"],
  },
};

// -----------------------------
// JSON-LD Schema
// -----------------------------
const coverLetterSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Cover Letter Generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  permissions: "Free",
  description:
    "AI-powered cover letter generator that instantly creates tailored, ATS-optimized cover letters with correct formatting, company addressing, and professional signatures.",
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
    "Company name & hiring manager addressing",
    "Professional signature formatting",
    "ATS-optimized structure",
    "Instant 2-minute generation",
    "Free unlimited use",
  ],
  applicationSuite: "ResumeTailorApp",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
};

// -----------------------------
// Page Component
// -----------------------------
export default function CoverLetterGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(coverLetterSchema),
        }}
      />
      <CoverLetterGeneratorClient />
    </>
  );
}
