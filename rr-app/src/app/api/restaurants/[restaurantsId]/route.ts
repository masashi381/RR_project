import RestaurantModel from "@/models/restaurantModels";
import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
export async function GET(req: NextRequest, { params }: { params: { restaurantId: string } }) {
  console.log("get restaurantId", req);

  connectDB();

  const restaurantId = params.restaurantId;

  try {
    const restaurant = await RestaurantModel.findById(restaurantId);

    return new Response(JSON.stringify(restaurant), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
