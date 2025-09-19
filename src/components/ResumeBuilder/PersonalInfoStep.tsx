// components/ResumeBuilder/PersonalInfoStep.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Link,
} from "lucide-react";
import { ResumeData } from "./types";

interface PersonalInfoStepProps {
  data: ResumeData["personalInfo"];
  onChange: (field: keyof ResumeData["personalInfo"], value: string) => void;
}

export default function PersonalInfoStep({
  data,
  onChange,
}: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <User size={32} className="text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          Personal Information
        </h3>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="flex items-center gap-2 text-gray-700"
          >
            <User size={16} />
            Full Name *
          </Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g., John Doe"
            className="rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="flex items-center gap-2 text-gray-700"
          >
            <Mail size={16} />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="e.g., john@email.com"
            className="rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="flex items-center gap-2 text-gray-700"
          >
            <Phone size={16} />
            Phone *
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="e.g., (555) 123-4567"
            className="rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="location"
            className="flex items-center gap-2 text-gray-700"
          >
            <MapPin size={16} />
            Location *
          </Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="e.g., San Francisco, CA"
            className="rounded-lg"
            required
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="linkedin"
            className="flex items-center gap-2 text-gray-700"
          >
            <Linkedin size={16} />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => onChange("linkedin", e.target.value)}
            placeholder="e.g., linkedin.com/in/username"
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="github"
            className="flex items-center gap-2 text-gray-700"
          >
            <Github size={16} />
            GitHub
          </Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => onChange("github", e.target.value)}
            placeholder="e.g., github.com/username"
            className="rounded-lg"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label
            htmlFor="portfolio"
            className="flex items-center gap-2 text-gray-700"
          >
            <Link size={16} />
            Portfolio Website
          </Label>
          <Input
            id="portfolio"
            value={data.portfolio}
            onChange={(e) => onChange("portfolio", e.target.value)}
            placeholder="e.g., yourwebsite.com"
            className="rounded-lg"
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center mt-6">
        * Required fields. Don't worry - you can always edit this later.
      </p>
    </div>
  );
}
