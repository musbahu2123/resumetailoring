// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Sparkles,
//   Upload,
//   Target,
//   Zap,
//   Download,
//   Shield,
//   FileText,
//   Users,
//   Rocket,
//   Crown,
//   Wand2,
//   ArrowRight,
// } from "lucide-react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function AIResumeBuilderClient() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<"build" | "upload" | "paste">(
//     "build"
//   );

//   const navigateToBuilder = () => {
//     router.push("/#builder");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
//       <div className="container mx-auto max-w-6xl">
//         {/* Hero - Direct Funnel */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-4 py-2 rounded-lg mb-4">
//             <Zap className="w-4 h-4 text-blue-600" />
//             <span className="text-sm font-medium text-blue-700">
//               No Sign-Up Required
//             </span>
//           </div>

//           <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
//             Free AI Resume Builder & Tailor
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
//             Build from scratch or upload existing. Get a job-specific resume +
//             cover letter in 2 minutes.
//           </p>

//           {/* Interactive Demo Card */}
//           <Card className="max-w-3xl mx-auto shadow-lg border border-gray-200">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-lg">
//                 Start Building Your Perfect Application
//               </CardTitle>
//               <CardDescription>
//                 Choose your method - we'll help you build, enhance, and tailor
//                 for any job
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {/* Tab Navigation */}
//               <div className="flex flex-wrap border-b mb-6">
//                 <button
//                   type="button"
//                   className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
//                     activeTab === "build"
//                       ? "border-b-2 border-blue-600 text-blue-600"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                   onClick={() => setActiveTab("build")}
//                 >
//                   <Wand2 className="w-4 h-4" />
//                   Build from Scratch
//                 </button>
//                 <button
//                   type="button"
//                   className={`px-4 py-2 text-sm font-medium ${
//                     activeTab === "upload"
//                       ? "border-b-2 border-blue-600 text-blue-600"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                   onClick={() => setActiveTab("upload")}
//                 >
//                   Upload Resume
//                 </button>
//                 <button
//                   type="button"
//                   className={`px-4 py-2 text-sm font-medium ${
//                     activeTab === "paste"
//                       ? "border-b-2 border-blue-600 text-blue-600"
//                       : "text-gray-600 hover:text-gray-800"
//                   }`}
//                   onClick={() => setActiveTab("paste")}
//                 >
//                   Paste Text
//                 </button>
//               </div>

//               {/* Content based on active tab */}
//               {activeTab === "build" && (
//                 <div className="text-center py-6">
//                   <Wand2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     Build Professional Resume with AI
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     No resume? Our AI will guide you through creating one from
//                     scratch.
//                   </p>
//                   <Button
//                     onClick={navigateToBuilder}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
//                   >
//                     Start Building with AI
//                   </Button>
//                 </div>
//               )}

//               {activeTab === "upload" && (
//                 <div className="text-center py-6">
//                   <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     Upload & Enhance Your Resume
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     Upload PDF, DOCX, or Word files for AI enhancement.
//                   </p>
//                   <Button
//                     onClick={navigateToBuilder}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
//                   >
//                     Upload & Enhance Now
//                   </Button>
//                 </div>
//               )}

//               {activeTab === "paste" && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Paste Your Resume Text
//                     </label>
//                     <textarea
//                       className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                       placeholder="Copy and paste your current resume here..."
//                     />
//                   </div>
//                   <Button
//                     onClick={navigateToBuilder}
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
//                   >
//                     Enhance & Tailor This Resume
//                   </Button>
//                 </div>
//               )}

//               <div className="mt-6 text-center">
//                 <div className="inline-flex items-center gap-2 text-sm text-gray-500">
//                   <Shield className="w-4 h-4" />
//                   Your data is private and secure
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Simple CTA Button */}
//           <div className="mt-8">
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl px-8"
//               onClick={navigateToBuilder}
//             >
//               <Target className="w-5 h-5 mr-2" />
//               Start Free - Build/Upload Your Resume
//             </Button>
//           </div>
//         </div>

//         {/* Process Flow */}
//         <div className="mb-12">
//           <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
//             Simple 3-Step Process
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <Card className="text-center border border-gray-200 hover:border-blue-200 transition-colors">
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <span className="text-blue-600 font-bold">1</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-2">
//                   Build or Upload
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   Create from scratch, upload files, or paste your resume text
//                 </p>
//               </CardContent>
//             </Card>
//             <Card className="text-center border border-gray-200 hover:border-purple-200 transition-colors">
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <span className="text-purple-600 font-bold">2</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-2">
//                   Enhance & Tailor
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   AI enhances content and tailors for specific job descriptions
//                 </p>
//               </CardContent>
//             </Card>
//             <Card className="text-center border border-gray-200 hover:border-green-200 transition-colors">
//               <CardContent className="p-6">
//                 <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                   <span className="text-green-600 font-bold">3</span>
//                 </div>
//                 <h3 className="font-semibold text-gray-800 mb-2">
//                   Preview & Download
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   Get polished resume + cover letter as professional PDFs
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>

//         {/* Unique Value - Clean Version */}
//         <Card className="bg-white border border-gray-200 mb-12">
//           <CardContent className="p-6">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//               Why Choose Our AI Resume Builder
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <Shield className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Recruiter Intelligence
//                   </h3>
//                   <p className="text-gray-600 text-sm mt-1">
//                     Trained on 25+ years of Google recruiting experience
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <FileText className="w-5 h-5 text-green-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Dual Documents
//                   </h3>
//                   <p className="text-gray-600 text-sm mt-1">
//                     Get both tailored resume AND cover letter together
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <Target className="w-5 h-5 text-purple-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     ATS Optimization
//                   </h3>
//                   <p className="text-gray-600 text-sm mt-1">
//                     Formatted to pass automated systems and impress humans
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                   <Zap className="w-5 h-5 text-orange-600" />
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Instant Results
//                   </h3>
//                   <p className="text-gray-600 text-sm mt-1">
//                     From upload to download in under 2 minutes
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Recruiter Insight - Clean */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mb-12">
//           <div className="flex items-start gap-4">
//             <div className="flex-shrink-0">
//               <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
//                 <Users className="w-5 h-5 text-white" />
//               </div>
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-800 mb-2">
//                 From a Google Recruiter with 25+ Years Experience
//               </h3>
//               <blockquote className="text-gray-700 italic border-l-3 border-blue-500 pl-4 mb-3">
//                 "Generic resumes fail. Tailoring to the job description is
//                 critical, and even small errors create doubt. Our AI solves this
//                 automatically."
//               </blockquote>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   "ATS-optimized",
//                   "Error-free",
//                   "Tailored content",
//                   "Professional format",
//                 ].map((item, i) => (
//                   <span
//                     key={i}
//                     className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-xs text-gray-700"
//                   >
//                     ✓ {item}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Final CTA */}
//         <div className="text-center">
//           <Card className="border border-gray-200 shadow-sm max-w-2xl mx-auto">
//             <CardContent className="p-8">
//               <h3 className="text-2xl font-bold text-gray-900 mb-4">
//                 Ready to Transform Your Job Search?
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Join professionals getting 3x more interviews with perfectly
//                 tailored applications.
//               </p>
//               <Button
//                 size="lg"
//                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
//                 onClick={navigateToBuilder}
//               >
//                 <Target className="w-5 h-5 mr-2" />
//                 Start Building Free
//               </Button>
//               <p className="text-gray-500 text-sm mt-4">
//                 No credit card • Build/Upload/Enhance/Tailor/Download •
//                 Professional PDFs
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }
////////////////////////////////

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sparkles,
  Upload,
  Target,
  Zap,
  Download,
  Shield,
  FileText,
  Users,
  Rocket,
  Crown,
  Wand2,
  ArrowRight,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AIResumeBuilderClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"build" | "upload" | "paste">(
    "build"
  );
  const [activePath, setActivePath] = useState<"enhance" | "tailor">("enhance");

  const navigateToBuilder = () => {
    router.push("/#builder");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Hero - Direct Funnel */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-4 py-2 rounded-lg mb-4">
            <Zap className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              No Sign-Up Required • Choose Your Path
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Free AI Resume Builder & Tailor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Choose what you need: Enhance your resume OR get both resume + cover
            letter tailored for a specific job.
          </p>

          {/* ⭐ CRITICAL: PATH SELECTION */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4 text-center">
                What would you like to create?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ENHANCE ONLY PATH */}
                <button
                  onClick={() => setActivePath("enhance")}
                  className={`p-5 rounded-xl text-left border-2 transition-all duration-200 ${
                    activePath === "enhance"
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        activePath === "enhance" ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <Sparkles
                        className={`w-5 h-5 ${
                          activePath === "enhance"
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">
                        🚀 Enhance My Resume
                      </div>
                      <p className="text-sm text-gray-600">
                        Improve formatting, content & ATS score
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <FileText className="w-3 h-3" />
                        <span>Resume only</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* FULL TAILORING PATH */}
                <button
                  onClick={() => setActivePath("tailor")}
                  className={`p-5 rounded-xl text-left border-2 transition-all duration-200 ${
                    activePath === "tailor"
                      ? "border-purple-500 bg-purple-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        activePath === "tailor"
                          ? "bg-purple-100"
                          : "bg-gray-100"
                      }`}
                    >
                      <Target
                        className={`w-5 h-5 ${
                          activePath === "tailor"
                            ? "text-purple-600"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1">
                        🎯 Tailor for Specific Job
                      </div>
                      <p className="text-sm text-gray-600">
                        Get resume + matching cover letter
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <FileText className="w-3 h-3" />
                        <Mail className="w-3 h-3" />
                        <span>Both documents</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Path Description */}
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700 text-center">
                  {activePath === "enhance"
                    ? "✓ Perfect if you just want to improve your current resume's formatting and content"
                    : "✓ Perfect if you're applying for a specific job and need both resume AND cover letter"}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Demo Card */}
          <Card className="max-w-3xl mx-auto shadow-lg border border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                {activePath === "enhance"
                  ? "Start Enhancing Your Resume"
                  : "Start Tailoring Your Application"}
              </CardTitle>
              <CardDescription>
                {activePath === "enhance"
                  ? "Choose how you'd like to provide your resume for AI enhancement"
                  : "Provide your resume and the job description for perfect tailoring"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Tab Navigation */}
              <div className="flex flex-wrap border-b mb-6">
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                    activeTab === "build"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("build")}
                >
                  <Wand2 className="w-4 h-4" />
                  Build from Scratch
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "upload"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("upload")}
                >
                  Upload Resume
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === "paste"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab("paste")}
                >
                  Paste Text
                </button>
              </div>

              {/* Content based on active tab */}
              {activeTab === "build" && (
                <div className="text-center py-6">
                  <Wand2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Build Professional Resume with AI
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No resume? Our AI will guide you through creating one from
                    scratch.
                  </p>
                  <Button
                    onClick={navigateToBuilder}
                    className={`${
                      activePath === "enhance"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    } text-white`}
                  >
                    {activePath === "enhance"
                      ? "Start Building & Enhancing"
                      : "Start Building & Tailoring"}
                  </Button>
                </div>
              )}

              {activeTab === "upload" && (
                <div className="text-center py-6">
                  <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Upload & {activePath === "enhance" ? "Enhance" : "Tailor"}{" "}
                    Your Resume
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Upload PDF, DOCX, or Word files for AI{" "}
                    {activePath === "enhance" ? "enhancement" : "tailoring"}.
                  </p>
                  <Button
                    onClick={navigateToBuilder}
                    className={`${
                      activePath === "enhance"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    } text-white`}
                  >
                    {activePath === "enhance"
                      ? "Upload & Enhance Now"
                      : "Upload & Tailor Now"}
                  </Button>
                </div>
              )}

              {activeTab === "paste" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paste Your Resume Text
                    </label>
                    <textarea
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Copy and paste your current resume here..."
                    />
                  </div>
                  <Button
                    onClick={navigateToBuilder}
                    className={`w-full ${
                      activePath === "enhance"
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    } text-white`}
                  >
                    {activePath === "enhance"
                      ? "Enhance This Resume"
                      : "Tailor This Resume"}
                  </Button>
                </div>
              )}

              {/* Job Description Preview for Tailor Path */}
              {activePath === "tailor" && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-purple-800">
                        You'll also get a matching cover letter!
                      </p>
                      <p className="text-xs text-purple-600 mt-1">
                        When you provide a job description, our AI generates
                        both a tailored resume AND a professional cover letter
                        that matches perfectly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  Your data is private and secure
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simple CTA Button */}
          <div className="mt-8">
            <Button
              size="lg"
              className={`${
                activePath === "enhance"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              } text-white shadow-lg hover:shadow-xl px-8`}
              onClick={navigateToBuilder}
            >
              <Target className="w-5 h-5 mr-2" />
              {activePath === "enhance"
                ? "Start Enhancing Free"
                : "Start Tailoring Free"}
            </Button>
            <p className="text-gray-500 text-sm mt-3">
              {activePath === "enhance"
                ? "Get improved formatting & ATS optimization"
                : "Get both resume + cover letter for your target job"}
            </p>
          </div>
        </div>

        {/* Process Flow - Updated for Both Paths */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {activePath === "enhance"
              ? "Simple 3-Step Enhancement"
              : "Complete 3-Step Application"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border border-gray-200 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Build or Upload
                </h3>
                <p className="text-gray-600 text-sm">
                  Create from scratch, upload files, or paste your resume text
                </p>
              </CardContent>
            </Card>
            <Card
              className={`text-center border transition-colors ${
                activePath === "enhance"
                  ? "border-gray-200 hover:border-cyan-200"
                  : "border-gray-200 hover:border-purple-200"
              }`}
            >
              <CardContent className="p-6">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                    activePath === "enhance" ? "bg-cyan-100" : "bg-purple-100"
                  }`}
                >
                  <span
                    className={`font-bold ${
                      activePath === "enhance"
                        ? "text-cyan-600"
                        : "text-purple-600"
                    }`}
                  >
                    2
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {activePath === "enhance" ? "AI Enhancement" : "AI Tailoring"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {activePath === "enhance"
                    ? "AI improves formatting, content & ATS score"
                    : "AI tailors resume + generates matching cover letter"}
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border border-gray-200 hover:border-green-200 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Preview & Download
                </h3>
                <p className="text-gray-600 text-sm">
                  {activePath === "enhance"
                    ? "Get polished resume as professional PDF"
                    : "Get both documents as professional PDFs"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {activePath === "enhance"
                  ? "Ready to Enhance Your Resume?"
                  : "Ready to Land Your Dream Job?"}
              </h3>
              <p className="text-gray-600 mb-6">
                {activePath === "enhance"
                  ? "Join professionals getting better formatting and ATS scores with AI enhancement."
                  : "Join professionals getting 3x more interviews with perfectly tailored applications."}
              </p>
              <Button
                size="lg"
                className={`${
                  activePath === "enhance"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                } text-white px-8`}
                onClick={navigateToBuilder}
              >
                <Target className="w-5 h-5 mr-2" />
                {activePath === "enhance"
                  ? "Start Enhancing Free"
                  : "Start Tailoring Free"}
              </Button>
              <p className="text-gray-500 text-sm mt-4">
                {activePath === "enhance"
                  ? "No credit card • Professional formatting • ATS optimization"
                  : "No credit card • Both documents • Perfect matching • ATS optimization"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
