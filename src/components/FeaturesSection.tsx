// components/FeaturesSection.tsx
import { Lock, Briefcase, ShieldCheck, Sparkles } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <Lock size={48} className="text-[var(--color-primary)]" />
          <h3 className="mt-4 text-xl font-semibold">Secure</h3>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Your resume is safe. We never store files or personal data.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <Briefcase size={48} className="text-[var(--color-primary)]" />
          <h3 className="mt-4 text-xl font-semibold">Professional</h3>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Used by job seekers, recruiters, and career coaches worldwide.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <ShieldCheck size={48} className="text-[var(--color-primary)]" />
          <h3 className="mt-4 text-xl font-semibold">Accurate</h3>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            AI ensures ATS keyword optimization & alignment with job posting.
          </p>
        </div>
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
          <Sparkles size={48} className="text-[var(--color-primary)]" />
          <h3 className="mt-4 text-xl font-semibold">Efficient</h3>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Tailor resumes instantly and get results in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
