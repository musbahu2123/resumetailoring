// app/templates/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { templates, TemplateInfo } from "@/lib/templates/templates-data";
import { Check, Star, Download, Eye, Zap } from "lucide-react";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Templates", count: templates.length },
    {
      id: "professional",
      name: "Professional",
      count: templates.filter((t) => t.category === "professional").length,
    },
    {
      id: "modern",
      name: "Modern",
      count: templates.filter((t) => t.category === "modern").length,
    },
    {
      id: "creative",
      name: "Creative",
      count: templates.filter((t) => t.category === "creative").length,
    },
    {
      id: "minimal",
      name: "Minimal",
      count: templates.filter((t) => t.category === "minimal").length,
    },
  ];

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            All Templates Are 100% Free
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Professional Resume Templates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from ATS-optimized templates designed to get you interviews.
            All templates are completely free and tailored for modern job
            search.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              } transition-all duration-200`}
            >
              {category.name}
              <Badge
                variant="secondary"
                className="ml-2 bg-white/20 text-white"
              >
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-16">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Your Resume?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                All templates are completely free, ATS-optimized, and ready to
                help you land interviews. Choose your favorite and start
                building in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => (window.location.href = "/")}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Start Building Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
                  onClick={() => (window.location.href = "/#how-it-works")}
                >
                  <Eye className="w-5 h-5 mr-2" />
                  See How It Works
                </Button>
              </div>
              <p className="text-blue-200 text-sm mt-6">
                🚀 No credit card required • 10 free credits included • Instant
                results
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: TemplateInfo }) {
  return (
    <Card className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
      {/* Template Preview with Real Image */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <Image
          src={template.previewImage}
          alt={`${template.name} Template Preview`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

        {/* Popular Badge */}
        {template.id === "classic" && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}

        {/* ATS Optimized Badge */}
        {template.id === "classic" && (
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-green-500 hover:bg-green-600 text-white border-0 shadow-lg"
            >
              ✓ ATS Optimized
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {template.name}
          </CardTitle>
        </div>

        <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
          {template.description}
        </CardDescription>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Key Features:
          </h4>
          <div className="flex flex-wrap gap-2">
            {template.features.map((feature, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-blue-50 border-blue-200 text-blue-700"
              >
                <Check className="w-3 h-3 mr-1 text-green-500" />
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Best For */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
            Ideal For:
          </h4>
          <div className="flex flex-wrap gap-2">
            {template.bestFor.map((useCase, index) => (
              <span
                key={index}
                className="text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group/btn"
          onClick={() => (window.location.href = "/")}
        >
          <Download className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform" />
          Use This Template
        </Button>
      </CardContent>
    </Card>
  );
}
