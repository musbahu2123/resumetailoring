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
    "Free AI resume builder and cover letter generator. Tailor your resume to any job description instantly. ATS-optimized templates, professional formatting, and instant download. Get more interviews.",
  keywords: [
    "AI Resume Builder",
    "AI Cover Letter Generator",
    "Free Resume Templates",
    "Resume Tailor",
    "ATS Resume",
    "Cover Letter Generator",
    "Job Application AI",
    "Tailor Resume to Job Description",
    "Resume Optimization",
    "CV Builder",
    "Recruiter-Friendly Resume",
    "AI Resume Tailor",
    "Free Resume Builder",
    "Professional Resume Templates",
  ],
  authors: [{ name: "Resume Tailor App" }],
  creator: "Resume Tailor App",
  publisher: "Resume Tailor App",
  robots: "index, follow",
  metadataBase: new URL("https://www.resumetailorapp.com"), // ✅ FIXED URL
  alternates: {
    canonical: "/",
  },
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
  verification: {
    google: "ui4OZp4LsNsMYVfVniuAafxkX9mxh2vvMSvoEemFxgI",
  },
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
        {/* ✅ Favicon */}
        <link rel="icon" href="/favicon.png" sizes="48x48" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" />

        {/* ✅ Optional: theme color */}
        <meta name="theme-color" content="#ffffff" />

        {/* ✅ Structured Data */}
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
