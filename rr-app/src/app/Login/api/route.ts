import connectDB from "@/app/DB/db";
import UserModel from "@/app/models/userModels";
// import { NextRequest } from "next/server";

export async function GET() {
  connectDB();
  try {
    const users = await UserModel.find();
    return new Response(JSON.stringify(users), {
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
