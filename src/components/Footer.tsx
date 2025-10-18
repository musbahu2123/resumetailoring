"use client";
import Link from "next/link";
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
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ResumeTailorApp
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              AI-powered resume and cover letter tailoring that helps you land
              your dream job. Perfectly optimized for ATS systems.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/your-repo"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:resumetailorapp@gmail.com"
                className="text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100 flex items-center gap-2">
              <FileText size={16} />
              Free AI Tools
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/tools/biodata-format-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <Sparkles size={12} />
                Biodata Generator
              </Link>
              <Link
                href="/tools/two-weeks-notice-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <Sparkles size={12} />
                Two Weeks Notice
              </Link>
              <Link
                href="/tools/skills-section-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <Sparkles size={12} />
                Skills Generator
              </Link>
              <Link
                href="/tools/maternity-leave-letter-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <Sparkles size={12} />
                Maternity Leave
              </Link>
              <Link
                href="/tools/high-school-resume-examples"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <Sparkles size={12} />
                High School Resume
              </Link>
            </div>
          </div>

          {/* More Tools & Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100 flex items-center gap-2">
              <LayoutTemplate size={16} />
              More Resources
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <Link
                href="/tools/resignation-letter-generator"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <Sparkles size={12} />
                Resignation Letter
              </Link>
              <Link
                href="/free-resume-templates"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <LayoutTemplate size={12} />
                All Templates
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2"
              >
                <BookOpen size={12} />
                Career Blog
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
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Contact Support
              </Link>
              <Link
                href="/faq"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                FAQ
              </Link>
              <Link
                href="/privacy"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
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
              <span>&copy; 2025 ResumeTailor. All rights reserved.</span>
              <div className="flex space-x-4">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors text-sm"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors text-sm"
                >
                  Terms
                </Link>
                <Link
                  href="/support"
                  className="hover:text-white transition-colors text-sm"
                >
                  Support
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with ❤️ for job seekers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
