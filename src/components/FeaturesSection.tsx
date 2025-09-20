// components/FeaturesSection.tsx
import {
  Lock,
  Briefcase,
  ShieldCheck,
  Sparkles,
  Zap,
  Target,
  FileCheck,
  BarChart3,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Lock,
      title: "Military-Grade Security",
      description:
        "Your data is encrypted end-to-end. We never store files or personal information after processing.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Generate tailored resumes and cover letters in seconds, not hours. Perfect for last-minute applications.",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: Target,
      title: "ATS Optimized",
      description:
        "Maximize your resume's compatibility with Applicant Tracking Systems used by 99% of Fortune 500 companies.",
      gradient: "from-green-500 to-green-600",
    },
    {
      icon: ShieldCheck,
      title: "Quality Guaranteed",
      description:
        "AI-powered analysis ensures your resume perfectly matches job requirements and industry standards.",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: FileCheck,
      title: "Multiple Formats",
      description:
        "Upload PDFs, Word documents, or paste raw text. We handle all formats with perfect accuracy.",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: BarChart3,
      title: "Score Tracking",
      description:
        "Watch your ATS compatibility score improve with each iteration. Know exactly where you stand.",
      gradient: "from-indigo-500 to-indigo-600",
    },
    {
      icon: Briefcase,
      title: "Industry Specific",
      description:
        "Tailored for tech, healthcare, finance, and more. Understands industry-specific terminology.",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      icon: Sparkles,
      title: "Smart Suggestions",
      description:
        "Get intelligent recommendations for skills, keywords, and accomplishments to include.",
      gradient: "from-red-500 to-red-600",
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Why Choose ResumeTailor?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with cutting-edge AI and designed for modern job seekers who
            want results, not just features.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Gradient Icon Background */}
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent size={32} className="text-white" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-200 transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-3xl font-bold text-gray-800 mb-2">98%</div>
            <div className="text-sm text-gray-600">ATS Success Rate</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-3xl font-bold text-gray-800 mb-2">50k+</div>
            <div className="text-sm text-gray-600">Resumes Tailored</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-3xl font-bold text-gray-800 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">User Rating</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-3xl font-bold text-gray-800 mb-2">30s</div>
            <div className="text-sm text-gray-600">Average Processing</div>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Job Search?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of successful job seekers who landed their dream
              roles with perfectly tailored applications.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
