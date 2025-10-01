// src/app/settings/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Crown,
  User,
  CreditCard,
  Sparkles,
  Settings as SettingsIcon,
  Mail,
  Calendar,
  RefreshCw,
  Database,
} from "lucide-react";

interface UserData {
  credits: number;
  createdAt?: string;
  subscription?: string;
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    if (!session?.user?.email) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log("🔍 Settings: Fetching user data...");
      const response = await fetch("/api/profile");

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(
          errorData.error ||
            errorData.details ||
            `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("✅ Settings: User data received:", data);
      setUserData(data);
    } catch (error) {
      console.error("❌ Settings: Error fetching user data:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch user data";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [session]);

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                Please Sign In
              </h2>
              <p className="text-gray-600 mb-6">
                You need to be signed in to view your settings.
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

  // Show database connection error prominently
  const isDatabaseError =
    error?.includes("Database connection") || error?.includes("ETIMEOUT");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Account Settings
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your profile, credits, and subscription settings
          </p>
        </div>

        {/* Database Connection Error */}
        {isDatabaseError && (
          <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Database Connection Issue
                </h3>
                <p className="text-red-700 mb-4">
                  We're having trouble connecting to the database. This might be
                  a temporary network issue.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={fetchUserData}
                    className="flex items-center gap-2 border-red-200 text-red-700 hover:bg-red-100"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Retry Connection
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="border-gray-300"
                  >
                    Refresh Page
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Errors */}
        {error && !isDatabaseError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-700">
                <span>❌</span>
                <span>Error: {error}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchUserData}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="w-5 h-5 text-blue-600" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Your personal information and account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={session.user?.image || "/default-avatar.png"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {session.user?.name || "User"}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {session.user?.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Member Since
                    </label>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString()
                        : isLoading
                        ? "Loading..."
                        : "Unknown"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Account Status
                    </label>
                    <p className="text-gray-900">
                      {session.user?.subscription === "pro" ? (
                        <span className="flex items-center gap-2 text-yellow-600">
                          <Crown className="w-4 h-4" />
                          Pro Member
                        </span>
                      ) : (
                        <span className="text-green-600">Active</span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Card */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  Subscription Plan
                </CardTitle>
                <CardDescription>
                  Upgrade to unlock premium features and more credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                {session.user?.subscription === "pro" ? (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-yellow-800 mb-2">
                      Pro Plan Active
                    </h3>
                    <p className="text-yellow-700 mb-4">
                      You're enjoying all premium features and unlimited
                      credits!
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2">
                        Free Plan
                      </h3>
                      <p className="text-blue-700 mb-4">
                        Upgrade to Pro for unlimited resume tailoring and
                        premium features
                      </p>
                      <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white">
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-8">
            {/* Credits Card */}
            <Card className="shadow-lg border border-gray-100 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Your Credits
                </CardTitle>
                <CardDescription>
                  Credits remaining for resume tailoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div
                    className={`rounded-2xl p-8 shadow-lg ${
                      error
                        ? "bg-gradient-to-r from-gray-500 to-gray-600"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    } text-white`}
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {error ? (
                        <Database className="w-8 h-8 text-white" />
                      ) : (
                        <Sparkles className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      {isLoading ? (
                        <div className="animate-pulse bg-white/20 rounded h-12 w-20 mx-auto"></div>
                      ) : error ? (
                        "Error"
                      ) : (
                        userData?.credits ?? "N/A"
                      )}
                    </div>
                    <p className="text-white/90 text-lg">
                      {error ? "Connection Issue" : "Credits Available"}
                    </p>
                  </div>

                  {!error && userData && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Credits Used</span>
                        <span>{10 - userData.credits}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Credits Remaining</span>
                        <span className="font-semibold text-green-600">
                          {userData.credits}
                        </span>
                      </div>
                    </div>
                  )}

                  {session.user?.subscription !== "pro" && !error && (
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => (window.location.href = "/pricing")}
                    >
                      Get More Credits
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border border-gray-100">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/documents")}
                >
                  📄 View Documents
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/")}
                >
                  🚀 Create New Resume
                </Button>
                {session.user?.subscription !== "pro" && (
                  <Button
                    className="w-full justify-start bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white"
                    onClick={() => (window.location.href = "/pricing")}
                  >
                    👑 Upgrade to Pro
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
