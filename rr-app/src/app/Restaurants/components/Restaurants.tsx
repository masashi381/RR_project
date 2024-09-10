"use client";
import { useState } from "react";
import { RestaurantType } from "../types/type";
import Card from "./Card";
import Pagination from "@/components/Pagination";
type PostType = {
  restaurantsData: RestaurantType[];
};
export default function Restaurants({ restaurantsData }: PostType) {
  console.log("restaurants data", restaurantsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantPerPage] = useState(6);

  // logic for pagination
  const indexOfLastRestaurant = currentPage * restaurantPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantPerPage;
  const currentRestaurants = restaurantsData.slice(indexOfFirstRestaurant, indexOfLastRestaurant);
  // when click on different page, set to that page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <div className="bg-accent h-screen mt-16">
      <div className="flex flex-wrap w-full justify-around pt-16 bg-accent">
        {currentRestaurants &&
          currentRestaurants.map((restaurant: RestaurantType, index: number) => (
            <div key={index}>
              <Card
                key={index}
                _id={restaurant._id}
                restaurant_name={restaurant.restaurant_name}
                restaurant_avg_ratings={restaurant.restaurant_avg_ratings}
                restaurant_number_reviews={restaurant.restaurant_number_reviews}
                restaurant_tags={restaurant.restaurant_tags}
                restaurant_add={restaurant.restaurant_add}
              />
              {/* <FavButton
                className="absolute bottom-10 left-32"
                isFav={isFav}
                onClick={registeredFav}
              /> */}
            </div>
          ))}
      </div>
      <Pagination
        restaurantsPerPage={restaurantPerPage}
        totalRestaurants={restaurantsData.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
