// app/faq/page.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "How many free credits do I get?",
      answer:
        "All new users receive 10 free credits to start. Each resume tailoring session uses 1 credit.",
    },
    {
      question: "What file formats do you support?",
      answer:
        "We support PDF, DOCX files, and plain text paste. All formats are processed with the same accuracy.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Yes! We use military-grade encryption and never store your files or personal information after processing. Your data is completely private.",
    },
    {
      question: "How long does resume tailoring take?",
      answer:
        "Typically 30-60 seconds. Complex resumes or high server load may take up to 2 minutes.",
    },
    {
      question: "Can I use ResumeTailor without a resume?",
      answer:
        "Absolutely! If you don't have a resume, we can build one for you based on the job description and your experience.",
    },
    {
      question: "What's your ATS success rate?",
      answer:
        "Our optimized resumes achieve a 98% success rate with Applicant Tracking Systems used by major companies.",
    },
    {
      question: "How do I get more credits?",
      answer:
        "You can earn more credits by referring friends or upgrading to our Pro plan (coming soon).",
    },
    {
      question: "Can I edit the generated resume?",
      answer:
        "Yes! We provide the tailored resume in editable text format. You can make any changes before downloading.",
    },
    {
      question: "Do you store my resume after processing?",
      answer:
        "No. We process your resume in real-time and immediately delete it after generating your tailored version. Your privacy is our priority.",
    },
    {
      question: "What makes ResumeTailor different from other resume builders?",
      answer:
        "We focus on ATS optimization and recruiter-friendly formatting, not fancy graphics. Our AI specifically tailors content to match job descriptions, which is what recruiters actually want.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about ResumeTailor
          </p>
        </div>

        {/* FAQ Items */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-lg">
                    {faq.question}
                  </span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Still have questions?
            </h3>
            <p className="text-blue-700 mb-4">
              Can't find the answer you're looking for? Please reach out to our
              support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/support"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Contact Support
              </a>
              <a
                href="mailto:resumetailorapp@gmail.com"
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
