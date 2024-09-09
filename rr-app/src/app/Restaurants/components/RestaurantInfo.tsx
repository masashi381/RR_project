import { PartialRestaurantData } from "../types/type";
import Ratings from "./Ratings";
export default function RestaurantInfo({
  restaurant_name,
  restaurant_avg_ratings,
  restaurant_number_reviews,
}: PartialRestaurantData) {
  return (
    <div className="">
      <h2 className="card-title text-gray-900 text-2xl">{restaurant_name}</h2>
      <div className="flex w-64">
        <Ratings ratings={restaurant_avg_ratings!} />
        <p className="ml-1">{restaurant_avg_ratings?.toFixed(1)}</p>
        <p>
          {restaurant_number_reviews} <span className="ml-1">reviews</span>
        </p>
      </div>
    </div>
  );
}
