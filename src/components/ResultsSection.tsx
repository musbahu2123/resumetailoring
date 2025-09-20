"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, ArrowLeft } from "lucide-react";
import CircularProgress from "./CircularProgress";

interface Template {
  id: string;
  name: string;
  image: string;
  description: string;
}

const TEMPLATES: Template[] = [
  {
    id: "classic",
    name: "Classic",
    image: "/images/templates/classic.jpg",
    description: "Professional and traditional layout",
  },
  {
    id: "modern",
    name: "Modern",
    image: "/images/templates/mordern.jpg",
    description: "Clean and contemporary design",
  },
  {
    id: "creative",
    name: "Creative",
    image: "/images/templates/creative.jpg",
    description: "Innovative and visually engaging",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    image: "/images/templates/minimalist.jpg",
    description: "Simple and focused on content",
  },
];

interface ResultsSectionProps {
  results: {
    tailoredResume: string;
    coverLetter: string;
    atsScore: number;
  };
  onDownloadResume: (templateId: string) => void;
  onDownloadCoverLetter: (templateId: string) => void;
  onReset: () => void;
}

export default function ResultsSection({
  results,
  onDownloadResume,
  onDownloadCoverLetter,
  onReset,
}: ResultsSectionProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    TEMPLATES[0].id
  );
  const [activeView, setActiveView] = useState<
    "success" | "templates" | "documents"
  >("success");

  const handleDownloadResume = () => {
    onDownloadResume(selectedTemplateId);
  };

  const handleDownloadCoverLetter = () => {
    onDownloadCoverLetter(selectedTemplateId);
  };

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId);

  // Success Card View
  if (activeView === "success") {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg border-2 border-green-200 bg-green-50 rounded-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
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
            </div>
            <CardTitle className="text-2xl text-green-800">
              Success! Your Resume is Tailored
            </CardTitle>
            <CardDescription className="text-green-600">
              Your documents are ready for download
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-lg font-semibold text-gray-700">
                  ATS Score:
                </span>
                <CircularProgress percentage={results.atsScore} />
              </div>
              <Button
                onClick={() => setActiveView("templates")}
                className="px-8 py-3 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
              >
                Choose Template & Download
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Tailor Another Resume
          </Button>
        </div>
      </div>
    );
  }

  // Template Selection View
  if (activeView === "templates") {
    return (
      <div className="space-y-6">
        <Card className="shadow-lg border-2 border-[var(--color-accent)] rounded-xl">
          <CardHeader>
            <CardTitle className="text-center text-[var(--color-accent)]">
              Choose Your Template
            </CardTitle>
            <CardDescription className="text-center">
              Select a design that matches your style and industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={`
                    group cursor-pointer transition-all duration-200 rounded-lg p-3 border-2
                    ${
                      selectedTemplateId === template.id
                        ? "border-[var(--color-primary)] bg-blue-50 scale-105"
                        : "border-gray-200 hover:border-gray-300 hover:scale-102"
                    }
                  `}
                >
                  <div className="relative overflow-hidden rounded-md shadow-sm mb-3 aspect-[3/4]">
                    <Image
                      src={template.image}
                      alt={`${template.name} Template`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    {selectedTemplateId === template.id && (
                      <div className="absolute top-2 right-2 bg-[var(--color-primary)] text-white px-2 py-1 rounded text-xs font-medium">
                        Selected
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-gray-800 block">
                      {template.name}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setActiveView("documents")}
                className="px-6 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
              >
                Review Documents
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveView("success")}
              >
                Back to Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Documents View
  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-2 border-[var(--color-accent)] rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Your Tailored Documents</CardTitle>
              <CardDescription>
                Ready for download with the{" "}
                <span className="font-semibold">{selectedTemplate?.name}</span>{" "}
                template
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveView("templates")}
            >
              Change Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resume Card */}
            <Card className="border-2 border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Tailored Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md border text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {results.tailoredResume}
                </div>
                <Button
                  onClick={handleDownloadResume}
                  className="w-full flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                >
                  <FileDown size={18} />
                  Download Resume
                </Button>
              </CardContent>
            </Card>

            {/* Cover Letter Card */}
            <Card className="border-2 border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Cover Letter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md border text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {results.coverLetter}
                </div>
                <Button
                  onClick={handleDownloadCoverLetter}
                  className="w-full flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                >
                  <FileDown size={18} />
                  Download Cover Letter
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button
              variant="outline"
              onClick={() => setActiveView("templates")}
            >
              Back to Templates
            </Button>
            <Button
              onClick={onReset}
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
            >
              Tailor Another Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
