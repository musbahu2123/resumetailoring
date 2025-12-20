// app/page.tsx - PROFESSIONAL VERSION
"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Upload,
  FileText,
  Sparkles,
  Target,
  Crown,
  Wand2,
  CheckCircle,
  Zap,
  Award,
  BarChart,
} from "lucide-react";

import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import JobDescriptionSection from "@/components/JobDescriptionSection";
import ResumePreviewDashboard from "@/components/ResumePreviewDashboard";
import FeaturesSection from "@/components/FeaturesSection";
import ExpertAdviceSection from "@/components/ExpertAdviceSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Loader from "@/components/Loader";
import SignInModal from "@/components/SignInModal";

// ✅ Utility function to generate and manage anonymous ID
const getAnonymousId = () => {
  if (typeof window === "undefined") return null;

  let anonymousId = localStorage.getItem("anonymousId");
  if (!anonymousId) {
    anonymousId =
      "anon_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("anonymousId", anonymousId);
  }
  return anonymousId;
};

// ✅ Check if free generation was used - UPDATED LOGIC
const hasUsedFreeGeneration = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("freeGenerationUsed") === "true";
};

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
    isAnonymous?: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // States for retailor functionality
  const [retailorSuccess, setRetailorSuccess] = useState(false);
  const [forceActiveTab, setForceActiveTab] = useState<
    "build" | "docx" | "pdf" | "paste"
  >();

  // ✅ Track anonymous state
  const [isAnonymousUser, setIsAnonymousUser] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  // ✅ Handle enhanced resumes
  const handleEnhancedResumeReady = (enhancedResumeText: string) => {
    setResults({
      tailoredResume: enhancedResumeText,
      coverLetter: "",
      atsScore: 90,
      isAnonymous: !isLoggedIn,
    });
    setJobDescriptionText("");
  };

  // --- Start Retailor Fix ---
  useEffect(() => {
    const checkRetailorParams = () => {
      if (typeof window === "undefined") return;

      const urlParams = new URLSearchParams(window.location.search);
      const retailor = urlParams.get("retailor");
      const resumeTextParam = urlParams.get("resume");
      const source = urlParams.get("source");
      const encoding = urlParams.get("encoding");

      if (retailor && resumeTextParam && source === "documents") {
        setTimeout(() => {
          try {
            let decodedResume;
            if (encoding === "base64") {
              decodedResume = decodeURIComponent(
                atob(resumeTextParam)
                  .split("")
                  .map(
                    (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                  )
                  .join("")
              );
            } else {
              try {
                decodedResume = decodeURIComponent(resumeTextParam);
              } catch (uriError) {
                decodedResume = resumeTextParam;
              }
            }

            setResumeText(decodedResume);
            setForceActiveTab("paste");
            setRetailorSuccess(true);

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
        }, 50);
      }
    };

    checkRetailorParams();
  }, []);

  // ✅ Check authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (session && session.user) {
          setIsLoggedIn(true);
          localStorage.removeItem("freeGenerationUsed");
          localStorage.removeItem("anonymousId");
          setIsAnonymousUser(false);
        } else {
          setIsLoggedIn(false);
          setIsAnonymousUser(!hasUsedFreeGeneration());
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        setIsAnonymousUser(!hasUsedFreeGeneration());
      }
    };

    checkAuthStatus();
  }, []);

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

  // ✅ UPDATED: Handle form submission with new error handling
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // ✅ REQUIRE both job description AND resume content
    if (!jobDescriptionText) {
      setError("Please provide a job description to tailor your application.");
      setIsLoading(false);
      return;
    }

    if (!resumeText && !resumeFile) {
      setError("Please provide your resume content to tailor for the job.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setShowSignupPrompt(false);

    try {
      const anonymousId = getAnonymousId();

      // ✅ ONLY full tailoring flow
      const formData = new FormData();
      formData.append("jobDescriptionText", jobDescriptionText);

      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      } else if (resumeText) {
        formData.append("resumeText", resumeText);
      }

      const headers: HeadersInit = {};
      if (!isLoggedIn && anonymousId) {
        headers["x-anonymous-id"] = anonymousId;
      }

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        if (uploadResponse.status === 402) {
          // ✅ NEW: Trigger signup modal for anonymous users
          if (!isLoggedIn) {
            setIsModalOpen(true);
            setIsLoading(false);
            return;
          }
          // ✅ For logged-in users, show credit error
          setError(
            "Monthly credits exhausted. Upgrade to Pro or wait till next month"
          );
          setIsLoading(false);
          return;
        }
        throw new Error(uploadData.message || "Failed to upload data.");
      }

      const tailorBody: any = { jobId: uploadData.jobId };
      if (!isLoggedIn && anonymousId) {
        tailorBody.anonymousId = anonymousId;
      }

      const tailorResponse = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tailorBody),
      });

      const tailorData = await tailorResponse.json();

      if (!tailorResponse.ok) {
        if (tailorResponse.status === 402) {
          // ✅ NEW: Different handling based on user type
          if (!isLoggedIn) {
            // Anonymous user - trigger signup modal
            setIsModalOpen(true);
            setIsLoading(false);
            return;
          } else {
            // Logged-in user - show monthly credit error
            setError(
              "Monthly credits exhausted. Upgrade to Pro or wait till next month"
            );
            setIsLoading(false);
            return;
          }
        }
        throw new Error(tailorData.message || "Failed to tailor resume.");
      }

      // ✅ UPDATED: Track anonymous usage
      if (!isLoggedIn && tailorData.isAnonymous) {
        localStorage.setItem("freeGenerationUsed", "true");
        setIsAnonymousUser(false);
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

  // ✅ Download handler
  const handleDownload = async (
    templateId: string,
    documentType: "resume" | "coverLetter" = "resume"
  ) => {
    if (!results) {
      setError(`No ${documentType} to download. Please generate it first.`);
      return;
    }

    try {
      const downloadData = {
        tailoredResumeText: results.tailoredResume,
        coverLetterText: results.coverLetter,
        documentType: documentType,
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
        throw new Error(`Failed to download ${documentType}.`);
      }

      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const filename =
        documentType === "resume" ? "tailored-resume.pdf" : "cover-letter.pdf";
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log(
        `✅ Successfully downloaded ${documentType} with template: ${templateId}`
      );
    } catch (err) {
      console.error("Download Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unknown error occurred during download."
      );
    }
  };

  // ✅ Button disabled state
  const isButtonDisabled =
    isLoading || !jobDescriptionText || (!resumeText && !resumeFile);

  // ✅ UPDATED: Button text with clear messaging
  const getButtonText = () => {
    if (isLoading) {
      return "Tailoring Your Application...";
    }

    if (!isLoggedIn && !isAnonymousUser) {
      // ✅ CLEAR MESSAGE: User has used their free generation
      return "Sign Up for Free Credits";
    }

    // ✅ ALWAYS show "Create Perfect Application" for the main button
    return "Tailor Perfect Application";
  };

  // ✅ Sign in handler
  const handleSignIn = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
    setShowSignupPrompt(false);
    localStorage.removeItem("freeGenerationUsed");
    localStorage.removeItem("anonymousId");
    setIsAnonymousUser(false);

    // ✅ Refresh the page to get fresh state with 3 credits
    window.location.reload();
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("freeGenerationUsed");
    localStorage.removeItem("anonymousId");
    setIsAnonymousUser(true);
  };

  // ✅ UPDATED: Handle enhance-resume error with pricing redirect
  const handleEnhanceError = (errorMessage: string) => {
    if (errorMessage.includes("Sign up to get free generations")) {
      setIsModalOpen(true);
      setError(null);
    } else if (errorMessage.includes("Monthly credits exhausted")) {
      // Don't set error, let the user click the button below
      setError(
        "Monthly credits exhausted. Upgrade to Pro or wait till next month"
      );
    } else {
      setError(errorMessage);
    }
  };

  return (
    <div className="overflow-x-hidden">
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

      {/* Main Form Section - COMPRESSED */}
      <section
        id="builder"
        className="relative py-12 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Compressed Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg px-4 py-2 mb-4">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-blue-800">
                Recruiter-Powered AI Builder
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Build Your Perfect Resume
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Get a job-specific resume + cover letter in 2 minutes
            </p>

            <div className="flex flex-wrap gap-2 justify-center items-center mb-4">
              <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                <span>1 free generation</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                <span>3 free credits/month</span>
              </div>
            </div>
          </div>

          {/* Mini Stats - Horizontal */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <div className="text-center bg-white px-4 py-2 rounded-lg border border-gray-100 min-w-[100px]">
              <div className="text-lg font-bold text-blue-600">90%+</div>
              <div className="text-xs text-gray-600">ATS Score</div>
            </div>
            <div className="text-center bg-white px-4 py-2 rounded-lg border border-gray-100 min-w-[100px]">
              <div className="text-lg font-bold text-purple-600">3x</div>
              <div className="text-xs text-gray-600">More Interviews</div>
            </div>
            <div className="text-center bg-white px-4 py-2 rounded-lg border border-gray-100 min-w-[100px]">
              <div className="text-lg font-bold text-green-600">30s</div>
              <div className="text-xs text-gray-600">Processing</div>
            </div>
          </div>

          {/* Simplified Feature Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-100">
              <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-800">Build</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-100">
              <div className="w-8 h-8 bg-purple-50 rounded flex items-center justify-center">
                <Upload className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-800">Upload</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-100">
              <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center">
                <Target className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-800">Tailor</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-100">
              <div className="w-8 h-8 bg-amber-50 rounded flex items-center justify-center">
                <BarChart className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <div className="text-xs font-medium text-gray-800">
                  Optimize
                </div>
              </div>
            </div>
          </div>

          {/* MAIN FORM STARTS HERE - Users see this immediately */}
          {!results ? (
            <div className="animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    isLoggedIn={isLoggedIn}
                    onResumeReadyForJob={(resumeText) => {
                      setResumeText(resumeText);
                    }}
                    onEnhancedResumeReady={handleEnhancedResumeReady}
                    onEnhanceError={handleEnhanceError}
                  />
                  <JobDescriptionSection
                    jobDescriptionText={jobDescriptionText}
                    setJobDescriptionText={setJobDescriptionText}
                  />
                </div>

                {/* Submission Button */}
                <div className="text-center pt-2">
                  <Button
                    type="submit"
                    className="px-10 py-4 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 rounded-lg w-full md:w-auto"
                    disabled={isButtonDisabled}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader />
                        {getButtonText()}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        {getButtonText()}
                      </span>
                    )}
                  </Button>

                  {error && (
                    <div className="mt-3">
                      {error.includes("Monthly credits exhausted") ? (
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3">
                          <p className="text-red-600 font-medium text-sm mb-1">
                            Monthly credits exhausted
                          </p>
                          <p className="text-xs text-gray-600 mb-2">
                            Upgrade for unlimited generations
                          </p>
                          <Button
                            onClick={() => (window.location.href = "/pricing")}
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xs px-3 py-1"
                            size="sm"
                            type="button"
                          >
                            View Premium Plans
                          </Button>
                        </div>
                      ) : error.includes("Sign up to get free generations") ? (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-blue-600 font-medium text-sm mb-2">
                            Free generation used
                          </p>
                          <Button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs px-3 py-1"
                            size="sm"
                            type="button"
                          >
                            Sign Up for Free Credits
                          </Button>
                        </div>
                      ) : (
                        <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg border border-red-200">
                          {error}
                        </p>
                      )}
                    </div>
                  )}

                  <p className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-3">
                    <Lock size={12} />
                    Your files are private and secure
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <ResumePreviewDashboard
              tailoredResume={results.tailoredResume}
              coverLetter={results.coverLetter}
              atsScore={results.atsScore}
              onDownload={handleDownload}
              onBack={() => {
                setResults(null);
                setShowSignupPrompt(false);
              }}
              isLoggedIn={isLoggedIn}
            />
          )}
        </div>
      </section>

      <section id="features">
        <FeaturesSection />
      </section>
      <section id="expertadvice">
        <ExpertAdviceSection />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignIn={handleSignIn}
        message={
          !isLoggedIn && !isAnonymousUser
            ? "Get free credits every month to enhance and tailor your resume!"
            : undefined
        }
      />
    </div>
  );
}
