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
} from "lucide-react";

// Assuming these types match your Mongoose model and API response
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
    image: "https://placehold.co/300x400/F3F4F6/9CA3AF?text=Classic+Template",
  },
  {
    id: "modern",
    name: "Modern",
    image: "https://placehold.co/300x400/D1D5DB/6B7280?text=Modern+Template",
  },
  {
    id: "creative",
    name: "Creative",
    image: "https://placehold.co/300x400/E5E7EB/4B5563?text=Creative+Template",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    image:
      "https://placehold.co/300x400/E5E7EB/4B5563?text=Minimalist+Template",
  },
];

export default function DocumentsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    type: "",
    text: "",
    templateId: "",
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [downloadType, setDownloadType] = useState<
    "resume" | "coverLetter" | null
  >(null);
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

  const handleDownloadClick = (type: "resume" | "coverLetter", job: Job) => {
    setSelectedJob(job);
    setDownloadType(type);
    setIsDownloadModalOpen(true);
  };

  const handleDownloadWithTemplate = async (templateId: string) => {
    if (!selectedJob || !downloadType) return;
    setIsDownloading(true);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tailoredResumeText: selectedJob.tailoredResumeText,
          coverLetterText: selectedJob.coverLetterText,
          documentType: downloadType,
          templateId: templateId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${selectedJob.jobTitle
          .replace(/\s+/g, "-")
          .toLowerCase()}-${downloadType}-${templateId}.docx`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (err) {
      console.error("Download Error:", err);
    } finally {
      setIsDownloading(false);
      setIsDownloadModalOpen(false);
      setSelectedJob(null);
      setDownloadType(null);
    }
  };

  const handleDeleteClick = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedJob) return;

    try {
      const response = await fetch("/api/documents/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId: selectedJob._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete document");
      }

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== selectedJob._id)
      );
      setIsDeleteModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Deletion Error:", err);
    }
  };

  const handleView = (type: "resume" | "coverLetter", job: Job) => {
    const text =
      type === "resume" ? job.tailoredResumeText : job.coverLetterText;
    setModalContent({ type, text, templateId: job.templateId });
    setIsViewModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl space-y-8">
        <div className="flex justify-start">
          <a href="/">
            <Button
              variant="outline"
              className="text-[var(--color-text-secondary)] hover:bg-gray-200"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </a>
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
            My Documents
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            View and manage all your generated documents here.
          </p>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-[var(--color-text-secondary)]">
              Loading documents...
            </div>
          ) : error ? (
            <div className="text-center text-[var(--color-error)]">
              Error: {error}
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-[var(--color-card)] p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                  No documents found
                </h2>
                <p className="mt-2 text-[var(--color-text-secondary)]">
                  Your generated resumes and cover letters will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-[var(--color-card)] p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col justify-between h-full"
                >
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                      {job.jobTitle || "Untitled Job"}
                    </h3>
                    <p className="text-[var(--color-text-secondary)] mb-2">
                      {job.companyName || "No Company"}
                    </p>
                    <p className="text-sm text-gray-400 mb-4">
                      Generated on:{" "}
                      {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">
                        ATS Score:
                        <span className="text-[var(--color-primary)] ml-2">
                          {job.atsScore}%
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      className="w-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] flex items-center gap-2"
                      onClick={() => handleView("resume", job)}
                    >
                      <Eye size={16} /> View Resume
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="w-full text-[var(--color-text-secondary)] flex items-center gap-2"
                        onClick={() => handleDownloadClick("resume", job)}
                      >
                        <Download size={16} />
                        Resume
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-[var(--color-text-secondary)] flex items-center gap-2"
                        onClick={() => handleDownloadClick("coverLetter", job)}
                      >
                        <Download size={16} />
                        Cover Letter
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full text-[var(--color-error)] hover:bg-red-50"
                      onClick={() => handleDeleteClick(job)}
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsViewModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-2xl font-bold">
                {modalContent.type === "resume"
                  ? "Tailored Resume"
                  : "Cover Letter"}
              </h3>
              <Button onClick={() => setIsViewModalOpen(false)} variant="ghost">
                Close
              </Button>
            </div>
            <div className="whitespace-pre-line text-gray-700">
              {modalContent.text}
            </div>
          </div>
        </div>
      )}

      {/* Download Template Selection Modal */}
      {isDownloadModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsDownloadModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-2xl font-bold">Select a Template</h3>
              <Button
                onClick={() => setIsDownloadModalOpen(false)}
                variant="ghost"
              >
                Close
              </Button>
            </div>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Choose a new template to download your{" "}
              {downloadType === "resume" ? "resume" : "cover letter"}.
            </p>
            <div className="flex justify-center flex-wrap gap-6">
              {TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleDownloadWithTemplate(template.id)}
                  className={`flex-shrink-0 cursor-pointer rounded-xl p-4 transition-all duration-200 ease-in-out border-2 border-gray-200 hover:border-[var(--color-primary)] hover:shadow-lg hover:scale-105`}
                >
                  <Image
                    src={template.image}
                    alt={`${template.name} Template Preview`}
                    width={300}
                    height={400}
                    className="w-full h-auto rounded-md shadow-sm mb-2"
                    unoptimized
                  />
                  <p className="text-center font-medium text-[var(--color-text-secondary)]">
                    {template.name}
                  </p>
                  <Button
                    onClick={() => handleDownloadWithTemplate(template.id)}
                    className="mt-2 w-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] flex items-center gap-2"
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={16} /> Download
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Are you sure you want to delete this document? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="ghost"
                onClick={handleDelete}
                className="text-[var(--color-error)]"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
