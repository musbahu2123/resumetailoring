import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import Job from "@/models/job";
import Testimonial from "@/models/testimonial";
import Event from "@/models/event";
import Support from "@/models/support"; // NEW: Import the Support model

// Temporary function to verify admin access
// In a real application, this should check for a secure token or session state.
async function verifyAdminAuth(request: Request): Promise<boolean> {
  try {
    // You can implement session-based admin auth here
    // For now, we'll rely on the frontend authentication
    return true; // Trust the frontend for now
  } catch (error) {
    return false;
  }
}

export async function GET(request: Request) {
  try {
    const isAuthenticated = await verifyAdminAuth(request);

    if (!isAuthenticated) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await dbConnect();

    // Updated destructuring to include the new support counts
    const [
      totalUsers,
      totalResumes,
      totalTestimonials,
      pendingTestimonials,
      totalSupportRequests, // NEW STAT
      openSupportRequests, // NEW STAT
      recentEvents
    ] = await Promise.all([
      User.countDocuments(),
      Job.countDocuments(),
      Testimonial.countDocuments(),
      Testimonial.countDocuments({ status: "pending" }),
      Support.countDocuments(), // Fetch total support requests
      Support.countDocuments({ status: 'open' }), // Fetch open support requests
      Event.find().sort({ createdAt: -1 }).limit(20).lean()
    ]);

    // Updated stats object to include new support counts
    const stats = {
      totalUsers,
      totalResumes,
      totalTestimonials,
      pendingTestimonials,
      totalSupportRequests, // Included in the response
      openSupportRequests,  // Included in the response
      recentEvents
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
