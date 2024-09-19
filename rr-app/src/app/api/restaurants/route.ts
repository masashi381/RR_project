import { NextRequest } from "next/server";
import RestaurantModel from "@/models/restaurantModels";
import connectDB from "@/lib/db";
export async function GET(req: NextRequest) {
  connectDB();

  try {
    const text = req.nextUrl.searchParams ? req.nextUrl.searchParams.get("text")?.toUpperCase() : "";

    if (text) {
      const searchRegex = new RegExp(text, "i");
      const restaurants = await RestaurantModel.find({ restaurant_name: searchRegex });
      return new Response(JSON.stringify(restaurants), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const restaurants = await RestaurantModel.find();
      return new Response(JSON.stringify(restaurants), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
