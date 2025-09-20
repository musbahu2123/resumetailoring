"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  FileText,
  Download,
  Trash2,
  Eye,
  Loader2,
  Search,
  Calendar,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Job {
  _id: string;
  jobTitle: string;
  companyName: string;
  atsScore: number;
  createdAt: string;
  tailoredResumeText: string;
  coverLetterText: string;
  templateId: string;
}

interface Template {
  id: string;
  name: string;
  image: string;
}

const TEMPLATES: Template[] = [
  {
    id: "classic",
    name: "Classic",
    image: "/images/templates/classic.jpg",
  },
  {
    id: "modern",
    name: "Modern",
    image: "/images/templates/mordern.jpg",
  },
  {
    id: "creative",
    name: "Creative",
    image: "/images/templates/creative.jpg",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    image: "/images/templates/minimalist.jpg",
  },
];

export default function DocumentsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "score" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/documents");
      if (!response.ok) {
        throw new Error("Failed to fetch documents");
      }
      const data = await response.json();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs.filter((job) => {
      const jobTitle = job.jobTitle || "";
      const companyName = job.companyName || "";
      const searchLower = searchTerm.toLowerCase();

      return (
        jobTitle.toLowerCase().includes(searchLower) ||
        companyName.toLowerCase().includes(searchLower)
      );
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "date":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "score":
          comparison = (a.atsScore || 0) - (b.atsScore || 0);
          break;
        case "title":
          const titleA = a.jobTitle || "";
          const titleB = b.jobTitle || "";
          comparison = titleA.localeCompare(titleB);
          break;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, sortBy, sortOrder]);

  const handleDownload = async (
    type: "resume" | "coverLetter",
    job: Job,
    templateId: string
  ) => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tailoredResumeText: job.tailoredResumeText,
          coverLetterText: job.coverLetterText,
          documentType: type,
          templateId: templateId,
          format: "pdf",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${(job.jobTitle || "document")
          .replace(/\s+/g, "-")
          .toLowerCase()}-${type}-${templateId}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download Error:", err);
      setError("Failed to download document");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      const response = await fetch("/api/documents/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId: jobId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Deletion Error:", err);
      setError("Failed to delete document");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-blue-600 mb-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Documents
            </h1>
            <p className="text-gray-600 mt-2">
              Manage all your tailored resumes and cover letters
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
              {filteredJobs.length} document
              {filteredJobs.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="date">Sort by Date</option>
                  <option value="score">Sort by Score</option>
                  <option value="title">Sort by Title</option>
                </select>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                >
                  {sortOrder === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {filteredJobs.length === 0 ? (
          <Card className="text-center py-16 bg-white/80 backdrop-blur-sm">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchTerm ? "No documents found" : "No documents yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start by creating your first tailored resume"}
            </p>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => (window.location.href = "/")}
            >
              Create Your First Resume
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <Card
                key={job._id}
                className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-2">
                        {job.jobTitle || "Untitled Job"}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Building2 size={14} />
                        <span className="text-sm">
                          {job.companyName || "No company"}
                        </span>
                      </div>
                    </div>

                    {/* ATS Score */}
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(
                        job.atsScore || 0
                      )}`}
                    >
                      {job.atsScore || 0}%
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Calendar size={14} />
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setSelectedJob(job);
                          document
                            .getElementById("view-resume-modal")
                            ?.showModal();
                        }}
                      >
                        <Eye size={14} className="mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          setSelectedJob(job);
                          document
                            .getElementById("download-modal")
                            ?.showModal();
                        }}
                      >
                        <Download size={14} className="mr-2" />
                        Download
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(job._id)}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* View Modal */}
      <dialog id="view-resume-modal" className="modal">
        <div className="modal-box max-w-4xl max-h-[80vh]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">
            {selectedJob?.jobTitle || "Untitled Job"} - Resume
          </h3>
          <div className="prose max-w-none overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm">
              {selectedJob?.tailoredResumeText}
            </pre>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Download Modal */}
      <dialog id="download-modal" className="modal">
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">Download Document</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              variant="outline"
              className="h-16 flex-col gap-2"
              onClick={() =>
                document.getElementById("template-modal")?.showModal()
              }
            >
              <FileText size={20} />
              <span>Resume</span>
            </Button>
            <Button
              variant="outline"
              className="h-16 flex-col gap-2"
              onClick={() =>
                selectedJob &&
                handleDownload(
                  "coverLetter",
                  selectedJob,
                  selectedJob.templateId || "modern"
                )
              }
              disabled={isDownloading}
            >
              <Download size={20} />
              <span>Cover Letter</span>
            </Button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Template Selection Modal */}
      <dialog id="template-modal" className="modal">
        <div className="modal-box max-w-4xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-6">Choose Template</h3>

          <div className="grid grid-cols-2 gap-4">
            {TEMPLATES.map((template) => (
              <div
                key={template.id}
                className="border rounded-lg p-4 hover:border-blue-400 cursor-pointer transition-colors"
                onClick={() =>
                  selectedJob &&
                  handleDownload("resume", selectedJob, template.id)
                }
              >
                <div className="relative w-full h-40 mb-2">
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-center font-medium">{template.name}</p>
              </div>
            ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
