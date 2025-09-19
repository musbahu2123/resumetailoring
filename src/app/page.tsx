"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
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
import EnterpriseSection from "@/components/EnterpriseSection";
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

    if (!jobDescriptionText || (!resumeText && !resumeFile)) {
      setError("Please provide both a resume and a job description.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("jobDescriptionText", jobDescriptionText);
      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      } else {
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

  // ------------------------------------------
  // The updated download handlers
  // ------------------------------------------

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
        format: "pdf", // always PDF
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

      // ✅ Always handle as blob (PDF)
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
        format: "pdf", // always PDF
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

      // ✅ Always handle as blob (PDF)
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

  // ------------------------------------------
  // End of updated download handlers
  // ------------------------------------------

  const isButtonDisabled =
    isLoading || (!resumeFile && !resumeText) || !jobDescriptionText;

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
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-5xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-text-primary)]">
            Start Your Optimization
          </h2>
          {!results ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <UploadSection
                  resumeFile={resumeFile}
                  setResumeFile={handleSetResumeFile}
                  resumeText={resumeText}
                  setResumeText={handleSetResumeText}
                  onPdfTextExtracted={(text) => {
                    setResumeText(text);
                    setExtractedPdfText(text);
                  }}
                />
                <JobDescriptionSection
                  jobDescriptionText={jobDescriptionText}
                  setJobDescriptionText={setJobDescriptionText}
                />
              </div>
              <div className="flex justify-center flex-col items-center gap-4">
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-12 py-6 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white shadow-xl"
                  disabled={isButtonDisabled}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader />
                      Generating...
                    </span>
                  ) : (
                    "Generate Tailored Resume"
                  )}
                </Button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <p className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <Lock size={16} />
                  Your files are private.
                </p>
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
      <EnterpriseSection />
      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignIn={handleSignIn}
      />
    </>
  );
}
