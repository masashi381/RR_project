import { NextRequest } from "next/server";
import RestaurantModel from "@/app/models/restaurantModels";
import connectDB from "@/app/DB/db";
export async function GET(req: NextRequest) {
  connectDB();
  try {
    const text = req.nextUrl.searchParams ? req.nextUrl.searchParams.toString().toUpperCase() : "";
    let restaurants;

    if (text) {
      const searchRegex = new RegExp(text, "i");
      restaurants = await RestaurantModel.find({ restaurant_name: searchRegex });
    } else {
      restaurants = await RestaurantModel.find();
    }
    return new Response(JSON.stringify(restaurants), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
