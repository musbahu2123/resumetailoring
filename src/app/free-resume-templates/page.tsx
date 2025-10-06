import type { Metadata } from "next";
import FreeResumeTemplatesClient from "./FreeResumeTemplatesClient";

// Define Metadata outside the component for SEO
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

/**
 * Server component that only handles metadata and delegates rendering to the client component.
 * @returns The client component for the Free Resume Templates page.
 */
export default function FreeResumeTemplatesPage() {
  return <FreeResumeTemplatesClient />;
}
