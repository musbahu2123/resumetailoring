// lib/events.ts
import dbConnect from "./dbConnect";
import Event from "@/models/event";

export async function trackEvent(
  type: string, 
  userId?: string, 
  metadata: any = {}
) {
  try {
    await dbConnect();
    await Event.create({
      userId,
      type,
      metadata,
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}