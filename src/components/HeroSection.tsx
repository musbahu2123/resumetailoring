// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Shield,
  FileText,
  Building2,
} from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function HeroSection({
  isLoggedIn,
  onSignIn,
  onSignOut,
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,182,193,0.1),rgba(255,255,255,0))]"></div>

      <div className="container mx-auto py-16 lg:py-24 px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 mb-6">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Trusted by 1,000+ job seekers worldwide
              </span>
            </div>

            {/* OPTIMIZED H1 SECTION */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Resume Builder
              </span>
              <br />
              <span className="text-gray-800">Tailored to Any Job</span>
            </h1>

            {/* OPTIMIZED SUBHEADLINE */}
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              <strong>Beat the ATS bots and impress recruiters.</strong> Upload
              your resume, paste any job description, and our AI instantly
              generates a tailored resume
              <strong> and cover letter</strong> optimized for Applicant
              Tracking Systems.
            </p>

            {/* Feature Points - OPTIMIZED */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  AI Cover Letter Generator
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  98% ATS Success Rate
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Recruiter-Approved Templates
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Tailor in 30 Seconds
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-10">
              {isLoggedIn ? (
                <Button
                  onClick={onSignOut}
                  className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 group"
                  onClick={onSignIn}
                >
                  Tailor My Resume Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              <Button
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-gray-300 bg-white/80 hover:bg-white hover:border-gray-400 transition-all duration-200"
              >
                See Examples
              </Button>
            </div>

            {/* OPTIMIZED Trust Badges */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Includes AI Cover Letter Generator</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Free forever - no credit card required</span>
              </div>
            </div>
          </div>

          {/* Right Content - Template Showcase */}
          <div className="lg:w-1/2 relative">
            {/* Template Grid */}
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Classic Template */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                <div className="relative bg-white rounded-xl p-3 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                    <Image
                      src="/images/templates/classic.jpg"
                      alt="ATS-Friendly Classic Resume Template - Professional & Timeless"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-sm font-medium text-gray-800">
                      Classic
                    </span>
                    <p className="text-xs text-gray-500">
                      Professional & Timeless
                    </p>
                  </div>
                </div>
              </div>

              {/* Creative Template */}
              <div className="relative group mt-8">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
                <div className="relative bg-white rounded-xl p-3 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                    <Image
                      src="/images/templates/creative.jpg"
                      alt="Modern Creative Resume Template - ATS Optimized"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-sm font-medium text-gray-800">
                      Creative
                    </span>
                    <p className="text-xs text-gray-500">Modern & Engaging</p>
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                ATS Friendly
              </div>
              <div className="absolute -bottom-2 -left-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">
                Recruiter Approved
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">98%</div>
                <div className="text-xs text-gray-600">ATS Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
