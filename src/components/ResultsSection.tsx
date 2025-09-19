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
import { Download, Eye, EyeOff, FileDown } from "lucide-react";
import CircularProgress from "./CircularProgress";
import TemplatePreview from "./TemplatePreview";

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
    description: "",
  },
  {
    id: "modern",
    name: "Modern",
    image: "/images/templates/mordern.jpg",
    description: "",
  },
  {
    id: "creative",
    name: "Creative",
    image: "/images/templates/creative.jpg",
    description: "",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    image: "/images/templates/minimalist.jpg",
    description: "",
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
  const [showPreview, setShowPreview] = useState(false);

  const handleDownloadResume = () => {
    onDownloadResume(selectedTemplateId);
  };

  const handleDownloadCoverLetter = () => {
    onDownloadCoverLetter(selectedTemplateId);
  };

  const selectedTemplate = TEMPLATES.find((t) => t.id === selectedTemplateId);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg border-2 border-[var(--color-accent)] rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center justify-center space-x-2 text-[var(--color-accent)]">
            <span>Success! Your Resume is Tailored.</span>
          </CardTitle>
          <CardDescription className="flex justify-center items-center gap-4 mt-2">
            <span>Your ATS Score is:</span>
            <CircularProgress percentage={results.atsScore} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Template Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Choose a Document Template
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplateId(template.id)}
                  className={`
                    group cursor-pointer transition-all duration-200 text-center
                    ${
                      selectedTemplateId === template.id
                        ? "ring-2 ring-[var(--color-primary)] ring-offset-2 scale-105"
                        : "hover:scale-102"
                    }
                  `}
                >
                  <div className="relative overflow-hidden rounded-md shadow-sm mb-2 aspect-[3/4]">
                    <Image
                      src={template.image}
                      alt={`${template.name} Template Preview`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    {selectedTemplateId === template.id && (
                      <div className="absolute top-2 right-2 bg-[var(--color-primary)] text-white px-2 py-1 rounded text-xs font-medium">
                        Selected
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-medium block">
                      {template.name}
                    </span>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Preview */}
            {showPreview && (
              <TemplatePreview
                templateId={selectedTemplateId}
                content={results.tailoredResume}
                type="resume"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Tailored Resume</h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {selectedTemplate?.name} Template
                </span>
              </div>
              <div className="bg-white p-4 rounded-md border text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {results.tailoredResume}
              </div>
              <Button
                onClick={handleDownloadResume}
                className="w-full flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
              >
                <FileDown size={18} />
                Download Resume
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Generated Cover Letter
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {selectedTemplate?.name} Template
                </span>
              </div>
              <div className="bg-white p-4 rounded-md border text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                {results.coverLetter}
              </div>
              <Button
                onClick={handleDownloadCoverLetter}
                className="w-full flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
              >
                <FileDown size={18} />
                Download Cover Letter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Button
          className="px-8 py-4 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
          onClick={onReset}
        >
          Tailor Another Resume
        </Button>
      </div>
    </div>
  );
}
