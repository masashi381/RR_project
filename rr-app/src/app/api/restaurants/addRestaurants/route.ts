import connectDB from "@/lib/db";
import { NextRequest } from "next/server";
import { RestaurantInput } from "../../types/type";
import { createRestaurant } from "@/app/logic/restaurantLogic";
import { corsMiddleware } from "@/lib/corsMiddleware";

export async function POST(req: NextRequest) {
  corsMiddleware(req);
  connectDB();
  const restaurantInput: RestaurantInput = await req.json();

  try {
    const restaurant = createRestaurant(restaurantInput);
    console.log("successful");

    return new Response(JSON.stringify(restaurant), {
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
