// In your landing page component - Complete updated version with double setTimeout for robustness
"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Upload, FileText, Sparkles, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import JobDescriptionSection from "@/components/JobDescriptionSection";
import ResultsSection from "@/components/ResultsSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Loader from "@/components/Loader";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

function SignInModal({ isOpen, onClose, onSignIn }: SignInModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
          <DialogDescription>
            Choose your preferred method to sign in.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            onClick={onSignIn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#FFFFFF"
            >
              <path
                d="M12.24 10.232c-1.12.0-2.03.88-2.03 1.95s.91 1.95 2.03 1.95c1.06 0 1.87-.71 2.01-1.74l-.01-.01c.01-.03.02-.06.02-.09 0-.01-.01-.02-.01-.04l.01-.01a1.85 1.85 0 0 0 .04-.42c0-1.07-.91-1.95-2.03-1.95zM22.61 11.96c0-1.13-.1-2.19-.28-3.23a9.7 9.7 0 0 0-.8-2.58A10.1 10.1 0 0 0 20.3 3.61c-.52-.52-1.12-.96-1.77-1.34-1.28-.7-2.73-1.04-4.26-1.04-2.88 0-5.46 1.4-7.07 3.51a10.02 10.02 0 0 0-3.69 7.42c0 2.21.84 4.25 2.25 5.86s3.32 2.41 5.46 2.41c1.53 0 2.97-.34 4.26-1.04 1.28-.7 2.37-1.68 3.16-2.9l-1.64-1.11c-.5.77-1.11 1.4-1.84 1.88-.73.48-1.57.72-2.48.72-1.2 0-2.28-.46-3.13-1.34s-1.27-2.04-1.27-3.32c0-1.28.45-2.4 1.27-3.32s1.93-1.34 3.13-1.34c1.08 0 2.02.43 2.76 1.23l1.83-1.06c-.84-.79-1.86-1.42-3.03-1.88z"
                fill="currentColor"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [extractedPdfText, setExtractedPdfText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<{
    tailoredResume: string;
    coverLetter: string;
    atsScore: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // States for retailor functionality
  const [retailorSuccess, setRetailorSuccess] = useState(false);
  const [forceActiveTab, setForceActiveTab] = useState<
    "build" | "docx" | "pdf" | "paste"
  >();

  // --- Start Retailor Fix ---

  // ✅ Alternative: Even More Robust Retailor Detection
  useEffect(() => {
    const checkRetailorParams = () => {
      if (typeof window === "undefined") return;

      const urlParams = new URLSearchParams(window.location.search);
      const retailor = urlParams.get("retailor");
      const resumeTextParam = urlParams.get("resume");
      const source = urlParams.get("source");
      const encoding = urlParams.get("encoding");

      if (retailor && resumeTextParam && source === "documents") {
        // Use double setTimeout to ensure React lifecycle is complete
        setTimeout(() => {
          setTimeout(() => {
            try {
              let decodedResume;

              if (encoding === "base64") {
                // Safe Base64 decoding for UTF-8
                decodedResume = decodeURIComponent(
                  atob(resumeTextParam)
                    .split("")
                    .map(
                      (c) =>
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    )
                    .join("")
                );
              } else {
                // Fallback for raw URI encoding
                try {
                  decodedResume = decodeURIComponent(resumeTextParam);
                } catch (uriError) {
                  console.warn("URI decode failed, using raw text");
                  decodedResume = resumeTextParam;
                }
              }

              setResumeText(decodedResume);
              setForceActiveTab("paste");
              setRetailorSuccess(true);

              // Clear URL after everything is settled (1000ms delay for user to see success message)
              setTimeout(() => {
                window.history.replaceState({}, "", window.location.pathname);
              }, 1000);
            } catch (error) {
              console.error("Error processing retailor resume:", error);
              setResumeText(
                "Error loading resume. Please paste your resume manually."
              );
              setForceActiveTab("paste");
            }
          }, 50); // 50ms ensures a slight delay after the first microtask
        }, 0); // Runs as a microtask after initial render
      }
    };

    checkRetailorParams();
  }, []);

  // ✅ Debug Helper
  useEffect(() => {
    // Only log if one of the retailor states is set
    if (forceActiveTab || retailorSuccess || resumeText) {
      console.log("Retailor State Debug:", {
        resumeText: resumeText ? resumeText.substring(0, 50) + "..." : "N/A",
        forceActiveTab,
        retailorSuccess,
      });
    }
  }, [resumeText, forceActiveTab, retailorSuccess]);

  // --- End Retailor Fix ---

  const handleSetResumeFile = (file: File | null) => {
    setResumeFile(file);
    if (file) {
      setResumeText("");
    }
  };

  const handleSetResumeText = (text: string) => {
    setResumeText(text);
    if (text) {
      setResumeFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    if (!jobDescriptionText) {
      setError("Please provide a job description.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("jobDescriptionText", jobDescriptionText);
      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      } else if (resumeText) {
        formData.append("resumeText", resumeText);
      }

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || "Failed to upload data.");
      }

      const tailorResponse = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: uploadData.jobId }),
      });

      const tailorData = await tailorResponse.json();

      if (!tailorResponse.ok) {
        throw new Error(tailorData.message || "Failed to tailor resume.");
      }

      setResults(tailorData);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadResume = async (templateId: string) => {
    if (!results) {
      setError("No resume to download. Please generate it first.");
      return;
    }

    try {
      const downloadData = {
        tailoredResumeText: results.tailoredResume,
        coverLetterText: results.coverLetter,
        documentType: "resume",
        templateId,
        format: "pdf",
      };

      const downloadResponse = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downloadData),
      });

      if (!downloadResponse.ok) {
        throw new Error("Failed to download resume.");
      }

      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "tailored-resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unknown error occurred during download."
      );
    }
  };

  const handleDownloadCoverLetter = async (templateId: string) => {
    if (!results) {
      setError("No cover letter to download. Please generate it first.");
      return;
    }

    try {
      const downloadData = {
        tailoredResumeText: results.tailoredResume,
        coverLetterText: results.coverLetter,
        documentType: "coverLetter",
        templateId,
        format: "pdf",
      };

      const downloadResponse = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downloadData),
      });

      if (!downloadResponse.ok) {
        throw new Error("Failed to download cover letter.");
      }

      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "cover-letter.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unknown error occurred during download."
      );
    }
  };

  const isButtonDisabled = isLoading || !jobDescriptionText;

  const handleSignIn = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <HeroSection
        isLoggedIn={isLoggedIn}
        onSignIn={() => setIsModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Retailor Success Message */}
      {retailorSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">Resume Loaded Successfully!</p>
              <p className="text-sm text-green-600">
                Switched to Paste Text tab automatically
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Form Section with Gradient Background */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Build Your Perfect Resume
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you have a resume to tailor or need to build one from
              scratch - we'll create the perfect application for any job
              description.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Upload or Paste</h3>
              <p className="text-gray-600">
                PDF, DOCX, or just paste your resume text
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Job Description</h3>
              <p className="text-gray-600">
                Paste any job description to target
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get tailored resume and cover letter
              </p>
            </div>
          </div>

          {!results ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UploadSection
                  resumeFile={resumeFile}
                  setResumeFile={handleSetResumeFile}
                  resumeText={resumeText}
                  setResumeText={handleSetResumeText}
                  onPdfTextExtracted={(text) => {
                    setResumeText(text);
                    setExtractedPdfText(text);
                  }}
                  forceActiveTab={forceActiveTab}
                />
                <JobDescriptionSection
                  jobDescriptionText={jobDescriptionText}
                  setJobDescriptionText={setJobDescriptionText}
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="px-16 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
                  disabled={isButtonDisabled}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader />
                      Generating Your Resume...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Create Perfect Application
                    </span>
                  )}
                </Button>

                {error && (
                  <p className="text-red-500 mt-4 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                    {error}
                  </p>
                )}

                <p className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <Lock size={16} />
                  Your files are private and secure
                </p>

                {!resumeText && !resumeFile && (
                  <p className="text-sm text-blue-600 mt-3 bg-blue-50 p-2 rounded-lg">
                    💡 Don't have a resume? No problem! We'll build one for you
                    based on the job description.
                  </p>
                )}
              </div>
            </form>
          ) : (
            <ResultsSection
              results={results}
              onDownloadResume={handleDownloadResume}
              onDownloadCoverLetter={handleDownloadCoverLetter}
              onReset={() => setResults(null)}
            />
          )}
        </div>
      </section>

      <FeaturesSection />
      <PricingSection onSignIn={() => setIsModalOpen(true)} />
      <TestimonialsSection />
      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignIn={handleSignIn}
      />
    </>
  );
}
