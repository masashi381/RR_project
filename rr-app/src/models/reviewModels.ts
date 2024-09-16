import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ReviewSchema = new Schema({
  review_ratings: {
    type: Number,
    required: true,
  },
  review_date: {
    type: Date,
    required: true,
  },
  review_title: {
    type: String,
    required: true,
  },
  review_description: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    ref: "Restaurant", // Reference to the Restaurant model
    required: true,
  },
  userId: {
    type: String,
    ref: "User", // Reference to the User model
    required: true,
  },
});

const ReviewModel = mongoose.model("Review", ReviewSchema);

export default ReviewModel;
