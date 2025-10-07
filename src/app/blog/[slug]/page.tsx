// app/blog/[slug]/page.tsx - FIXED VERSION with JSON-LD Schema
"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  User,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

// 🛠️ UPDATED: Added jsonLd to the BlogPost interface
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  jsonLd?: string; // ⬅️ NEW FIELD: Optional string for JSON-LD schema
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  // Helper function to get valid image source
  const getImageSrc = (imagePath: string) => {
    if (!imagePath) return null;

    // If it's already a full URL, use it directly
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it's a local path starting with /, use it directly
    if (imagePath.startsWith("/")) {
      return imagePath;
    }

    // If it's a relative path without leading slash, add it
    if (imagePath.startsWith("images/")) {
      return `/${imagePath}`;
    }

    return null;
  };

  // Helper function to determine if image is local
  const isLocalImage = (imagePath: string) => {
    return imagePath.startsWith("/") && !imagePath.startsWith("//");
  };

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}`);
      if (response.status === 404) {
        notFound();
      }
      const postData: BlogPost = await response.json(); // Type assertion for postData
      setPost(postData);

      // Fetch related posts
      const relatedResponse = await fetch("/api/blog");
      const allPosts: BlogPost[] = await relatedResponse.json();
      setRelatedPosts(
        allPosts
          .filter(
            (p) => p._id !== postData._id && p.category === postData.category
          )
          .slice(0, 3)
      );
    } catch (error) {
      console.error("Failed to fetch post:", error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      {/* 🚀 JSON-LD Schema Injection */}
      {post.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: post.jsonLd,
          }}
        />
      )}

      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <Card className="shadow-xl border-0 rounded-2xl overflow-hidden mb-8">
          <div className="relative aspect-video bg-gray-200">
            {getImageSrc(post.image) ? (
              isLocalImage(post.image) ? (
                <Image
                  src={getImageSrc(post.image)!}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  priority
                />
              ) : (
                <img
                  src={getImageSrc(post.image)!}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              )
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-xl font-semibold">Featured Image</div>
                  <div className="text-sm opacity-80 mt-2">
                    {post.image || "No image provided"}
                  </div>
                </div>
              </div>
            )}
          </div>
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 mb-6">{post.description}</p>

            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Article Content */}
        <Card className="shadow-lg border-0 rounded-2xl mb-12">
          <CardContent className="p-8">
            <div
              className="prose prose-lg max-w-none 
                prose-headings:text-gray-900 
                prose-p:text-gray-700 
                prose-li:text-gray-700 
                prose-strong:text-gray-900 
                prose-a:text-blue-600 hover:prose-a:text-blue-700
                prose-table:min-w-full
                prose-table:border-collapse
                prose-th:bg-gray-50
                prose-th:border prose-th:border-gray-300
                prose-th:px-4 prose-th:py-3
                prose-th:text-left prose-th:text-gray-900
                prose-td:border prose-td:border-gray-300
                prose-td:px-4 prose-td:py-3
                prose-td:text-gray-700
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA within article */}
            <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to put this into practice?
              </h3>
              <p className="text-gray-600 mb-4">
                Use our AI resume builder to create a tailored resume that
                incorporates all these best practices automatically.
              </p>
              <Link href="/#builder">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Build Your Resume Now
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost._id}
                  className="group bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedPost.description}
                    </p>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent text-sm"
                      >
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Final CTA */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Your Perfect Resume?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Put these tips into practice with our AI-powered resume builder.
              Get tailored resumes and cover letters in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#builder" passHref>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                >
                  Start Building Now
                </Button>
              </Link>
              <Link href="/#builder" passHref>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold transition-all duration-200"
                >
                  Try AI Resume Builder
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
