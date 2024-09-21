import ReviewModel from "@/models/reviewModels";
import connectDB from "@/lib/db";
import { corsMiddleware } from "@/lib/corsMiddleware";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  corsMiddleware(req);
  connectDB();
  try {
    const reviews = await ReviewModel.find();
    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
