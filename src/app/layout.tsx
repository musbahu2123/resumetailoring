import type { Metadata, Viewport } from "next"; // ✅ ADD Viewport to import
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

// ✅ POWERFUL, CONVERSION-FOCUSED METADATA
export const metadata: Metadata = {
  // ✅ HIGH-CONVERTING TITLE: Keyword + Benefit + CTA
  title:
    "AI Resume Builder | Tailor Resume to Any Job in 30 Seconds | Free Tool",

  // ✅ HIGH-CONVERSION DESCRIPTION: Problem → Solution → Benefit → CTA
  description:
    "Get 3x more interviews with AI-powered resume builder & tailor.Build and enhance or tailor  and upload and enhance or tailor your resume, paste any job description, and instantly generate a perfectly tailored resume & cover letter. Free tool with 25+ years of recruiter insights built-in. Beat ATS systems, impress recruiters, and land your dream job faster. Try free - no sign up required.",

  // ✅ TARGETED KEYWORDS
  keywords: [
    "AI Resume Builder",
    "AI Resume Tailor",
    "AI Cover Letter Generator",
    "Resume Tailor App",
    "Tailor Resume to Job Description",
    "ATS Resume Builder",
    "Free Resume Builder",
    "Professional Resume Templates",
    "Resume Optimization",
    "Cover Letter Maker",
    "Job Application AI",
    "Recruiter-Friendly Resume",
    "Resume Scoring",
    "Smart Resume Builder",
    "Instant Resume Tailor",
  ],

  authors: [{ name: "Resume Tailor App" }],
  creator: "Resume Tailor App",
  publisher: "Resume Tailor App",
  robots: "index, follow",
  metadataBase: new URL("https://www.resumetailorapp.com"),

  alternates: {
    canonical: "/",
  },

  // ✅ COMPELLING OPENGRAPH
  openGraph: {
    title: "AI Resume Builder: Get 3x More Interviews (Free Tool)",
    description:
      "Upload your resume, paste any job description, get a perfectly tailored resume & cover letter in 30 seconds. Free tool with 25+ years recruiter insights. No sign up required.",
    url: "https://www.resumetailorapp.com",
    siteName: "Resume Tailor App",
    images: [
      {
        url: "https://www.resumetailorapp.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Resume Builder - Tailor Resume & Cover Letter Instantly",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // ✅ ENGAGING TWITTER CARD
  twitter: {
    card: "summary_large_image",
    title: "🚀 AI Resume Builder: Get 3x More Interviews",
    description:
      "Tailor your resume & cover letter to any job in 30 seconds. Free tool, no sign up required. Beat ATS, impress recruiters.",
    creator: "@resumetailorapp",
    images: ["https://www.resumetailorapp.com/og-image.png"],
  },

  // ✅ GOOGLE VERIFICATION
  verification: {
    google: "ui4OZp4LsNsMYVfVniuAafxkX9mxh2vvMSvoEemFxgI",
  },

  category: "Career & Employment",

  // ✅ MOBILE OPTIMIZATION
  appleWebApp: {
    capable: true,
    title: "AI Resume Builder",
    statusBarStyle: "black-translucent",
  },

  // ❌ REMOVED viewport from metadata (will be moved to separate export)
};

// ✅ SEPARATE VIEWPORT EXPORT (NEW in Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#2563eb", // ✅ MOVED theme-color from <meta> tag to here
};

// ✅ HONEST STRUCTURED DATA (No fake ratings)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI Resume Builder & Tailor",
  url: "https://www.resumetailorapp.com",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  description:
    "AI-powered resume builder that instantly tailors your resume and cover letter to any job description. Get 3x more interviews with recruiter-optimized applications.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free resume tailoring with optional premium features",
    availability: "https://schema.org/InStock",
  },
  // ✅ REMOVED aggregateRating - Add back when you have real reviews
  featureList: [
    "AI-powered resume tailoring",
    "Instant cover letter generation",
    "ATS optimization",
    "Recruiter insights built-in",
    "Multiple professional templates",
    "No sign up required for first use",
  ],
  author: {
    "@type": "Organization",
    name: "Resume Tailor App",
    url: "https://www.resumetailorapp.com",
  },
};

// ✅ HELPFUL FAQ STRUCTURED DATA
const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the AI Resume Builder free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You get one free resume tailoring without signing up. When you create an account, you get 3 free credits every month.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to tailor a resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI tailors your resume and generates a matching cover letter in under 30 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work with Applicant Tracking Systems (ATS)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Our templates are specifically designed to pass ATS scans with high success rates.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ ADD GOOGLE ADS TAG HERE - Right after opening <head> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17821565833"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17821565833');
          `}
        </Script>

        {/* ✅ CLEAN FAVICON SET */}
        <link
          rel="icon"
          href="https://www.resumetailorapp.com/favicon.ico?v=6"
          sizes="any"
        />
        <link
          rel="icon"
          href="https://www.resumetailorapp.com/favicon.png?v=6"
          type="image/png"
        />

        {/* ✅ APPLE TOUCH ICON */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://www.resumetailorapp.com/apple-touch-icon.png?v=6"
        />

        {/* ❌ REMOVED theme-color meta tag (now in viewport export) */}
        {/* <meta name="theme-color" content="#2563eb" /> */}

        {/* ✅ HONEST STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* ✅ FAQ STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />

        {/* ✅ GOOGLE SITE VERIFICATION */}
        <meta
          name="google-site-verification"
          content="ui4OZp4LsNsMYVfVniuAafxkX9mxh2vvMSvoEemFxgI"
        />

        {/* ✅ PRELOAD FONTS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ✅ SOCIAL IMAGE META */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:alt"
          content="AI Resume Builder - Tailor Resume & Cover Letter"
        />

        {/* ✅ TWITTER META */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@resumetailorapp" />
        <meta name="twitter:creator" content="@resumetailorapp" />
        <meta name="twitter:image:alt" content="AI Resume Builder Screenshot" />

        {/* ✅ MOBILE APPS */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen bg-white`}
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
