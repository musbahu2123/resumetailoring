// components/PricingSection.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Star, Zap, Shield, InfinityIcon } from "lucide-react";

interface PricingSectionProps {
  onSignIn: () => void;
}

export default function PricingSection({ onSignIn }: PricingSectionProps) {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for trying it out",
      icon: Star,
      popular: false,
      features: [
        "1 tailored resume per 24 hours",
        "Basic ATS optimization",
        "Standard processing",
        "No account needed",
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      gradient: "from-gray-100 to-gray-50",
    },
    {
      name: "Registered",
      price: "$0",
      description: "Enhanced free experience",
      icon: Shield,
      popular: true,
      features: [
        "5 tailored resumes per 24 hours",
        "Advanced ATS optimization",
        "Save history & edits",
        "Email support",
        "Basic templates",
      ],
      buttonText: "Sign Up Free",
      buttonVariant: "default" as const,
      gradient: "from-blue-500 to-purple-600",
    },
    {
      name: "Professional",
      price: "$9.99",
      period: "/mo",
      description: "For serious job seekers",
      icon: Crown,
      popular: false,
      features: [
        "Unlimited tailored resumes",
        "Premium ATS optimization (+98% score)",
        "All professional templates",
        "Priority processing",
        "PDF & Word downloads",
        "Cover letter generator",
        "24/7 priority support",
      ],
      buttonText: "Go Professional",
      buttonVariant: "default" as const,
      gradient: "from-gray-100 to-gray-50",
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-white to-gray-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're testing the waters or ready to transform your career,
            we have the perfect plan for your job search journey.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative ${
                  plan.popular ? "md:scale-105 z-10" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <Card
                  className={`h-full bg-gradient-to-b ${
                    plan.gradient
                  } border-0 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                    plan.popular ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                  }`}
                >
                  <div className="p-8 text-center">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                        plan.popular
                          ? "bg-white text-blue-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <IconComponent size={32} />
                    </div>

                    {/* Plan Name */}
                    <h3
                      className={`text-2xl font-bold ${
                        plan.popular ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div
                      className={`mt-4 ${
                        plan.popular ? "text-white" : "text-gray-800"
                      }`}
                    >
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-lg font-normal">/mo</span>
                      )}
                    </div>

                    {/* Description */}
                    <p
                      className={`mt-2 text-sm ${
                        plan.popular ? "text-blue-100" : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>

                    {/* Features List */}
                    <ul className="mt-8 space-y-3 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <Check
                            size={18}
                            className={`flex-shrink-0 mt-0.5 ${
                              plan.popular ? "text-green-300" : "text-green-500"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              plan.popular ? "text-blue-100" : "text-gray-600"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <div className="mt-8">
                      <Button
                        className={`w-full py-4 rounded-xl text-base font-semibold transition-all duration-200 ${
                          plan.popular
                            ? "bg-white text-blue-600 hover:bg-gray-100 hover:shadow-lg"
                            : plan.name === "Starter"
                            ? "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                        }`}
                        onClick={plan.popular ? onSignIn : undefined}
                        size="lg"
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* FAQ/Additional Info */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              💡 No Risk, All Reward
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All plans include our quality guarantee. If you're not satisfied
              with your tailored resume, we'll help you make it right.
              Professional plan subscribers can cancel anytime.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Zap size={16} className="text-green-500" />
                <span>Instant processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Shield size={16} className="text-blue-500" />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <InfinityIcon size={16} className="text-purple-500" />
                <span>No hidden fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
