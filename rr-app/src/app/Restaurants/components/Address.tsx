import { PartialRestaurantData } from "../types/type";

export default function Address({ restaurant_add }: PartialRestaurantData) {
  return <div>{restaurant_add}</div>;
}
