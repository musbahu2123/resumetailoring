// components/PricingSection.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingSectionProps {
  onSignIn: () => void;
}

export default function PricingSection({ onSignIn }: PricingSectionProps) {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
          Simple & Transparent Pricing
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-lg rounded-xl flex flex-col items-center p-8 bg-white">
            <h3 className="text-2xl font-semibold">Free</h3>
            <p className="mt-2 text-4xl font-bold text-[var(--color-primary)]">
              $0
            </p>
            <p className="mt-2 text-sm text-gray-500">No account needed</p>
            <ul className="mt-4 space-y-2 text-left w-full">
              <li className="flex items-center gap-2 text-gray-600">
                <Check size={18} className="text-green-500" />1 tailored resume
                per 24 hours
              </li>
            </ul>
            <Button className="mt-8 px-6 py-3 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white transition-colors w-full">
              Use Free
            </Button>
          </Card>
          <Card className="shadow-xl rounded-xl flex flex-col items-center p-8 bg-[var(--color-primary)] text-white scale-105">
            <h3 className="text-2xl font-semibold">Registered</h3>
            <p className="mt-2 text-4xl font-bold">$0</p>
            <p className="mt-2 text-sm opacity-80">Free account</p>
            <ul className="mt-4 space-y-2 text-left w-full">
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-300" />5 tailored resumes
                per 24 hours
              </li>
              <li className="flex items-center gap-2">
                <Check size={18} className="text-green-300" />
                Save history & edits
              </li>
            </ul>
            <Button
              className="mt-8 px-6 py-3 rounded-lg bg-white text-[var(--color-primary)] hover:bg-gray-200 transition-colors w-full"
              onClick={onSignIn}
            >
              Register
            </Button>
          </Card>
          <Card className="shadow-lg rounded-xl flex flex-col items-center p-8 bg-white">
            <h3 className="text-2xl font-semibold">Pro Plan</h3>
            <p className="mt-2 text-4xl font-bold text-[var(--color-primary)]">
              $9.99<span className="text-base font-normal">/mo</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">Billed monthly</p>
            <ul className="mt-4 space-y-2 text-left w-full">
              <li className="flex items-center gap-2 text-gray-600">
                <Check size={18} className="text-green-500" />
                Unlimited tailored resumes
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Check size={18} className="text-green-500" />
                Download in PDF/Word format
              </li>
              <li className="flex items-center gap-2 text-gray-600">
                <Check size={18} className="text-green-500" />
                Priority processing
              </li>
            </ul>
            <Button className="mt-8 px-6 py-3 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white w-full">
              Subscribe
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
