import connectDB from "@/lib/db";
import UserModel from "@/models/userModels";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  connectDB();
  const userId = params.userId;
  // console.log("userId: " + userId);

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
