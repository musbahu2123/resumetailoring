// components/ExpertAdviceSection.tsx
"use client";

import {
  Play,
  Quote,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  FileText,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ExpertAdviceSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section
      id="expert-advice"
      className="relative py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.08),rgba(255,255,255,0))]"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Recruiter Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            What Top Recruiters Actually Want
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Direct from Google's recruiting team lead - learn why clean,
            ATS-optimized resumes like yours get more interviews
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Video Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {!isVideoPlaying ? (
                <div
                  className="relative aspect-video bg-gray-100 cursor-pointer group overflow-hidden"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  {/* YouTube Thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src="https://img.youtube.com/vi/TNwjmzqCuMo/maxresdefault.jpg"
                        alt="Google Recruiter Resume Advice"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-all duration-300">
                        <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                          <div className="w-20 h-20 bg-white/95 rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl border-2 border-blue-500">
                            <Play className="w-8 h-8 text-blue-600 ml-1" />
                          </div>
                          <p className="text-white font-semibold text-lg drop-shadow-lg">
                            Watch Google Recruiter Advice
                          </p>
                          <p className="text-gray-200 text-sm mt-1 drop-shadow-lg">
                            2 minutes • Direct from Google
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/TNwjmzqCuMo?autoplay=1"
                  title="Google Recruiter Resume Advice"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                ></iframe>
              )}
            </div>

            {/* ResumeTailor Value Proposition */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">
                    Why ResumeTailor Creates Better Resumes
                  </h4>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Unlike fancy templates that fail ATS scans, we build{" "}
                    <strong>clean, recruiter-friendly resumes</strong>
                    that pass automated systems and impress human reviewers -
                    just like the examples you saw.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-6">
            {/* Recruiter Pain Points */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-semibold text-red-800 text-lg">
                  🚩 Why Fancy Resumes Fail
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  </div>
                  <span className="text-red-700 text-sm">
                    <strong>Untailored resumes:</strong> "It's very difficult
                    and time-consuming for me to understand why your background
                    aligns with the role"
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  </div>
                  <span className="text-red-700 text-sm">
                    <strong>Graphics break ATS:</strong> Fancy templates with
                    columns and graphics don't scan properly in automated
                    systems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  </div>
                  <span className="text-red-700 text-sm">
                    <strong>Errors create doubt:</strong> "Having a resume with
                    even one typo shows that you're not really detail-oriented"
                  </span>
                </li>
              </ul>
            </div>

            {/* ResumeTailor Solutions */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-800 text-lg">
                  ✅ How ResumeTailorApp Solves This
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-green-700 text-sm">
                    <strong>ATS-optimized templates:</strong> Clean formats like
                    ours that pass every automated system
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-green-700 text-sm">
                    <strong>AI-powered tailoring:</strong> Automatically matches
                    your skills to specific job requirements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  </div>
                  <span className="text-green-700 text-sm">
                    <strong>Error-free results:</strong> Eliminates typos and
                    formatting issues that create recruiter doubts
                  </span>
                </li>
              </ul>
            </div>

            {/* Template Showcase */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-800 text-lg">
                  📄 Professional Templates Included
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                  <p className="text-blue-700 text-xs mt-2 font-medium">
                    Classic & Minimalist
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded mb-2"></div>
                    <div className="h-2 bg-gray-200 rounded mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </div>
                  <p className="text-blue-700 text-xs mt-2 font-medium">
                    Modern & Creative
                  </p>
                </div>
              </div>
              <p className="text-blue-700 text-sm mt-4 text-center">
                All templates are <strong>ATS-friendly</strong> and{" "}
                <strong>recruiter-approved</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Stop Using Fancy Templates That Fail
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Create clean, ATS-optimized resumes that actually get seen by
              recruiters and land interviews.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl">
              Create Your ATS-Friendly Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
