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
  Sparkles,
  Upload,
  Target,
  Zap,
  Download,
  Shield,
  ArrowRight,
  CheckCircle,
  FileText,
  Users,
  Rocket,
  Crown,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * Client component for the AI Resume Builder page.
 * Contains all interactive logic, state, and client-side hooks.
 */
export default function AIResumeBuilderClient() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  // Navigate to main page and scroll to builder section
  const navigateToBuilder = () => {
    router.push("/#builder");
  };

  // Auto-advance steps
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev === 3 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            AI-Powered Resume Builder
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            AI Resume Builder & Tailor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create ATS-optimized resumes tailored to any job description. Our AI
            powered by 25+ years of Google recruiter experience analyzes
            requirements and generates perfect resumes that get interviews.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={navigateToBuilder}
            >
              <Target className="w-5 h-5 mr-2" />
              Build Your AI Resume - Free
            </Button>
            <a
              className="text-sm text-gray-600 underline hover:text-blue-600 transition-colors"
              href="/free-resume-templates"
            >
              View Templates
            </a>
          </div>
        </div>

        {/* Unique Value Proposition Section */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Why Our AI Resume Builder is Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Powered by Recruiter Intelligence
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Our AI is trained on 25+ years of Google recruiting
                      experience, understanding exactly what hiring managers
                      look for.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Dual Document Generation
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Get both a perfectly tailored resume AND matching cover
                      letter in one click - no extra work required.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Smart ATS Optimization
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Automatically formats your resume to pass through
                      Applicant Tracking Systems while maintaining human
                      readability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Instant Professional Results
                    </h3>
                    <p className="text-gray-600 text-sm">
                      From upload to download in under 2 minutes. Perfect
                      formatting, zero errors, recruiter-approved structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works - Interactive Demo */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our AI Resume Builder Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple 4-step process to get your perfectly tailored resume and
              cover letter
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                  {/* Step Indicator */}
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white">
                    <div className="space-y-6">
                      {[
                        {
                          step: 1,
                          title: "Upload or Build Resume",
                          description:
                            "Upload existing resume (PDF/DOCX) or build from scratch with AI assistance",
                        },
                        {
                          step: 2,
                          title: "Paste Job Description",
                          description:
                            "Provide the job description you're targeting for perfect tailoring",
                        },
                        {
                          step: 3,
                          title: "AI Analysis & Generation",
                          description:
                            "Our AI analyzes requirements and generates tailored resume + cover letter",
                        },
                        {
                          step: 4,
                          title: "Download & Apply",
                          description:
                            "Get professionally formatted PDFs ready for your application",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                            currentStep === index
                              ? "bg-white/20 scale-105"
                              : "bg-white/10"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              currentStep === index
                                ? "bg-white text-blue-600"
                                : "bg-white/20 text-white"
                            }`}
                          >
                            {item.step}
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm opacity-90">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Demo */}
                  <div className="p-8 bg-white">
                    <div className="h-full flex items-center justify-center">
                      {currentStep === 0 && (
                        <div className="text-center">
                          <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Multiple Upload Options
                          </h3>
                          <p className="text-gray-600">
                            Choose from PDF upload, DOCX upload, text paste, or
                            build from scratch
                          </p>
                        </div>
                      )}
                      {currentStep === 1 && (
                        <div className="text-center">
                          <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Job Description Analysis
                          </h3>
                          <p className="text-gray-600">
                            AI extracts key skills, requirements, and keywords
                            for perfect tailoring
                          </p>
                        </div>
                      )}
                      {currentStep === 2 && (
                        <div className="text-center">
                          <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            AI Magic Happens
                          </h3>
                          <p className="text-gray-600">
                            Generating both resume and cover letter with
                            recruiter-approved content
                          </p>
                        </div>
                      )}
                      {currentStep === 3 && (
                        <div className="text-center">
                          <Download className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Professional Results
                          </h3>
                          <p className="text-gray-600">
                            Download perfectly formatted PDFs ready for your job
                            application
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recruiter Quote Section - ENHANCED */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                Why AI Resume Tailoring Works (From Google Recruiter with 25+
                Years Experience)
              </h3>
              <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4 py-2 mb-4">
                "The biggest mistake I see is candidates using generic resumes.
                When a resume isn't tailored to the job description, it's very
                difficult and time-consuming for me to understand why this
                experience would align to this role. Even one typo suggests a
                lack of attention to detail that makes me question their fit for
                the position."
              </blockquote>
              <p className="text-gray-600">
                Our AI resume builder solves these exact problems: automatic
                tailoring to job descriptions, error-free formatting, and clear
                alignment between your experience and role requirements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {[
                  "Automatic job description analysis",
                  "Keyword optimization for ATS systems",
                  "Error-free professional formatting",
                  "Recruiter-approved content structure",
                  "Transferable skills highlighting",
                  "Quantifiable achievements emphasis",
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

        {/* AI Builder CTA */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl font-bold">
                No Manual Resume Writing Needed
              </h2>
            </div>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              Upload your resume and job description - our AI automatically
              tailors both your resume and cover letter, optimizes for ATS
              systems, and generates professional formatting instantly.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={navigateToBuilder}
            >
              <Target className="w-5 h-5 mr-2" />
              Build Your AI Resume - Free
            </Button>
            <p className="text-blue-200 text-sm mt-4">
              🚀 Get both resume + cover letter • ATS-optimized • Instant
              download
            </p>
          </div>
        </div>

        {/* Before/After Examples */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              See the AI Transformation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-600 text-center">
                  Before AI
                </h3>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <p className="text-gray-700 italic mb-4">
                    "Managed social media accounts and created content"
                  </p>
                  <ul className="space-y-2 text-sm text-red-600">
                    <li>• Vague responsibilities</li>
                    <li>• No measurable results</li>
                    <li>• Passive language</li>
                    <li>• No specific skills mentioned</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-600 text-center">
                  After AI
                </h3>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="text-gray-700 font-medium mb-4">
                    "Grew social media engagement by 240% through data-driven
                    content strategy, increasing follower base from 5K to 17K in
                    6 months"
                  </p>
                  <ul className="space-y-2 text-sm text-green-600">
                    <li>• Quantifiable achievements (240% growth)</li>
                    <li>• Specific metrics (5K to 17K followers)</li>
                    <li>• Active, results-focused language</li>
                    <li>• Clear strategy mentioned</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Upload className="w-8 h-8 text-blue-600" />,
              title: "Flexible Upload Options",
              description:
                "Upload PDF, DOCX, paste text, or build from scratch with our AI assistant",
            },
            {
              icon: <Target className="w-8 h-8 text-green-600" />,
              title: "Smart Job Analysis",
              description:
                "AI extracts key requirements and skills from any job description automatically",
            },
            {
              icon: <Sparkles className="w-8 h-8 text-purple-600" />,
              title: "Dual Document Generation",
              description:
                "Get both perfectly tailored resume AND matching cover letter in one click",
            },
            {
              icon: <Shield className="w-8 h-8 text-orange-600" />,
              title: "ATS Optimization",
              description:
                "Formatted to pass through applicant tracking systems while impressing humans",
            },
            {
              icon: <Download className="w-8 h-8 text-red-600" />,
              title: "Instant Professional PDFs",
              description:
                "Download ready-to-use documents with perfect formatting and zero errors",
            },
            {
              icon: <Crown className="w-8 h-8 text-indigo-600" />,
              title: "Recruiter-Approved Content",
              description:
                "Content structured based on 25+ years of top company recruiting experience",
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

        {/* FAQ Section */}
        <Card className="bg-white border-0 shadow-xl rounded-2xl mb-16">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question:
                    "How is your AI different from other resume builders?",
                  answer:
                    "Our AI is uniquely trained on 25+ years of Google recruiting experience and generates both resume AND cover letter together. Most tools only do one or the other, and none have our level of recruiter insight built in.",
                },
                {
                  question: "Do I get both a resume and cover letter?",
                  answer:
                    "Yes! Unlike other tools, our AI generates a perfectly matched resume and cover letter pair. Both documents are tailored to your specific job description with consistent messaging and professional formatting.",
                },
                {
                  question: "How long does the AI generation take?",
                  answer:
                    "Typically under 2 minutes. The AI analyzes your resume and job description, then creates both perfectly formatted documents with ATS optimization and recruiter-approved content.",
                },
                {
                  question: "Can I use this for multiple job applications?",
                  answer:
                    "Absolutely! Generate unique resume and cover letter pairs for each job application. The AI tailors both documents specifically to each job description's requirements and keywords.",
                },
                {
                  question: "What makes your ATS optimization better?",
                  answer:
                    "Our AI understands both machine readability AND human preferences. We optimize for ATS systems while maintaining the visual appeal and storytelling that recruiters love, based on real recruiting experience at top companies.",
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
                Ready to Build Your AI-Optimized Resume?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of job seekers who land more interviews with our
                AI-powered resume builder. Get perfectly tailored resumes and
                cover letters that actually work, backed by 25+ years of
                recruiting expertise.
              </p>
              <Button
                size="lg"
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200"
                onClick={navigateToBuilder}
              >
                <Target className="w-5 h-5 mr-2" />
                Build Your AI Resume Now - Free
              </Button>
              <p className="text-gray-500 text-sm mt-4">
                No credit card required • Get both resume + cover letter •
                Professional formatting • Instant download
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
