import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resume Tailor App: AI-Powered Resume & Cover Letter Builder for ATS",
  description:
    "Land your dream job. Instantly tailor your resume & cover letter to any job description using AI. Get past Applicant Tracking Systems (ATS) and impress recruiters in seconds. Upload, paste, or build from scratch.",
  keywords: [
    "AI Resume Builder",
    "Resume Tailor",
    "ATS Resume",
    "Cover Letter Generator",
    "Job Application AI",
    "Tailor Resume to Job Description",
    "Resume Optimization",
    "CV Builder",
    "Recruiter-Friendly Resume",
  ],
  authors: [{ name: "Resume Tailor App" }],
  creator: "Resume Tailor App",
  publisher: "Resume Tailor App",
  robots: "index, follow",
  openGraph: {
    title:
      "Resume Tailor App: AI-Powered Resume & Cover Letter Builder for ATS",
    description:
      "Land your dream job. Instantly tailor your resume & cover letter to any job description using AI. Get past ATS and impress recruiters.",
    url: "https://www.resumetailorapp.com",
    siteName: "Resume Tailor App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Tailor App - Create the perfect resume in minutes.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Tailor App: AI-Powered Resume & Cover Letter Builder",
    description:
      "Tailor your resume & cover letter to any job in seconds. Beat the ATS and get more interviews.",
    creator: "@itsmusbahdev",
    images: ["/og-image.png"],
  },
  // ADD THE VERIFICATION HERE
  other: {
    "google-site-verification": "ui4OZp4LsNsMYVfVniuAafxkX9mxh2vvMSvoEemFxgI", // ← Replace with actual code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* This will automatically include the google-site-verification meta tag */}
      </head>
      <body
        className={`${geistSans.className} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SessionProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
