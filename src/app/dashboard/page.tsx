// src/app/dashboard/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescriptionText, setJobDescriptionText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [results, setResults] = useState<{
    tailoredResume: string;
    coverLetter: string;
    atsScore: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading") {
    return <p className="text-center p-8">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <p className="text-center p-8">Please sign in to access the dashboard.</p>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    // This check will now pass because session.user.id will be available
    if (!jobDescriptionText || (!resumeText && !resumeFile)) {
      setError("Please provide both a resume and a job description.");
      setIsLoading(false);
      return;
    }

    // Check if user session data is available before submitting
    if (!session?.user?.id) {
      setError("User session is not available. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("jobDescriptionText", jobDescriptionText);
      if (resumeFile) {
        formData.append("resumeFile", resumeFile);
      } else {
        formData.append("resumeText", resumeText);
      }
      formData.append("userId", session.user.id);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadData.message || "Failed to upload data.");
      }

      const tailorResponse = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: uploadData.jobId }),
      });

      const tailorData = await tailorResponse.json();

      if (!tailorResponse.ok) {
        throw new Error(tailorData.message || "Failed to tailor resume.");
      }

      setResults(tailorData);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isButtonDisabled =
    isLoading || (!resumeFile && !resumeText) || !jobDescriptionText;

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-[var(--color-background)]">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center">
          Welcome, {session?.user?.name}! ✨
        </h1>

        {!results ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Upload Your Resume</CardTitle>
                  <CardDescription>
                    Upload your resume (PDF/DOCX) or paste the text below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Input
                    type="file"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  />
                  <p className="text-sm text-center text-[var(--color-text-secondary)]">
                    OR
                  </p>
                  <Textarea
                    placeholder="Paste your resume content here"
                    className="h-48"
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Paste Job Description</CardTitle>
                  <CardDescription>
                    Copy the job description from LinkedIn, Indeed, etc.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste job description here"
                    className="h-full"
                    value={jobDescriptionText}
                    onChange={(e) => setJobDescriptionText(e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center flex-col items-center gap-4">
              <Button
                type="submit"
                className="px-8 py-4 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                disabled={isButtonDisabled}
              >
                {isLoading ? "Tailoring..." : "Tailor My Resume"}
              </Button>
              {error && <p className="text-[var(--color-error)]">{error}</p>}
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <Card className="shadow-lg border-2 border-[var(--color-accent)]">
              <CardHeader>
                <CardTitle className="text-[var(--color-accent)]">
                  🎉 Success! Your Resume is Tailored.
                </CardTitle>
                <CardDescription>
                  Your ATS Score is:{" "}
                  <span className="text-xl font-bold text-[var(--color-accent)]">
                    {results.atsScore}%
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Tailored Resume</h2>
                    <div className="bg-white p-4 rounded-md border text-sm whitespace-pre-wrap">
                      {results.tailoredResume}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                      Generated Cover Letter
                    </h2>
                    <div className="bg-white p-4 rounded-md border text-sm whitespace-pre-wrap">
                      {results.coverLetter}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-center">
              <Button
                className="px-8 py-4 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                onClick={() => setResults(null)}
              >
                Tailor Another Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
