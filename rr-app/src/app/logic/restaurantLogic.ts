import restaurantModels from "@/models/restaurantModels";
import { RestaurantInput } from "../api/types/type";

export const createRestaurant = (values: RestaurantInput) => {
  new restaurantModels(values).save().then((restaurant: { toObject: () => void }) => {
    restaurant.toObject();
  });
};
