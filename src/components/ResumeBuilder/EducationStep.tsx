// components/ResumeBuilder/EducationStep.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  GraduationCap,
  MapPin,
  Calendar,
  Award,
} from "lucide-react";
import { ResumeData } from "./types";

interface EducationStepProps {
  data: ResumeData["education"];
  onChange: (education: ResumeData["education"]) => void;
}

export default function EducationStep({ data, onChange }: EducationStepProps) {
  const addEducation = () => {
    const newEducation: ResumeData["education"][0] = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <GraduationCap size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Education</h3>
        <p className="text-gray-600">Add your educational background</p>
      </div>

      <div className="space-y-4">
        {data.map((edu, index) => (
          <div key={edu.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-800">
                Education #{index + 1}
              </h4>
              {data.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor={`degree-${index}`}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <GraduationCap size={16} />
                  Degree/Certificate *
                </Label>
                <Input
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`school-${index}`} className="text-gray-700">
                  School/University *
                </Label>
                <Input
                  id={`school-${index}`}
                  value={edu.school}
                  onChange={(e) =>
                    updateEducation(index, "school", e.target.value)
                  }
                  placeholder="e.g., Stanford University"
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
                  value={edu.location}
                  onChange={(e) =>
                    updateEducation(index, "location", e.target.value)
                  }
                  placeholder="e.g., Stanford, CA"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`gradDate-${index}`}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Calendar size={16} />
                  Graduation Date *
                </Label>
                <Input
                  id={`gradDate-${index}`}
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) =>
                    updateEducation(index, "graduationDate", e.target.value)
                  }
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`gpa-${index}`}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Award size={16} />
                  GPA (Optional)
                </Label>
                <Input
                  id={`gpa-${index}`}
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  placeholder="e.g., 3.8/4.0"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={addEducation}
          variant="outline"
          className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400"
        >
          <Plus size={16} className="mr-2" />
          Add Another Education
        </Button>
      </div>

      {/* Tips Section */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
          <span className="text-green-600">💡 Pro Tip</span>
        </h4>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• List your highest degree first</li>
          <li>• Include relevant certifications and training programs</li>
          <li>• Only include GPA if it's 3.0 or higher</li>
          <li>• Add relevant coursework if you're a recent graduate</li>
          <li>
            • Include honors like <em>magna cum laude</em> or Dean's List
          </li>
        </ul>
      </div>
    </div>
  );
}
