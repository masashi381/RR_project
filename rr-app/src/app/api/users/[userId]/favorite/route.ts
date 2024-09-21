import { corsMiddleware } from "@/lib/corsMiddleware";
import connectDB from "@/lib/db";
import UserModel from "@/models/userModels";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  corsMiddleware(req);
  connectDB();
  const userId = params.userId;
  const { restaurantId } = await req.json();

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return new Response(null, {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    const favoriteIndex = user.user_favorite_restaurant.indexOf(restaurantId);

    if (favoriteIndex === -1) {
      user.user_favorite_restaurant.push(restaurantId);
    } else {
      user.user_favorite_restaurant.splice(favoriteIndex, 1);
    }

    await user.save();
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
