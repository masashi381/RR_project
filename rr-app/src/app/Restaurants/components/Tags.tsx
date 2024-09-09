import { PartialRestaurantData } from "../types/type";
export default function Tags({ restaurant_tags }: PartialRestaurantData) {
  return <span className="text-primary border-primary border-2 rounded-2xl px-2">{restaurant_tags}</span>;
}
