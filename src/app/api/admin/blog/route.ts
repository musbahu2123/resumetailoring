// app/api/admin/blog/route.ts - UPDATED WITH GET METHOD
import { NextResponse } from "next/server";
import BlogPost from "@/models/BlogPost";
import dbConnect from "@/lib/dbConnect";

// Your admin credentials - same as your auth route
const ADMIN_CREDENTIALS = [
  {
    email: "musbahuameen2123@gmail.com",
    password: process.env.ADMIN_PASSWORD_1,
  },
  {
    email: "resumetailorapp@gmail.com",
    password: process.env.ADMIN_PASSWORD_2,
  },
];

// Check if request is from authenticated admin
async function isAdminAuthenticated(request: Request): Promise<boolean> {
  try {
    // TEMPORARY: Accept all requests to admin routes
    return true;
  } catch (error) {
    return false;
  }
}

// ✅ ADD THIS GET METHOD
export async function GET() {
  try {
    // Check admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Admin blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    // ✅ AUTO-GENERATE JSON-LD SCHEMA
    const baseUrl = "https://www.resumetailorapp.com";
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: body.title,
      description: body.metaDescription || body.description,
      image: body.image
        ? body.image.startsWith("http")
          ? body.image
          : `${baseUrl}${
              body.image.startsWith("/") ? body.image : `/${body.image}`
            }`
        : `${baseUrl}/images/blog/default-blog-image.jpg`,
      author: {
        "@type": "Organization",
        name: "ResumeTailorApp",
      },
      publisher: {
        "@type": "Organization",
        name: "ResumeTailorApp",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/favicon.ico`,
          width: 32,
          height: 32,
        },
      },
      datePublished:
        body.status === "published" ? new Date().toISOString() : null,
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${body.slug}`,
      },
    };

    const post = new BlogPost({
      ...body,
      jsonLd: JSON.stringify(jsonLd), // ✅ AUTO-GENERATED SCHEMA
      publishedAt: body.status === "published" ? new Date() : null,
    });
    await post.save();

    return NextResponse.json(post);
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
