import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Job from "@/models/job";

export async function GET(req: Request) {
  try {
    const session = await auth();

    // Check if the user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch all jobs for the current user, sorted by creation date
    const jobs = await Job.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    // Return the list of jobs (documents) as a JSON response
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: String(error) },
      { status: 500 }
    );
  }
}
