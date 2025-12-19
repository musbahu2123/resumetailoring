// components/HeroSection.tsx - FINAL IMPROVED VERSION
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  FileText,
  Building2,
  CheckCircle,
  Award,
  Users,
  Wand2,
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
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-100/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto py-16 lg:py-24 px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm mb-6">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">
                Powered by Proven Recruiting Methodologies
              </span>
            </div>

            {/* IMPRESSIVE HEADLINE - INCLUDES AI RESUME BUILDER */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Resume Builder
              </span>
              <br />
              <span className="text-gray-800">Build & Tailor for Any Job</span>
            </h1>

            {/* POWERFUL SUBHEADLINE - INCLUDES BUILD FEATURE */}
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              <strong>
                Build from scratch or enhance your existing resume.
              </strong>{" "}
              Our AI-powered tools help you create professional resumes, then
              tailor them perfectly to any job description to{" "}
              <strong>beat ATS systems</strong> and{" "}
              <strong>land more interviews</strong>.
            </p>

            {/* IMPRESSIVE FEATURE POINTS - INCLUDES BUILD OPTION */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg flex items-center justify-center border border-purple-100">
                  <Wand2 className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">
                    Build from Scratch
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    No resume? Start fresh with AI
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg flex items-center justify-center border border-green-100">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">
                    AI Cover Letter Generator
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Professional letter included
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center border border-blue-100">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">
                    98% ATS Success Rate
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Guaranteed optimization
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-200">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg flex items-center justify-center border border-amber-100">
                  <Zap className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">
                    Tailor in 30 Seconds
                  </span>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Lightning fast results
                  </p>
                </div>
              </div>
            </div>

            {/* POWERFUL CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              {isLoggedIn ? (
                <Button
                  onClick={onSignOut}
                  className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
                >
                  Continue Tailoring
                </Button>
              ) : (
                <Button
                  className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl group"
                  onClick={onSignIn}
                >
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
              <Button
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 rounded-xl"
              >
                View Real Examples
              </Button>
            </div>

            {/* TRUST BADGES - IMPROVED */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg border border-green-100">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>No sign-up for first generation</span>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-3 py-2 rounded-lg border border-blue-100">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Used by 1,000+ professionals</span>
              </div>
            </div>
          </div>

          {/* Right Content - IMPRESSIVE TEMPLATE SHOWCASE */}
          <div className="lg:w-1/2 relative">
            {/* Template Grid with enhanced effects */}
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Classic Template - ENHANCED */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                <div className="relative bg-white rounded-xl p-4 shadow-lg border border-gray-200 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  {/* Template Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded text-xs font-bold z-10 shadow-md">
                    #1 ATS
                  </div>

                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-gray-100">
                    <Image
                      src="/images/templates/classic.jpg"
                      alt="ATS-Friendly Classic Resume Template - Professional & Timeless"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm font-semibold text-gray-800">
                      Classic Professional
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      ATS-Optimized & Timeless
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className="w-2 h-2 bg-amber-400 rounded-full"
                        ></div>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creative Template - ENHANCED */}
              <div className="relative group mt-10">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                <div className="relative bg-white rounded-xl p-4 shadow-lg border border-gray-200 group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  {/* Template Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-2 py-1 rounded text-xs font-bold z-10 shadow-md">
                    MODERN
                  </div>

                  <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-gray-100">
                    <Image
                      src="/images/templates/creative.jpg"
                      alt="Modern Creative Resume Template - ATS Optimized"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm font-semibold text-gray-800">
                      Modern Creative
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Engaging & Professional
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div
                          key={star}
                          className="w-2 h-2 bg-amber-400 rounded-full"
                        ></div>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats - IMPROVED */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-xl z-10">
                <div className="text-center">
                  <div className="text-xl font-bold">98%</div>
                  <div className="text-xs font-medium">ATS Score</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-lg shadow-xl z-10">
                <div className="text-center">
                  <div className="text-xl font-bold">3x</div>
                  <div className="text-xs font-medium">More Interviews</div>
                </div>
              </div>
            </div>

            {/* UPDATED Process Flow Indicator - INCLUDES BUILD */}
            <div className="mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">1</span>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  Build/Upload
                </span>
              </div>
              <div className="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">2</span>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  Enhance/Tailor
                </span>
              </div>

              <div className="w-4 h-0.5 bg-gradient-to-r from-green-400 to-amber-400"></div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-600">3</span>
                </div>
                <span className="text-xs font-medium text-gray-700">
                  Preview & Download
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
