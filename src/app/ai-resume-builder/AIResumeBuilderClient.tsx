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
  Shield,
  FileText,
  Users,
  Wand2,
  Mail,
  FileUp,
  Clipboard,
  Pencil,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AIResumeBuilderClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"build" | "upload" | "paste">(
    "build"
  );

  const navigateToBuilder = () => {
    router.push("/#builder");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero - Clear & Direct */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 px-4 py-2 rounded-lg mb-4">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              No Sign-Up Required • Free AI Resume Builder
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Free AI Resume Builder: Get a Job-Ready Resume in Minutes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Build from scratch or upload existing. Enhance your resume or get a
            complete tailored application.
          </p>

          {/* 4 Clear Options - NOW IN ONE COLUMN */}
          <div className="max-w-6xl mx-auto mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Choose Your Starting Point:
            </h2>

            <div className="flex flex-col md:flex-row gap-3">
              {" "}
              {/* Changed to flex-row on medium screens */}
              {/* Option 1: Build & Enhance */}
              <button
                onClick={navigateToBuilder}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group flex-1 min-w-0" // Added flex-1 for equal width
              >
                <div className="flex flex-col items-center text-center gap-2">
                  {" "}
                  {/* Changed to column layout */}
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    {" "}
                    {/* Smaller */}
                    <Wand2 className="w-4 h-4 text-blue-600" /> {/* Smaller */}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 flex flex-col items-center gap-1">
                      <span>Build from Scratch</span>
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-2 h-2" /> {/* Smaller */}
                        Enhance
                      </span>
                    </h3>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                      {" "}
                      {/* Added line-clamp */}
                      Create new resume with AI guidance
                    </p>
                    <div className="text-xs text-blue-600 font-medium">
                      Start Building →
                    </div>
                  </div>
                </div>
              </button>
              {/* Option 2: Build & Tailor */}
              <button
                onClick={navigateToBuilder}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:border-purple-300 hover:shadow-md transition-all duration-200 text-left group flex-1 min-w-0"
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Pencil className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 flex flex-col items-center gap-1">
                      <span>Build for Job</span>
                      <span className="inline-flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        <Target className="w-2 h-2" />
                        Tailor
                      </span>
                    </h3>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                      Create resume + cover letter
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-purple-600 font-medium">
                      <FileText className="w-2.5 h-2.5" />
                      <Mail className="w-2.5 h-2.5" />
                      <span>Both documents →</span>
                    </div>
                  </div>
                </div>
              </button>
              {/* Option 3: Upload & Enhance */}
              <button
                onClick={navigateToBuilder}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-md transition-all duration-200 text-left group flex-1 min-w-0"
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <Upload className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 flex flex-col items-center gap-1">
                      <span>Upload & Enhance</span>
                      <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-2 h-2" />
                        Enhance
                      </span>
                    </h3>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                      Upload PDF/DOCX files
                    </p>
                    <div className="text-xs text-green-600 font-medium">
                      Upload & Improve →
                    </div>
                  </div>
                </div>
              </button>
              {/* Option 4: Upload & Tailor */}
              <button
                onClick={navigateToBuilder}
                className="p-3 bg-white border border-gray-200 rounded-xl hover:border-pink-300 hover:shadow-md transition-all duration-200 text-left group flex-1 min-w-0"
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
                    <FileUp className="w-4 h-4 text-pink-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 flex flex-col items-center gap-1">
                      <span>Upload & Tailor</span>
                      <span className="inline-flex items-center gap-1 text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                        <Target className="w-2 h-2" />
                        Tailor
                      </span>
                    </h3>
                    <p className="text-xs text-gray-600 mb-1 line-clamp-2">
                      Complete application
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-pink-600 font-medium">
                      <FileText className="w-2.5 h-2.5" />
                      <Mail className="w-2.5 h-2.5" />
                      <span>Both docs →</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Interactive Demo Card - SIMPLIFIED */}
          <Card className="max-w-3xl mx-auto shadow-lg border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Start Guide</CardTitle>
              <CardDescription>
                See how easy it is to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="flex flex-wrap border-b mb-6">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                    activeTab === "build"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("build")}
                >
                  <Wand2 className="w-4 h-4" />
                  Build from Scratch
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "upload"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("upload")}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "paste"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("paste")}
                >
                  <Clipboard className="w-4 h-4 inline mr-2" />
                  Paste Text
                </button>
              </div>

              {/* Content based on active tab */}
              {activeTab === "build" && (
                <div className="text-center py-6">
                  <Wand2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Build Your Resume with AI
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Our AI guides you step-by-step to create a professional
                    resume from scratch.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={navigateToBuilder}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Build & Enhance
                    </Button>
                    <Button
                      onClick={navigateToBuilder}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Build & Tailor
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "upload" && (
                <div className="text-center py-6">
                  <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Upload PDF, DOCX, or Word files. AI will process and enhance
                    them instantly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={navigateToBuilder}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Upload & Enhance
                    </Button>
                    <Button
                      onClick={navigateToBuilder}
                      className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Upload & Tailor
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "paste" && (
                <div className="text-center py-6">
                  <Clipboard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Paste Your Resume Text
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Already have your resume text? Paste it and let AI enhance
                    or tailor it.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={navigateToBuilder}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Paste & Enhance
                    </Button>
                    <Button
                      onClick={navigateToBuilder}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Paste & Tailor
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  Your data is private and secure
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simple CTA */}
          <div className="mt-10 text-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl px-10 py-6 text-lg"
              onClick={navigateToBuilder}
            >
              <Target className="w-5 h-5 mr-2" />
              Get Started Free
            </Button>
            <p className="text-gray-500 text-sm mt-3">
              No credit card • 1 free generation • All features included
            </p>
          </div>
        </div>

        {/* Rest of the page remains the same... */}
        {/* Process Flow - Simplified */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border border-gray-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Start Your Way
                </h3>
                <p className="text-gray-600 text-sm">
                  Build from scratch, upload, or paste text
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border border-gray-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  AI Does the Magic
                </h3>
                <p className="text-gray-600 text-sm">
                  Enhance formatting or tailor for specific jobs
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border border-gray-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Download & Apply
                </h3>
                <p className="text-gray-600 text-sm">
                  Get professional PDFs ready for applications
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: <Target className="w-5 h-5 text-blue-600" />,
                title: "ATS Optimized",
                desc: "Formatted to pass automated tracking systems",
                color: "bg-blue-50",
              },
              {
                icon: <Mail className="w-5 h-5 text-purple-600" />,
                title: "Cover Letters",
                desc: "Matching cover letters generated automatically",
                color: "bg-purple-50",
              },
              {
                icon: <Sparkles className="w-5 h-5 text-green-600" />,
                title: "AI Enhancement",
                desc: "Improve formatting, wording, and impact",
                color: "bg-green-50",
              },
              {
                icon: <FileText className="w-5 h-5 text-pink-600" />,
                title: "Multiple Formats",
                desc: "Upload PDF, DOCX, or paste text",
                color: "bg-pink-50",
              },
              {
                icon: <Users className="w-5 h-5 text-orange-600" />,
                title: "Recruiter-Trained",
                desc: "25+ years of recruiting experience",
                color: "bg-orange-50",
              },
              {
                icon: <Shield className="w-5 h-5 text-indigo-600" />,
                title: "Secure & Private",
                desc: "Your data is never shared or stored",
                color: "bg-indigo-50",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`${feature.color} p-4 rounded-lg border border-transparent`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Job Search?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands who've landed interviews with perfectly tailored
              resumes and cover letters.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6"
              onClick={navigateToBuilder}
            >
              <Target className="w-5 h-5 mr-2" />
              Start Building Free
            </Button>
            <p className="text-gray-500 text-sm mt-4">
              No credit card • All features • Professional results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
