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
import { FileDown, ArrowLeft, Crown, Sparkles } from "lucide-react";
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
    isAnonymous?: boolean;
  };
  onDownloadResume: (templateId: string) => void;
  onDownloadCoverLetter: (templateId: string) => void;
  onReset: () => void;
  isLoggedIn: boolean;
  isAnonymousResult: boolean;
  onSignIn: () => void;
}

export default function ResultsSection({
  results,
  onDownloadResume,
  onDownloadCoverLetter,
  onReset,
  isLoggedIn,
  isAnonymousResult,
  onSignIn,
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
        {/* Anonymous User Notice - Friendly reminder instead of restriction */}
        {!isLoggedIn && isAnonymousResult && (
          <Card className="shadow-lg border-2 border-blue-200 bg-blue-50 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
                <div className="flex-1">
                  <p className="font-semibold text-blue-800">
                    🎉 Free Generation Complete!
                  </p>
                  <p className="text-sm text-blue-700">
                    You can download your documents now. Sign up to save your
                    work and get 10 more free credits!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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

              {/* Encouraging signup for anonymous users */}
              {!isLoggedIn && isAnonymousResult && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 max-w-md">
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>Loved your results?</strong> Sign up to:
                  </p>
                  <ul className="text-xs text-blue-600 space-y-1 mb-3">
                    <li>• Save your documents permanently</li>
                    <li>• Get 10 free credits for future generations</li>
                    <li>• Access your generation history</li>
                  </ul>
                  <Button
                    onClick={onSignIn}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign Up for More Credits
                  </Button>
                </div>
              )}
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
        {/* Anonymous User Notice */}
        {!isLoggedIn && isAnonymousResult && (
          <Card className="shadow-lg border-2 border-blue-200 bg-blue-50 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-blue-600" />
                <div className="flex-1">
                  <p className="font-semibold text-blue-800">
                    Free Download Available!
                  </p>
                  <p className="text-sm text-blue-700">
                    Choose any template and download your documents. Sign up to
                    save your work.
                  </p>
                </div>
                <Button
                  onClick={onSignIn}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                >
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

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
                Review & Download Documents
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveView("success")}
              >
                Back to Results
              </Button>
            </div>

            {/* Signup encouragement for anonymous users */}
            {!isLoggedIn && isAnonymousResult && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 text-center">
                <p className="text-sm text-green-700 mb-2">
                  <strong>Want to generate more resumes?</strong>
                </p>
                <p className="text-xs text-green-600 mb-3">
                  Sign up now and get 10 free credits for future generations!
                </p>
                <Button
                  onClick={onSignIn}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Sign Up for 10 Free Credits
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Documents View
  return (
    <div className="space-y-6">
      {/* Anonymous User Notice */}
      {!isLoggedIn && isAnonymousResult && (
        <Card className="shadow-lg border-2 border-green-200 bg-green-50 rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-green-600" />
              <div className="flex-1">
                <p className="font-semibold text-green-800">
                  Ready to Download!
                </p>
                <p className="text-sm text-green-700">
                  Your documents are ready. Feel free to download them now!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-lg border-2 border-[var(--color-accent)] rounded-xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Your Tailored Documents</CardTitle>
              <CardDescription>
                {`Ready for download with the ${selectedTemplate?.name} template`}
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

          {/* Signup encouragement for next generation */}
          {!isLoggedIn && isAnonymousResult && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-purple-600" />
                <p className="font-semibold text-purple-800 text-sm">
                  Want to generate more resumes?
                </p>
              </div>
              <p className="text-xs text-purple-600 mb-3">
                Sign up now and get 10 free credits for your next generations!
              </p>
              <Button
                onClick={onSignIn}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Sign Up for 10 Free Credits
              </Button>
            </div>
          )}

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
