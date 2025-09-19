// src/app/api/upload/route.ts (simplified)
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import Job from '@/models/job';
import mammoth from 'mammoth';
import { Buffer } from 'buffer';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const resumeFile = formData.get('resumeFile') as File | null;
    const jobDescriptionText = formData.get('jobDescriptionText') as string;
    const resumeText = formData.get('resumeText') as string;

    // Validation
    if (!jobDescriptionText) {
      return NextResponse.json({ message: 'Job description is required' }, { status: 400 });
    }

    let originalResumeText = resumeText;

    // If user uploaded a DOCX file, process it
    if (resumeFile) {
      const fileBuffer = await resumeFile.arrayBuffer();
      const fileExtension = resumeFile.name.split('.').pop()?.toLowerCase();

      if (fileExtension === 'docx' || fileExtension === 'doc') {
        const result = await mammoth.extractRawText({ buffer: Buffer.from(fileBuffer) });
        originalResumeText = result.value;
      } else {
        return NextResponse.json({ message: 'Unsupported file type. Please use DOCX or paste text.' }, { status: 400 });
      }
    }

    if (!originalResumeText) {
      return NextResponse.json({ message: 'Resume content is required' }, { status: 400 });
    }

    console.log('Received text length:', originalResumeText.length);

    const newJob = await Job.create({
      userId: session.user.id,
      jobDescriptionText,
      originalResumeText,
    });

    return NextResponse.json({
      message: 'Data received and saved successfully',
      jobId: newJob._id,
    }, { status: 200 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      message: error instanceof Error ? error.message : 'Failed to process your request.'
    }, { status: 500 });
  }
}