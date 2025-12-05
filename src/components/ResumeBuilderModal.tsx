// components/ResumeBuilderModal.tsx (UPDATED - REMOVED BASIC OPTION)
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PersonalInfoStep from "./ResumeBuilder/PersonalInfoStep";
import SummaryStep from "./ResumeBuilder/SummaryStep";
import ExperienceStep from "./ResumeBuilder/ExperienceStep";
import EducationStep from "./ResumeBuilder/EducationStep";
import SkillsStep from "./ResumeBuilder/SkillsStep";
import ProjectsStep from "./ResumeBuilder/ProjectsStep";
import { ResumeData } from "./ResumeBuilder/types";
import Loader from "./Loader";

interface ResumeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeBuilt: (resumeText: string) => void; // Flow 1: Final enhanced resume
  onTailorForJob: (resumeText: string) => void; // NEW: Flow 2: Ready for job tailoring
  isLoggedIn?: boolean;
}

export default function ResumeBuilderModal({
  isOpen,
  onClose,
  onResumeBuilt,
  onTailorForJob,
  isLoggedIn = false,
}: ResumeBuilderModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showEnhancementOption, setShowEnhancementOption] = useState(false);

  const totalSteps = 6;

  // Update functions (keep all your existing ones)
  const updatePersonalInfo = (
    field: keyof ResumeData["personalInfo"],
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateSummary = (summary: string) => {
    setResumeData((prev) => ({
      ...prev,
      summary,
    }));
  };

  const updateExperience = (experience: ResumeData["experience"]) => {
    setResumeData((prev) => ({
      ...prev,
      experience,
    }));
  };

  const updateEducation = (education: ResumeData["education"]) => {
    setResumeData((prev) => ({
      ...prev,
      education,
    }));
  };

  const updateSkills = (skills: ResumeData["skills"]) => {
    setResumeData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const updateProjects = (projects: ResumeData["projects"]) => {
    setResumeData((prev) => ({
      ...prev,
      projects,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowEnhancementOption(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // FLOW 1: Enhance & Finalize Resume (No Job Description)
  const handleEnhanceWithAI = async () => {
    setIsEnhancing(true);
    try {
      const resumeText = generateResumeText();

      const anonymousId = localStorage.getItem("anonymousId");

      const response = await fetch("/api/enhance-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          anonymousId: !isLoggedIn ? anonymousId : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 402) {
          // Free generation used - fall back to basic resume
          alert("Free enhancement used. Using basic resume instead.");
          onResumeBuilt(resumeText);
        } else {
          throw new Error(data.message || "Failed to enhance resume");
        }
      } else {
        // SUCCESS: Enhanced resume is FINAL - go directly to ResultsSection
        onResumeBuilt(data.tailoredResume);
      }
    } catch (error) {
      console.error("Enhancement error:", error);
      const basicResume = generateResumeText();
      onResumeBuilt(basicResume);
    } finally {
      setIsEnhancing(false);
      setShowEnhancementOption(false);
    }
  };

  // FLOW 2: Ready for Job Tailoring (With Job Description)
  const handleTailorForJob = () => {
    const resumeText = generateResumeText();
    // This takes user back to main form WITH resume pre-filled
    // They can then paste job description for full AI tailoring
    onTailorForJob(resumeText);
    setShowEnhancementOption(false);
  };

  // Keep your existing generateResumeText function
  const generateResumeText = () => {
    const { personalInfo, summary, experience, education, skills, projects } =
      resumeData;
    let resumeText = "";

    // Personal Info
    resumeText += `${personalInfo.name.toUpperCase()}\n`;
    resumeText += `Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | Location: ${personalInfo.location}\n`;
    if (personalInfo.linkedin)
      resumeText += `LinkedIn: ${personalInfo.linkedin}\n`;
    if (personalInfo.github) resumeText += `GitHub: ${personalInfo.github}\n`;
    if (personalInfo.portfolio)
      resumeText += `Portfolio: ${personalInfo.portfolio}\n`;
    resumeText += "\n";

    // Summary
    if (summary) {
      resumeText += `PROFESSIONAL SUMMARY\n${summary}\n\n`;
    }

    // Experience
    if (experience.length > 0) {
      resumeText += "EXPERIENCE\n";
      experience.forEach((exp) => {
        const endDate = exp.current ? "Present" : exp.endDate;
        resumeText += `${exp.title} - ${exp.company} (${exp.startDate} - ${endDate})\n`;
        resumeText += `${exp.location}\n`;
        exp.achievements.forEach((achievement) => {
          resumeText += `• ${achievement}\n`;
        });
        resumeText += "\n";
      });
    }

    // Education
    if (education.length > 0) {
      resumeText += "EDUCATION\n";
      education.forEach((edu) => {
        resumeText += `${edu.degree} - ${edu.school} (${edu.graduationDate})\n`;
        if (edu.gpa) resumeText += `GPA: ${edu.gpa}\n`;
        resumeText += `${edu.location}\n\n`;
      });
    }

    // Skills
    if (skills.length > 0) {
      resumeText += `SKILLS\n${skills.join(", ")}\n\n`;
    }

    // Projects
    if (projects.length > 0) {
      resumeText += "PROJECTS\n";
      projects.forEach((project) => {
        resumeText += `${project.name}\n`;
        resumeText += `${project.description}\n`;
        if (project.technologies.length > 0) {
          resumeText += `Technologies: ${project.technologies.join(", ")}\n`;
        }
        if (project.url) resumeText += `URL: ${project.url}\n`;
        resumeText += "\n";
      });
    }

    return resumeText;
  };

  const renderStepContent = () => {
    // ENHANCED: Two clear options (Basic option removed)
    if (showEnhancementOption) {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Finalize Your Resume
          </h3>
          <p className="text-gray-600 mb-6">
            Enhance your resume or tailor it for a specific job
          </p>

          <div className="space-y-4 max-w-md mx-auto">
            {/* OPTION 1: Enhance & Finalize (No Job) */}
            <button
              onClick={handleEnhanceWithAI}
              disabled={isEnhancing}
              className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isEnhancing ? (
                <>
                  <Loader />
                  Enhancing Resume...
                </>
              ) : (
                <>
                  <span>🚀 Enhance & Finalize Resume</span>
                </>
              )}
            </button>

            {/* OPTION 2: Tailor for Specific Job */}
            <button
              onClick={handleTailorForJob}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <span>🎯 Tailor for Specific Job</span>
            </button>
          </div>
        </div>
      );
    }

    // Existing step content
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={resumeData.personalInfo}
            onChange={updatePersonalInfo}
          />
        );
      case 2:
        return (
          <SummaryStep summary={resumeData.summary} onChange={updateSummary} />
        );
      case 3:
        return (
          <ExperienceStep
            data={resumeData.experience}
            onChange={updateExperience}
          />
        );
      case 4:
        return (
          <EducationStep
            data={resumeData.education}
            onChange={updateEducation}
          />
        );
      case 5:
        return <SkillsStep data={resumeData.skills} onChange={updateSkills} />;
      case 6:
        return (
          <ProjectsStep data={resumeData.projects} onChange={updateProjects} />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Build Your Resume
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-600">
            {showEnhancementOption
              ? "Choose how to finalize your resume"
              : `Step ${currentStep} of ${totalSteps}: ${getStepTitle(
                  currentStep
                )}`}
          </DialogDescription>

          {!showEnhancementOption && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          )}
        </DialogHeader>

        <div className="py-4">{renderStepContent()}</div>

        {!showEnhancementOption && (
          <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 disabled:opacity-50 hover:text-gray-800 transition-colors flex items-center gap-2"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {currentStep === totalSteps ? "Continue →" : "Next →"}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Personal Information";
    case 2:
      return "Professional Summary";
    case 3:
      return "Work Experience";
    case 4:
      return "Education";
    case 5:
      return "Skills";
    case 6:
      return "Projects";
    default:
      return "";
  }
}
