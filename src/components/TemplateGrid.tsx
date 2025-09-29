// components/TemplateGrid.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface Template {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface TemplateGridProps {
  // Added isMobile prop
  selectedTemplateId: string;
  onTemplateSelect: (templateId: string) => void;
  isMobile?: boolean;
}

const TEMPLATES: Template[] = [
  {
    id: "classic",
    name: "Classic",
    image: "/images/templates/classic.jpg",
    description: "Professional and traditional layout",
  },
  {
    id: "modern",
    name: "Modern",
    image: "/images/templates/mordern.jpg",
    description: "Clean and contemporary design",
  },
  {
    id: "creative",
    name: "Creative",
    image: "/images/templates/creative.jpg",
    description: "Innovative and visually engaging",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    image: "/images/templates/minimalist.jpg",
    description: "Simple and focused on content",
  },
];

export default function TemplateGrid({
  templates = TEMPLATES,
  selectedTemplateId,
  onTemplateSelect,
  isMobile = false, // Destructure and set default value
}: TemplateGridProps) {
  // Determine grid classes based on isMobile prop
  const gridLayoutClass = isMobile
    ? "grid-cols-2"
    : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid gap-4 ${gridLayoutClass}`}>
      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => onTemplateSelect(template.id)}
          className={`
            group cursor-pointer transition-all duration-200 rounded-lg p-3 border-2
            ${
              selectedTemplateId === template.id
                ? "border-blue-500 bg-blue-50 scale-105"
                : "border-gray-200 hover:border-gray-300 hover:scale-102"
            }
          `}
        >
          <div className="relative overflow-hidden rounded-md shadow-sm mb-3 aspect-[3/4]">
            <Image
              src={template.image}
              alt={`${template.name} Template`}
              fill
              // Keeping sizes prop as is, but simplifying the grid layout class above
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
            {selectedTemplateId === template.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                Selected
              </div>
            )}
          </div>
          <div className="text-center">
            <span className="text-sm font-semibold text-gray-800 block">
              {template.name}
            </span>
            <p className="text-xs text-gray-500 mt-1">{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
