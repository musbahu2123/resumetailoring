import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  ArrowRight,
  Crown,
  Users,
  CheckCircle,
  // ADDED NEW ICONS FOR THE TEMPLATE SECTION
  Shield,
  Zap,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Free AI Resume Tools - Professional Document Generators",
  description:
    "Access all our free AI-powered resume tools. Generate biodata formats, resignation letters, skills sections, and more instantly.",
};

const tools = [
  {
    id: "biodata-format-generator",
    name: "Biodata Format Generator",
    description: "Create professional, ATS-optimized biodata formats instantly",
    icon: FileText,
  },
  {
    id: "two-weeks-notice-generator",
    name: "Two Weeks Notice Generator",
    description: "Generate professional resignation letters with proper notice",
    icon: FileText,
  },
  {
    id: "skills-section-generator",
    name: "Skills Section Generator",
    description: "Create ATS-optimized skills sections for your resume",
    icon: FileText,
  },
  {
    id: "maternity-leave-letter-generator",
    name: "Maternity Leave Generator",
    description: "Professional maternity leave application letters",
    icon: FileText,
  },
  {
    id: "high-school-resume-examples",
    name: "High School Resume Maker",
    description: "Resumes for students with little or no work experience",
    icon: FileText,
  },
  {
    id: "resignation-letter-generator",
    name: "Resignation Letter Generator",
    description: "Professional resignation letters for any situation",
    icon: FileText,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Gradient */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Free AI Tools Collection
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Free AI Resume Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Access our suite of AI-powered tools to create professional
            documents instantly
          </p>
        </div>

        {/* MAIN GRID - Only for Tools section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* LEFT SIDEBAR - Sticky for Tools section only */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              {/* AI Resume Builder CTA - Reduced Size */}
              <div className="bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
                {/* Sponsored Badge */}
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                    <Crown className="w-3 h-3" />
                    <span>Sponsored</span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-lg mb-3">
                    AI Resume Builder ✨
                  </h3>
                  <p className="text-orange-100 text-sm mb-4">
                    Let AI format your resume - 100% no typos & ATS friendly
                  </p>

                  {/* Single Template Image - Classic */}
                  <div className="mb-4">
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden mb-2">
                        <Image
                          src="/images/templates/classic.jpg"
                          alt="Classic Resume Template"
                          width={160}
                          height={213}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white/90 text-sm font-medium">
                        Classic Template
                      </p>
                      <p className="text-white/70 text-xs">
                        Professional & Timeless
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-orange-200 mb-4">
                    <div className="flex items-center justify-center gap-1">
                      <span>⭐</span>
                      <span>1# Product of the Week</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold py-2 text-sm shadow-lg"
                  asChild
                >
                  <Link href="/">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Resume With AI
                  </Link>
                </Button>

                <p className="text-xs text-orange-200 text-center mt-2">
                  By pressing you agree to our Terms & Privacy Policy
                </p>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT - 3/4 width for Tools grid */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <span>10,000+ Tools Used Today</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>AI-Powered</span>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-center">
                Choose Your Tool
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="group bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
                      <span>Use Tool</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Why Use Our AI Tools?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Instant Generation
                    </h4>
                    <p className="text-gray-600">
                      Get professional content in seconds with AI automation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Error-Free Results
                    </h4>
                    <p className="text-gray-600">
                      No typos, perfect formatting every time with ATS
                      optimization
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Recruiter Approved
                    </h4>
                    <p className="text-gray-600">
                      Formats that pass ATS systems and impress hiring managers
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Professional Quality
                    </h4>
                    <p className="text-gray-600">
                      AI-powered content that meets industry standards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UPDATED BOTTOM TEMPLATES SECTION - SINGLE BIG TEMPLATE */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-6xl">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-2xl p-8 lg:p-12 text-white text-center overflow-hidden">
              {/* Main Header */}
              <div className="text-center mb-8">
                <h3 className="text-4xl font-bold mb-4">
                  Stop Manual Formatting! 🚀
                </h3>
                <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                  Let AI build your perfect resume in minutes - no formatting,
                  no typos, just results
                </p>
              </div>

              {/* Single Big Template with Content */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-8">
                {/* Big Template Image */}
                <div className="flex-1 max-w-md lg:max-w-lg">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/images/templates/creative.jpg"
                        alt="Professional ATS Resume Template"
                        width={400}
                        height={533}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content & Benefits */}
                <div className="flex-1 text-left space-y-6">
                  <div>
                    <h4 className="font-bold text-2xl mb-3">
                      Professional ATS Resume Template
                    </h4>
                    <p className="text-blue-100 text-lg mb-4">
                      The only resume template you'll ever need. Designed to
                      pass every ATS system and impress recruiters.
                    </p>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-green-300 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">
                          100% ATS Compatible
                        </div>
                        <div className="text-blue-200 text-sm">
                          Passes every Applicant Tracking System
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">
                          AI-Powered Formatting
                        </div>
                        <div className="text-blue-200 text-sm">
                          No manual formatting - AI does it all
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-blue-300 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">
                          Recruiter Approved
                        </div>
                        <div className="text-blue-200 text-sm">
                          Impress hiring managers instantly
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">
                          Zero Typos Guaranteed
                        </div>
                        <div className="text-blue-200 text-sm">
                          Perfect formatting every time
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Success Stats */}
                  <div className="bg-white/10 rounded-xl p-4 mt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-bold text-white text-2xl">3x</div>
                        <div className="text-blue-200 text-sm">
                          More Interviews
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-white text-2xl">98%</div>
                        <div className="text-blue-200 text-sm">ATS Success</div>
                      </div>
                      <div>
                        <div className="font-bold text-white text-2xl">
                          5min
                        </div>
                        <div className="text-blue-200 text-sm">Create Time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Big CTA Button */}
              <div className="text-center mt-8">
                <Button
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-6 px-16 text-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href="/">
                    <Sparkles className="w-6 h-6 mr-3" />
                    Create Your Resume Now - Free
                  </Link>
                </Button>
                <p className="text-blue-200 text-lg mt-4">
                  Join 10,000+ professionals who landed their dream job with our
                  AI builder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
