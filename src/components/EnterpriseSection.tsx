// components/EnterpriseSection.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function EnterpriseSection() {
  return (
    <section className="container mx-auto py-16 px-4">
      <Card className="shadow-lg rounded-xl p-8 text-center bg-gray-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-3xl font-bold">
            Looking for Enterprise Solutions?
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl">
            Career coaches, recruitment agencies, or universities? Contact us
            for bulk services and API access.
          </p>
          <Button className="mt-4 px-8 py-4 text-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white">
            <Mail size={20} className="mr-2" />
            Contact Us
          </Button>
        </div>
      </Card>
    </section>
  );
}
