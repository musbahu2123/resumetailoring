// components/DocumentViewModal.tsx - Final mobile-fixed version using window.location.href
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, FileText, X, RefreshCw } from "lucide-react";
import TemplateGrid from "./TemplateGrid";
import CircularProgress from "./CircularProgress";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  atsScore: number;
  tailoredResumeText: string;
  coverLetterText: string;
}

interface DocumentViewModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadResume: (templateId: string) => void;
  onDownloadCoverLetter: () => void;
}

export default function DocumentViewModal({
  job,
  isOpen,
  onClose,
  onDownloadResume,
  onDownloadCoverLetter,
}: DocumentViewModalProps) {
  const [activeTab, setActiveTab] = useState<"resume" | "coverLetter">(
    "resume"
  );
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<string>("modern");
  const [showTemplateSelection, setShowTemplateSelection] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const handleCopyResume = async () => {
    try {
      await navigator.clipboard.writeText(job.tailoredResumeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // ✅ FIX 1: Updated handleRetailor function using window.location.href
  const handleRetailor = async () => {
    // Close modal first
    onClose();

    // Small delay to ensure modal is closed before navigation
    setTimeout(() => {
      try {
        const encodedResume = btoa(
          encodeURIComponent(job.tailoredResumeText).replace(
            /%([0-9A-F]{2})/g,
            (match, p1) => String.fromCharCode(parseInt(p1, 16))
          )
        );

        // ✅ FIX: Use window.location.href instead of replace for hard reload
        window.location.href = `/?retailor=true&resume=${encodedResume}&source=documents&encoding=base64`;
      } catch (err) {
        console.error("Failed to encode or navigate:", err);
        // Fallback navigation with hard reload
        window.location.href = "/";
      }
    }, 100);
  };

  const handleDownloadResume = () => {
    onDownloadResume(selectedTemplateId);
    setShowTemplateSelection(false);
  };

  // Mobile-optimized tab switching
  const handleTabSwitch = (tab: "resume" | "coverLetter") => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Main View Modal - Fixed for mobile */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div
          className={`bg-white rounded-xl w-full max-h-[90vh] overflow-hidden flex flex-col ${
            isMobile ? "max-w-full" : "max-w-4xl"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b">
            <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">
                  {job.jobTitle || "Untitled Job"}
                </h2>
                <p className="text-gray-600 text-sm md:text-base truncate">
                  {job.companyName || "No company"}
                </p>
              </div>
              <CircularProgress
                percentage={job.atsScore}
                size={isMobile ? 40 : 50}
                strokeWidth={5}
              />
            </div>
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "icon"}
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X size={isMobile ? 18 : 20} />
            </Button>
          </div>

          {/* Tabs - Fixed for mobile touch */}
          <div className="border-b">
            <div className="flex">
              <button
                className={`flex-1 px-4 py-3 font-medium border-b-2 transition-colors text-sm md:text-base ${
                  activeTab === "resume"
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleTabSwitch("resume")}
              >
                <FileText size={isMobile ? 14 : 16} className="inline mr-2" />
                Resume
              </button>
              <button
                className={`flex-1 px-4 py-3 font-medium border-b-2 transition-colors text-sm md:text-base ${
                  activeTab === "coverLetter"
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleTabSwitch("coverLetter")}
              >
                <FileText size={isMobile ? 14 : 16} className="inline mr-2" />
                Cover Letter
              </button>
            </div>
          </div>

          {/* Content - Fixed scroll for mobile */}
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg border text-sm whitespace-pre-wrap max-h-64 md:max-h-96 overflow-y-auto">
              {activeTab === "resume"
                ? job.tailoredResumeText
                : job.coverLetterText}
            </div>
          </div>

          {/* Actions - Stacked on mobile */}
          <div className="p-4 md:p-6 border-t bg-gray-50">
            <div
              className={`flex gap-3 ${isMobile ? "flex-col" : "flex-wrap"}`}
            >
              {activeTab === "resume" && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCopyResume}
                    className={`flex items-center gap-2 ${
                      isMobile ? "justify-center" : ""
                    }`}
                    size={isMobile ? "sm" : "default"}
                  >
                    <Copy size={isMobile ? 16 : 16} />
                    {copied ? "Copied!" : "Copy Text"}
                  </Button>
                  <Button
                    onClick={() => setShowTemplateSelection(true)}
                    className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white ${
                      isMobile ? "justify-center" : ""
                    }`}
                    size={isMobile ? "sm" : "default"}
                  >
                    <Download size={isMobile ? 16 : 16} />
                    Download Resume
                  </Button>
                  <Button
                    onClick={handleRetailor}
                    className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white ${
                      isMobile ? "justify-center" : ""
                    }`}
                    size={isMobile ? "sm" : "default"}
                  >
                    <RefreshCw size={isMobile ? 16 : 16} />
                    Retailor with New Job
                  </Button>
                </>
              )}
              {activeTab === "coverLetter" && (
                <Button
                  onClick={onDownloadCoverLetter}
                  className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white ${
                    isMobile ? "justify-center" : ""
                  }`}
                  size={isMobile ? "sm" : "default"}
                >
                  <Download size={isMobile ? 16 : 16} />
                  Download Cover Letter
                </Button>
              )}
              <Button
                variant="outline"
                onClick={onClose}
                size={isMobile ? "sm" : "default"}
                className={isMobile ? "justify-center" : ""}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection Modal - Also fixed for mobile */}
      {showTemplateSelection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-60">
          <div
            className={`bg-white rounded-xl w-full max-h-[90vh] overflow-hidden ${
              isMobile ? "max-w-full" : "max-w-4xl"
            }`}
          >
            <div className="p-4 md:p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Choose Resume Template
                </h3>
                <Button
                  variant="ghost"
                  size={isMobile ? "sm" : "icon"}
                  onClick={() => setShowTemplateSelection(false)}
                >
                  <X size={isMobile ? 18 : 20} />
                </Button>
              </div>
            </div>

            <div className="p-4 md:p-6">
              <TemplateGrid
                selectedTemplateId={selectedTemplateId}
                onTemplateSelect={setSelectedTemplateId}
                isMobile={isMobile}
              />

              <div
                className={`flex gap-3 mt-6 ${
                  isMobile ? "flex-col" : "justify-end"
                }`}
              >
                <Button
                  variant="outline"
                  onClick={() => setShowTemplateSelection(false)}
                  size={isMobile ? "sm" : "default"}
                  className={isMobile ? "justify-center" : ""}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDownloadResume}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size={isMobile ? "sm" : "default"}
                  // Apply justify-center only if needed, or remove extra className assignment
                  className={
                    isMobile
                      ? "justify-center bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }
                >
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
