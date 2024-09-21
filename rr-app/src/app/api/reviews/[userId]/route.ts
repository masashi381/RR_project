import { corsMiddleware } from "@/lib/corsMiddleware";
import connectDB from "@/lib/db";
import ReviewModel from "@/models/reviewModels";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  corsMiddleware(req);
  connectDB();
  try {
    const userId = params.userId;

    const reviews = await ReviewModel.find({ userId: userId });
    if (reviews.length > 0) {
      return new Response(JSON.stringify(reviews), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(null, {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
