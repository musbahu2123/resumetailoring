// app/blog/[slug]/page.tsx - SIMPLIFIED SERVER-SIDE PROCESSING
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

// Simple regex-based server-side heading ID processing
function addIdsToHeadings(html: string): string {
  let processed = html;
  let index = 0;

  // Match h1-h6 tags without existing IDs
  processed = processed.replace(
    /<h([1-6])([^>]*)>([^<]+)<\/h[1-6]>/gi,
    (match, level, attrs, text) => {
      // Check if id already exists
      if (attrs.includes('id="')) {
        return match;
      }

      // Create ID from text
      const id =
        text
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "") || `heading-${index++}`;

      return `<h${level}${attrs} id="${id}">${text}</h${level}>`;
    }
  );

  return processed;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;

    const apiUrl = `${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }/api/blog/${slug}`;

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

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
    return {
      title: "Blog Post",
    };
  }
}

async function getPostData(slug: string): Promise<BlogPost | null> {
  try {
    const apiUrl = `${
      process.env.NEXTAUTH_URL || "http://localhost:3000"
    }/api/blog/${slug}`;

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const post = await response.json();

    // Process headings on server side to avoid hydration errors
    if (post.content) {
      post.content = addIdsToHeadings(post.content);
    }

    return post;
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const { slug } = await params;

    const post = await getPostData(slug);

    if (!post) {
      notFound();
    }

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
    notFound();
  }
}
