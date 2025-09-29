// components/UploadSection.tsx - Updated with external tab control
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
import { FileUp, Wand2 } from "lucide-react";
import PdfUploader from "./PdfUploader";
import ResumeBuilderModal from "./ResumeBuilderModal";

interface UploadSectionProps {
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  resumeText: string;
  setResumeText: (text: string) => void;
  onPdfTextExtracted: (text: string) => void;
  // Add this for external tab control
  forceActiveTab?: "build" | "docx" | "pdf" | "paste";
}

export default function UploadSection({
  resumeFile,
  setResumeFile,
  resumeText,
  setResumeText,
  onPdfTextExtracted,
  forceActiveTab,
}: UploadSectionProps) {
  const [activeTab, setActiveTab] = useState<
    "build" | "docx" | "pdf" | "paste"
  >("build");
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  // If forceActiveTab is provided, use it and clear after use
  useEffect(() => {
    if (forceActiveTab) {
      setActiveTab(forceActiveTab);
      // Don't clear forceActiveTab here - let parent component manage it
    }
  }, [forceActiveTab]);

  const handleDocxUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setResumeFile(file || null);
    if (file) {
      setResumeText(""); // Clear text when file is selected
    }
  };

  const handleTextPaste = (text: string) => {
    setResumeText(text);
    if (text) {
      setResumeFile(null); // Clear file when text is pasted
    }
  };

  const handleResumeBuilt = (builtResumeText: string) => {
    setResumeText(builtResumeText);
    setResumeFile(null);
    setIsBuilderOpen(false);
    // Automatically switch to paste tab to show the built resume
    setActiveTab("paste");
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
          {/* Tab Navigation - BUILD IS NOW FIRST */}
          <div className="flex border-b">
            <button
              type="button"
              className={`px-4 py-2 font-medium flex items-center gap-1 ${
                activeTab === "build"
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("build")}
            >
              <Wand2 size={16} className="text-purple-500" />
              <span className="relative">
                Build Resume
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
              className={`px-4 py-2 font-medium ${
                activeTab === "docx"
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("docx")}
            >
              DOCX Upload
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium ${
                activeTab === "pdf"
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("pdf")}
            >
              PDF Upload
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium ${
                activeTab === "paste"
                  ? "border-b-2 border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("paste")}
            >
              Paste Text
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
                Our AI-powered builder will help you create a professional
                resume tailored for any job.
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
            <>
              <Input
                type="file"
                accept=".docx,.doc"
                className="p-2 border-2 border-dashed border-gray-300 rounded-xl"
                onChange={handleDocxUpload}
              />
              <p className="text-sm text-center text-[var(--color-text-secondary)]">
                Supports .docx and .doc files
              </p>
              {resumeFile && (
                <p className="text-sm text-green-600 text-center">
                  Selected: {resumeFile.name}
                </p>
              )}
            </>
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
            />
          )}

          {activeTab === "paste" && (
            <Textarea
              placeholder="Paste your resume content here"
              className="h-64 rounded-xl"
              value={resumeText}
              onChange={(e) => handleTextPaste(e.target.value)}
            />
          )}
        </CardContent>
      </Card>

      <ResumeBuilderModal
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
        onResumeBuilt={handleResumeBuilt}
      />
    </>
  );
}
