import mongoose from "mongoose";
import "dotenv/config";

const uri = process.env.DB_API_KEY;
const connectDB = () => {
  try {
    if (uri) {
      mongoose.connect(uri).then(() => console.log("MongoDB connection succeed"));
    }
  } catch (err) {
    console.log("Failure: Unconnected to Mongo DB");
    throw new Error();
  }
};

export default connectDB;
