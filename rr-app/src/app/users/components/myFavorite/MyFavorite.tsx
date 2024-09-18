"use client";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import Card from "@/app/Restaurants/components/Card";
import { Restaurant } from "@/types/restaurantTypes";
import { RestaurantContext } from "@/context/RestaurantContext";
import Pagination from "@/components/Pagination";

export default function MyFavorite() {
  const { user } = useContext(UserContext);
  const { restaurantsData } = useContext(RestaurantContext);

  const favoriteRestaurants = restaurantsData.filter((restaurant: Restaurant) => {
    return user?.user_favorite_restaurant.includes(restaurant._id);
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantPerPage] = useState(6);

  // logic for pagination
  const indexOfLastRestaurant = currentPage * restaurantPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantPerPage;
  const currentRestaurants = favoriteRestaurants.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // when click on different page, set to that page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <h2 className="text-3xl text-center my-8">My favorite</h2>
      <div className="flex flex-wrap w-full justify-around pt-8 bg-accent">
        {currentRestaurants.length > 0 ? (
          currentRestaurants.map((restaurant: Restaurant) => (
            <Card
              key={restaurant._id}
              _id={restaurant._id}
              restaurant_name={restaurant.restaurant_name}
              restaurant_avg_ratings={restaurant.restaurant_avg_ratings}
              restaurant_number_reviews={restaurant.restaurant_number_reviews}
              restaurant_tags={restaurant.restaurant_tags}
              restaurant_add={restaurant.restaurant_add}
            />
          ))
        ) : (
          <p className="text-2xl">No favorite restaurants found.</p>
        )}
      </div>
      {currentRestaurants.length > 0 && (
        <div className="">
          <Pagination
            restaurantsPerPage={restaurantPerPage}
            totalRestaurants={favoriteRestaurants.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
}
