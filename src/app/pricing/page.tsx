// app/pricing/page.tsx - FINAL VERSION WITH ANIMATION
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  Sparkles,
  Crown,
  Zap,
  Clock,
  Users,
  Quote,
  Target,
  Award,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [waitlistStats, setWaitlistStats] = useState({
    total: 34,
    lifetimeInterest: 12,
    remainingLifetimeSpots: 166,
  });

  // Fetch waitlist stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/waitlist");
        if (response.ok) {
          const data = await response.json();
          setWaitlistStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch waitlist stats:", error);
      }
    };
    fetchStats();
  }, []);

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name.trim() || undefined,
          interest: "lifetime",
          source: "pricing_page",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
        setName("");
        // Refresh stats
        const statsResponse = await fetch("/api/waitlist");
        if (statsResponse.ok) {
          const data = await statsResponse.json();
          setWaitlistStats(data);
        }
      } else {
        const data = await response.json();
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Waitlist error:", error);
      alert("Failed to join waitlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscriptionClick = (planType: "monthly" | "yearly") => {
    // For now, show coming soon message
    alert(
      `Pro ${planType} plans will be available in 2-3 weeks. In the meantime, you can join the lifetime deal waitlist for exclusive pricing!`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">
              {waitlistStats.lifetimeInterest > 0
                ? "LIMITED TIME OFFER"
                : "CHOOSE YOUR PLAN"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Invest in Your Career Success
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional resume tools powered by 25 years of recruiting
            expertise
          </p>

          {/* Lifetime Deal Banner - Only show if spots available */}
          {waitlistStats.remainingLifetimeSpots > 0 && (
            <div className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      🔥 Lifetime Deal for First 200 Users!
                    </h3>
                    <p className="text-sm text-gray-600">
                      Pay once, get unlimited resume optimizations forever
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    {waitlistStats.lifetimeInterest}/200 interested
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ✅ MOTIVATIONAL TESTIMONIAL SECTION */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto md:mx-0">
                  <Quote className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">
                    25 Years of Recruiting Experience Built In
                  </h3>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "I've been a recruiter for 25 years. The biggest red flags?
                  Resumes not tailored to the job description, typos, and being
                  too lengthy. With AI tools, you can fix these in minutes.
                  Don't just apply—tailor, optimize, and stand out."
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Senior Recruiter
                    </p>
                    <p className="text-sm text-gray-600">
                      Tech Industry Expert
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-green-700">
                      Interviewed 5,000+ candidates
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action Below Testimonial */}
            <div className="mt-8 pt-6 border-t border-blue-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    10x Your Interview Opportunities
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Go Premium and leverage our AI trained on 25 years of
                    recruiting expertise
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      document
                        .getElementById("pricing-grid")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    See Premium Plans
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div
          id="pricing-grid"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {/* Free Plan */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg flex flex-col">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Free</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Perfect for trying out
              </p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>3 credits per month</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Basic resume enhancement</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cover letter generation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>ATS scoring</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>PDF/DOCX upload</span>
              </li>
            </ul>
            <div className="mt-auto">
              <Button
                className="w-full bg-gray-100 text-gray-800 hover:bg-gray-200"
                disabled
              >
                Current Plan
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">
                Try 3 resumes free each month
              </p>
            </div>
          </div>

          {/* LIFETIME DEAL - Featured (Only if spots available) */}
          {waitlistStats.remainingLifetimeSpots > 0 ? (
            <div className="bg-white rounded-2xl p-8 border-2 border-yellow-500 shadow-xl relative flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  BEST VALUE
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Lifetime Pro
                  </h3>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">
                      $49
                    </span>
                    <span className="text-gray-600 ml-2">one-time</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1 font-semibold">
                    Save $1,000+ vs monthly over 2 years
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">
                    Unlimited generations FOREVER
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Priority AI with recruiter insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Advanced ATS optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Recruiter-approved templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>PDF Export</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Priority email support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Early access to all new features</span>
                </li>
              </ul>

              {submitted ? (
                <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                  <Check className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-green-700 font-semibold">
                    You're on the waitlist! 🎉
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    We'll email you first when lifetime deals launch
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinWaitlist} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                  <Input
                    type="text"
                    placeholder="Your name (optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 font-bold"
                  >
                    {isLoading ? "Joining..." : "Join Lifetime Waitlist"}
                  </Button>
                </form>
              )}

              <p className="text-xs text-center text-gray-500 mt-3">
                {waitlistStats.remainingLifetimeSpots} spots left at $49
              </p>
            </div>
          ) : (
            // If lifetime spots are gone, show standard Pro Monthly
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg flex flex-col">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="w-6 h-6 text-purple-500" />
                  <h3 className="text-2xl font-bold text-gray-800">
                    Pro Monthly
                  </h3>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">
                    $9.99
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold">Unlimited generations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Priority AI processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Advanced ATS optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Recruiter-friendly templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Email support</span>
                </li>
              </ul>

              <Button
                onClick={() => handleSubscriptionClick("monthly")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
              >
                Coming Soon
              </Button>
            </div>
          )}

          {/* Subscription Plans - Always show */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg flex flex-col">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-800">
                  Subscription
                </h3>
              </div>

              {/* Monthly */}
              <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">
                        $9.99
                      </span>
                      <span className="text-gray-600 ml-1">/month</span>
                    </div>
                    <p className="text-sm text-gray-500">Billed monthly</p>
                  </div>
                  <Button
                    onClick={() => handleSubscriptionClick("monthly")}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>

              {/* Yearly */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">
                        $89
                      </span>
                      <span className="text-gray-600 ml-1">/year</span>
                    </div>
                    <p className="text-sm text-green-600 font-semibold">
                      Save 25% ($30/year)
                    </p>
                    <p className="text-sm text-gray-500">Billed annually</p>
                  </div>
                  <Button
                    onClick={() => handleSubscriptionClick("yearly")}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="font-semibold">Unlimited generations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Priority AI processing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Advanced ATS optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>8+ premium resume templates</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Export to PDF</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Email support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Cancel anytime</span>
              </li>
            </ul>

            <div className="text-center text-sm text-gray-500">
              <p>14-day money-back guarantee</p>
              <p className="mt-1">Switch between monthly/yearly anytime</p>
            </div>
          </div>
        </div>

        {/* ✅ ANIMATED "DON'T GIVE UP" SECTION */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 shadow-lg overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-emerald-200 rounded-full opacity-20 animate-pulse delay-700"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-4">
                  <Heart className="w-6 h-6 text-red-500 animate-pulse" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Don't Give Up—Keep Tailoring!
                    <span className="inline-block ml-2 animate-bounce">✨</span>
                  </h2>
                </div>

                {/* Animated text message */}
                <div className="max-w-2xl mx-auto">
                  <p className="text-gray-700 text-lg mb-4">
                    As a recruiter with 25 years experience says:
                  </p>
                  <div className="relative">
                    <div className="bg-white p-4 rounded-xl border border-green-300 shadow-sm">
                      <p className="text-gray-800 italic text-center animate-pulse">
                        <span className="font-semibold text-green-700">
                          "Maybe you didn't hear back. Maybe you got rejected.
                          Don't give up. There is a job out there for you."
                        </span>
                      </p>
                    </div>
                    {/* Floating animation */}
                    <div className="absolute -top-2 -right-2 animate-bounce">
                      <span className="text-2xl">💪</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated progress bar */}
              <div className="mt-8 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Your journey to success
                  </span>
                  <span className="text-sm font-bold text-green-700 animate-pulse">
                    Keep going!
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-600 h-2 rounded-full animate-[progress_2s_ease-in-out_infinite]"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>

              {/* Final encouraging message */}
              <div className="mt-8 pt-6 border-t border-green-200 text-center">
                <p className="text-gray-700">
                  Every resume tailored is a step closer to your dream job.{" "}
                  <span className="font-semibold text-green-700 animate-pulse">
                    Keep going. Keep tailoring. You've got this!
                  </span>
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="text-2xl animate-bounce delay-100">🚀</span>
                  <span className="text-2xl animate-bounce delay-300">💼</span>
                  <span className="text-2xl animate-bounce delay-500">🎯</span>
                  <span className="text-2xl animate-bounce delay-700">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">
                What's the difference between Lifetime and Subscription?
              </h3>
              <p className="text-gray-600">
                <strong>Lifetime Pro ($49 one-time):</strong> Pay once, get
                unlimited access forever. Includes all current and future Pro
                features. Limited to first 200 users.
                <br />
                <br />
                <strong>Subscription ($9.99/month or $89/year):</strong> Ongoing
                access while subscribed. Cancel anytime. Better for users who
                prefer flexibility.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">
                When will paid plans be available?
              </h3>
              <p className="text-gray-600">
                We're finalizing payment processing. Expect launch in 2-3 weeks.
                Lifetime deals will be offered to waitlist members first with a
                24-hour exclusive window.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-lg mb-2">
                Can I switch from monthly to yearly later?
              </h3>
              <p className="text-gray-600">
                Yes! You can switch between monthly and yearly plans anytime. If
                you upgrade from monthly to yearly, we'll prorate your remaining
                time.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <Link
            href="/"
            className="text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            ← Back to resume builder
          </Link>
        </div>
      </div>

      {/* Add CSS for custom animation */}
      <style jsx>{`
        @keyframes progress {
          0% {
            transform: scaleX(0.8);
            opacity: 0.7;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0.8);
            opacity: 0.7;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
