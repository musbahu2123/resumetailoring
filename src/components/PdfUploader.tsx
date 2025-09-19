// components/PdfUploader.tsx
"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileUp, Loader2 } from "lucide-react";

interface PdfUploaderProps {
  onPdfTextExtracted: (text: string) => void;
  onError: (message: string) => void;
}

// Import PDF.js types
declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function PdfUploader({
  onPdfTextExtracted,
  onError,
}: PdfUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      // Use CDN version to avoid import issues
      if (!window.pdfjsLib) {
        // Load PDF.js from CDN
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = async () => {
          // Load the worker
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

  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <div className="flex items-center space-x-2 text-[var(--color-primary)]">
          <FileUp size={24} />
          <CardTitle>Upload PDF Resume</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handlePdfUpload}
          disabled={isProcessing}
          className="p-2 border-2 border-dashed border-gray-300 rounded-xl"
        />
        {isProcessing && (
          <div className="flex items-center mt-2 text-sm text-blue-600">
            <Loader2 className="animate-spin mr-2" size={16} />
            Processing PDF...
          </div>
        )}
      </CardContent>
    </Card>
  );
}
