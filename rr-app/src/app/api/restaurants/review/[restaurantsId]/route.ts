import connectDB from "@/lib/db";
import ReviewModel from "@/models/reviewModels";
import { NextRequest } from "next/server";
import { ReviewInput } from "@/app/api/types/type";
import { corsMiddleware } from "@/lib/corsMiddleware";

export async function GET(req: NextRequest, { params }: { params: { restaurantsId: string } }) {
  corsMiddleware(req);
  connectDB();
  const restaurantId = params.restaurantsId;
  try {
    const review: ReviewInput[] = await ReviewModel.find({ restaurantId }).exec();
    if (review.length > 0) {
      return new Response(JSON.stringify(review), {
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
