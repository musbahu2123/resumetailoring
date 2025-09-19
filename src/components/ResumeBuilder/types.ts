// components/ResumeBuilder/types.ts
export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    achievements: string[];
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }[];
  skills: string[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
  }[];
}

export interface StepProps {
  data: any;
  onChange: (data: any) => void;
  onNext?: () => void;
  onBack?: () => void;
}