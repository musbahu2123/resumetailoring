// components/UploadSection.tsx - UPDATED WITH ERROR HANDLING
"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FileUp, Wand2, Upload, FileText, Loader2 } from "lucide-react";
import PdfUploader from "./PdfUploader";
import ResumeBuilderModal from "./ResumeBuilderModal";

interface UploadSectionProps {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  resumeText: string;
  setResumeText: (text: string) => void;
  onPdfTextExtracted: (text: string) => void;
  forceActiveTab?: "build" | "docx" | "pdf" | "paste";
  isLoggedIn?: boolean;
  onResumeReadyForJob?: (resumeText: string) => void;
  onEnhancedResumeReady?: (resumeText: string) => void;
  onEnhanceError?: (errorMessage: string) => void; // ✅ ADDED PROP
}

// ✅ Utility function to get anonymous ID
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

export default function UploadSection({
  resumeFile,
  setResumeFile,
  resumeText,
  setResumeText,
  onPdfTextExtracted,
  forceActiveTab,
  isLoggedIn = false,
  onResumeReadyForJob,
  onEnhancedResumeReady,
  onEnhanceError, // ✅ ADDED PROP
}: UploadSectionProps) {
  const [activeTab, setActiveTab] = useState<
    "build" | "docx" | "pdf" | "paste"
  >("build");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [docxContent, setDocxContent] = useState("");
  const [isProcessingDocx, setIsProcessingDocx] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false); // ✅ ADDED LOADING STATE

  useEffect(() => {
    if (forceActiveTab) {
      setActiveTab(forceActiveTab);
    }
  }, [forceActiveTab]);

  // ✅ UPDATED: ENHANCE RESUME FUNCTION WITH PROPER ERROR HANDLING
  const handleEnhanceResume = async (content: string) => {
    if (!content.trim()) {
      alert("Please provide resume content first");
      return;
    }

    setIsEnhancing(true);

    try {
      const anonymousId = getAnonymousId();

      const response = await fetch("/api/enhance-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: content,
          anonymousId: !isLoggedIn ? anonymousId : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 402) {
          // ✅ HANDLE CREDIT ERRORS PROPERLY
          if (onEnhanceError) {
            onEnhanceError(data.message);
          } else {
            alert(data.message || "Sign up to get free generations");
          }
          return;
        }
        throw new Error(data.message || "Failed to enhance resume");
      }

      // Enhanced resume ready
      if (onEnhancedResumeReady) {
        onEnhancedResumeReady(data.tailoredResume);
      }
    } catch (error) {
      console.error("Enhancement error:", error);
      if (onEnhanceError) {
        onEnhanceError(
          error instanceof Error ? error.message : "Failed to enhance resume"
        );
      } else {
        alert("Failed to enhance resume. Please try again.");
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  // ✅ UPDATED: PROCESS DOCX FILE WITH ERROR HANDLING
  const handleDocxUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingDocx(true);
    setResumeFile(file);
    setResumeText("");

    try {
      const formData = new FormData();
      formData.append("resumeFile", file);
      formData.append("jobDescriptionText", "temp");

      const anonymousId = getAnonymousId();
      const headers: HeadersInit = {};
      if (!isLoggedIn && anonymousId) {
        headers["x-anonymous-id"] = anonymousId;
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 402) {
          // ✅ HANDLE ANONYMOUS CREDIT USED
          if (onEnhanceError) {
            onEnhanceError(data.message);
          }
          return;
        }
        throw new Error(data.message || "Failed to process DOCX file");
      }

      setDocxContent(data.originalResumeText || "");
      setResumeText(data.originalResumeText || "");
    } catch (error) {
      console.error("DOCX processing error:", error);
      if (onEnhanceError) {
        onEnhanceError(
          error instanceof Error ? error.message : "Failed to process DOCX file"
        );
      } else {
        alert(
          "Failed to process DOCX file. Please try PDF or paste text instead."
        );
      }
      setDocxContent("");
    } finally {
      setIsProcessingDocx(false);
    }
  };

  const handleTextPaste = (text: string) => {
    setResumeText(text);
    if (text) {
      setResumeFile(null);
    }
  };

  const handleResumeBuilt = (builtResumeText: string) => {
    if (onEnhancedResumeReady) {
      onEnhancedResumeReady(builtResumeText);
    } else {
      setResumeText(builtResumeText);
      setResumeFile(null);
      setActiveTab("paste");
    }
    setIsBuilderOpen(false);
  };

  const handleResumeReadyForJob = (builtResumeText: string) => {
    setResumeText(builtResumeText);
    setResumeFile(null);
    setIsBuilderOpen(false);
    setActiveTab("paste");

    if (onResumeReadyForJob) {
      onResumeReadyForJob(builtResumeText);
    }
  };

  return (
    <>
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <div className="flex items-center space-x-2 text-[var(--color-primary)]">
            <FileUp size={24} />
            <CardTitle>Upload Your Resume</CardTitle>
          </div>
          <CardDescription>
            Choose your preferred method to provide your resume
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Tab Navigation */}
          <div className="flex border-b">
            <button
              type="button"
              className={`px-3 sm:px-4 py-2 font-medium flex items-center gap-1 ${
                activeTab === "build"
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("build")}
            >
              <Wand2 size={16} className="text-purple-500" />
              <span className="relative">
                <span className="hidden sm:inline">Build Resume</span>
                <span className="sm:hidden">Build</span>
                <span className="absolute -top-1 -right-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                </span>
              </span>
            </button>
            <button
              type="button"
              className={`px-3 sm:px-4 py-2 font-medium ${
                activeTab === "docx"
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("docx")}
            >
              <span className="hidden sm:inline">DOCX Upload</span>
              <span className="sm:hidden">DOCX</span>
            </button>
            <button
              type="button"
              className={`px-3 sm:px-4 py-2 font-medium ${
                activeTab === "pdf"
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("pdf")}
            >
              <span className="hidden sm:inline">PDF Upload</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              type="button"
              className={`px-3 sm:px-4 py-2 font-medium ${
                activeTab === "paste"
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("paste")}
            >
              <span className="hidden sm:inline">Paste Text</span>
              <span className="sm:hidden">Text</span>
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === "build" && (
            <div className="text-center py-8">
              <Wand2 size={48} className="mx-auto text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Build Your Resume From Scratch
              </h3>
              <p className="text-gray-600 mb-6">
                Create a professional resume, then choose to enhance it or
                tailor it for a specific job.
              </p>
              <button
                type="button"
                onClick={() => setIsBuilderOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Building
              </button>
            </div>
          )}

          {activeTab === "docx" && (
            <div className="space-y-4">
              <Input
                type="file"
                accept=".docx,.doc"
                className="p-2 border-2 border-dashed border-gray-300 rounded-xl"
                onChange={handleDocxUpload}
                disabled={isProcessingDocx}
              />
              <p className="text-sm text-center text-[var(--color-text-secondary)]">
                Supports .docx and .doc files
              </p>

              {isProcessingDocx && (
                <div className="flex items-center justify-center gap-2 py-4">
                  <Loader2 className="animate-spin w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-600">
                    Processing DOCX file...
                  </span>
                </div>
              )}

              {resumeFile && !isProcessingDocx && docxContent && (
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700 text-center">
                      ✅ DOCX processed successfully! Ready for enhancement.
                    </p>
                    <p className="text-xs text-green-600 text-center mt-1">
                      {docxContent.length} characters extracted
                    </p>
                  </div>

                  <Button
                    onClick={() => handleEnhanceResume(docxContent)}
                    disabled={isEnhancing}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 disabled:opacity-70"
                  >
                    {isEnhancing ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 size={18} />
                        🚀 Enhance Resume
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Enhance your DOCX resume with AI to improve formatting and
                    content
                  </p>
                </div>
              )}

              {resumeFile && !isProcessingDocx && !docxContent && (
                <p className="text-sm text-red-600 text-center">
                  Failed to extract text from DOCX. Please try again or use
                  PDF/Paste.
                </p>
              )}
            </div>
          )}

          {activeTab === "pdf" && (
            <PdfUploader
              onPdfTextExtracted={(text) => {
                setResumeText(text);
                onPdfTextExtracted(text);
                setResumeFile(null);
              }}
              onError={(message) => {
                console.error("PDF Error:", message);
              }}
              onEnhanceResume={handleEnhanceResume}
              onEnhanceError={onEnhanceError} // ✅ PASS ERROR HANDLER TO PDFUPLOADER
              isLoggedIn={isLoggedIn}
            />
          )}

          {activeTab === "paste" && (
            <div className="space-y-4">
              <Textarea
                placeholder="Paste your resume content here"
                className="h-64 rounded-xl"
                value={resumeText}
                onChange={(e) => handleTextPaste(e.target.value)}
              />

              {resumeText.trim() && (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700 text-center">
                      ✅ Text ready for enhancement ({resumeText.length}{" "}
                      characters)
                    </p>
                  </div>

                  <Button
                    onClick={() => handleEnhanceResume(resumeText)}
                    disabled={isEnhancing}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 disabled:opacity-70"
                  >
                    {isEnhancing ? (
                      <>
                        <Loader2 className="animate-spin w-5 h-5" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 size={18} />
                        🚀 Enhance Resume
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Enhance your pasted resume with AI to improve formatting and
                    content
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <ResumeBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onResumeBuilt={handleResumeBuilt}
        onTailorForJob={handleResumeReadyForJob}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
