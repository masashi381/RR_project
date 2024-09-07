import mongoose from "mongoose";

const Schema = mongoose.Schema;
const RestaurantSchema = new Schema({
  restaurant_name: {
    type: String,
    required: true,
  },
  restaurant_avg_ratings: {
    type: Number,
    required: true,
  },
  restaurant_add: {
    type: String,
    required: true,
  },
  restaurant_tags: {
    type: String, // Changed back to a single string
    required: true,
  },
  restaurant_number_reviews: {
    type: Number,
    required: true,
  },
  reviewsId: [
    {
      type: String,
      ref: "Review", // Reference to the Review model
    },
  ],
});

const RestaurantModel = mongoose.model("Restaurant", RestaurantSchema);

export default RestaurantModel;
