import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().trim().min(10, 'Phone must be at least 10 digits'),
  interestedPlan: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, phone, interestedPlan, message } = result.data;

    const enquiry = await db.enquiry.create({
      data: {
        name,
        phone,
        interestedPlan: interestedPlan || undefined,
        message: message || undefined,
        status: 'NEW',
        source: 'WEBSITE',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
        enquiryId: enquiry.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Enquiry submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry. Please try again or reach out on WhatsApp.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await db.enquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error('Fetch enquiries error:', error);
    return NextResponse.json(
      { success: false, message: 'Could not fetch enquiries' },
      { status: 500 }
    );
  }
}
