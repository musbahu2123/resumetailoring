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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { templates, TemplateInfo } from "@/lib/templates/templates-data";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Client component for the Free Resume Templates page.
 * Contains all interactive logic, state, and client-side hooks.
 */
export default function FreeResumeTemplatesClient() {
  const router = useRouter();
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Navigate to main page and scroll to builder section
  const navigateToBuilder = () => {
    router.push("/#builder");
  };

  // Filter to show minimalist and creative templates first
  const featuredTemplates = templates.filter(
    (template) =>
      template.id === "minimalist" ||
      template.id === "creative" ||
      template.id === "modern" ||
      template.id === "classic"
  );

  const nextTemplate = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentTemplateIndex((prev) =>
      prev === featuredTemplates.length - 1 ? 0 : prev + 1
    );
  };

  const prevTemplate = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentTemplateIndex((prev) =>
      prev === 0 ? featuredTemplates.length - 1 : prev - 1
    );
  };

  // Auto-advance templates
  useEffect(() => {
    const timer = setInterval(() => {
      nextTemplate();
    }, 6000); // Change every 6 seconds

    return () => clearInterval(timer);
  }, [currentTemplateIndex, isTransitioning]);

  // Reset transitioning state after animation
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

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
            Free ATS Resume Templates 2025
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Download professional, ATS-optimized resume templates designed to
            pass automated screening. All templates are completely free and work
            seamlessly with our AI resume builder.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={navigateToBuilder}
            >
              <Target className="w-5 h-5 mr-2" />
              Start Building with AI - Free
            </Button>
            <a
              className="text-sm text-gray-600 underline hover:text-blue-600 transition-colors"
              href="/blog/ats-resume-checklist-10-things-recruiters-look-for-2025"
            >
              ATS Checklist
            </a>
          </div>
        </div>

        {/* Viral Community Story Section - ENHANCED SEO CONTENT */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Why One Template Can Change Your Career
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                A single, community-tested resume format can make a huge
                difference. Popular resume templates often start from honest
                feedback on platforms like Reddit and spread because they
                simplify what recruiters actually want to see.
              </p>
              <p className="text-lg leading-relaxed">
                We designed these templates the same way: battle-tested ideas +
                community feedback + recruiter input. Inspired by the viral
                format many candidates swear by, our approach is simple: one
                proven structure, multiple designs.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SINGLE TEMPLATE SHOWCASE - Minimalist & Focused */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Professional Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our most popular ATS-optimized templates. Each designed for
              different industries and career levels with clean, professional
              layouts that pass automated screening systems.
            </p>
          </div>

          {/* Template Carousel */}
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Navigation Arrows */}
              <button
                onClick={prevTemplate}
                disabled={isTransitioning}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 disabled:opacity-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextTemplate}
                disabled={isTransitioning}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-200 disabled:opacity-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Template Display */}
              <div
                className={`transition-opacity duration-300 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                <SingleTemplateView
                  template={featuredTemplates[currentTemplateIndex]}
                  onUseTemplate={navigateToBuilder}
                />
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-3 pb-8 pt-4">
                {featuredTemplates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isTransitioning) {
                        setIsTransitioning(true);
                        setCurrentTemplateIndex(index);
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTemplateIndex
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
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
              onClick={navigateToBuilder}
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

        {/* Recruiter Quote Section - ENHANCED */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                Why Our Templates Actually Work (Recruiter-Reviewed)
              </h3>
              <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4 py-2 mb-4">
                "A red flag is when a resume isn't tailored to the job and it's
                hard to see why the experience fits the role. Even one typo
                suggests a lack of care." — Recruiting professional with 25+
                years experience
              </blockquote>
              <p className="text-gray-600">
                We designed every template with recruiter scanning and ATS
                parsing in mind: clear headings, single-column flow, consistent
                formatting, and prioritized achievements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {[
                  "ATS-optimized layouts that parse reliably",
                  "Recruiter-approved sections and ordering",
                  "AI-powered tailoring to job descriptions",
                  "Error-free formatting",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - NEW SEO CONTENT */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              How to Use These Templates (3-Minute Workflow)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Pick a Template",
                  description: "Choose one that matches your role and industry",
                },
                {
                  step: "2",
                  title: "Upload youre resume or Build from scratch",
                  description: "Import from LinkedIn or enter manually",
                },
                {
                  step: "3",
                  title: "Paste Job Description",
                  description:
                    "Let AI tailor bullets and keywords automatically",
                },
                {
                  step: "4",
                  title: "Preview & Download",
                  description: "Get perfect PDF or copy-paste to job sites",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                <strong>Pro tip:</strong> For best ATS results, avoid header
                images and stick to single-column structure — our templates
                enforce this automatically.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Before/After Example - NEW SEO CONTENT */}
        <Card className="bg-gradient-to-r from-orange-50 to-purple-50 border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Before → After (AI-Powered Bullet Rewrite)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-red-200">
                <h3 className="font-bold text-red-600 mb-3">
                  Before: Weak & Vague
                </h3>
                <p className="text-gray-700 italic">
                  "Worked on sales team and increased numbers."
                </p>
                <ul className="mt-3 space-y-1 text-sm text-red-600">
                  <li>• No specific metrics</li>
                  <li>• Passive language</li>
                  <li>• No clear impact</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-600 mb-3">
                  After: Strong & Specific
                </h3>
                <p className="text-gray-700 font-medium">
                  "Increased B2B sales by 42% within 12 months by designing an
                  account-based outreach strategy that closed 18 net-new
                  enterprise deals."
                </p>
                <ul className="mt-3 space-y-1 text-sm text-green-600">
                  <li>• Specific metrics (42%)</li>
                  <li>• Clear strategy mentioned</li>
                  <li>• Quantifiable results</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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
                "Professional Typography",
                "Industry-Specific Designs",
                "Free Commercial Use",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section - NEW SEO CONTENT */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "Are these resume templates really free?",
                  answer:
                    "Yes — every template is free to use, customize, and download. No hidden fees or subscriptions required.",
                },
                {
                  question:
                    "Will these templates pass ATS (Applicant Tracking Systems)?",
                  answer:
                    "Yes. All templates are single-column, use standard fonts and headings, and avoid elements that break parsing like tables, headers with contact info, or complex graphics.",
                },
                {
                  question: "Do I need to sign up to use the templates?",
                  answer:
                    "No sign-up required to try the templates. Creating an account saves your versions and provides credits for AI tailoring, but you can start immediately without registration.",
                },
                {
                  question: "Which template should I choose for my industry?",
                  answer:
                    "Classic Professional is the safest default for corporate roles; Modern Clean works best for tech and startups; Creative is designed for designers who also submit portfolios; Executive focuses on leadership metrics for senior roles.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
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

// Single Template View Component - Replaces the grid with focused single view
function SingleTemplateView({
  template,
  onUseTemplate,
}: {
  template: TemplateInfo;
  onUseTemplate: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px]">
      {/* Template Preview - Larger and more prominent */}
      <div className="lg:w-1/2 p-8 flex items-center justify-center bg-gray-50">
        <div className="relative aspect-[3/4] w-full max-w-md bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={template.previewImage}
            alt={`${template.name} Template - ATS-optimized professional resume design`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            onLoad={() => setImageLoaded(true)}
            priority
          />
        </div>
      </div>

      {/* Template Details */}
      <div className="lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="mb-6">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            {template.category}
          </span>
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {template.name}
          </h3>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 text-lg mb-3">
            Key Features:
          </h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {template.features.map((feature, index) => (
              <span
                key={index}
                className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200 font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Best For */}
        <div className="mb-8">
          <h4 className="font-semibold text-gray-900 text-lg mb-3">
            Perfect For:
          </h4>
          <div className="flex flex-wrap gap-2">
            {template.bestFor.map((industry, index) => (
              <span
                key={index}
                className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 font-medium"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 text-lg py-6 px-8 w-full lg:w-auto"
          onClick={onUseTemplate}
        >
          <LayoutTemplate className="w-6 h-6 mr-3" />
          Use This Template
          <ArrowRight className="w-6 h-6 ml-3" />
        </Button>
      </div>
    </div>
  );
}
