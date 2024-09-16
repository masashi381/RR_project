import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_picture: {
    type: String,
    default: "",
  },
  user_email: {
    type: String,
    required: true,
  },
  user_favorite_restaurant: [
    {
      type: String,
      ref: "Restaurant", // Reference to the Restaurant model
    },
  ],
  provider: {
    type: String,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
