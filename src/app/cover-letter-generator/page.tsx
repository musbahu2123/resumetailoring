import type { Metadata } from "next";
import CoverLetterGeneratorClient from "./CoverLetterGeneratorClient";

// Define Metadata outside the component for SEO
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

/**
 * Server component that handles metadata and delegates rendering to the client component.
 * @returns The client component for the AI Cover Letter Generator page.
 */
export default function CoverLetterGeneratorPage() {
  return <CoverLetterGeneratorClient />;
}
