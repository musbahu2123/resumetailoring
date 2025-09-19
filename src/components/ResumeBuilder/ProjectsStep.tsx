// components/ResumeBuilder/ProjectsStep.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  FolderGit,
  Link2,
  Code,
  X,
  Sparkles,
} from "lucide-react";
import { ResumeData } from "./types";

interface ProjectsStepProps {
  data: ResumeData["projects"];
  onChange: (projects: ResumeData["projects"]) => void;
}

export default function ProjectsStep({ data, onChange }: ProjectsStepProps) {
  const [newTech, setNewTech] = useState("");
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(-1);

  const addProject = () => {
    const newProject: ResumeData["projects"][0] = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      url: "",
    };
    onChange([...data, newProject]);
    setActiveProjectIndex(data.length);
  };

  const removeProject = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
    if (activeProjectIndex === index) {
      setActiveProjectIndex(-1);
    }
  };

  const updateProject = (index: number, field: string, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const addTechnology = (projectIndex: number) => {
    if (
      newTech.trim() &&
      !data[projectIndex].technologies.includes(newTech.trim())
    ) {
      const newData = [...data];
      newData[projectIndex].technologies.push(newTech.trim());
      onChange(newData);
      setNewTech("");
    }
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const newData = [...data];
    newData[projectIndex].technologies = newData[
      projectIndex
    ].technologies.filter((_, i) => i !== techIndex);
    onChange(newData);
  };

  const popularTechnologies = [
    "React",
    "Node.js",
    "Python",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "Redis",
    "GraphQL",
    "Express.js",
    "Vue.js",
    "Angular",
    "Firebase",
    "TensorFlow",
  ];

  const addPopularTech = (projectIndex: number, tech: string) => {
    if (!data[projectIndex].technologies.includes(tech)) {
      const newData = [...data];
      newData[projectIndex].technologies.push(tech);
      onChange(newData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FolderGit size={32} className="text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
        <p className="text-gray-600">
          Showcase your portfolio and side projects
        </p>
      </div>

      <div className="space-y-4">
        {data.map((project, index) => (
          <div key={project.id} className="border rounded-lg p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-800">
                Project #{index + 1}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="space-y-2">
                <Label
                  htmlFor={`name-${index}`}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <FolderGit size={16} />
                  Project Name *
                </Label>
                <Input
                  id={`name-${index}`}
                  value={project.name}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  placeholder="e.g., E-Commerce Platform, Portfolio Website"
                  className="rounded-lg"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`description-${index}`}
                  className="text-gray-700"
                >
                  Description *
                </Label>
                <Textarea
                  id={`description-${index}`}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  placeholder="Describe what the project does, your role, and key features..."
                  className="min-h-20 rounded-lg resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`url-${index}`}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <Link2 size={16} />
                  Project URL (Optional)
                </Label>
                <Input
                  id={`url-${index}`}
                  type="url"
                  value={project.url || ""}
                  onChange={(e) => updateProject(index, "url", e.target.value)}
                  placeholder="e.g., https://github.com/username/project"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-gray-700">
                  <Code size={16} />
                  Technologies Used
                </Label>

                {/* Add Technology Input */}
                <div className="flex gap-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechnology(index);
                      }
                    }}
                    placeholder="e.g., React, Node.js, MongoDB..."
                    className="flex-1 rounded-lg"
                  />
                  <Button
                    onClick={() => addTechnology(index)}
                    disabled={!newTech.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    <Plus size={16} />
                  </Button>
                </div>

                {/* Popular Technologies Suggestions */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <Label className="text-gray-700 mb-2 flex items-center gap-2 text-sm">
                    <Sparkles size={14} />
                    Popular Technologies
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {popularTechnologies
                      .filter((tech) => !project.technologies.includes(tech))
                      .map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="cursor-pointer hover:bg-purple-50 hover:text-purple-700 transition-colors text-xs"
                          onClick={() => addPopularTech(index, tech)}
                        >
                          {tech}
                        </Badge>
                      ))}
                  </div>
                </div>

                {/* Current Technologies */}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="px-2 py-1 bg-purple-100 text-purple-800 hover:bg-purple-200"
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(index, techIndex)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          onClick={addProject}
          variant="outline"
          className="w-full border-dashed border-2 border-gray-300 hover:border-gray-400"
        >
          <Plus size={16} className="mr-2" />
          Add Another Project
        </Button>
      </div>

      {/* Tips Section */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
          <span className="text-purple-600">💡 Pro Tip</span>
        </h4>
        <ul className="text-purple-700 text-sm space-y-1">
          <li>• Include 2-4 of your most impressive projects</li>
          <li>• Focus on projects that demonstrate relevant skills</li>
          <li>
            • Use action verbs: "Built", "Designed", "Implemented", "Optimized"
          </li>
          <li>• Include metrics if possible: "Improved performance by 40%"</li>
          <li>• Add live demo links or GitHub repositories</li>
          <li>• Mention team size if it was a collaborative project</li>
        </ul>
      </div>
    </div>
  );
}
