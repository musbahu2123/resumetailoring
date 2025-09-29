// components/ResumeBuilderModal.tsx (FIXED)
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// import { X } from "lucide-react";
import PersonalInfoStep from "./ResumeBuilder/PersonalInfoStep";
import SummaryStep from "./ResumeBuilder/SummaryStep";
import ExperienceStep from "./ResumeBuilder/ExperienceStep";
import EducationStep from "./ResumeBuilder/EducationStep";
import SkillsStep from "./ResumeBuilder/SkillsStep";
import ProjectsStep from "./ResumeBuilder/ProjectsStep";
import { ResumeData } from "./ResumeBuilder/types";

interface ResumeBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResumeBuilt: (resumeText: string) => void;
}

export default function ResumeBuilderModal({
  isOpen,
  onClose,
  onResumeBuilt,
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

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResumeText();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

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

  // ✅ FIXED: Add the complete generateResumeText function
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

    // ✅ ADD PHONE FORMATTING HERE (before returning)

    // ✅ This calls the parent function to set the resume text and close the modal
    onResumeBuilt(resumeText);
  };

  const renderStepContent = () => {
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
            {/* <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button> */}
          </div>
          <DialogDescription className="text-gray-600">
            Step {currentStep} of {totalSteps}: {getStepTitle(currentStep)}
          </DialogDescription>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </DialogHeader>

        <div className="py-4">{renderStepContent()}</div>

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
            {currentStep === totalSteps ? "Finish ✅" : "Next →"}
          </button>
        </div>
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
