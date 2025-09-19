// components/ResumeBuilder/SkillsStep.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Code, Users, X, Sparkles } from "lucide-react";
import { ResumeData } from "./types";

interface SkillsStepProps {
  data: ResumeData["skills"];
  onChange: (skills: ResumeData["skills"]) => void;
}

export default function SkillsStep({ data, onChange }: SkillsStepProps) {
  const [newSkill, setNewSkill] = useState("");
  const [skillCategory, setSkillCategory] = useState<"technical" | "soft">(
    "technical"
  );

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const popularTechnicalSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "TypeScript",
    "HTML",
    "CSS",
    "SQL",
    "AWS",
    "Git",
    "Docker",
    "Java",
    "PHP",
    "Ruby",
    "Go",
    "Kubernetes",
  ];

  const popularSoftSkills = [
    "Leadership",
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Adaptability",
    "Creativity",
    "Critical Thinking",
    "Project Management",
    "Mentoring",
  ];

  const addPopularSkill = (skill: string) => {
    if (!data.includes(skill)) {
      onChange([...data, skill]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Code size={32} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
        <p className="text-gray-600">Add your technical and soft skills</p>
      </div>

      <div className="space-y-4">
        {/* Add New Skill */}
        <div className="space-y-3">
          <Label className="text-gray-700">Add New Skill</Label>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., React, Leadership, Python..."
              className="flex-1 rounded-lg"
            />
            <Button
              onClick={addSkill}
              disabled={!newSkill.trim()}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              <Plus size={16} />
            </Button>
          </div>

          {/* Skill Category Tabs */}
          <div className="flex border-b">
            <button
              type="button"
              className={`px-4 py-2 font-medium flex items-center gap-2 ${
                skillCategory === "technical"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => setSkillCategory("technical")}
            >
              <Code size={16} />
              Technical Skills
            </button>
            <button
              type="button"
              className={`px-4 py-2 font-medium flex items-center gap-2 ${
                skillCategory === "soft"
                  ? "border-b-2 border-green-500 text-green-600"
                  : "text-gray-600"
              }`}
              onClick={() => setSkillCategory("soft")}
            >
              <Users size={16} />
              Soft Skills
            </button>
          </div>

          {/* Popular Skills Suggestions */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-gray-700 mb-2 flex items-center gap-2">
              <Sparkles size={16} />
              Popular {skillCategory === "technical"
                ? "Technical"
                : "Soft"}{" "}
              Skills
            </Label>
            <div className="flex flex-wrap gap-2">
              {(skillCategory === "technical"
                ? popularTechnicalSkills
                : popularSoftSkills
              )
                .filter((skill) => !data.includes(skill))
                .map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    onClick={() => addPopularSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        {/* Current Skills */}
        {data.length > 0 && (
          <div className="space-y-3">
            <Label className="text-gray-700">Your Skills ({data.length})</Label>
            <div className="border rounded-lg p-4 bg-white">
              <div className="flex flex-wrap gap-2">
                {data.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1.5 bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                ))}
              </div>

              {data.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onChange([])}
                  className="mt-3 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Clear All Skills
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <span className="text-blue-600">💡 Pro Tip</span>
        </h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Include 10-15 relevant skills maximum</li>
          <li>• Mix technical and soft skills</li>
          <li>• Use keywords from job descriptions you're targeting</li>
          <li>• Group similar skills together (e.g., "React, Vue, Angular")</li>
          <li>• Order skills by proficiency or relevance</li>
        </ul>
      </div>
    </div>
  );
}
