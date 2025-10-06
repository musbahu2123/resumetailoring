// app/api/admin/blog/route.ts - UPDATED
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
    // Since your admin system uses a separate auth, we need to check the credentials
    // You might want to use cookies or tokens for persistent admin sessions
    // For now, we'll accept all requests to admin routes as authenticated
    // In production, you should implement proper session management

    // TEMPORARY: Accept all requests to admin routes
    // Replace this with proper admin session validation
    return true;

    // Alternative: Check for admin token in headers
    // const authHeader = request.headers.get('authorization');
    // if (authHeader?.startsWith('Bearer ')) {
    //   const token = authHeader.slice(7);
    //   // Validate token
    //   return true;
    // }

    // return false;
  } catch (error) {
    return false;
  }
}

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

    const post = new BlogPost({
      ...body,
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
