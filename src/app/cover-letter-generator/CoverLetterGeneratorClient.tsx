"use client";

import { Button } from "@/components/ui/button";
78;
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
  ChevronLeft,
  ChevronRight,
  Upload,
  FileInput,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * Client component for the AI Cover Letter Generator page.
 * Contains all interactive logic, state, and client-side hooks.
 */
export default function CoverLetterGeneratorClient() {
  const router = useRouter();
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Navigate to main page and scroll to builder section
  const navigateToBuilder = () => {
    router.push("/#builder");
  };

  const templates = [
    {
      id: "professional",
      name: "Professional Business Template",
      description:
        "Perfect for corporate roles such as finance, consulting, or administrative positions. Includes hiring manager's address, formal tone, proper date formatting, and professional paragraph structure to impress recruiters.",
      features: [
        "Company Address",
        "Professional Tone",
        "ATS Optimized",
        "Formal Structure",
      ],
      category: "Corporate",
      previewImage: "/images/cover/cover1.jpg",
    },
    {
      id: "modern",
      name: "Modern Creative Template",
      description:
        "Designed for creative roles, marketing, design, and tech startups. Clean layout with modern formatting that emphasizes creativity while maintaining professional appeal.",
      features: [
        "Modern Design",
        "Clean Layout",
        "Tech-Friendly",
        "Creative Appeal",
      ],
      category: "Creative/Tech",
      previewImage: "/images/cover/cover2.jpg",
    },
  ];

  const nextTemplate = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentTemplateIndex((prev) =>
      prev === templates.length - 1 ? 0 : prev + 1
    );
  };

  const prevTemplate = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentTemplateIndex((prev) =>
      prev === 0 ? templates.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextTemplate();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentTemplateIndex, isTransitioning]);

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
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mail className="w-4 h-4" />
            AI Cover Letter Generator
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            AI Cover Letter Generator & Writer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create professional, tailored cover letters in minutes with our
            AI-powered tool. Upload your resume and job description - our AI
            automatically generates both a perfectly tailored resume and
            matching cover letter with company addressing, professional
            signatures, and ATS-optimized formatting.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={navigateToBuilder}
            >
              <Target className="w-5 h-5 mr-2" />
              Generate Cover Letter with AI - Free
            </Button>
            <a
              className="text-sm text-gray-600 underline hover:text-blue-600 transition-colors"
              href="/blog/ai-resume-builder-vs-traditional-methods-resumetailorapp-gets-3x-more-interviews"
            >
              AI vs Traditional resume
            </a>
          </div>
        </div>

        {/* Why Use AI Section - ENHANCED SEO CONTENT */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Use an AI Cover Letter Generator
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                Writing a cover letter can be time-consuming, and many
                applicants struggle to highlight their achievements effectively.
                Our AI Cover Letter Generator simplifies the process by
                automatically crafting personalized letters that match your
                resume, target job description, and industry standards.
              </p>
              <p className="text-lg leading-relaxed">
                Traditional cover letters often fail to address company-specific
                requirements or use the keywords that ATS systems scan. Our tool
                ensures each cover letter is optimized for ATS and tailored to
                the hiring manager's expectations, giving you a competitive
                advantage.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* AI Builder CTA */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">No Manual Writing Needed</h2>
            </div>
            <p className="text-green-100 text-lg mb-6 max-w-2xl mx-auto">
              Upload your resume and job description - our AI automatically
              generates both a perfectly tailored resume and professional cover
              letter with company addressing, proper formatting, and ATS
              optimization.
            </p>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={navigateToBuilder}
            >
              <Target className="w-5 h-5 mr-2" />
              Generate Cover Letter with AI - Free
            </Button>
            <p className="text-green-200 text-sm mt-4">
              🚀 Get both resume + cover letter • Company addressing included •
              Instant download
            </p>
          </div>
        </div>

        {/* SINGLE TEMPLATE SHOWCASE */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Cover Letter Templates
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI provides multiple professional templates designed to make
              your cover letter visually appealing and recruiter-friendly. Each
              template includes proper formatting, company addressing, and
              signature placement.
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
                  template={templates[currentTemplateIndex]}
                  onUseTemplate={navigateToBuilder}
                />
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-3 pb-8 pt-4">
                {templates.map((_, index) => (
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
                        ? "bg-green-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - UPDATED TO MATCH YOUR WORKFLOW */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              How Our AI Cover Letter Generator Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  icon: <Upload className="w-6 h-6" />,
                  title: "Upload Your Resume",
                  description:
                    "Paste your existing resume or build from scratch with our AI assistant",
                },
                {
                  step: "2",
                  icon: <FileInput className="w-6 h-6" />,
                  title: "Add Job Description",
                  description:
                    "Paste the job description you're applying for - AI will analyze requirements",
                },
                {
                  step: "3",
                  icon: <Zap className="w-6 h-6" />,
                  title: "AI Generates Both",
                  description:
                    "Our AI creates a tailored resume AND matching cover letter simultaneously",
                },
                {
                  step: "4",
                  icon: <Download className="w-6 h-6" />,
                  title: "Download & Apply",
                  description:
                    "Get perfectly formatted PDFs ready for your job application",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-900 text-lg mb-3 text-center">
                🚀 Get Both Resume + Cover Letter in One Click
              </h4>
              <p className="text-green-700 text-center">
                Unlike other tools, our AI generates a perfectly tailored resume
                AND matching cover letter together. Both documents are optimized
                for ATS systems and formatted professionally.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Benefits Section - ENHANCED */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why AI-Generated Cover Letters Get More Interviews
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Traditional cover letters take hours to write and often miss key
              requirements. Our AI solves this with automatic company
              addressing, tailored content, ATS optimization, and professional
              formatting — giving you an edge over other applicants.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Get both resume + cover letter together",
              "Automatic company research & addressing",
              "Tailored to job description keywords",
              "Professional signature formatting",
              "ATS-optimized structure for both documents",
              "Error-free grammar & spelling",
              "Consistent professional tone",
              "Quick 2-minute generation for both",
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Guide - UPDATED FOR YOUR WORKFLOW */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Complete Application Package in Minutes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  For Your Resume:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>ATS-optimized formatting and structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Keyword optimization for job description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Professional summary tailored to role</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Quantifiable achievements highlighted</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  For Your Cover Letter:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Professional business letter format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Company-specific addressing included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Personalized content matching resume</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Professional signature and closing</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <FileText className="w-8 h-8 text-blue-600" />,
              title: "Dual Document Generation",
              description:
                "Get both tailored resume and matching cover letter generated simultaneously by our AI",
            },
            {
              icon: <Zap className="w-8 h-8 text-green-600" />,
              title: "Smart Content Matching",
              description:
                "AI ensures cover letter and resume tell a consistent story with aligned achievements",
            },
            {
              icon: <CheckCircle className="w-8 h-8 text-purple-600" />,
              title: "Professional Formatting",
              description:
                "Both documents formatted to professional standards with proper structure",
            },
            {
              icon: <Target className="w-8 h-8 text-orange-600" />,
              title: "ATS Optimization",
              description:
                "Resume and cover letter optimized to pass through applicant tracking systems",
            },
            {
              icon: <Download className="w-8 h-8 text-red-600" />,
              title: "Instant Download",
              description:
                "Ready-to-use PDF format with perfect formatting for email and online applications",
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

        {/* FAQ Section - UPDATED FOR YOUR SYSTEM */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "Do I get both a resume and cover letter?",
                  answer:
                    "Yes! Our AI generates a perfectly tailored resume AND matching cover letter together. Both documents are optimized for your target job and formatted professionally.",
                },
                {
                  question: "How does the AI create matching documents?",
                  answer:
                    "The AI analyzes your resume and job description, then creates both documents with consistent messaging, aligned achievements, and complementary formatting.",
                },
                {
                  question: "Is the generated content ATS-friendly?",
                  answer:
                    "Absolutely. Both resume and cover letter are formatted to pass ATS systems, with proper structure, keyword optimization, and clean formatting.",
                },
                {
                  question: "Can I use this for multiple job applications?",
                  answer:
                    "Yes! Generate unique resume and cover letter pairs for each job application. The AI tailors both documents specifically to each job description.",
                },
                {
                  question: "What file formats are available?",
                  answer:
                    "Both documents are available as professionally formatted PDFs ready for email applications and online submissions.",
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
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Create Your Perfect Application Package?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Stop spending hours writing separate documents. Our AI generates
                professional, tailored resumes AND cover letters together -
                perfectly matched and ready to impress hiring managers.
              </p>
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200"
                onClick={navigateToBuilder}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Resume & Cover Letter - Free
              </Button>
              <p className="text-gray-500 text-sm mt-4">
                No credit card required • Get both documents • Professional
                formatting • Instant download
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Single Template View Component
function SingleTemplateView({
  template,
  onUseTemplate,
}: {
  template: any;
  onUseTemplate: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-[600px]">
      {/* Template Preview */}
      <div className="lg:w-1/2 p-8 flex items-center justify-center bg-gray-50">
        <div className="relative aspect-[4/3] w-full max-w-md bg-white rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={template.previewImage}
            alt={`${template.name} - Professional cover letter template`}
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
          <span className="inline-block bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
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
            {template.features.map((feature: string, index: number) => (
              <span
                key={index}
                className="text-sm bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 text-lg py-6 px-8 w-full lg:w-auto"
          onClick={onUseTemplate}
        >
          <Mail className="w-6 h-6 mr-3" />
          Use This Template
          <ArrowRight className="w-6 h-6 ml-3" />
        </Button>
      </div>
    </div>
  );
}
