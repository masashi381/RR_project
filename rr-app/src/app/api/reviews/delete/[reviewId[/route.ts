import connectDB from "@/lib/db";
import RestaurantModel from "@/models/restaurantModels";
import reviewModel from "@/models/reviewModels";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { reviewId: string } }) {
  connectDB();
  try {
    const reviewId = params.reviewId;

    //Find the restaurant containing the review
    const restaurant = await RestaurantModel.findOne({ reviewId: reviewId });
    if (!restaurant) {
      return new Response(null, {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    //  Remove the review ID from the restaurant's reviewsId array
    restaurant.reviewsId = restaurant.reviewsId.filter((id: string) => id.toString() !== reviewId);

    //Fetch all remaining reviews for the restaurant
    const remainingReviews = await reviewModel.find({
      _id: { $in: restaurant.reviewsId },
    });

    // Recalculate the average rating and the number of reviews
    const numberOfReviews = remainingReviews.length;
    const avgRating =
      numberOfReviews > 0
        ? remainingReviews.reduce((sum, review) => sum + review.review_ratings, 0) / numberOfReviews
        : 0;

    //Update the restaurant with the new values
    restaurant.restaurant_avg_ratings = avgRating;
    restaurant.restaurant_number_reviews = numberOfReviews;
    await restaurant.save();

    // Delete the review itself
    const review = await reviewModel.deleteOne({ _id: reviewId });
    if (review.deletedCount === 0) {
      return new Response(null, {
        status: 404,
        headers: { " Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(null, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
// export const deleteReview = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const reviewId = req.params.reviewId;

//     //Find the restaurant containing the review
//     const restaurant = await RestaurantModel.findOne({ reviewsId: reviewId });
//     if (!restaurant) {
//       return res
//         .status(404)
//         .json({ message: "Review not found in any restaurant" });
//     }
//     //  Remove the review ID from the restaurant's reviewsId array
//     restaurant.reviewsId = restaurant.reviewsId.filter(
//       (id) => id.toString() !== reviewId
//     );
//     // await restaurant.save();

//     //Fetch all remaining reviews for the restaurant
//     const remainingReviews = await reviewModels.find({
//       _id: { $in: restaurant.reviewsId },
//     });

//     // Recalculate the average rating and the number of reviews
//     const numberOfReviews = remainingReviews.length;
//     const avgRating =
//       numberOfReviews > 0
//         ? remainingReviews.reduce(
//             (sum, review) => sum + review.review_ratings,
//             0
//           ) / numberOfReviews
//         : 0;

//     //Update the restaurant with the new values
//     restaurant.restaurant_avg_ratings = avgRating;
//     restaurant.restaurant_number_reviews = numberOfReviews;
//     await restaurant.save();

//     // Delete the review itself
//     const review = await reviewModels.deleteOne({ _id: reviewId });
//     if (review.deletedCount === 0) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     res.status(200).json({ message: "Review deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting review:", err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
