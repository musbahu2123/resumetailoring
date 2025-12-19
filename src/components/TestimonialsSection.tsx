// components/TestimonialsSection.tsx - UPDATED PROFESSIONAL VERSION
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Star,
  Quote,
  MessageCircle,
  Users,
  TrendingUp,
  Target,
  CheckCircle,
} from "lucide-react";
import AddTestimonialModal from "./AddTestimonialModal";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  createdAt: string;
}

export default function TestimonialsSection() {
  const { data: session } = useSession();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fallbackTestimonials = [
    {
      _id: "1",
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "",
      content:
        "Transformed my generic resume into targeted applications. Got 3 interviews in one week!",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "",
      content:
        "The ATS optimization is incredible. My resume finally started getting past automated systems.",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "3",
      name: "Emily Watson",
      role: "Product Designer",
      company: "",
      content:
        "Made tailoring effortless. The professional results speak for themselves!",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleTestimonialSuccess = () => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch(() => setTestimonials(fallbackTestimonials));
  };

  const displayTestimonials =
    testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <section
      id="testimonials"
      className="relative py-16 px-4 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 px-4 py-2 rounded-lg mb-4">
            <Users className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Success Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Results, Real Careers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join professionals who transformed their job search with perfectly
            tailored applications
          </p>

          {session && (
            <div className="mt-6">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md rounded-lg"
                size="sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Share Your Experience
              </Button>
            </div>
          )}
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-gray-200 animate-pulse"
              >
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-2 mb-5">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="space-y-1.5">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-2 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTestimonials.map((testimonial) => (
              <div
                key={testimonial._id}
                className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all duration-300"
              >
                {/* Quote & Content */}
                <div className="mb-4">
                  <Quote className="w-5 h-5 text-blue-400 opacity-70 mb-2" />
                  <p className="text-gray-700 leading-relaxed text-sm">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-2">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center border border-blue-200">
                    <span className="text-blue-700 font-medium text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {testimonial.role}
                      {testimonial.company ? ` at ${testimonial.company}` : ""}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats - Cleaner Design */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  1000+
                </div>
                <div className="text-xs text-gray-600">Resumes Tailored</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  98%
                </div>
                <div className="text-xs text-gray-600">ATS Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  4.9/5
                </div>
                <div className="text-xs text-gray-600">User Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">
                  {testimonials.length < 200
                    ? "200+"
                    : `${testimonials.length}+`}
                </div>
                <div className="text-xs text-gray-600">Success Stories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4 border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Start Your Success Story Today
            </h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
              Join thousands of professionals who transformed their job search
              with perfectly tailored applications
            </p>
            <button
              onClick={() => (window.location.href = "#builder")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-md transition-shadow text-sm"
            >
              Begin Your Transformation
            </button>
          </div>
        </div>
      </div>

      {/* Add Testimonial Modal */}
      <AddTestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleTestimonialSuccess}
      />
    </section>
  );
}
