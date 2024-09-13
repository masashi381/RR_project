// Type for Restaurant
type Restaurant = {
  _id: string;
  restaurant_name: string;
  restaurant_avg_ratings: number;
  restaurant_number_reviews: number;
  restaurant_tags: string;
  restaurant_add: string;
  reviewsId: string[];
};

type PartialRestaurantData = Partial<Restaurant>;

type RestaurantContextType = {
  restaurantId: Restaurant["_id"];
  setRestaurantId: (restaurantId: string) => void;
  restaurantsData: Restaurant[];
  setRestaurantsData: (restaurantsData: Restaurant[]) => void;
  clickedRestaurant: Restaurant | null;
  setClickedRestaurant: (clickedRestaurant: Restaurant | null) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  updatedRestaurantData: (updatedRestaurant: Restaurant) => void;
};

export type { Restaurant, PartialRestaurantData, RestaurantContextType };
