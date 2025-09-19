// components/JobDescriptionSection.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";

interface JobDescriptionSectionProps {
  jobDescriptionText: string;
  setJobDescriptionText: (text: string) => void;
}

export default function JobDescriptionSection({
  jobDescriptionText,
  setJobDescriptionText,
}: JobDescriptionSectionProps) {
  return (
    <Card className="shadow-md rounded-xl">
      <CardHeader>
        <div className="flex items-center space-x-2 text-[var(--color-primary)]">
          <Pencil size={24} />
          <CardTitle>Paste Job Description</CardTitle>
        </div>
        <CardDescription>
          Copy and paste the job description from the listing.
          <br />
          <span className="text-orange-600 font-medium">
            🚀 Coming Soon: Direct URL import from job boards!
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste the job description here..."
          className="h-full rounded-xl"
          value={jobDescriptionText}
          onChange={(e) => setJobDescriptionText(e.target.value)}
          required
        />
      </CardContent>
    </Card>
  );
}
