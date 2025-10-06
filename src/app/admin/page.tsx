// AdminDashboard component (app/admin/page.tsx)
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  MessageCircle,
  Star,
  CheckCircle,
  XCircle,
  BarChart3,
  Clock,
  Shield,
} from "lucide-react";
import AdminLogin from "@/components/AdminLogin"; // Imported AdminLogin component

interface Testimonial {
  _id: string;
  userId: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface SupportRequest {
  _id: string;
  name: string;
  email: string;
  subject: string;
  description: string;
  status: "open" | "in-progress" | "resolved";
  type: "bug" | "feature" | "general";
  environment?: string;
  createdAt: string;
}

// NEW INTERFACE for Blog Post
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  readTime: string;
  featured: boolean;
  status: "draft" | "published";
  publishedAt: string;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalResumes: number;
  totalTestimonials: number;
  pendingTestimonials: number;
  recentEvents: any[];
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  // NEW STATE: Blog Posts
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Admin login handler that calls the backend /api/admin/auth
  const handleAdminLogin = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  useEffect(() => {
    // Data fetching is now triggered only upon successful local authentication
    if (isAuthenticated) {
      setIsLoading(true); // Reset loading state when authentication changes to true
      fetchAdminData();
    } else {
      // Clear data and ensure loading is false if logging out or not authenticated
      setStats(null);
      setTestimonials([]);
      setSupportRequests([]);
      setBlogPosts([]); // Clear blog posts on logout
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const fetchAdminData = async () => {
    try {
      // Updated to fetch blog posts in parallel
      const [testimonialsRes, statsRes, supportRes, blogRes] =
        await Promise.all([
          fetch("/api/admin/testimonials"),
          fetch("/api/admin/stats"),
          fetch("/api/admin/support"),
          fetch("/api/admin/blog"), // NEW: Fetch blog posts
        ]);

      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json();
        setTestimonials(testimonialsData);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (supportRes.ok) {
        const supportData = await supportRes.json();
        setSupportRequests(supportData);
      }

      // NEW: Handle blog posts response
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setBlogPosts(blogData);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestimonialAction = async (
    testimonialId: string,
    action: "approve" | "reject"
  ) => {
    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testimonialId,
          action,
        }),
      });

      if (response.ok) {
        // Remove from local state and refresh stats to update pending count
        setTestimonials((prev) => prev.filter((t) => t._id !== testimonialId));
        fetchAdminData();
      } else {
        console.error("Failed to update testimonial status");
      }
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  const handleUpdateSupport = async (
    requestId: string,
    status: "in-progress" | "resolved"
  ) => {
    try {
      const response = await fetch("/api/admin/support", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
          status,
        }),
      });

      if (response.ok) {
        // Optimistically update local state
        setSupportRequests((prev) =>
          prev.map((r) => (r._id === requestId ? { ...r, status: status } : r))
        );
        // Refresh all data to ensure the list is up-to-date
        fetchAdminData();
      } else {
        console.error("Failed to update support request status");
      }
    } catch (error) {
      console.error("Error updating support request:", error);
    }
  };

  // NEW: Delete blog post function
  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogPosts((prev) => prev.filter((post) => post._id !== postId));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // 1. Show admin login if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // 2. Show loading state after successful login while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header with Logout Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage testimonials and monitor platform activity
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsAuthenticated(false)} // Logout action
            className="flex items-center gap-2 text-gray-700 hover:bg-red-50 hover:text-red-600 border-gray-300"
          >
            <Shield className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-lg border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stats.totalUsers}
                    </div>
                    <div className="text-sm text-gray-600">Total Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stats.totalResumes}
                    </div>
                    <div className="text-sm text-gray-600">
                      Resumes Generated
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stats.totalTestimonials}
                    </div>
                    <div className="text-sm text-gray-600">Testimonials</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border border-gray-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stats.pendingTestimonials}
                    </div>
                    <div className="text-sm text-gray-600">Pending Reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pending Testimonials */}
        <Card className="bg-white shadow-lg border border-gray-100 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Pending Testimonial Reviews
            </CardTitle>
            <CardDescription>
              Review and approve or reject user testimonials
            </CardDescription>
          </CardHeader>
          <CardContent>
            {testimonials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p>No pending testimonials to review!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                      <Badge variant="secondary">Pending</Badge>
                    </div>

                    <p className="text-gray-700 mb-3 italic">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="flex gap-2 ml-auto">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleTestimonialAction(testimonial._id, "approve")
                          }
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleTestimonialAction(testimonial._id, "reject")
                          }
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Support Requests Section */}
        <Card className="bg-white shadow-lg border border-gray-100 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              Recent Support Requests
            </CardTitle>
            <CardDescription>
              Manage and respond to user support requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {supportRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p>No open support requests!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {supportRequests.map((request) => (
                  <div
                    key={request._id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {request.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {request.email}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {/* Truncated ID for display purposes */}#
                          {request._id.substring(0, 8)}... •{" "}
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge
                          variant={
                            request.status === "open"
                              ? "default"
                              : request.status === "in-progress"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {request.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            request.type === "bug"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : request.type === "feature"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }
                        >
                          {request.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="font-medium text-gray-700">
                        {request.subject}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {request.description}
                      </p>
                    </div>

                    {request.environment && (
                      <div className="text-xs text-gray-500 mb-3">
                        <strong>Environment:</strong> {request.environment}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        // Mailto link to reply
                        onClick={() =>
                          window.open(
                            `mailto:${request.email}?subject=Re: ${request.subject}&body=Hi ${request.name},`,
                            "_blank"
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Reply via Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={request.status !== "open"}
                        onClick={() =>
                          handleUpdateSupport(request._id, "in-progress")
                        }
                        className="border-gray-300 hover:bg-gray-100"
                      >
                        Mark In Progress
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={request.status === "resolved"}
                        onClick={() =>
                          handleUpdateSupport(request._id, "resolved")
                        }
                        className="text-green-600 border-green-300 hover:bg-green-50"
                      >
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Blog Management Section (NEW) */}
        <Card className="bg-white shadow-lg border border-gray-100 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              Blog Management
            </CardTitle>
            <CardDescription>
              Create, edit, and manage blog posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={() => window.open("/admin/blog/new", "_blank")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
              <Button variant="outline" onClick={fetchAdminData}>
                Refresh
              </Button>
            </div>

            {/* Blog Posts Table */}
            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p>No blog posts yet. Create your first post!</p>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {blogPosts.map((post) => (
                        <tr key={post._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {post.description}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant={
                                post.status === "published"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                post.status === "published"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {post.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  window.open(`/blog/${post.slug}`, "_blank")
                                }
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  window.open(
                                    `/admin/blog/edit/${post._id}`,
                                    "_blank"
                                  )
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDeletePost(post._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        {stats?.recentEvents && stats.recentEvents.length > 0 && (
          <Card className="bg-white shadow-lg border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentEvents
                  .slice(0, 10)
                  .map((event: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-600 capitalize">
                        {event.type.replace("_", " ")}
                      </span>
                      <span className="text-gray-400 text-xs ml-auto">
                        {new Date(event.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
