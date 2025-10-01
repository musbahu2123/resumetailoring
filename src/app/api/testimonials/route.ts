// app/api/testimonials/route.ts
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/testimonial";
import { trackEvent } from "@/lib/events";

export async function GET() {
  try {
    await dbConnect();
    
    // Get only approved testimonials
    const testimonials = await Testimonial.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return new Response(JSON.stringify(testimonials), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { name, role, company, content, rating } = body;

    await dbConnect();

    // Check if user already submitted a testimonial
    const existingTestimonial = await Testimonial.findOne({ 
      userId: session.user.id 
    });

    if (existingTestimonial) {
      return new Response(JSON.stringify({ error: "You have already submitted a testimonial" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const testimonial = await Testimonial.create({
      userId: session.user.id,
      name,
      role,
      company,
      content,
      rating,
      status: "pending", // Admin approval required
    });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Testimonial submitted for review" 
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error creating testimonial:', error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}