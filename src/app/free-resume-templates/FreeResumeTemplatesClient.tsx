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
  Download,
  CheckCircle,
  LayoutTemplate,
  Sparkles,
  Target,
  ArrowRight,
} from "lucide-react";
import { templates, TemplateInfo } from "@/lib/templates/templates-data";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Client component for the Free Resume Templates page.
 * Contains all interactive logic, state, and client-side hooks.
 */
export default function FreeResumeTemplatesClient() {
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
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <LayoutTemplate className="w-4 h-4" />
            Free Resume Templates
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            ATS-optimized resume templates designed to help you land interviews.
            All templates are completely free and work seamlessly with our AI
            resume builder.
          </p>
        </div>

        {/* AI Builder CTA */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">
                No Manual Template Editing Needed
              </h2>
            </div>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Our AI automatically formats your resume into any template below.
              Just upload your content, pick a design, and download instantly.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={navigateToBuilder} // ✅ FIXED: Now scrolls to builder
            >
              <Target className="w-5 h-5 mr-2" />
              Start Building with AI - It's Free
            </Button>
            <p className="text-blue-200 text-sm mt-4">
              🚀 No downloads needed • AI does all the formatting • Instant
              results
            </p>
          </div>
        </div>

        {/* Olga's Quote Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                Why Our Templates Actually Work (From Recruiter advice with over
                25 years of experience)
              </h3>
              <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4 py-2">
                "A couple of red flags when I see a resume is that the resume is
                not tailored to the job description, and it's very difficult and
                time-consuming for me to understand why this experience would
                align to this role. Having a resume with even one typo shows
                that you're not really detail-oriented."
              </blockquote>
              <p className="text-gray-600 text-sm mt-3">
                Our AI-powered templates solve both problems: automatic
                tailoring + error-free formatting.
              </p>
            </div>
          </div>
        </div>

        {/* ACTUAL Template Showcase - FIXED GRID */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Choose Your Perfect Template
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>

        {/* Features */}
        <Card className="bg-gradient-to-r from-orange-600 to-purple-600 text-white border-0 shadow-2xl mb-16">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-center mb-8">
              Why Our Templates Get More Interviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "ATS Optimized Layouts",
                "Recruiter-Approved Formats",
                "AI-Powered Tailoring",
                "Error-Free Results",
                "Instant Download",
                "Mobile Friendly",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="border-0 shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Create Your Perfect Resume?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Choose any template above and our AI will automatically format
                your resume, tailor it to job descriptions, and ensure it's 100%
                ATS-optimized.
              </p>
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200"
                onClick={navigateToBuilder}
              >
                <Download className="w-5 h-5 mr-2" />
                Start Building with AI - Free
              </Button>
              <p className="text-gray-500 text-sm mt-4">
                No credit card required • 10 free credits included • Instant
                download
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// TemplateCard component (kept in client file since it uses useRouter and useState)
function TemplateCard({ template }: { template: TemplateInfo }) {
  const router = useRouter();

  // Navigate to main page and scroll to builder section
  const navigateToBuilder = () => {
    router.push("/#builder");
  };

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 h-full flex flex-col">
      {/* Template Preview */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden flex-shrink-0">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={template.previewImage}
          alt={`${template.name} Template - ATS-optimized professional resume design`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onLoad={() => setImageLoaded(true)}
          priority={template.id === "classic"} // ✅ Priority load for first template
        />

        {/* Overlay with CTA */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <Button
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-blue-600 hover:bg-gray-100 shadow-lg border-0"
            onClick={navigateToBuilder} // ✅ FIXED: Now scrolls to builder
          >
            Use This Template
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <CardContent className="p-6 flex-grow flex flex-col">
        <CardTitle className="text-xl font-bold text-gray-900 mb-3">
          {template.name}
        </CardTitle>

        <CardDescription className="text-gray-600 mb-4 leading-relaxed flex-grow">
          {template.description}
        </CardDescription>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {template.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Best For */}
        <div className="text-sm text-gray-500 mt-auto">
          <strong className="text-gray-700">Best for:</strong>{" "}
          {template.bestFor.slice(0, 2).join(", ")}
        </div>
      </CardContent>
    </Card>
  );
}
