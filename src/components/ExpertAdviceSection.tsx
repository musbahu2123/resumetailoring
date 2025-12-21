// components/ExpertAdviceSection.tsx - UPDATED PROFESSIONAL VERSION
"use client";

import {
  Play,
  Quote,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  FileText,
  Users,
  Shield,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ExpertAdviceSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section id="expert-advice" className="relative py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 px-4 py-2 rounded-lg mb-4">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Expert Recruiter Insights
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Top Recruiters Actually Look For
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Direct insights from leading recruiters - learn why clean, optimized
            resumes perform better
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Video Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              {!isVideoPlaying ? (
                <div
                  className="relative aspect-video bg-gray-100 cursor-pointer group overflow-hidden"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="relative w-full h-full">
                      <Image
                        src="https://img.youtube.com/vi/TNwjmzqCuMo/maxresdefault.jpg"
                        alt="Recruiter Resume Advice"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-6 h-6 text-blue-600 ml-1" />
                          </div>
                          <p className="text-white font-medium text-sm drop-shadow-lg">
                            Watch Expert Advice
                          </p>
                          <p className="text-gray-200 text-xs mt-1 drop-shadow-lg">
                            2 minutes • Recruiter insights
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
                  title="Recruiter Resume Advice"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video"
                ></iframe>
              )}
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center border border-blue-200">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    Professional Resume Standards
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We build clean, recruiter-friendly resumes that pass
                    automated systems and impress human reviewers - exactly what
                    top companies expect.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-6">
            {/* Pain Points */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-red-200 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center border border-red-100">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Why Most Resumes Fail
                  </h3>
                  <p className="text-sm text-gray-500">
                    Common pitfalls to avoid
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">Untailored content:</span>{" "}
                    Recruiters can't easily see how your experience matches the
                    role
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">ATS incompatibility:</span>{" "}
                    Fancy templates with graphics and columns break automated
                    systems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">Attention to detail:</span>{" "}
                    Even minor typos and formatting issues create negative
                    impressions
                  </span>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-green-200 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Our Professional Solution
                  </h3>
                  <p className="text-sm text-gray-500">
                    How we address these issues
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">ATS-optimized formats:</span>{" "}
                    Clean, professional layouts that pass every automated system
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">Precision tailoring:</span>{" "}
                    AI-powered matching of your skills to specific job
                    requirements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 text-sm">
                    <span className="font-medium">Quality assurance:</span>{" "}
                    Automatic error checking and professional formatting
                    standards
                  </span>
                </li>
              </ul>
            </div>

            {/* Templates */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-200 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Professional Templates
                  </h3>
                  <p className="text-sm text-gray-500">
                    Recruiter-approved formats
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                    <div className="h-6 bg-white rounded mb-2 border border-blue-100"></div>
                    <div className="h-1.5 bg-blue-200 rounded mb-1 w-3/4 mx-auto"></div>
                    <div className="h-1.5 bg-blue-200 rounded w-1/2 mx-auto"></div>
                  </div>
                  <p className="text-blue-700 text-xs mt-2 font-medium">
                    Classic Professional
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                    <div className="h-6 bg-white rounded mb-2 border border-purple-100"></div>
                    <div className="h-1.5 bg-purple-200 rounded mb-1 w-3/4 mx-auto"></div>
                    <div className="h-1.5 bg-purple-200 rounded w-1/2 mx-auto"></div>
                  </div>
                  <p className="text-purple-700 text-xs mt-2 font-medium">
                    Modern Clean
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-xs mt-4 text-center">
                All templates are{" "}
                <strong className="text-gray-800">ATS-optimized</strong> and
                follow{" "}
                <strong className="text-gray-800">recruiter standards</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Create Resumes That Actually Get Results
            </h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
              Stop using templates that fail automated systems. Build
              professional resumes that pass ATS and impress recruiters.
            </p>
            <button
              onClick={() => (window.location.href = "#builder")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-md transition-shadow text-sm"
            >
              Build Professional Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
