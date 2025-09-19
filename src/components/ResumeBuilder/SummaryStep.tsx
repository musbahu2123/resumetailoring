// components/ResumeBuilder/SummaryStep.tsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface SummaryStepProps {
  summary: string;
  onChange: (summary: string) => void;
}

export default function SummaryStep({ summary, onChange }: SummaryStepProps) {
  const characterCount = summary.length;
  const idealLength = 150;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FileText size={32} className="text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">
          Professional Summary
        </h3>
        <p className="text-gray-600">
          Write a powerful 2-3 sentence introduction
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary" className="text-gray-700">
            Your Professional Summary *
          </Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Example: Experienced software engineer with 5+ years in full-stack development. Specialized in React, Node.js, and cloud technologies. Passionate about building scalable applications that solve real-world problems."
            className="min-h-32 rounded-lg resize-none"
            required
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <span
            className={`${
              characterCount === 0
                ? "text-gray-400"
                : characterCount < 100
                ? "text-amber-500"
                : characterCount < 250
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {characterCount} characters
          </span>
          <span className="text-gray-500">Ideal: 100-250 characters</span>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <span className="text-blue-600">💡 Pro Tip</span>
          </h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Keep it concise - 2-3 sentences maximum</li>
            <li>• Mention your years of experience and key specialties</li>
            <li>• Include your career goals or what you're passionate about</li>
            <li>• Use strong action words and industry keywords</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Example Summary</h4>
          <p className="text-gray-600 text-sm italic">
            "Full-stack developer with 4+ years of experience building scalable
            web applications using React, Node.js, and AWS. Passionate about
            clean code, user experience, and mentoring junior developers.
            Seeking to leverage technical expertise at a innovative tech
            company."
          </p>
        </div>
      </div>
    </div>
  );
}
