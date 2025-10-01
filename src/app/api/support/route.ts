// app/api/support/route.ts - Add database storage
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/dbConnect";
import Support from "@/models/support";
import { trackEvent } from "@/lib/events";

export async function POST(request: Request) {
  let body;

  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    body = await request.json();
    const { type, name, email, subject, description, environment } = body;

    await dbConnect();

    // Store support request in database
    const supportRequest = await Support.create({
      userId: session.user.id,
      type,
      name,
      email,
      subject,
      description,
      environment,
      status: "open",
    });

    // Track the event
    await trackEvent("support_request", session.user.id, {
      supportId: supportRequest._id,
      type: type
    });

    const emailSubject = `[${type.toUpperCase()}] ${subject} - ResumeTailor App`;
    
    const emailContent = `
NEW SUPPORT REQUEST (#${supportRequest._id})

Type: ${type}
From: ${name} (${email})
Subject: ${subject}

Description:
${description}

${environment ? `Environment: ${environment}` : ''}

--- USER INFO ---
Support ID: ${supportRequest._id}
Session Email: ${session.user?.email}
Session Name: ${session.user?.name}
Timestamp: ${new Date().toISOString()}

View in Admin: http://localhost:3000/admin
Please respond within 24 hours.
    `.trim();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'resumetailorapp@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"ResumeTailor App" <resumetailorapp@gmail.com>',
      to: 'resumetailorapp@gmail.com',
      subject: emailSubject,
      text: emailContent,
      replyTo: email,
    });

    console.log('✅ Support email sent via Gmail');

    return NextResponse.json({ 
      success: true,
      message: "Support request sent successfully. We'll contact you at " + email
    });

  } catch (error) {
    console.error('Support API error:', error);
    
    // Fallback logging
    console.log('📧 SUPPORT REQUEST (Fallback Log):', {
      type: body?.type,
      from: `${body?.name} <${body?.email}>`,
      subject: body?.subject,
      description: body?.description,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({ 
      success: true,
      message: "Support request received. We'll contact you soon at " + body?.email
    });
  }
}