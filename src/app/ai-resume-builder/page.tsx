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

/**
 * Server component that only handles metadata and delegates rendering to the client component.
 * @returns The client component for the AI Resume Builder page.
 */
export default function AIResumeBuilderPage() {
  return <AIResumeBuilderClient />;
}
