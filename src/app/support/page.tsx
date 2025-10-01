// app/support/page.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Bug,
  Lightbulb,
  MessageCircle,
  Clock,
  CheckCircle2,
  HelpCircle,
  FileText,
  Send,
  User,
} from "lucide-react";

type SupportType = "bug" | "feature" | "general";

export default function SupportPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<SupportType>("bug");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Show loading or sign-in prompt if not authenticated
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Please Sign In
              </h2>
              <p className="text-gray-600 mb-6">
                You need to be signed in to access our support center.
              </p>
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={() => (window.location.href = "/")}
              >
                Go to Homepage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      type: activeTab,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      description: formData.get("description") as string,
      environment: formData.get("environment") as string,
      userEmail: session.user?.email,
      userName: session.user?.name,
    };

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send support request");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending support request:", error);
      alert(
        "Failed to send your request. Please try again or email us directly at resumetailorapp@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="text-center py-12">
            <CardContent className="space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Thank You!
              </h2>
              <p className="text-gray-600 mb-4">
                Your{" "}
                {activeTab === "bug"
                  ? "bug report"
                  : activeTab === "feature"
                  ? "feature request"
                  : "message"}{" "}
                has been sent to our support team.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                We'll respond to <strong>{session.user?.email}</strong> within
                24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Submit Another Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Support Center
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help! Get support, report issues, or suggest new
            features.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Signed in as: <strong>{session.user?.email}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Support Type Tabs */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  How Can We Help You?
                </CardTitle>
                <CardDescription>
                  Choose the type of support you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Button
                    variant={activeTab === "bug" ? "default" : "outline"}
                    className={`h-auto py-4 ${
                      activeTab === "bug"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveTab("bug")}
                  >
                    <div className="text-center">
                      <Bug className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-semibold">Report Bug</div>
                      <div className="text-xs opacity-80 mt-1">
                        Something's not working
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant={activeTab === "feature" ? "default" : "outline"}
                    className={`h-auto py-4 ${
                      activeTab === "feature"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveTab("feature")}
                  >
                    <div className="text-center">
                      <Lightbulb className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-semibold">Feature Request</div>
                      <div className="text-xs opacity-80 mt-1">
                        Suggest improvements
                      </div>
                    </div>
                  </Button>

                  <Button
                    variant={activeTab === "general" ? "default" : "outline"}
                    className={`h-auto py-4 ${
                      activeTab === "general"
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : ""
                    }`}
                    onClick={() => setActiveTab("general")}
                  >
                    <div className="text-center">
                      <Mail className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-semibold">General Help</div>
                      <div className="text-xs opacity-80 mt-1">
                        Other questions
                      </div>
                    </div>
                  </Button>
                </div>

                {/* Support Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        defaultValue={session.user?.name || ""}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        defaultValue={session.user?.email || ""}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {activeTab === "bug"
                        ? "Bug Description"
                        : activeTab === "feature"
                        ? "Feature Description"
                        : "How Can We Help?"}
                    </label>
                    <Input
                      name="subject"
                      placeholder={
                        activeTab === "bug"
                          ? "Brief description of the issue"
                          : activeTab === "feature"
                          ? "What feature would you like to see?"
                          : "Tell us how we can help you"
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Detailed Information
                      <span className="text-gray-500 text-xs ml-2">
                        (Required)
                      </span>
                    </label>
                    <Textarea
                      name="description"
                      placeholder={
                        activeTab === "bug"
                          ? "Please describe:\n• Steps to reproduce the bug\n• What you expected to happen\n• What actually happened\n• Screenshots if possible"
                          : activeTab === "feature"
                          ? "Please describe:\n• The problem you're trying to solve\n• How this feature would help\n• Any examples or references"
                          : "Please provide as much detail as possible so we can help you effectively"
                      }
                      rows={6}
                      required
                    />
                  </div>

                  {activeTab === "bug" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Environment Details
                        <span className="text-gray-500 text-xs ml-2">
                          (Optional but helpful)
                        </span>
                      </label>
                      <Input
                        name="environment"
                        placeholder="Browser, device, operating system (e.g., Chrome 119, MacBook Pro, macOS)"
                      />
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Submit{" "}
                        {activeTab === "bug"
                          ? "Bug Report"
                          : activeTab === "feature"
                          ? "Feature Request"
                          : "Support Request"}
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Support Info */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Support Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-800">
                      Email Support
                    </div>
                    <div className="text-blue-700 text-sm">
                      resumetailorapp@gmail.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">
                      Response Time
                    </div>
                    <div className="text-green-700 text-sm">
                      Within 24 hours
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Bug className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-semibold text-purple-800">
                      Bug Reports
                    </div>
                    <div className="text-purple-700 text-sm">
                      Priority handling
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Bug Reports */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">
                  Tips for Effective Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Include specific steps to reproduce the issue</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Describe what you expected to happen</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Note your browser and device information</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Screenshots or screen recordings help a lot!</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
