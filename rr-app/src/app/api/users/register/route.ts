import connectDB from "@/lib/db";
import { NextRequest } from "next/server";
import { UserInput } from "../../types/type";
import { createUser, validateUserInput } from "@/app/logic/userLogic";

export async function POST(req: NextRequest) {
  connectDB();

  try {
    const userInput: UserInput = await req.json();

    const { result } = validateUserInput(userInput);

    if (!result) {
      return new Response(null, {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const user = await createUser(userInput);
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
// xport const registerUser = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   const userInput: UserInput = req.body;

//   const { result, message } = validateUserInput(userInput);
//   if (!result) {
//     res.status(500).send(message);
//     return;
//   }

//   try {
//     const user = await createUser(userInput);
//     return res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//   }
// };
