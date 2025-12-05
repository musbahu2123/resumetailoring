"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Download, Eye, FileText, ArrowLeft } from "lucide-react";

// COMPLETE TEMPLATES ARRAY
const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    description: "Professional and traditional layout",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Innovative and visually engaging",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Simple and focused on content",
  },
];

interface CustomizeViewProps {
  initialResume: string;
  initialCoverLetter: string;
  onDownloadResume: (templateId: string) => void;
  onDownloadCoverLetter: (templateId: string) => void;
  onBack: () => void;
}

export default function CustomizeView({
  initialResume,
  initialCoverLetter,
  onDownloadResume,
  onDownloadCoverLetter,
  onBack,
}: CustomizeViewProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(TEMPLATES[0].id);
  const [resumeContent, setResumeContent] = useState(initialResume);
  const [coverLetterContent, setCoverLetterContent] =
    useState(initialCoverLetter);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editType, setEditType] = useState<"resume" | "coverLetter">("resume");

  const startEditing = (type: "resume" | "coverLetter") => {
    setEditType(type);
    setEditContent(type === "resume" ? resumeContent : coverLetterContent);
    setIsEditing(true);
  };

  const saveEditing = () => {
    if (editType === "resume") {
      setResumeContent(editContent);
    } else {
      setCoverLetterContent(editContent);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="shadow-lg border-2 border-blue-200 bg-blue-50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-800">
            Customize Your Documents
          </CardTitle>
          <p className="text-blue-600">
            Preview, edit, and download in one place
          </p>
        </CardHeader>
      </Card>

      {/* All-in-One Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template Selection Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Choose Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplateId(template.id)}
                className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                  selectedTemplateId === template.id
                    ? "border-[var(--color-primary)] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-sm font-medium">{template.name}</div>
                <div className="text-xs text-gray-500">
                  {template.description}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Preview & Actions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Live Preview -{" "}
              {TEMPLATES.find((t) => t.id === selectedTemplateId)?.name}{" "}
              Template
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Resume Preview */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-600" />
                  Resume Preview
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing("resume")}
                  >
                    <Edit size={14} className="mr-1" />
                    Edit Resume
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onDownloadResume(selectedTemplateId)}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                  >
                    <Download size={14} className="mr-1" />
                    Download Resume
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                {resumeContent}
              </div>
            </div>

            {/* Cover Letter Preview */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Cover Letter Preview
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startEditing("coverLetter")}
                  >
                    <Edit size={14} className="mr-1" />
                    Edit Cover Letter
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onDownloadCoverLetter(selectedTemplateId)}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"
                  >
                    <Download size={14} className="mr-1" />
                    Download Cover Letter
                  </Button>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-md border text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
                {coverLetterContent}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <CardHeader>
              <CardTitle>
                Edit {editType === "resume" ? "Resume" : "Cover Letter"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-96 p-3 border border-gray-300 rounded-md resize-none font-mono text-sm"
                placeholder={`Edit your ${editType}...`}
              />
              <div className="flex gap-2 justify-end">
                <Button
                  onClick={saveEditing}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Results
        </Button>
      </div>
    </div>
  );
}
