import mongoose from "mongoose";

export type UserInput = {
  _id: string;
  user_name: string;
  user_picture?: string;
  user_email: string;
  user_password: string;
  user_favorite_restaurant?: mongoose.Schema.Types.ObjectId[];
  provider?: string;
};
