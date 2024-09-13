import { NextRequest, NextResponse } from "next/server";
// import UserModel from "@/app/models/userModels";
import { validateUserInput, createUser } from "../logic/SignUpLogic";
import { UserInput } from "../types/type";
import connectDB from "@/app/DB/db";
export async function POST(req: NextRequest) {
  connectDB();
  const userInput: UserInput = await req.json();
  const { result, message } = validateUserInput(userInput);
  if (!result) {
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = await createUser(userInput);
    return new Response(JSON.stringify(user), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.log(err);
  }
}
