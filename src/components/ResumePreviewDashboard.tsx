// components/ResumePreviewDashboard.tsx (COMPLETE FIXED VERSION)
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileDown,
  ArrowLeft,
  Target,
  RefreshCw,
  AlertCircle,
  FileText,
  Mail,
} from "lucide-react";
import CircularProgress from "./CircularProgress";
import PdfPreviewRenderer from "./PdfPreviewRenderer";

interface ResumePreviewDashboardProps {
  tailoredResume: string;
  coverLetter?: string;
  atsScore?: number;
  onDownload: (
    templateId: string,
    documentType: "resume" | "coverLetter"
  ) => void; // ✅ FIXED: Added documentType
  onBack: () => void;
  isLoggedIn: boolean;
}

// Define template metadata with NEW ORDER and RATINGS
const templateMetadata = {
  minimalist: {
    name: "Minimalist",
    description: "Simple and focused on content",
    category: "Minimal",
    bestFor: "Academic, research, clean aesthetics",
    rating: 4.9,
    badge: "Most Popular",
  },
  creative: {
    name: "Creative",
    description: "Two-column layout with colors",
    category: "Creative",
    bestFor: "Design, marketing, creative roles",
    rating: 4.8,
    badge: "Best Design",
  },
  classic: {
    name: "Classic",
    description: "Professional and traditional layout",
    category: "Professional",
    bestFor: "Corporate jobs, traditional industries",
    rating: 4.7,
  },
  modern: {
    name: "Modern",
    description: "Clean design with sidebar layout",
    category: "Contemporary",
    bestFor: "Tech, creative, modern companies",
    rating: 4.6,
  },
};

type TemplateType = keyof typeof templateMetadata;

type DocumentType = "resume" | "coverLetter";

export default function ResumePreviewDashboard({
  tailoredResume,
  coverLetter,
  atsScore,
  onDownload,
  onBack,
  isLoggedIn,
}: ResumePreviewDashboardProps) {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateType>("minimalist");
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentType>("resume");
  const [pdfPreviewData, setPdfPreviewData] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  const currentTemplate = templateMetadata[selectedTemplate];
  const hasCoverLetter = !!coverLetter && coverLetter.trim().length > 0;

  // Generate PDF preview when template, document, or content changes
  useEffect(() => {
    const content =
      selectedDocument === "resume" ? tailoredResume : coverLetter;
    if (content) {
      generatePdfPreview(content);
    }
  }, [selectedTemplate, selectedDocument, tailoredResume, coverLetter]);

  const generatePdfPreview = async (content: string) => {
    if (!content) {
      setPreviewError(`No ${selectedDocument} content available`);
      return;
    }

    setIsGeneratingPreview(true);
    setPreviewError(null);
    setRenderError(null);
    setPdfPreviewData(null);

    try {
      // console.log(
      //   `Generating PDF preview for ${selectedDocument}:`,
      //   selectedTemplate
      // );

      const response = await fetch("/api/generate-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          templateId: selectedTemplate,
          documentType: selectedDocument,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Failed to generate preview: ${response.status}`
        );
      }

      if (!data.pdfData) {
        throw new Error("No PDF data received from server");
      }

      // console.log(
      //   `${selectedDocument} preview generated successfully, data length:`,
      //   data.pdfData.length
      // );
      setPdfPreviewData(data.pdfData);
    } catch (error) {
      console.error("Preview generation error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to generate preview";
      setPreviewError(errorMessage);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const handleRegeneratePreview = () => {
    const content =
      selectedDocument === "resume" ? tailoredResume : coverLetter;
    if (content) {
      generatePdfPreview(content);
    }
  };

  const handleRenderError = (error: string) => {
    setRenderError(error);
  };

  const handleLoadingChange = (loading: boolean) => {
    // We can use this for additional loading states if needed
  };

  // ✅ UPDATED: Download with Google Ads conversion tracking
  const handleDownload = async (templateId: string) => {
    try {
      console.log(
        `📥 Starting download: ${selectedDocument}, template: ${templateId}`
      );

      // First, call the original onDownload function
      onDownload(templateId, selectedDocument);

      // Then track the conversion in Google Ads
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17821565833/document_downloaded",
          value: 0.0,
          currency: "USD",
        });

        console.log("✅ Google Ads conversion tracked for:", selectedDocument);
      }
    } catch (error) {
      console.error("Download or tracking error:", error);
    }
  };

  const getDocumentTitle = () => {
    return selectedDocument === "resume" ? "Resume" : "Cover Letter";
  };

  const getDocumentIcon = () => {
    return selectedDocument === "resume" ? (
      <FileText className="w-4 h-4" />
    ) : (
      <Mail className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with ATS Score */}
      <Card className="shadow-lg border-2 border-green-200 bg-green-50 rounded-xl">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <CardTitle className="text-2xl text-green-800">
                🎉 Your {hasCoverLetter ? "Documents Are" : "Resume Is"} Ready!
              </CardTitle>
              <p className="text-green-600">
                True PDF Preview - What you see is what you'll download
              </p>
            </div>

            {/* ATS Score Display - Only show for resumes */}
            {atsScore && selectedDocument === "resume" && (
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-lg font-semibold text-gray-700">
                    ATS Score:
                  </span>
                </div>
                <CircularProgress percentage={atsScore} />
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Template Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎨 Choose Template
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(templateMetadata).map(([id, template]) => (
              <div
                key={id}
                onClick={() => setSelectedTemplate(id as TemplateType)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTemplate === id
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {template.name}
                  </h3>
                  {template.badge && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                      {template.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {template.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {template.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-yellow-600">★</span>
                    <span className="text-xs text-gray-600">
                      {template.rating}
                    </span>
                  </div>
                </div>
                {selectedTemplate === id && (
                  <div className="mt-2 text-xs text-green-600 font-medium text-center">
                    ✓ Selected
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Center: PDF Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getDocumentIcon()}
                <span>PDF Preview - {currentTemplate.name}</span>
                <span className="text-sm font-normal text-gray-500">
                  ({currentTemplate.bestFor})
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Document Type Tabs */}
                {hasCoverLetter && (
                  <div className="flex bg-gray-100 rounded-lg p-1 mr-2">
                    <button
                      onClick={() => setSelectedDocument("resume")}
                      className={`px-3 py-1 text-sm rounded-md transition-all ${
                        selectedDocument === "resume"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Resume
                    </button>
                    <button
                      onClick={() => setSelectedDocument("coverLetter")}
                      className={`px-3 py-1 text-sm rounded-md transition-all ${
                        selectedDocument === "coverLetter"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      Cover Letter
                    </button>
                  </div>
                )}

                <Button
                  onClick={handleRegeneratePreview}
                  disabled={isGeneratingPreview}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <RefreshCw
                    size={14}
                    className={isGeneratingPreview ? "animate-spin" : ""}
                  />
                  {isGeneratingPreview ? "Generating..." : "Refresh"}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-gray-200 rounded-lg bg-white h-[500px] overflow-hidden">
              {isGeneratingPreview ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-600 p-4">
                  <RefreshCw className="animate-spin mb-3" size={32} />
                  <p className="text-lg font-medium mb-2">
                    Generating {getDocumentTitle()} Preview
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    Creating {currentTemplate.name} template preview...
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    This usually takes 2-5 seconds
                  </p>
                </div>
              ) : previewError ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-red-600">
                  <AlertCircle className="mb-3" size={48} />
                  <p className="text-lg font-medium mb-2">
                    Preview Generation Failed
                  </p>
                  <p className="text-sm text-center mb-4 max-w-md">
                    {previewError}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleRegeneratePreview}
                      variant="default"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Try Again
                    </Button>
                    <Button onClick={onBack} variant="outline">
                      Back to Editor
                    </Button>
                  </div>
                </div>
              ) : renderError ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-orange-600">
                  <AlertCircle className="mb-3" size={48} />
                  <p className="text-lg font-medium mb-2">
                    Preview Rendering Failed
                  </p>
                  <p className="text-sm text-center mb-4">{renderError}</p>
                  <div className="flex gap-3">
                    <Button onClick={handleRegeneratePreview} variant="outline">
                      Regenerate Preview
                    </Button>
                    <Button
                      onClick={() => handleDownload(selectedTemplate)}
                      variant="default"
                    >
                      Download Anyway
                    </Button>
                  </div>
                </div>
              ) : pdfPreviewData ? (
                <PdfPreviewRenderer
                  pdfData={pdfPreviewData}
                  templateId={selectedTemplate}
                  onLoadingChange={handleLoadingChange}
                  onError={handleRenderError}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
                  <div className="text-center mb-4">
                    <p className="text-lg font-medium mb-2">
                      No Preview Generated
                    </p>
                    <p className="text-sm text-gray-600">
                      Click the button below to generate a PDF preview
                    </p>
                  </div>
                  <Button
                    onClick={handleRegeneratePreview}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    Generate Preview
                  </Button>
                </div>
              )}
            </div>

            {/* Preview Status Info */}
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <div className="bg-blue-100 p-1 rounded mt-0.5">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    True PDF Preview - {getDocumentTitle()}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    This preview shows the exact PDF that will be downloaded,
                    including all formatting, fonts, and layout.
                    {selectedDocument === "resume" &&
                      " ATS-optimized for maximum impact."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={() => handleDownload(selectedTemplate)}
          disabled={!pdfPreviewData && !tailoredResume}
          className="flex items-center gap-2 px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FileDown className="w-5 h-5" />
          Download {getDocumentTitle()} PDF
        </Button>

        <Button
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2 px-8 py-3 text-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Create Another Resume
        </Button>
      </div>

      {/* Template Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <span className="text-blue-600 font-bold">ℹ️</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800">
                {currentTemplate.name} Template Selected
                {currentTemplate.rating && (
                  <span className="ml-2 text-sm text-yellow-600">
                    ★ {currentTemplate.rating}
                  </span>
                )}
              </h4>
              <p className="text-blue-700 text-sm mt-1">
                {currentTemplate.description} • Best for:{" "}
                {currentTemplate.bestFor}
              </p>
              <p className="text-blue-600 text-xs mt-2">
                💡 <strong>Tip:</strong> The PDF preview shows exactly how your{" "}
                {getDocumentTitle().toLowerCase()} will look when downloaded.
                Use the zoom controls to inspect details.
                {hasCoverLetter &&
                  " Switch between Resume and Cover Letter tabs to preview both documents."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anonymous User Notice */}
      {!isLoggedIn && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <span className="text-blue-600 font-bold">🎁</span>
              </div>
              <div>
                <p className="text-blue-700 text-sm font-medium">
                  Free generation complete!
                </p>
                <p className="text-blue-600 text-xs mt-1">
                  Sign up to save your work and get 10 more free credits for
                  future resume generations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
