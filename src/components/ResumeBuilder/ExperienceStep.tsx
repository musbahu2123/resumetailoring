// components/ResumeBuilder/ExperienceStep.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Briefcase, MapPin, Calendar, Award } from "lucide-react";
import { ResumeData } from "./types";

interface ExperienceStepProps {
  data: ResumeData["experience"];
  onChange: (experience: ResumeData["experience"]) => void;
}

export default function ExperienceStep({
  data,
  onChange,
}: ExperienceStepProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const addExperience = () => {
    const newExperience: ResumeData["experience"][0] = {
      id: Date.now().toString(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      achievements: [""],
    };
    onChange([...data, newExperience]);
    setActiveIndex(data.length);
  };

  const removeExperience = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
    if (activeIndex === index) {
      setActiveIndex(-1);
    } else if (activeIndex > index) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const addAchievement = (expIndex: number) => {
    const newData = [...data];
    newData[expIndex].achievements.push("");
    onChange(newData);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const newData = [...data];
    newData[expIndex].achievements = newData[expIndex].achievements.filter(
      (_, i) => i !== achIndex
    );
    onChange(newData);
  };

  const updateAchievement = (
    expIndex: number,
    achIndex: number,
    value: string
  ) => {
    const newData = [...data];
    newData[expIndex].achievements[achIndex] = value;
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Briefcase size={32} className="text-orange-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Work Experience</h3>
        <p className="text-gray-600">Add your professional work history</p>
      </div>

      <div className="space-y-4">
        {data.map((exp, index) => (
          <div key={exp.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-800">
                Experience #{index + 1}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label
                  htmlFor={`title-${index}`}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Briefcase size={16} />
                  Job Title *
                </Label>
                <Input
                  id={`title-${index}`}
                  value={exp.title}
                  onChange={(e) =>
                    updateExperience(index, "title", e.target.value)
                  }
                  placeholder="e.g., Senior Developer"
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`company-${index}`} className="text-gray-700">
                  Company *
                </Label>
                <Input
                  id={`company-${index}`}
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="e.g., Google"
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`location-${index}`}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <MapPin size={16} />
                  Location
                </Label>
                <Input
                  id={`location-${index}`}
                  value={exp.location}
                  onChange={(e) =>
                    updateExperience(index, "location", e.target.value)
                  }
                  placeholder="e.g., San Francisco, CA"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} />
                  Employment Period *
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(index, "startDate", e.target.value)
                    }
                    className="rounded-lg"
                    required
                  />
                  <Input
                    type={exp.current ? "text" : "month"}
                    value={exp.current ? "Present" : exp.endDate}
                    onChange={(e) => {
                      if (!exp.current) {
                        updateExperience(index, "endDate", e.target.value);
                      }
                    }}
                    disabled={exp.current}
                    placeholder="End date"
                    className="rounded-lg"
                    required={!exp.current}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={exp.current}
                    onChange={(e) =>
                      updateExperience(index, "current", e.target.checked)
                    }
                    className="rounded"
                  />
                  <Label
                    htmlFor={`current-${index}`}
                    className="text-sm text-gray-600"
                  >
                    I currently work here
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-gray-700">
                <Award size={16} />
                Achievements & Responsibilities *
              </Label>

              {exp.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex gap-2 items-start">
                  <Textarea
                    value={achievement}
                    onChange={(e) =>
                      updateAchievement(index, achIndex, e.target.value)
                    }
                    placeholder="e.g., Led a team of 5 developers to deliver a project 2 weeks ahead of schedule"
                    className="flex-1 rounded-lg min-h-[60px] resize-none"
                    required
                  />
                  {exp.achievements.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(index, achIndex)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-2"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addAchievement(index)}
                className="mt-2"
              >
                <Plus size={16} className="mr-2" />
                Add Achievement
              </Button>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={addExperience}
          variant="outline"
          className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400"
        >
          <Plus size={16} className="mr-2" />
          Add Another Experience
        </Button>
      </div>

      {/* Tips Section */}
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <span className="text-amber-600">💡 Pro Tip</span>
        </h4>
        <ul className="text-amber-700 text-sm space-y-1">
          <li>
            • Use action verbs: "Led", "Developed", "Implemented", "Managed"
          </li>
          <li>• Quantify your achievements: "Increased revenue by 25%"</li>
          <li>• Focus on results and impact, not just responsibilities</li>
          <li>• Include relevant keywords from your target job descriptions</li>
        </ul>
      </div>
    </div>
  );
}
