import ReviewModel from "@/models/reviewModels";
import connectDB from "@/lib/db";

export async function GET() {
  connectDB();
  try {
    const reviews = await ReviewModel.find();
    return new Response(JSON.stringify(reviews), {
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
