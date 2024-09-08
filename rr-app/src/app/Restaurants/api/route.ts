import { NextRequest, NextResponse } from "next/server";
import RestaurantModel from "@/app/models/restaurantModels";
export async function GET(req: NextRequest) {
  try {
    const text = req.nextUrl.searchParams !== undefined ? req.nextUrl.searchParams.toString().toUpperCase() : "";
    if (text) {
      const searchRegex = new RegExp(text, "i"); // Create a case-insensitive regex
      const restaurants = await RestaurantModel.find({
        restaurant_name: searchRegex,
      }); // Assuming you're searching by name
      NextResponse.json({ message: restaurants }, { status: 200 });
    } else {
      const restaurants = await RestaurantModel.find();
      NextResponse.json({ message: restaurants }, { status: 200 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    NextResponse.json({ message: err.message }, { status: 500 });
  }
}
