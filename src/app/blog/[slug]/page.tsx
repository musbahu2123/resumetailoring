// app/blog/[slug]/page.tsx - FINAL WORKING VERSION
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  jsonLd?: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blog/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        title: "Blog Post Not Found",
      };
    }

    const post: BlogPost = await response.json();

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: [post.image],
        type: "article",
        publishedTime: post.publishedAt,
        authors: [post.author],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {
      title: "Blog Post",
    };
  }
}

async function getPostData(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/blog/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* ✅ DIRECT JSON-LD INJECTION - This WILL work */}
      {post.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.jsonLd }}
        />
      )}
      <BlogPostClient post={post} />
    </>
  );
}
