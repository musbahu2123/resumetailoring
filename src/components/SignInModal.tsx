// components/SignInModal.tsx - FINAL VERSION
"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function SignInModal({
  isOpen,
  onClose,
  message,
}: SignInModalProps) {
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-xl border-0 shadow-xl bg-white">
        {/* ✅ REMOVED DUPLICATE CLOSE BUTTON */}

        <DialogHeader className="text-center pt-4">
          {/* ✅ Logo */}
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
            <div className="relative h-14 w-14">
              <Image
                src="/favicon.png"
                alt="Resume Tailor Logo"
                fill
                className="object-contain rounded-lg"
                sizes="56px"
              />
            </div>
          </div>

          {/* ✅ CENTERED TITLE WITH NAVBAR GRADIENT */}
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ResumeTailorApp
          </DialogTitle>

          <DialogDescription className="text-gray-600 pt-2 text-center">
            {message ||
              "Get free credits once signed up to build, enhance, and tailor your resume!"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-6">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 shadow-sm py-3.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 font-medium hover:shadow-md"
          >
            <FcGoogle size={22} />
            <span className="text-sm font-semibold">Continue with Google</span>
          </Button>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Sign up in seconds
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <p className="text-xs text-center text-gray-500">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
