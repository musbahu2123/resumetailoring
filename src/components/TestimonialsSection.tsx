// components/TestimonialsSection.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, MessageCircle } from "lucide-react";
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

  // Fallback testimonials in case API fails
  const fallbackTestimonials = [
    {
      _id: "1",
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "",
      content:
        "ResumeTailorApp helped me transform my generic resume into a targeted application. I got 3 interview calls within a week!",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      name: "Michael Rodriguez",
      role: "Marketing Manager",
      company: "",
      content:
        "The ATS optimization is incredible. My resume finally started getting past automated systems and into human hands.",
      rating: 5,
      createdAt: new Date().toISOString(),
    },
    {
      _id: "3",
      name: "Emily Watson",
      role: "Product Designer",
      company: "",
      content:
        "I was struggling to tailor my resume for different roles. This tool made it effortless and the results speak for themselves!",
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
    // Refresh testimonials after successful submission
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
      className="relative py-20 px-4 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of job seekers who landed their dream roles with
            perfectly tailored resumes
          </p>

          {/* Add Testimonial Button for logged-in users */}
          {session && (
            <div className="mt-6">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Share Your Story
              </Button>
            </div>
          )}
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <Card
                key={testimonial._id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-blue-400 opacity-60" />
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-2">1000+</div>
            <div className="text-sm text-gray-600">Resumes Tailored</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-2">98%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {testimonials.length < 200 ? "200+" : `${testimonials.length}+`}
            </div>
            <div className="text-sm text-gray-600">Success Stories</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-blue-100 mb-6">
              Join thousands of successful job seekers and start your journey
              today
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Building Now
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
