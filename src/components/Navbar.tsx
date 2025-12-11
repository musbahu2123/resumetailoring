// components/Navbar.tsx - UPDATED WITH PRICING
"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  LogIn,
  UserCheck,
  FileText,
  Settings,
  LogOut,
  Menu,
  Sparkles,
  Crown,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import SignInModal from "@/components/SignInModal";

export default function Navbar() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 px-4 sm:px-6 bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        {/* ✅ UPDATED LOGO WITH YOUR IMAGE */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="relative w-8 h-8">
            <Image
              src="/favicon.png"
              alt="ResumeTailorApp Logo"
              fill
              className="object-contain rounded-lg"
              sizes="32px"
            />
          </div>
          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <span className="hidden sm:inline">ResumeTailorApp</span>
            <span className="sm:hidden">ResumeTailor</span>
          </span>
        </Link>

        {/* Centered Navigation Links */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 space-x-8">
          {/* Blog Link */}
          <Link
            href="/blog"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
          >
            <BookOpen size={16} />
            Blog
          </Link>

          {/* Free Tools Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                <FileText size={16} />
                Free Tools
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-64 bg-white border border-gray-200 shadow-lg"
            >
              <DropdownMenuLabel>AI Resume Tools</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/tools/biodata-format-generator"
                  className="flex items-center gap-2 cursor-pointer w-full"
                >
                  <Sparkles size={14} />
                  Biodata Format Generator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tools/two-weeks-notice-generator"
                  className="flex items-center gap-2 cursor-pointer w-full"
                >
                  <Sparkles size={14} />
                  Two Weeks Notice Generator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tools/skills-section-generator"
                  className="flex items-center gap-2 cursor-pointer w-full"
                >
                  <Sparkles size={14} />
                  Skills Section Generator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/tools/maternity-leave-letter-generator"
                  className="flex items-center gap-2 cursor-pointer w-full"
                >
                  <Sparkles size={14} />
                  Maternity Leave Generator
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/tools"
                  className="flex items-center gap-2 cursor-pointer text-blue-600 font-semibold w-full"
                >
                  <FileText size={14} />
                  View All Tools
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Navigation Links - Only show when logged in */}
          {session && (
            <>
              {/* ✅ NEW: Upgrade Link */}
              <Link
                href="/pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1"
              >
                <Crown size={16} className="text-orange-500" />
                Upgrade
              </Link>

              <Link
                href="/documents"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Documents
              </Link>
              <Link
                href="/settings"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Settings
              </Link>
            </>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {session ? (
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Pro Badge if user is subscribed */}
              {session.user?.subscription === "pro" && (
                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Crown size={14} />
                  <span>Pro</span>
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-300 hover:border-blue-300 w-9 h-9 sm:w-10 sm:h-10"
                  >
                    <Menu size={18} className="text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white border border-gray-200 shadow-lg"
                >
                  {/* Blog in dropdown for mobile */}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/blog"
                      className="flex items-center gap-2 cursor-pointer text-gray-700 md:hidden w-full"
                    >
                      <BookOpen size={16} />
                      Blog
                    </Link>
                  </DropdownMenuItem>

                  {/* Free Tools in dropdown for mobile */}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/tools"
                      className="flex items-center gap-2 cursor-pointer text-gray-700 md:hidden w-full"
                    >
                      <FileText size={16} />
                      Free Tools
                    </Link>
                  </DropdownMenuItem>

                  {/* ✅ NEW: Upgrade in mobile menu */}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/pricing"
                      className="flex items-center gap-2 cursor-pointer text-gray-700 w-full md:hidden"
                    >
                      <Crown size={16} className="text-orange-500" />
                      Upgrade
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/documents"
                      className="flex items-center gap-2 cursor-pointer text-gray-700 w-full"
                    >
                      <FileText size={16} />
                      My Documents
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 cursor-pointer text-gray-700 w-full"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-red-600 w-full"
                  >
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600 hidden sm:flex"
                onClick={() => setIsModalOpen(true)}
                size="sm"
              >
                <LogIn size={16} />
                <span className="hidden sm:inline">Sign In</span>
              </Button>

              <Button
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setIsModalOpen(true)}
                size="sm"
              >
                <UserCheck size={16} />
                <span className="hidden xs:inline">Get Started</span>
                <span className="xs:hidden">Start</span>
              </Button>

              {/* Mobile menu for non-logged in users */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-300 hover:border-blue-300 md:hidden w-9 h-9"
                  >
                    <Menu size={18} className="text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white border border-gray-200 shadow-lg"
                >
                  {/* Blog in dropdown for mobile */}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/blog"
                      className="flex items-center gap-2 cursor-pointer text-gray-700 md:hidden w-full"
                    >
                      <BookOpen size={16} />
                      Blog
                    </Link>
                  </DropdownMenuItem>

                  {/* Free Tools in dropdown for mobile */}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/tools"
                      className="flex items-center gap-2 cursor-pointer text-gray-700 md:hidden w-full"
                    >
                      <FileText size={16} />
                      Free Tools
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setIsModalOpen(true)}
                    className="w-full"
                  >
                    <LogIn size={16} />
                    Sign In
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </nav>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
