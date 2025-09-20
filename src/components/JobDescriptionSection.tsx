import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Target, AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface JobDescriptionSectionProps {
  jobDescriptionText: string;
  setJobDescriptionText: (text: string) => void;
}

export default function JobDescriptionSection({
  jobDescriptionText,
  setJobDescriptionText,
}: JobDescriptionSectionProps) {
  const [charCount, setCharCount] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setCharCount(jobDescriptionText.length);
  }, [jobDescriptionText]);

  const isDescriptionValid = charCount >= 100; // Minimum 100 characters for good results
  const showError = hasInteracted && !isDescriptionValid && charCount > 0;

  const handleTextChange = (text: string) => {
    setJobDescriptionText(text);
    if (!hasInteracted && text.length > 0) {
      setHasInteracted(true);
    }
  };

  return (
    <Card className="shadow-md rounded-xl border-2 border-transparent hover:border-blue-100 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center space-x-2 text-[var(--color-primary)]">
          <Target size={24} className="text-blue-600" />
          <CardTitle>Target Job Description</CardTitle>
        </div>
        <CardDescription className="space-y-2">
          <p>
            Paste the job description you're applying for. The more details, the
            better the tailoring!
          </p>
          <div className="flex items-center gap-2 text-orange-600 bg-orange-50 p-2 rounded-lg mt-2">
            <AlertCircle size={16} />
            <span className="text-sm font-medium">
              🚀 Coming Soon: Direct import from LinkedIn, Indeed, and more!
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder={`Paste the full job description here...\n\nExample:\n"Seeking a Software Engineer with 3+ years experience in React, Node.js, and cloud technologies. Responsibilities include developing scalable applications, collaborating with cross-functional teams, and implementing best practices."`}
            className="h-64 rounded-xl text-base resize-none border-2 focus:border-blue-300 transition-colors"
            value={jobDescriptionText}
            onChange={(e) => handleTextChange(e.target.value)}
            required
          />

          {/* Character count and validation */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2 text-sm">
              {showError ? (
                <>
                  <AlertCircle size={14} className="text-red-500" />
                  <span className="text-red-600">
                    Please provide a more detailed job description (min. 100
                    characters)
                  </span>
                </>
              ) : isDescriptionValid ? (
                <>
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-green-600">
                    Good description length
                  </span>
                </>
              ) : null}
            </div>

            <div
              className={`text-xs ${
                charCount > 0 && !isDescriptionValid
                  ? "text-orange-600"
                  : "text-gray-500"
              }`}
            >
              {charCount} characters
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <Pencil size={16} />
            Pro Tips:
          </h4>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Include the full job description, not just the title</li>
            <li>Copy requirements, responsibilities, and qualifications</li>
            <li>The more details, the better the AI can tailor your resume</li>
            <li>Include specific technologies and skills mentioned</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
