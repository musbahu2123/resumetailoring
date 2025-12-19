// components/FeaturesSection.tsx - PROFESSIONAL VERSION
import {
  ShieldCheck,
  Zap,
  Target,
  FileCheck,
  BarChart3,
  CheckCircle,
  Lock,
  Users,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "ATS Optimization",
      description:
        "Maximize compatibility with Applicant Tracking Systems used by major companies.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Generate tailored resumes and cover letters in seconds, perfect for urgent applications.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
    },
    {
      icon: Target,
      title: "Precision Tailoring",
      description:
        "Match your resume exactly to job requirements with proven recruiting methodologies.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
    },
    {
      icon: FileCheck,
      title: "Multiple Formats",
      description:
        "Upload PDFs, Word documents, or paste text. All formats handled with accuracy.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description:
        "See your ATS score improve with each iteration. Know exactly where you stand.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
    {
      icon: Users,
      title: "Proven Methodology",
      description:
        "Built on 25+ years of recruiting expertise from top companies.",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
    },
    {
      icon: Lock,
      title: "Secure & Private",
      description:
        "Your data is encrypted end-to-end. We never store files after processing.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-100",
    },
    {
      icon: CheckCircle,
      title: "Quality Guaranteed",
      description:
        "AI-powered analysis ensures your resume meets industry standards perfectly.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-100",
    },
  ];

  return (
    <section className="relative py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional-Grade Resume Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Built with recruiting expertise and designed for modern job seekers
            who want real results.
          </p>
        </div>

        {/* Features Grid - More professional layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`${feature.bgColor} border ${feature.borderColor} rounded-lg p-5 hover:shadow-sm transition-shadow duration-300`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${feature.bgColor} border ${feature.borderColor}`}
                  >
                    <IconComponent size={20} className={feature.color} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section - Cleaner design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
            <div className="text-xs text-gray-700 font-medium">ATS Success</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-purple-600 mb-1">3x</div>
            <div className="text-xs text-gray-700 font-medium">
              More Interviews
            </div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-green-600 mb-1">30s</div>
            <div className="text-xs text-gray-700 font-medium">Processing</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-100">
            <div className="text-2xl font-bold text-amber-600 mb-1">50k+</div>
            <div className="text-xs text-gray-700 font-medium">
              Resumes Tailored
            </div>
          </div>
        </div>

        {/* CTA Bottom - More professional */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Ready to Land More Interviews?
            </h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto text-sm">
              Join professionals who get 3x more interview callbacks with
              perfectly tailored applications.
            </p>
            <button
              onClick={() => (window.location.href = "#builder")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-md transition-shadow text-sm"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
