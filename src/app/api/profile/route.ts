// src/app/api/profile/route.ts
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user"

export async function GET() {
  try {
    console.log("🔍 Profile API: Starting request...");
    
    const session = await auth();
    console.log("🔍 Profile API: Session data:", session);
    
    if (!session?.user?.email) {
      console.log("❌ Profile API: No session or email found");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log("🔍 Profile API: Connecting to database...");
    
    // Add connection timeout and better error handling
    try {
      await dbConnect();
      console.log("✅ Profile API: Database connected successfully");
    } catch (dbError) {
      console.error("❌ Profile API: Database connection failed:", dbError);
      return new Response(JSON.stringify({ 
        error: "Database connection failed",
        details: "Unable to connect to the database. Please try again later."
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log("🔍 Profile API: Searching for user:", session.user.email);
    const user = await User.findOne({ email: session.user.email })
      .select('credits createdAt subscription')
      .lean();

    if (!user) {
      console.log("❌ Profile API: User not found in database");
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log("✅ Profile API: User found with credits:", user.credits);
    
    const responseData = {
      credits: user.credits,
      createdAt: user.createdAt,
      subscription: user.subscription
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("❌ Profile API: Unexpected error:", error);
    return new Response(JSON.stringify({ 
      error: "Internal server error",
      details: "An unexpected error occurred"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}