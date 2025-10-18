// app/blog/page.tsx - UPDATED WITH TEMPLATE SECTION
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Search, Sparkles } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// Define the structure for a blog post fetched from the API
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch blog posts from the API
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BlogPost[] = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Dynamically generate categories based on fetched posts
  const categories = useMemo(() => {
    return [
      "All Posts",
      ...Array.from(new Set(posts.map((post) => post.category))),
    ];
  }, [posts]);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All Posts" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Find the featured post for the main banner
  const featuredPost = useMemo(() => {
    return posts.find((post) => post.featured);
  }, [posts]);

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

  // --- Loading State Display ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Main Blog Page Content ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Blog & Resources
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Resume & Career Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Expert tips, AI tools, and proven strategies to help you land your
            dream job. Stay updated with the latest in resume writing and career
            advancement.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  : "bg-white hover:bg-gray-50 border-gray-200 text-gray-700"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "All Posts" && !searchQuery && (
          <Card className="mb-12 shadow-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm">
                  <span>⭐ Featured Post</span>
                </div>
                <CardTitle className="text-3xl font-bold text-white">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-blue-100 text-lg">
                  {featuredPost.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-blue-200 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(featuredPost.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {featuredPost.category}
                  </span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`} passHref>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-semibold">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="relative aspect-video lg:aspect-square rounded-lg overflow-hidden bg-gray-200">
                {getImageSrc(featuredPost.image) ? (
                  <Image
                    src={getImageSrc(featuredPost.image)!}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-lg font-semibold">No Image</div>
                      <div className="text-sm opacity-80">
                        {featuredPost.image}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post) => (
            <Card
              key={post._id}
              className="group bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-video bg-gray-200 overflow-hidden">
                  {getImageSrc(post.image) ? (
                    <Image
                      src={getImageSrc(post.image)!}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white">
                      <div className="text-center p-4">
                        <div className="font-semibold">No Image</div>
                        <div className="text-xs opacity-80 mt-1 truncate max-w-full">
                          {post.image}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </CardDescription>
                <Link href={`/blog/${post.slug}`} passHref>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-blue-600 hover:text-blue-700 hover:bg-transparent group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No posts found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSelectedCategory("All Posts");
                setSearchQuery("");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* BOTTOM TEMPLATES SECTION - FULL WIDTH CENTERED */}
        <div className="flex justify-center w-full">
          <div className="w-full max-w-6xl">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl p-8 lg:p-12 text-white text-center">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-6">
                  Ready to Create Your Perfect Resume?
                </h3>
                <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                  Choose from our professional templates and let AI do the
                  formatting for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12 max-w-4xl mx-auto">
                {/* Template 1 - Creative */}
                <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                  <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/templates/creative.jpg"
                      alt="Creative Resume Template"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-xl mb-3">Modern Creative</h4>
                  <p className="text-blue-200 text-lg mb-4">
                    Perfect for tech and creative roles
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-blue-200">
                    <span>✅ ATS Optimized</span>
                    <span>✅ Mobile Friendly</span>
                    <span>✅ Modern Design</span>
                  </div>
                </div>

                {/* Template 2 - Classic */}
                <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                  <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden mb-6">
                    <Image
                      src="/images/templates/classic.jpg"
                      alt="Classic Resume Template"
                      width={300}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold text-xl mb-3">
                    Professional Classic
                  </h4>
                  <p className="text-blue-200 text-lg mb-4">
                    Ideal for corporate and traditional roles
                  </p>
                  <div className="flex flex-col gap-2 text-sm text-blue-200">
                    <span>✅ Recruiter Approved</span>
                    <span>✅ ATS Friendly</span>
                    <span>✅ Timeless Design</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-5 px-12 text-lg shadow-2xl"
                  asChild
                >
                  <Link href="/">
                    <Sparkles className="w-5 h-5 mr-3" />
                    Create Your Resume Now - Free
                  </Link>
                </Button>
                <p className="text-blue-200 text-lg mt-6">
                  Join thousands who landed their dream job with our AI builder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
