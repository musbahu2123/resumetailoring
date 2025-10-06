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
} from "lucide-react"; // Removed unused icons: FileText, CheckCircle
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Client component for the AI Resume Builder page.
 * Contains all interactive logic, state, and client-side hooks.
 */
export default function AIResumeBuilderClient() {
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
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            AI-Powered Resume Builder
          </div>
          {/* OPTIMIZED H1 WITH KEYWORD */}
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            AI Resume Builder & Tailor
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Create ATS-optimized resumes tailored to any job description. Our AI
            analyzes requirements and generates perfect resumes that get
            interviews.
          </p>
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
              Our AI automatically tailors your resume to any job description,
              optimizes for ATS systems, and generates professional formatting
              instantly.
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
              🚀 Tailored to any job • ATS-optimized • Instant download
            </p>
          </div>
        </div>

        {/* Resume Examples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Professional Resume Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Example 1: Professional Resume */}
            <ResumeExampleCard
              imageSrc="/images/templates/creative.jpg"
              imageAlt="Professional ATS Resume Template - AI-generated example"
              title="Professional ATS Resume"
              description="Clean, ATS-optimized format that passes automated systems and impresses recruiters."
              tags={["ATS Friendly", "Professional", "Recruiter Approved"]}
            />

            {/* Example 2: Modern Resume */}
            <ResumeExampleCard
              imageSrc="/images/templates/classic.jpg"
              imageAlt="Modern Tech Resume Template - Contemporary AI-generated design"
              title="Modern Tech Resume"
              description="Contemporary design perfect for tech companies, startups, and creative roles."
              tags={["Classic Design", "Tech Focused", "Creative Layout"]}
            />
          </div>
        </div>

        {/* Olga's Social Proof */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                Why AI Resume Tailoring Works (From Recruiter with over 25+
                years of experience)
              </h3>
              <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4 py-2">
                "A couple of red flags when I see a resume is that the resume is
                not tailored to the job description, and it's very difficult and
                time-consuming for me to understand why this experience would
                align to this role."
              </blockquote>
              <p className="text-gray-600 text-sm mt-3">
                Our AI resume builder solves this exact problem - automatic
                tailoring to job descriptions.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works - UPDATED */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Upload or Paste Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Upload your existing resume or paste your experience. No resume?
                We'll build one from scratch with AI.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>AI Tailoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Our AI analyzes job descriptions and automatically tailors your
                resume to match key requirements.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Instant Download</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Download your perfectly formatted, ATS-optimized resume and
                cover letter instantly.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

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
                AI-powered resume builder. Get tailored resumes that actually
                work.
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
                No credit card required • 10 free credits included • Instant
                results
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Extracted component for better code organization - Kept here since it uses client hooks (useRouter, useState)
function ResumeExampleCard({
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
    <Card className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <Button
            className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-blue-600 hover:bg-gray-100 shadow-lg border-0"
            onClick={navigateToBuilder}
          >
            Use This Template
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <CardTitle className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 mb-4">
          {description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
