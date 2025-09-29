"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  LogIn,
  UserCheck,
  FileText,
  Settings,
  LogOut,
  Menu,
  Sparkles,
  Crown,
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
      <nav className="flex items-center justify-between p-4 px-6 bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <Link href="/" className="flex items-center space-x-2">
          {/* Updated SVG Logo with Gradient */}
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ResumeTailor
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/settings"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              settings
            </Link>
            {/* <Link
              href="/pricing"
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Pricing
            </Link> */}
            {session && (
              <Link
                href="/documents"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Documents
              </Link>
            )}
          </div>

          {session ? (
            <div className="flex items-center space-x-4">
              {/* Pro Badge if user is subscribed */}
              {session.user?.subscription === "pro" && (
                <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Crown size={14} />
                  <span>Pro</span>
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-gray-300 hover:border-blue-300"
                  >
                    <Menu size={18} className="text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/documents"
                      className="flex items-center gap-2 cursor-pointer text-gray-700"
                    >
                      <FileText size={16} />
                      My Documents
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 cursor-pointer text-gray-700"
                    >
                      <Settings size={16} />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer text-red-600"
                  >
                    <LogOut size={16} />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-600 hidden md:flex"
                onClick={() => setIsModalOpen(true)}
              >
                <LogIn size={16} /> Sign In
              </Button>
              <Button
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                <UserCheck size={16} /> Get Started
              </Button>
            </div>
          )}
        </div>
      </nav>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
