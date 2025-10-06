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

// ✅ ENHANCED: More comprehensive metadata with all target keywords
export const metadata: Metadata = {
  title: "Resume Tailor App: AI-Powered Resume & Cover Letter Builder for ATS",
  description:
    "Free AI resume builder and cover letter generator. Tailor your resume to any job description instantly. ATS-optimized templates, professional formatting, and instant download. Get more interviews.",
  keywords: [
    "AI Resume Builder",
    "AI Cover Letter Generator", // ✅ ADDED
    "Free Resume Templates", // ✅ ADDED
    "Resume Tailor",
    "ATS Resume",
    "Cover Letter Generator",
    "Job Application AI",
    "Tailor Resume to Job Description",
    "Resume Optimization",
    "CV Builder",
    "Recruiter-Friendly Resume",
    "AI Resume Tailor", // ✅ ADDED
    "Free Resume Builder", // ✅ ADDED
    "Professional Resume Templates", // ✅ ADDED
  ],
  authors: [{ name: "Resume Tailor App" }],
  creator: "Resume Tailor App",
  publisher: "Resume Tailor App",
  robots: "index, follow",
  // ✅ ADDED: Canonical URL for better SEO
  metadataBase: new URL("https://www.resumetailorngapp.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Resume Tailor App: AI-Powered Resume & Cover Letter Builder for ATS",
    description:
      "Land your dream job. Instantly tailor your resume & cover letter to any job description using AI. Get past ATS and impress recruiters.",
    url: "https://www.resumetailorngapp.com",
    siteName: "Resume Tailor App",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Tailor App - AI Resume Builder & Cover Letter Generator",
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
    creator: "@resumetailorapp",
    images: ["/og-image.png"],
  },
  // ✅ ENHANCED: Better verification structure
  verification: {
    google: "ui4OZp4LsNsMYVfVniuAafxkX9mxh2vvMSvoEemFxgI", // Use proper verification property
  },
  // ✅ ADDED: Additional SEO enhancements
  category: "career",
  classification: "AI Resume Builder, Career Tools, Job Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ ADDED: Structured Data for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Resume Tailor App",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web Browser",
              description:
                "AI-powered resume and cover letter builder that tailors applications to specific job descriptions",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Organization",
                name: "Resume Tailor App",
              },
            }),
          }}
        />
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
