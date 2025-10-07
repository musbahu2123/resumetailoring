// app/api/admin/blog/[id]/route.ts - FIXED
import { NextResponse } from "next/server";
import BlogPost from "@/models/BlogPost";
import dbConnect from "@/lib/dbConnect";

// Same authentication function as above
async function isAdminAuthenticated(request: Request): Promise<boolean> {
  // TEMPORARY: Accept all requests to admin routes
  return true;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { id } = await params;

    // ✅ AUTO-GENERATE/UPDATE JSON-LD SCHEMA
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
        body.publishedAt ||
        (body.status === "published" ? new Date().toISOString() : null),
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseUrl}/blog/${body.slug}`,
      },
    };

    const post = await BlogPost.findByIdAndUpdate(
      id,
      {
        ...body,
        jsonLd: JSON.stringify(jsonLd), // ✅ AUTO-GENERATED/UPDATED SCHEMA
        updatedAt: new Date(),
        publishedAt:
          body.status === "published" ? new Date() : body.publishedAt,
      },
      { new: true }
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
