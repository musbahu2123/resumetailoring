// app/admin/blog/edit/[id]/page.tsx - FINAL VERSION with JSON-LD INPUT
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Loader,
  Check,
  X,
  AlertCircle,
  Target,
  Code, // 💡 NEW: Icon for JSON-LD
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor"; // ADD THIS IMPORT

const categories = [
  "AI Tools",
  "Resume Tips",
  "Cover Letters",
  "Templates",
  "Career Advice",
  "ATS Optimization",
];

// SEO scoring system - ADD THIS INTERFACE
interface SEOScore {
  title: number;
  description: number;
  content: number;
  slug: number;
  overall: number;
}

export default function EditBlogPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 🛠️ UPDATED: Added jsonLd to the initial state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image: "",
    category: "AI Tools",
    readTime: "5 min read",
    featured: false,
    status: "draft" as "draft" | "published",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    jsonLd: "", // ⬅️ NEW FIELD: JSON-LD Schema string
  });

  const [seoScore, setSeoScore] = useState<SEOScore>({
    title: 0,
    description: 0,
    content: 0,
    slug: 0,
    overall: 0,
  });

  useEffect(() => {
    fetchPost();
  }, [postId]);

  // 🛠️ UPDATED: Fetch post now includes jsonLd
  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/blog`);
      const posts = await response.json();
      const post = posts.find((p: any) => p._id === postId);

      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          image: post.image || "",
          category: post.category,
          readTime: post.readTime,
          featured: post.featured,
          status: post.status,
          metaTitle: post.metaTitle || "",
          metaDescription: post.metaDescription || "",
          focusKeyword: post.focusKeyword || "",
          jsonLd: post.jsonLd || "", // ⬅️ Handle fetching jsonLd
        });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ADD SEO SCORE CALCULATION
  useEffect(() => {
    calculateSEOScore();
  }, [formData]);

  const calculateSEOScore = () => {
    let titleScore = 0;
    let descriptionScore = 0;
    let contentScore = 0;
    let slugScore = 0;

    const textContent = formData.content.replace(/<[^>]*>/g, "");

    if (formData.title.length >= 50 && formData.title.length <= 60)
      titleScore += 25;
    else if (formData.title.length > 0) titleScore += 15;

    if (
      formData.description.length >= 120 &&
      formData.description.length <= 155
    )
      descriptionScore += 25;
    else if (formData.description.length > 0) descriptionScore += 15;

    if (textContent.length >= 300) contentScore += 25;
    else if (textContent.length > 0) contentScore += 10;

    if (
      formData.slug &&
      formData.focusKeyword &&
      formData.slug.includes(formData.focusKeyword.toLowerCase())
    )
      slugScore += 25;
    else if (formData.slug) slugScore += 15;

    const overall = titleScore + descriptionScore + contentScore + slugScore;
    setSeoScore({
      title: titleScore,
      description: descriptionScore,
      content: contentScore,
      slug: slugScore,
      overall,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // ADD SEO SCORE HELPERS
  const getScoreColor = (score: number) => {
    if (score >= 20) return "text-green-600";
    if (score >= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 20) return <Check className="w-4 h-4 text-green-600" />;
    if (score >= 10) return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    return <X className="w-4 h-4 text-red-600" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.push("/admin")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Edit Blog Post
            </h1>
            <p className="text-gray-600 mt-2">
              Update your content while maintaining SEO optimization
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - 3/4 width */}
            <div className="lg:col-span-3 space-y-6">
              {/* SEO Score Card */}
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    SEO Score: {seoScore.overall}/100
                  </CardTitle>
                  <CardDescription>
                    Optimize your content for better search engine rankings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      {getScoreIcon(seoScore.title)}
                      <span>
                        Title:{" "}
                        <strong className={getScoreColor(seoScore.title)}>
                          {seoScore.title}/25
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getScoreIcon(seoScore.description)}
                      <span>
                        Description:{" "}
                        <strong className={getScoreColor(seoScore.description)}>
                          {seoScore.description}/25
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getScoreIcon(seoScore.content)}
                      <span>
                        Content:{" "}
                        <strong className={getScoreColor(seoScore.content)}>
                          {seoScore.content}/25
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getScoreIcon(seoScore.slug)}
                      <span>
                        Slug:{" "}
                        <strong className={getScoreColor(seoScore.slug)}>
                          {seoScore.slug}/25
                        </strong>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                  <CardDescription>
                    Update your content with proper SEO structure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Focus Keyword */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Focus Keyword
                      <span className="text-xs text-gray-500 ml-2">
                        (Primary keyword for SEO)
                      </span>
                    </label>
                    <Input
                      value={formData.focusKeyword}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          focusKeyword: e.target.value,
                        }))
                      }
                      placeholder="e.g., ai resume builder, cover letter tips"
                    />
                  </div>

                  {/* Title with SEO Guidance */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Title *
                      </label>
                      <span
                        className={`text-xs ${
                          formData.title.length > 60 ||
                          formData.title.length < 50
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {formData.title.length}/60 characters
                        {formData.title.length > 60 && " (Too long)"}
                        {formData.title.length < 50 && " (Too short)"}
                      </span>
                    </div>
                    <Input
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter post title..."
                      required
                    />
                  </div>

                  {/* Meta Title */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Meta Title
                        <span className="text-xs text-gray-500 ml-2">
                          (For search results)
                        </span>
                      </label>
                      <span
                        className={`text-xs ${
                          formData.metaTitle.length > 60
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {formData.metaTitle.length}/60 characters
                      </span>
                    </div>
                    <Input
                      value={formData.metaTitle}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metaTitle: e.target.value,
                        }))
                      }
                      placeholder="Optimized title for search engines..."
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Slug *
                      </label>
                      <span
                        className={`text-xs ${
                          formData.slug &&
                          formData.focusKeyword &&
                          formData.slug.includes(
                            formData.focusKeyword.toLowerCase()
                          )
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {formData.focusKeyword &&
                          (formData.slug.includes(
                            formData.focusKeyword.toLowerCase()
                          )
                            ? "✅ Keyword included"
                            : "⚠️ Add keyword")}
                      </span>
                    </div>
                    <Input
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }))
                      }
                      placeholder="post-url-slug"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Description *
                      </label>
                      <span
                        className={`text-xs ${
                          formData.description.length > 155 ||
                          formData.description.length < 120
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {formData.description.length}/155 characters
                      </span>
                    </div>
                    <Textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Brief description of the post..."
                      rows={3}
                      required
                    />
                  </div>

                  {/* Meta Description */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Meta Description
                        <span className="text-xs text-gray-500 ml-2">
                          (Search result snippet)
                        </span>
                      </label>
                      <span
                        className={`text-xs ${
                          formData.metaDescription.length > 155
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {formData.metaDescription.length}/155 characters
                      </span>
                    </div>
                    <Textarea
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          metaDescription: e.target.value,
                        }))
                      }
                      placeholder="Optimized description for search results..."
                      rows={2}
                    />
                  </div>

                  {/* Featured Image */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Featured Image
                      <span className="text-xs text-gray-500 ml-2">
                        (Optional - displays as blog header)
                      </span>
                    </label>
                    <Input
                      value={formData.image}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          image: e.target.value,
                        }))
                      }
                      placeholder="/images/blog/your-image.jpg"
                    />
                    {formData.image && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-600 mb-1">
                          Preview:
                        </div>
                        <div className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                          <div className="aspect-video bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
                            Image: {formData.image.split("/").pop()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content - REPLACE TEXTAREA WITH RICH TEXT EDITOR */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Content *
                        <span className="text-xs text-gray-500 ml-2">
                          (Use the toolbar for formatting)
                        </span>
                      </label>
                      <span
                        className={`text-xs ${
                          formData.content.replace(/<[^>]*>/g, "").length < 300
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {formData.content.replace(/<[^>]*>/g, "").length}{" "}
                        characters
                        {formData.content.replace(/<[^>]*>/g, "").length <
                          300 && " (Aim for 300+)"}
                      </span>
                    </div>

                    {/* Rich Text Editor */}
                    <RichTextEditor
                      value={formData.content}
                      onChange={(content) =>
                        setFormData((prev) => ({ ...prev, content }))
                      }
                      height={600}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - 1/4 width */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Saving..." : "Update Post"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        window.open(`/blog/${formData.slug}`, "_blank")
                      }
                      disabled={!formData.slug}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>

                  {seoScore.overall < 50 && (
                    <div className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                      ⚠️ SEO score low. Improve content before publishing for
                      better rankings.
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value as "draft" | "published",
                        }))
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Post Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Read Time
                    </label>
                    <Input
                      value={formData.readTime}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          readTime: e.target.value,
                        }))
                      }
                      placeholder="5 min read"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          featured: e.target.checked,
                        }))
                      }
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="featured" className="text-sm text-gray-700">
                      Featured Post
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* 🚀 NEW CARD: JSON-LD Schema Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    JSON-LD Schema
                  </CardTitle>
                  <CardDescription>
                    Structured data for Rich Results (Article Schema)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    value={formData.jsonLd}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        jsonLd: e.target.value,
                      }))
                    }
                    placeholder="Paste your Article JSON-LD Schema here..."
                    rows={10}
                    className="font-mono text-xs"
                  />
                  <p className="text-xs text-gray-500">
                    This is usually generated by an SEO tool or your backend
                    upon saving.
                  </p>
                </CardContent>
              </Card>
              {/* ---------------------------------------------------- */}

              {/* SEO Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    SEO Preview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="border-l-4 border-l-blue-400 pl-3">
                    <div className="text-blue-600 text-sm font-medium line-clamp-1">
                      {formData.metaTitle ||
                        formData.title ||
                        "Your title will appear here"}
                    </div>
                    <div className="text-green-700 text-xs mt-1">
                      https://yoursite.com/blog/{formData.slug || "your-slug"}
                    </div>
                    <div className="text-gray-600 text-xs line-clamp-2 mt-1">
                      {formData.metaDescription ||
                        formData.description ||
                        "Your meta description will appear here in search results..."}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
