import RestaurantModel from "@/models/restaurantModels";
import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { corsMiddleware } from "@/lib/corsMiddleware";
export async function GET(req: NextRequest, context: { params: Promise<{ restaurantsId: string }> }) {
  corsMiddleware(req);
  connectDB();

  const { restaurantsId } = await context.params;

  try {
    const restaurant = await RestaurantModel.findById(restaurantsId);

    return new Response(JSON.stringify(restaurant), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch restaurant:", error);
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
