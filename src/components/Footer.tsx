"use client";
import Link from "next/link";
import { Sparkles, Mail, Github } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto py-12 px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ResumeTailorApp
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
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

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection("builder")}
                className="block text-gray-300 hover:text-white transition-colors text-sm text-left w-full"
              >
                Resume Builder
              </button>
              <Link
                href="/blog"
                className="block text-gray-300 hover:text-white transition-colors text-sm text-left w-full"
              >
                Blog
              </Link>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block text-gray-300 hover:text-white transition-colors text-sm text-left w-full"
              >
                Testimonials
              </button>
              <Link
                href="/free-resume-templates"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Free Templates
              </Link>
            </div>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100">Support</h3>
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
                href="/support"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Report Bug
              </Link>
              <Link
                href="/support"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Feature Request
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100">Legal</h3>
            <div className="space-y-2">
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
              <Link
                href="/cookies"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>&copy; 2024 ResumeTailor. All rights reserved.</span>
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

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Made with ❤️ for job seekers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
