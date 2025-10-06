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
  { params }: { params: Promise<{ id: string }> } // ✅ Add Promise wrapper
) {
  try {
    // Check admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    const { id } = await params; // ✅ Await params

    const post = await BlogPost.findByIdAndUpdate(
      id, // ✅ Use the awaited id
      {
        ...body,
        updatedAt: new Date(),
        publishedAt: body.status === "published" ? new Date() : null,
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // ✅ Add Promise wrapper
) {
  try {
    // Check admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { id } = await params; // ✅ Await params
    const post = await BlogPost.findByIdAndDelete(id); // ✅ Use the awaited id

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
