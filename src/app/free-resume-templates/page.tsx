// app/free-resume-templates/page.tsx - UPDATED WITH JSON-LD
import type { Metadata } from "next";
import FreeResumeTemplatesClient from "./FreeResumeTemplatesClient";

export const metadata: Metadata = {
  title: "Free Resume Templates - ATS-Optimized Professional Designs 2024",
  description:
    "Download free, ATS-optimized resume templates that get interviews. Professional designs for 2024 job market. Works with AI resume builder.",
  keywords: [
    "free resume templates",
    "ATS resume templates",
    "professional resume templates",
    "download resume templates",
  ],
};

// JSON-LD Schema for Free Resume Templates
const resumeTemplatesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Free ATS-Optimized Resume Templates",
  description:
    "Download free professional resume templates optimized for Applicant Tracking Systems (ATS) and designed for the 2025 job market",
  url: "https://www.resumetailorapp.com/free-resume-templates",
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
  publisher: {
    "@type": "Organization",
    name: "ResumeTailorApp",
  },
  isAccessibleForFree: true,
  license: "https://creativecommons.org/licenses/by/4.0/",
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
