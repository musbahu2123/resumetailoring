import Link from "next/link";
import { Sparkles, Mail, Twitter, Github } from "lucide-react";

export default function Footer() {
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
                ResumeTailor
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              AI-powered resume building and tailoring that helps you land your
              dream job. Perfectly optimized for ATS systems and recruiters.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-red-400 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100">Product</h3>
            <div className="space-y-2">
              <Link
                href="/features"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Features
              </Link>
              <Link
                href="/templates"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Templates
              </Link>
              <Link
                href="/pricing"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Pricing
              </Link>
              <Link
                href="/api"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                API
              </Link>
            </div>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100">Resources</h3>
            <div className="space-y-2">
              <Link
                href="/blog"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Blog
              </Link>
              <Link
                href="/docs"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Documentation
              </Link>
              <Link
                href="/support"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Support
              </Link>
              <Link
                href="/community"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Community
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-100">Company</h3>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                About
              </Link>
              <Link
                href="/careers"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Contact
              </Link>
              <Link
                href="/press"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Press
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
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-white transition-colors"
                >
                  Cookies
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/earn-credits"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                💰 Earn Credits
              </Link>
              <div className="text-sm text-gray-400">
                Made with ❤️ for job seekers
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
