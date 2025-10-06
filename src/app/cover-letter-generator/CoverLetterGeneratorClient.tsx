"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Mail,
  Zap,
  CheckCircle,
  Sparkles,
  Target,
  Download,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Client component for the AI Cover Letter Generator page.
 * Contains all interactive logic, state, and client-side hooks.
 */
export default function CoverLetterGeneratorClient() {
  const router = useRouter();

  // Navigate to main page and scroll to builder section
  const navigateToBuilder = () => {
    router.push("/#builder");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mail className="w-4 h-4" />
            AI Cover Letter Generator
          </div>
          {/* ✅ OPTIMIZED H1 WITH KEYWORDS */}
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            AI Cover Letter Generator & Writer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Generate professional, tailored cover letters in minutes. Our AI
            creates personalized letters with company addressing, professional
            signatures, and perfect formatting for any job application.
          </p>
        </div>

        {/* AI Builder CTA */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">No Manual Writing Needed</h2>
            </div>
            <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
              Our AI automatically generates professional cover letters with
              company addresses, personalized content, proper signatures, and
              ATS-optimized formatting.
            </p>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={navigateToBuilder} // ✅ FIXED: Now scrolls to builder
            >
              <Target className="w-5 h-5 mr-2" />
              Generate Cover Letter with AI - Free
            </Button>
            <p className="text-green-200 text-sm mt-4">
              🚀 Includes company addressing • Professional signatures • Instant
              download
            </p>
          </div>
        </div>

        {/* Cover Letter Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Professional Cover Letter Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Example 1: Professional */}
            <CoverLetterExampleCard
              imageSrc="/images/cover/cover1.jpg"
              imageAlt="Professional Business Cover Letter Template with company addressing and signature"
              title="Professional Business"
              description="Formal cover letter with company addressing, professional tone, and business formatting. Includes proper date, hiring manager address, and signature."
              tags={["Company Address", "Professional Tone", "ATS Optimized"]}
            />

            {/* Example 2: Modern */}
            <CoverLetterExampleCard
              imageSrc="/images/cover/cover2.jpg"
              imageAlt="Modern Creative Cover Letter Template with contemporary design"
              title="Modern Creative"
              description="Contemporary design with clean layout, perfect for tech companies and creative roles. Modern formatting with professional appeal."
              tags={["Modern Design", "Clean Layout", "Tech-Friendly"]}
            />
          </div>
        </div>

        {/* Key Benefits Section */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why AI-Generated Cover Letters Get More Interviews
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Traditional cover letters take hours to write and often miss key
              requirements. Our AI solves this with:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "✓ Automatic company research & addressing",
              "✓ Tailored to job description keywords",
              "✓ Professional signature formatting",
              "✓ ATS-optimized structure",
              "✓ Error-free grammar & spelling",
              "✓ Consistent professional tone",
              "✓ Quick 2-minute generation",
              "✓ Multiple template options",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <FileText className="w-8 h-8 text-blue-600" />,
              title: "Company Addressing",
              description:
                "Automatically includes company name, address, hiring manager details, and proper business letter formatting",
            },
            {
              icon: <Zap className="w-8 h-8 text-green-600" />,
              title: "AI-Powered Content",
              description:
                "Professional writing tailored to each job description with relevant keywords and achievements",
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
              title: "Professional Signatures",
              description:
                "Includes proper closing, handwritten-style signatures, and contact information formatting",
            },
            {
              icon: <Target className="w-8 h-8 text-orange-600" />,
              title: "Job-Specific Tailoring",
              description:
                "Matches your skills and experience to exact job requirements and company values",
            },
            {
              icon: <Download className="w-8 h-8 text-red-600" />,
              title: "Instant Download",
              description:
                "Ready-to-use PDF format with perfect formatting for email applications and ATS systems",
            },
            {
              icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
              title: "Error-Free Results",
              description:
                "No typos, grammar issues, or formatting problems - professionally polished every time",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow h-full"
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Create Your Perfect Cover Letter?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Stop spending hours writing cover letters. Our AI generates
                professional, tailored letters with company addressing, proper
                signatures, and perfect formatting in seconds. Works seamlessly
                with your resume.
              </p>
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200"
                onClick={navigateToBuilder} // ✅ FIXED: Now scrolls to builder
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Cover Letter Now - Free
              </Button>
              <p className="text-gray-500 text-sm mt-4">
                No credit card required • Includes company addressing •
                Professional signatures • Instant download
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Extracted component for better code organization and SEO
function CoverLetterExampleCard({
  imageSrc,
  imageAlt,
  title,
  description,
  tags,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
}) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Navigate to main page and scroll to builder section
  const navigateToBuilder = () => {
    router.push("/#builder");
  };

  return (
    <Card className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 h-full flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden flex-shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoad={() => setImageLoaded(true)}
          priority={title === "Professional Business"} // ✅ Priority load for first template
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <Button
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-green-600 hover:bg-gray-100 shadow-lg border-0"
            onClick={navigateToBuilder} // ✅ FIXED: Now scrolls to builder
          >
            Use This Template
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 mb-4 leading-relaxed flex-grow">
          {description}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
