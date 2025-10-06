// app/api/blog/[slug]/route.ts - Make sure it's like this:
import { NextResponse } from "next/server";
import BlogPost from "@/models/BlogPost";
import dbConnect from "@/lib/dbConnect";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> } // ✅ params is Promise
) {
  try {
    const { slug } = await params; // ✅ Await the params

    await dbConnect();
    const post = await BlogPost.findOne({
      slug: slug,
      status: "published",
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Blog post fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
