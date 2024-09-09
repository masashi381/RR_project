import { NextRequest, NextResponse } from "next/server";
import RestaurantModel from "@/app/models/restaurantModels";
import connectDB from "@/app/DB/db";
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const text = req.nextUrl.searchParams ? req.nextUrl.searchParams.toString().toUpperCase() : "";
    let restaurants;

    if (text) {
      const searchRegex = new RegExp(text, "i");
      restaurants = await RestaurantModel.find({ restaurant_name: searchRegex });
    } else {
      restaurants = await RestaurantModel.find();
    }

    return NextResponse.json({ message: restaurants }, { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
