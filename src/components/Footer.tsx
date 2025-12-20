"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Mail,
  Github,
  FileText,
  BookOpen,
  LayoutTemplate,
  HelpCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                <Image
                  src="/favicon.png"
                  alt="ResumeTailorApp Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  ResumeTailorApp
                </span>
                <p className="text-gray-300 text-sm mt-1">
                  AI Resume Builder & Tailor
                </p>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              AI-powered resume and cover letter tailoring that helps you land
              your dream job. Perfectly optimized for ATS systems.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/your-repo"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={18} />
              </a>
              <a
                href="mailto:resumetailorapp@gmail.com"
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100 flex items-center gap-2">
              <FileText size={16} />
              Free AI Tools
            </h3>
            <div className="space-y-2">
              <Link
                href="/tools/biodata-format-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Biodata Generator
              </Link>
              <Link
                href="/tools/two-weeks-notice-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Two Weeks Notice
              </Link>
              <Link
                href="/tools/skills-section-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Skills Generator
              </Link>
              <Link
                href="/tools/maternity-leave-letter-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Maternity Leave
              </Link>
            </div>
          </div>

          {/* More Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100 flex items-center gap-2">
              <LayoutTemplate size={16} />
              Resources
            </h3>
            <div className="space-y-2">
              <Link
                href="/free-resume-templates"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Free Templates
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Career Blog
              </Link>
              <Link
                href="/#builder"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                AI Resume Builder
              </Link>
              <Link
                href="/cover-letter-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Cover Letter Generator
              </Link>
            </div>
          </div>

          {/* Support & Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100 flex items-center gap-2">
              <HelpCircle size={16} />
              Support
            </h3>
            <div className="space-y-2">
              <Link
                href="/support"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Contact Support
              </Link>
              <Link
                href="/faq"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                FAQ
              </Link>
              <Link
                href="/privacy"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-300 hover:text-white transition-colors text-sm block py-1"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
              <span>&copy; 2025 ResumeTailorApp. All rights reserved.</span>
              <div className="flex space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/support"
                  className="hover:text-white transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-4 h-4 bg-white/5 rounded flex items-center justify-center">
                <Image
                  src="/favicon.png"
                  alt="Logo"
                  width={12}
                  height={12}
                  className="object-contain"
                />
              </div>
              <span>Made for job seekers worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
