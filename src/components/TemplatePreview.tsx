// components/TemplatePreview.tsx
import { useState } from "react";

interface TemplatePreviewProps {
  templateId: string;
  content: string;
  type: "resume" | "coverLetter";
}

export default function TemplatePreview({
  templateId,
  content,
  type,
}: TemplatePreviewProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderPreview = () => {
    const sections = content.split("\n\n");

    switch (templateId) {
      case "classic":
        return (
          <div className="bg-white p-6 font-serif">
            <h2 className="text-2xl font-bold text-blue-800 text-center border-b-4 border-blue-800 pb-2 mb-4">
              {type === "resume" ? "PROFESSIONAL RESUME" : "COVER LETTER"}
            </h2>
            {sections.map((section, index) => {
              const lines = section.split("\n");
              if (lines[0].toUpperCase() === lines[0] && lines[0].length > 3) {
                return (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-bold text-blue-800 uppercase mb-2">
                      {lines[0]}
                    </h3>
                    {lines.slice(1).map((line, i) => (
                      <p key={i} className="text-gray-700 mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                );
              }
              return (
                <p key={index} className="text-gray-700 mb-4">
                  {section}
                </p>
              );
            })}
          </div>
        );

      case "modern":
        return (
          <div className="bg-white p-6 font-sans">
            <div className="bg-gray-700 text-white p-4 text-center mb-6">
              <h2 className="text-xl font-bold">
                {type === "resume" ? "PROFESSIONAL RESUME" : "COVER LETTER"}
              </h2>
            </div>
            {sections.map((section, index) => {
              const lines = section.split("\n");
              if (lines[0].toUpperCase() === lines[0] && lines[0].length > 3) {
                return (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">
                      {lines[0]}
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {lines.slice(1).map((line, i) => (
                        <li key={i} className="mb-1">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return (
                <p key={index} className="text-gray-600 mb-4">
                  {section}
                </p>
              );
            })}
          </div>
        );

      // Add other template previews similarly...
      default:
        return <div className="bg-white p-6">{content}</div>;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-100 p-3 flex justify-between items-center">
        <h3 className="font-semibold">Live Preview</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {isExpanded ? "Collapse" : "Expand"} Preview
        </button>
      </div>
      {isExpanded && (
        <div className="max-h-96 overflow-y-auto">{renderPreview()}</div>
      )}
    </div>
  );
}
