// app/api/admin/support/route.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Support from "@/models/support";

function isAdmin(email: string): boolean {
  const adminEmails = ["musbahuameen2123@gmail.com", "resumetailorapp@gmail.com"];
  return adminEmails.includes(email);
}

// GET all support requests
export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email || !isAdmin(session.user.email)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    
    const supportRequests = await Support.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('userId', 'name email image')
      .lean();

    return NextResponse.json(supportRequests);

  } catch (error) {
    console.error('Error fetching support requests:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - update support request status/notes
export async function PATCH(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email || !isAdmin(session.user.email)) {
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
        updatedAt: new Date()
      },
      { new: true }
    ).populate('userId', 'name email image');

    if (!supportRequest) {
      return NextResponse.json(
        { error: "Support request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      supportRequest 
    });

  } catch (error) {
    console.error('Error updating support request:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}