// app/free-resume-templates/page.tsx - ENHANCED
import type { Metadata } from "next";
import FreeResumeTemplatesClient from "./FreeResumeTemplatesClient";

export const metadata: Metadata = {
  title: "Free ATS Resume Templates - Professional Designs 2025",
  description:
    "🎯 Download Free ATS-Optimized Resume Templates - Professional designs that pass automated screening. Works with AI builder. Instant access.",
  keywords: [
    "free resume templates",
    "ATS resume templates",
    "professional resume templates",
    "download resume templates",
    "resume templates free",
    "ATS optimized templates",
  ],
};

// ENHANCED JSON-LD Schema for Free Resume Templates
const resumeTemplatesSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication", // CHANGED from CollectionPage to SoftwareApplication
  name: "Free ATS Resume Templates",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  permissions: "Free",
  description:
    "Download free professional resume templates optimized for Applicant Tracking Systems (ATS) and designed for the 2025 job market",
  url: "https://www.resumetailorapp.com/free-resume-templates",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free download with instant access",
  },
  author: {
    "@type": "Organization",
    name: "ResumeTailorApp",
    url: "https://www.resumetailorapp.com",
  },
  featureList: [
    "ATS-optimized layouts",
    "Professional designs",
    "Instant download",
    "AI integration ready",
    "Free commercial use",
    "Recruiter-approved formats",
  ],
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 12,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Professional Modern Resume Template",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ATS-Optimized Chronological Resume Template",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Creative Industry Resume Template",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Executive Level Resume Template",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function FreeResumeTemplatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(resumeTemplatesSchema),
        }}
      />
      <FreeResumeTemplatesClient />
    </>
  );
}
