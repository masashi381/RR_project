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
    return NextResponse.json({ message: message }, { status: 500 });
  }

  try {
    const user = await createUser(userInput);
    return NextResponse.json({ message: user }, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
