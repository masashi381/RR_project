import connectDB from "@/app/DB/db";
import UserModel from "@/app/models/userModels";
import { NextRequest } from "next/server";
// import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  connectDB();
  const userId = req.nextUrl.searchParams.get("_id");
  try {
    const user = await UserModel.findById(userId);
    return new Response(JSON.stringify(user), {
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
