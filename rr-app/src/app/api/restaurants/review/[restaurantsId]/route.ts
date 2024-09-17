import connectDB from "@/lib/db";
import ReviewModel from "@/models/reviewModels";
import { NextRequest } from "next/server";
import { ReviewInput } from "@/app/api/types/type";

export async function GET(req: NextRequest, { params }: { params: { restaurantsId: string } }) {
  connectDB();
  const restaurantId = params.restaurantsId;
  try {
    const review: ReviewInput[] = await ReviewModel.find({ restaurantId }).exec();
    if (review.length > 0) {
      return new Response(JSON.stringify(review), {
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

// export const getRestaurantReviews = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     // Get the restaurantId from request parameters
//     const restaurantId = req.params.restaurantId;

//     // Ask DB to find review(s) which have this restaurantId
//     const reviews: ReviewInput[] = await reviewModels
//       .find({
//         restaurantId,
//       })
//       .exec();

//     if (reviews.length > 0) {
//       res.status(200).json(reviews);
//     } else {
//       res.status(404).json({ message: "No reviews found for this restaurant" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
