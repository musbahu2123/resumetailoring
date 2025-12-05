//src/lib/templates/types
export type TemplateType = "resume" | "coverLetter";
export type TemplateId = "classic" | "modern" | "creative" | "minimalist";

export interface TemplateSection {
  title: string;
  content: string[];
  type:
    | "contact"
    | "skill"
    | "experience"
    | "education"
    | "summary"
    | "project"
    | "other";
}

export interface ParsedContent {
  sections: TemplateSection[];
  rawContent: string;
}

export interface TemplateStyles {
  titleColor: string;
  sectionColor: string;
  textColor: string;
  lineColor: string;
  backgroundColor?: string;
  accentColor?: string;
}
