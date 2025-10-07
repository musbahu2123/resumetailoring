// app/blog/[slug]/page.tsx - DEBUG VERSION
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
  try {
    const { slug } = await params;
    console.log("🔍 generateMetadata - slug:", slug);
    console.log(
      "🔍 generateMetadata - NEXTAUTH_URL:",
      process.env.NEXTAUTH_URL
    );

    const apiUrl = `${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }/api/blog/${slug}`;
    console.log("🔍 generateMetadata - API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    console.log("🔍 generateMetadata - Response status:", response.status);

    if (!response.ok) {
      console.log("❌ generateMetadata - Response not OK");
      return {
        title: "Blog Post Not Found",
      };
    }

    const post: BlogPost = await response.json();
    console.log("✅ generateMetadata - Post found:", post.title);

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
    console.error("❌ generateMetadata - Error:", error);
    return {
      title: "Blog Post",
    };
  }
}

async function getPostData(slug: string): Promise<BlogPost | null> {
  try {
    console.log("🔄 getPostData - slug:", slug);
    console.log("🔄 getPostData - NEXTAUTH_URL:", process.env.NEXTAUTH_URL);

    const apiUrl = `${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }/api/blog/${slug}`;
    console.log("🔄 getPostData - API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    console.log("🔄 getPostData - Response status:", response.status);

    if (!response.ok) {
      console.log("❌ getPostData - Response not OK");
      return null;
    }

    const post = await response.json();
    console.log("✅ getPostData - Post found:", post.title);
    return post;
  } catch (error) {
    console.error("🚨 getPostData - Error:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const { slug } = await params;
    console.log("🚀 BlogPostPage - slug:", slug);

    const post = await getPostData(slug);
    console.log("🚀 BlogPostPage - post:", post ? "Found" : "Not found");

    if (!post) {
      console.log("❌ BlogPostPage - Showing 404");
      notFound();
    }

    console.log("✅ BlogPostPage - Rendering post:", post.title);

    return (
      <>
        {post.jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: post.jsonLd }}
          />
        )}
        <BlogPostClient post={post} />
      </>
    );
  } catch (error) {
    console.error("🚨 BlogPostPage - Error:", error);
    notFound();
  }
}
