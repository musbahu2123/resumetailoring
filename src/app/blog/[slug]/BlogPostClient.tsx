// app/blog/[slug]/BlogPostClient.tsx - CLEAN SIMPLE VERSION
"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  User,
  ArrowRight,
  Crown,
  Sparkles,
  Users,
  CheckCircle,
  Shield,
  Zap,
  Award,
  Image as ImageIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

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
  jsonLd?: string;
}

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to validate and get image source
  const getValidImageSrc = (imagePath: string): string | null => {
    if (
      !imagePath ||
      imagePath.trim() === "" ||
      imagePath === "null" ||
      imagePath === "undefined"
    ) {
      return null;
    }

    const cleanPath = imagePath.trim();

    if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) {
      return cleanPath;
    }

    if (cleanPath.startsWith("/") && !cleanPath.startsWith("//")) {
      return cleanPath;
    }

    if (cleanPath.startsWith("images/")) {
      return `/${cleanPath}`;
    }

    if (cleanPath.match(/^[a-zA-Z0-9_-]+\.[a-zA-Z]{3,4}$/)) {
      return `/images/blog/${cleanPath}`;
    }

    return null;
  };

  // Fetch related posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/blog");

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setAllPosts(data);
          if (post?._id && post?.category) {
            setRelatedPosts(
              data
                .filter(
                  (p: BlogPost) =>
                    p._id !== post._id && p.category === post.category
                )
                .slice(0, 3)
            );
          } else {
            setRelatedPosts(data.slice(0, 3));
          }
        } else {
          console.error("Expected array but got:", data);
          setAllPosts([]);
          setRelatedPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        setAllPosts([]);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [post?._id, post?.category]);

  const hasValidImage = (): boolean => {
    const src = getValidImageSrc(post.image);
    return src !== null && src !== "";
  };

  const imageSrc = getValidImageSrc(post.image);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Gradient */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Blog Article
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {post.description}
          </p>
        </div>

        {/* MAIN GRID - Simple sticky sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* LEFT SIDEBAR - Simple sticky */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-8">
              {/* AI Resume Builder CTA */}
              <div className="bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                    <Crown className="w-3 h-3" />
                    <span>Sponsored</span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-lg mb-3">
                    AI Resume Builder ✨
                  </h3>
                  <p className="text-orange-100 text-sm mb-4">
                    Let AI format your resume - 100% no typos & ATS friendly
                  </p>

                  <div className="mb-4">
                    <div className="bg-white/20 rounded-xl p-3">
                      <div className="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden mb-2">
                        <Image
                          src="/images/templates/classic.jpg"
                          alt="Classic Resume Template"
                          width={160}
                          height={213}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-white/90 text-sm font-medium">
                        Classic Template
                      </p>
                      <p className="text-white/70 text-xs">
                        Professional & Timeless
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-orange-200 mb-4">
                    <div className="flex items-center justify-center gap-1">
                      <span>⭐</span>
                      <span>1# Product of the Week</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold py-2 text-sm shadow-lg"
                  asChild
                >
                  <Link href="/">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create Resume With AI
                  </Link>
                </Button>

                <p className="text-xs text-orange-200 text-center mt-2">
                  By pressing you agree to our Terms & Privacy Policy
                </p>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-3 space-y-12 order-1 lg:order-2">
            {/* Article Content */}
            <Card className="shadow-xl border-0 rounded-2xl overflow-hidden">
              {hasValidImage() && imageSrc ? (
                <div className="relative aspect-video bg-gray-100">
                  {imageSrc.startsWith("/") ? (
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      priority
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageSrc}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
              ) : (
                <div className="bg-gray-50/50 p-8">
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto border border-gray-200">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">
                      Content-focused article
                    </p>
                  </div>
                </div>
              )}

              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author || "ResumeTailorApp Team"}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                {/* Trust Bar */}
                <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-8 text-sm text-gray-600 py-4 border-y border-gray-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>10,000+ Readers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Expert Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span>AI-Powered Tips</span>
                  </div>
                </div>

                {/* Blog Content */}
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 pt-8 border-t border-gray-200">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1 sm:flex-none">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Article
                  </Button>
                  <Link
                    href="/blog"
                    className="flex-1 sm:flex-none w-full sm:w-auto"
                  >
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Blog
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* More Blogs Section */}
            {!loading && allPosts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  More From Our Blog
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {allPosts
                    .filter((p) => p._id !== post._id)
                    .slice(0, 4)
                    .map((blogPost) => (
                      <Link
                        key={blogPost._id}
                        href={`/blog/${blogPost.slug}`}
                        className="group bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium mb-2">
                              {blogPost.category}
                            </span>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                              {blogPost.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {blogPost.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform mt-2 flex-shrink-0" />
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM TEMPLATES SECTION */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-6xl">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-2xl p-8 lg:p-12 text-white text-center overflow-hidden">
              <div className="text-center mb-8">
                <h3 className="text-4xl font-bold mb-4">
                  Stop Manual Formatting! 🚀
                </h3>
                <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                  Let AI build your perfect resume in minutes - no formatting,
                  no typos, just results
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-8">
                <div className="flex-1 max-w-md lg:max-w-lg">
                  <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                      <Image
                        src="/images/templates/creative.jpg"
                        alt="Professional ATS Resume Template"
                        width={400}
                        height={533}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-left space-y-6">
                  <div>
                    <h4 className="font-bold text-2xl mb-3">
                      Professional ATS Resume Template
                    </h4>
                    <p className="text-blue-100 text-lg mb-4">
                      The only resume template you'll ever need. Designed to
                      pass every ATS system and impress recruiters.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-green-300 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">
                          100% ATS Compatible
                        </div>
                        <div className="text-blue-200 text-sm">
                          Passes every Applicant Tracking System
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-yellow-300 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">
                          AI-Powered Formatting
                        </div>
                        <div className="text-blue-200 text-sm">
                          No manual formatting - AI does it all
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-blue-300 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">
                          Recruiter Approved
                        </div>
                        <div className="text-blue-200 text-sm">
                          Impress hiring managers instantly
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">
                          Zero Typos Guaranteed
                        </div>
                        <div className="text-blue-200 text-sm">
                          Perfect formatting every time
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-xl p-4 mt-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-bold text-white text-2xl">3x</div>
                        <div className="text-blue-200 text-sm">
                          More Interviews
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-white text-2xl">98%</div>
                        <div className="text-blue-200 text-sm">ATS Success</div>
                      </div>
                      <div>
                        <div className="font-bold text-white text-2xl">
                          5min
                        </div>
                        <div className="text-blue-200 text-sm">Create Time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-6 px-16 text-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
                  asChild
                >
                  <Link href="/">
                    <Sparkles className="w-6 h-6 mr-3" />
                    Create Your Resume Now - Free
                  </Link>
                </Button>
                <p className="text-blue-200 text-lg mt-4">
                  Join 10,000+ professionals who landed their dream job with our
                  AI builder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
