import { corsMiddleware } from "@/lib/corsMiddleware";
import connectDB from "@/lib/db";
import RestaurantModel from "@/models/restaurantModels";
import ReviewModel from "@/models/reviewModels";
import UserModel from "@/models/userModels";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  corsMiddleware(req);
  connectDB();
  const userId = params.userId;

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

export async function PUT(req: NextRequest, { params }: { params: { userId: string } }) {
  connectDB();
  const userId = params.userId;
  if (!userId) {
    return new Response(null, {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    try {
      const updateData = await req.json();
      const editUser = await UserModel.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      return new Response(JSON.stringify(editUser), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(null, {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { userId: string } }) {
  corsMiddleware(req);
  connectDB();
  const userId = params.userId;

  if (!userId) {
    return new Response(null, {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    try {
      // Find all reviews associated with the user
      const userReviews = await ReviewModel.find({ userId: userId });

      // Extract the review IDs
      const reviewIds = userReviews.map((review) => review._id.toString());
      const restaurantIds = userReviews.map((review) => review.restaurantId);

      // Delete all reviews associated with the user
      await ReviewModel.deleteMany({ userId: userId });

      // Update the Restaurant models to remove references to these reviews
      await RestaurantModel.updateMany({ reviewsId: { $in: reviewIds } }, { $pull: { reviewsId: { $in: reviewIds } } });

      // Recalculate ratings and number of reviews for each affected restaurant
      for (const restaurantId of restaurantIds) {
        const restaurantReviews = await ReviewModel.find({
          restaurantId: restaurantId,
        });

        const numberOfReviews = restaurantReviews.length;
        const avgRating =
          restaurantReviews.reduce((sum, review) => sum + review.review_ratings, 0) / numberOfReviews || 0;

        await RestaurantModel.findByIdAndUpdate(restaurantId, {
          restaurant_number_reviews: numberOfReviews,
          restaurant_avg_ratings: avgRating,
        });
      }

      // Delete the user
      const deleteUser = await UserModel.findByIdAndDelete(userId);
      if (!deleteUser) {
        return new Response(null, {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify(deleteUser), {
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
}
