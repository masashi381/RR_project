import { ReviewInput } from "@/app/api/types/type";
import { createReview } from "@/app/logic/reviewLogic";
import connectDB from "@/lib/db";
import RestaurantModel from "@/models/restaurantModels";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { restaurantId: string } }) {
  connectDB();

  const restaurantId = params.restaurantId;

  try {
    const reviewInput: ReviewInput = await req.json();

    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      console.log("Please select a restaurant");
      return new Response(null, {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      const review = await createReview(reviewInput, restaurantId);
      restaurant.reviewsId.push(review._id.toString());
      //  Update the restaurant's average rating and number of reviews
      const newNumberOfReviews = restaurant.restaurant_number_reviews + 1;
      const newAvgRating =
        (restaurant.restaurant_avg_ratings * restaurant.restaurant_number_reviews + reviewInput.review_ratings) /
        newNumberOfReviews;

      restaurant.restaurant_number_reviews = newNumberOfReviews;
      restaurant.restaurant_avg_ratings = Math.round(newAvgRating * 10) / 10;

      await restaurant.save();
      return new Response(JSON.stringify(restaurant), {
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
// export const addNewReview = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   const restaurantId = req.params.restaurantId;
//   const reviewInput: ReviewInput = req.body;

//   try {
//     const restaurant = await restaurantModels.findById(restaurantId);
//     if (!restaurant) {
//       console.log("please select a restaurant");
//       return res.status(400).json("restaurantId not exist");
//     } else {
//       const review = await createReview(reviewInput, restaurantId);

//       restaurant.reviewsId.push(review._id.toString());

//       //  Update the restaurant's average rating and number of reviews
//       const newNumberOfReviews = restaurant.restaurant_number_reviews + 1;
//       const newAvgRating =
//         (restaurant.restaurant_avg_ratings *
//           restaurant.restaurant_number_reviews +
//           reviewInput.review_ratings) /
//         newNumberOfReviews;

//       restaurant.restaurant_number_reviews = newNumberOfReviews;
//       restaurant.restaurant_avg_ratings = Math.round(newAvgRating * 10) / 10;

//       await restaurant.save();
//       return res.status(200).json({ message: "add review successfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
