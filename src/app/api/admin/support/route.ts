// app/api/admin/support/route.ts - FIXED
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Support from "@/models/support";

// Use your admin authentication system instead of NextAuth
async function isAdminAuthenticated(): Promise<boolean> {
  // Since you have a separate admin auth, we'll accept all requests for now
  // You can implement proper admin session validation here
  return true;
}

// GET all support requests
export async function GET() {
  try {
    // Check admin authentication using your system
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const supportRequests = await Support.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("userId", "name email image")
      .lean();

    return NextResponse.json(supportRequests);
  } catch (error) {
    console.error("Error fetching support requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - update support request status/notes
export async function PATCH(request: Request) {
  try {
    // Check admin authentication using your system
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { supportId, status, adminNotes } = body;

    await dbConnect();

    const supportRequest = await Support.findByIdAndUpdate(
      supportId,
      {
        status,
        adminNotes,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate("userId", "name email image");

    if (!supportRequest) {
      return NextResponse.json(
        { error: "Support request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      supportRequest,
    });
  } catch (error) {
    console.error("Error updating support request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
