// components/PdfUploader.tsx - UPDATED WITH ALL NEW PROPS
"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUp, Loader2, Wand2 } from "lucide-react";

interface PdfUploaderProps {
  onPdfTextExtracted: (text: string) => void;
  onError: (message: string) => void;
  onEnhanceResume?: (text: string) => void; // Enhance callback
  onEnhanceError?: (errorMessage: string) => void; // ✅ NEW: Enhance error callback
  isLoggedIn?: boolean; // ✅ NEW: Auth status
}

// Import PDF.js types
declare global {
  interface Window {
    pdfjsLib?: any;
  }
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

export default function PdfUploader({
  onPdfTextExtracted,
  onError,
  onEnhanceResume,
  onEnhanceError, // ✅ NEW PROP
  isLoggedIn = false, // ✅ NEW PROP
}: PdfUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false); // ✅ NEW: Enhance loading state
  const [extractedText, setExtractedText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setExtractedText("");

    try {
      if (!window.pdfjsLib) {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = async () => {
          window.pdfjsLib = (window as any).pdfjsLib;
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          await processPdf(file);
        };
        document.head.appendChild(script);
      } else {
        await processPdf(file);
      }
    } catch (error) {
      console.error("PDF processing error:", error);
      onError("Failed to process PDF. Please try pasting the text directly.");
      setIsProcessing(false);
    }

    async function processPdf(file: File) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer })
          .promise;

        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText +=
            textContent.items.map((item: any) => item.str).join(" ") + "\n";
        }

        if (fullText.trim().length < 50) {
          throw new Error(
            "Could not extract text from PDF. This may be a scanned document."
          );
        }

        setExtractedText(fullText);
        onPdfTextExtracted(fullText);
      } catch (error) {
        console.error("PDF processing error:", error);
        onError(
          error instanceof Error
            ? error.message
            : "Failed to process PDF. Please try pasting the text directly."
        );
      } finally {
        setIsProcessing(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  // ✅ UPDATED: Handle enhance resume with proper error handling
  const handleEnhanceResume = async () => {
    if (!extractedText.trim()) {
      if (onEnhanceError) {
        onEnhanceError("Please upload and process a PDF first");
      } else {
        alert("Please upload and process a PDF first");
      }
      return;
    }

    if (!onEnhanceResume) return;

    setIsEnhancing(true);

    try {
      const anonymousId = getAnonymousId();

      const response = await fetch("/api/enhance-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: extractedText,
          anonymousId: !isLoggedIn ? anonymousId : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 402) {
          if (onEnhanceError) {
            onEnhanceError(data.message);
          } else {
            alert(data.message || "Sign up to get free generations");
          }
          return;
        }
        throw new Error(data.message || "Failed to enhance resume");
      }

      // Call the enhance callback
      onEnhanceResume(data.tailoredResume);
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

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <div className="flex items-center space-x-2 text-[var(--color-primary)]">
          <FileUp size={24} />
          <CardTitle>Upload PDF Resume</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handlePdfUpload}
          disabled={isProcessing || isEnhancing}
          className="p-2 border-2 border-dashed border-gray-300 rounded-xl"
        />

        {isProcessing && (
          <div className="flex items-center mt-2 text-sm text-blue-600">
            <Loader2 className="animate-spin mr-2" size={16} />
            Processing PDF...
          </div>
        )}

        {/* Enhance Button after successful PDF extraction */}
        {extractedText && !isProcessing && (
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700 text-center">
                ✅ PDF processed successfully! {extractedText.length} characters
                extracted.
              </p>
            </div>

            <Button
              onClick={handleEnhanceResume}
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
              Enhance your resume with AI to optimize ATS, formatting and
              content
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
