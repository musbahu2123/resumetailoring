// app/api/admin/auth/route.ts
import { NextResponse } from "next/server";

// Simple admin credentials - you can move this to environment variables later
const ADMIN_CREDENTIALS = [
  {
    email: "musbahuameen2123@gmail.com",
    password: process.env.ADMIN_PASSWORD_1
  },
  {
    email: "resumetailorapp@gmail.com", 
    password: process.env.ADMIN_PASSWORD_2
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const admin = ADMIN_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: "Admin authentication successful"
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}