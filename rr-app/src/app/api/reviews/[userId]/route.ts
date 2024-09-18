import connectDB from "@/lib/db";
import ReviewModel from "@/models/reviewModels";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  connectDB();
  try {
    const userId = params.userId;
    const reviews = await ReviewModel.findById(userId);
    if (reviews.length > 0) {
      return new Response(JSON.stringify(reviews), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(null, {
        status: 404,
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
// export const getReviewsByUserId = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const userId = req.params.userId;
//     const reviews = await reviewModels.find({ userId: userId });

//     if (reviews.length > 0) {
//       res.status(200).json(reviews);
//     } else {
//       res.status(404).json({ message: "No reviews found for your account" });
//     }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     console.log(err);
//   }
// };
