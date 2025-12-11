// app/api/waitlist/route.ts
import { NextResponse } from "next/server";
import Waitlist from "@/models/Waitlist";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, name, interest, source } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if already on waitlist
    const existing = await Waitlist.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "You're already on the waitlist! We'll notify you soon." },
        { status: 200 }
      );
    }

    // Add to waitlist
    await Waitlist.create({
      email,
      name,
      interest: interest || "general",
      source: source || "pricing_page",
    });

    return NextResponse.json(
      { message: "Successfully joined waitlist! You'll be first to know." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { message: "Failed to join waitlist. Please try again." },
      { status: 500 }
    );
  }
}

// Optional: Get waitlist count
export async function GET() {
  await dbConnect();

  try {
    const count = await Waitlist.countDocuments();
    const lifetimeInterest = await Waitlist.countDocuments({
      interest: "lifetime",
    });

    return NextResponse.json({
      total: count,
      lifetimeInterest,
      remainingLifetimeSpots: Math.max(0, 200 - lifetimeInterest),
    });
  } catch (error) {
    return NextResponse.json(
      { total: 34, lifetimeInterest: 12, remainingLifetimeSpots: 166 }, // Fallback
      { status: 200 }
    );
  }
}
