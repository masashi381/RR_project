import reviewModels from "@/models/reviewModels";
import { ReviewInput } from "../api/types/type";

export const createReview = async (values: ReviewInput, restaurantId: string) => {
  try {
    const reviewWithRestaurantId = { ...values, restaurantId };

    const review = await new reviewModels(reviewWithRestaurantId).save();
    return review.toObject();
  } catch (err) {
    throw new Error("Failed to create review");
  }
};
