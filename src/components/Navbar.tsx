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
      <nav className="flex items-center justify-between p-4 px-6 bg-white shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          {/* SVG Logo */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[var(--color-primary)]"
          >
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <path
              d="M10 16L14 20L22 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-2xl font-bold tracking-tighter text-[var(--color-primary)]">
            ResumeTailorAI
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/pricing"
            className="text-gray-600 hover:text-[var(--color-primary)] transition-colors hidden md:block"
          >
            Pricing
          </Link>
          {session ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/documents"
                className="text-gray-600 hover:text-[var(--color-primary)] transition-colors hidden md:block"
              >
                Documents
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Menu size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/documents"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <FileText size={16} />
                      Documents
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 cursor-pointer"
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
            <>
              <Button
                variant="outline"
                className="flex items-center gap-2 hidden md:flex"
                onClick={() => setIsModalOpen(true)}
              >
                <LogIn size={18} /> Login
              </Button>
              <Button
                className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                onClick={() => setIsModalOpen(true)}
              >
                <UserCheck size={18} /> Register
              </Button>
            </>
          )}
        </div>
      </nav>
      <SignInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
