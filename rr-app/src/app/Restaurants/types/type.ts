import mongoose from "mongoose";

export type restauratntType = {
  restaurant_name: string;
  restaurant_avg_ratings: number;
  restaurant_add: string;
  restaurant_tags: string;
  restaurant_number_reviews: number;
  reviewsId: mongoose.Schema.Types.ObjectId[];
};
