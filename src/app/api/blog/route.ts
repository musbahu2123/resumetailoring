// app/api/blog/route.ts
import { NextResponse } from "next/server";
import BlogPost from "@/models/BlogPost";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    const posts = await BlogPost.find({ status: "published" }).sort({
      publishedAt: -1,
      createdAt: -1,
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
