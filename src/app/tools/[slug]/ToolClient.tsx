"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Copy,
  FileText,
  Target,
  Users,
  CheckCircle,
  ArrowRight,
  Crown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ToolClientProps {
  tool: {
    id: string;
    name: string;
    description: string;
    inputs: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
      options?: string[];
    }>;
    apiEndpoint: string;
  };
}

// Client-side tools list
const clientTools = [
  { id: "biodata-format-generator", name: "Biodata Format Generator" },
  { id: "two-weeks-notice-generator", name: "Two Weeks Notice Generator" },
  { id: "skills-section-generator", name: "Skills Section Generator" },
  { id: "maternity-leave-letter-generator", name: "Maternity Leave Generator" },
  { id: "high-school-resume-examples", name: "High School Resume Maker" },
  { id: "resignation-letter-generator", name: "Resignation Letter Generator" },
];

export default function ToolClient({ tool }: ToolClientProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const templatesSectionRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(tool.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data.content || data.result);
    } catch (error) {
      console.error("Error generating content:", error);
      setResult("Error generating content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const allFieldsFilled = tool.inputs.every(
    (input) => !input.required || formData[input.name]?.trim()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Gradient */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Free AI Tool
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {tool.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {tool.description}
          </p>
        </div>

        {/* MAIN GRID - Only for Content and Tools sections */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* LEFT SIDEBAR - Sticky for Content & Tools sections only */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              {/* AI Resume Builder CTA */}
              <div className="bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
                {/* Sponsored Badge */}
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                    <Crown className="w-3 h-3" />
                    <span>Sponsored</span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-lg mb-4">
                    Get Started With Our AI Resume Builder Today! ✨
                  </h3>
                  <p className="text-orange-100 text-sm mb-6">
                    The AI does the formatting for you. Rest assured 100% no
                    typos and ATS friendly.
                  </p>

                  {/* Template Images Stacked */}
                  <div className="space-y-4 mb-6">
                    {/* Template 1 - Creative */}
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden mb-2">
                        <Image
                          src="/images/templates/creative.jpg"
                          alt="Creative Resume Template"
                          width={200}
                          height={267}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white/90 text-sm font-medium">
                        Creative Template
                      </p>
                      <p className="text-white/70 text-xs">
                        Modern & Innovative
                      </p>
                    </div>

                    {/* Template 2 - Classic */}
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden mb-2">
                        <Image
                          src="/images/templates/classic.jpg"
                          alt="Classic Resume Template"
                          width={200}
                          height={267}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white/90 text-sm font-medium">
                        Classic Template
                      </p>
                      <p className="text-white/70 text-xs">
                        Professional & Timeless
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-orange-200 mb-6">
                    <div className="flex items-center justify-center gap-1">
                      <span>⭐</span>
                      <span>1# Product of the Week on Product Hunt</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold py-3 shadow-lg"
                  asChild
                >
                  <Link href="/">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Resume With AI
                  </Link>
                </Button>

                <p className="text-xs text-orange-200 text-center mt-3">
                  By pressing you agree to our Terms & Privacy Policy
                </p>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT - 3/4 width for Content & Tools only */}
          <div className="lg:col-span-3 space-y-12 order-1 lg:order-2">
            {/* Tool Form Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 mx-auto max-w-4xl">
              {/* Trust Bar */}
              <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>1,000+ Generated Today</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span>98% Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>AI-Powered</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-8 text-gray-900 text-center">
                Generate Your {tool.name}
              </h2>

              {/* Input Form - 2 columns layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {tool.inputs.map((input, index) => (
                  <div
                    key={input.name}
                    className={index >= 4 ? "md:col-span-2" : ""}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {input.label}{" "}
                      {input.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    {input.type === "textarea" ? (
                      <Textarea
                        value={formData[input.name] || ""}
                        onChange={(e) =>
                          handleInputChange(input.name, e.target.value)
                        }
                        placeholder={`Enter your ${input.label.toLowerCase()}...`}
                        className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        rows={4}
                      />
                    ) : input.type === "select" ? (
                      <select
                        value={formData[input.name] || ""}
                        onChange={(e) =>
                          handleInputChange(input.name, e.target.value)
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select {input.label}</option>
                        {input.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        type={input.type}
                        value={formData[input.name] || ""}
                        onChange={(e) =>
                          handleInputChange(input.name, e.target.value)
                        }
                        placeholder={`Enter your ${input.label.toLowerCase()}...`}
                        className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <Button
                  onClick={handleGenerate}
                  disabled={!allFieldsFilled || loading}
                  className="px-12 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-200"
                  size="lg"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Generate {tool.name}
                    </span>
                  )}
                </Button>
              </div>

              {/* Results Section */}
              <div className="mt-12">
                <h3 className="text-lg font-semibold mb-6 text-gray-900 text-center">
                  Your Generated Content
                </h3>
                <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 p-6 min-h-[200px]">
                  {result ? (
                    <div className="space-y-4">
                      <div className="bg-white p-6 rounded-lg border border-gray-200 whitespace-pre-wrap">
                        {result}
                      </div>
                      <div className="text-center">
                        <Button
                          onClick={handleCopyToClipboard}
                          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          {copied ? "Copied!" : "Copy to Clipboard"}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg mb-2">
                        Your generated content will appear here
                      </p>
                      <p className="text-sm">
                        Fill the form above and click generate
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Why Use Our {tool.name}?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-start gap-4">
                    <Target className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Professional Quality
                      </h4>
                      <p className="text-gray-600">
                        AI-powered content that meets industry standards and
                        impresses recruiters
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Error-Free Results
                      </h4>
                      <p className="text-gray-600">
                        No typos, perfect formatting every time with ATS
                        optimization
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Sparkles className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Instant Generation
                      </h4>
                      <p className="text-gray-600">
                        Get professional content in seconds, not hours with AI
                        automation
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Users className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">
                        Recruiter Approved
                      </h4>
                      <p className="text-gray-600">
                        Formats that pass ATS systems and impress hiring
                        managers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MORE TOOLS SECTION - 2 or 3 per row */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-6 text-lg">
                More Free Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {clientTools.map((t) => (
                  <Link
                    key={t.id}
                    href={`/tools/${t.id}`}
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 text-sm line-clamp-2">
                        {t.name}
                      </div>
                      <div className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs mt-1">
                        Use for Free <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TEMPLATES SECTION - FULL WIDTH CENTERED (Outside the grid) */}
        <div ref={templatesSectionRef} className="flex justify-center w-full">
          <div className="w-full max-w-6xl">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl p-8 lg:p-12 text-white text-center">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-6">
                  Ready to Create Your Perfect Resume?
                </h3>
                <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                  Choose from our professional templates and let AI do the
                  formatting for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12 max-w-4xl mx-auto">
                {/* Template 1 - Creative */}
                <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                  <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/templates/creative.jpg"
                      alt="Creative Resume Template"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Modern Creative</h4>
                  <p className="text-blue-200 text-lg mb-4">
                    Perfect for tech and creative roles
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-blue-200">
                    <span>✅ ATS Optimized</span>
                    <span>✅ Mobile Friendly</span>
                    <span>✅ Modern Design</span>
                  </div>
                </div>

                {/* Template 2 - Classic */}
                <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                  <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/templates/classic.jpg"
                      alt="Classic Resume Template"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-xl mb-3">
                    Professional Classic
                  </h4>
                  <p className="text-blue-200 text-lg mb-4">
                    Ideal for corporate and traditional roles
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-blue-200">
                    <span>✅ Recruiter Approved</span>
                    <span>✅ ATS Friendly</span>
                    <span>✅ Timeless Design</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-5 px-12 text-lg shadow-2xl"
                  asChild
                >
                  <Link href="/">
                    <Sparkles className="w-5 h-5 mr-3" />
                    Create Your Resume Now - Free
                  </Link>
                </Button>
                <p className="text-blue-200 text-lg mt-6">
                  Join thousands who landed their dream job with our AI builder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
