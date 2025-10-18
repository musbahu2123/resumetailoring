import { toolsConfig, type ToolSlug } from "@/lib/tools-config";
import ToolClient from "./ToolClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const tool = toolsConfig[slug as ToolSlug];

  if (!tool) {
    return {
      title: "Tool Not Found",
      description: "The requested tool could not be found.",
    };
  }

  return {
    title: tool.meta.title,
    description: tool.meta.description,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = toolsConfig[slug as ToolSlug];

  if (!tool) {
    notFound();
  }

  return <ToolClient tool={tool} />;
}
