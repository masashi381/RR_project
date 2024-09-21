"use client"; // tell react this is a client component

import React, { useContext, useState } from "react";
import Card from "./Card";
import Pagination from "@/components/Pagination";
import { Restaurant } from "@/types/restaurantTypes";
import { RestaurantContext } from "@/context/RestaurantContext";
// import FavButton from "./FavButton";

const Restaurants = () => {
  const { restaurantsData } = useContext(RestaurantContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [restaurantPerPage] = useState(6);
  // const [isFav, setIsFav] = useState<Boolean>(false);

  // logic for pagination
  const indexOfLastRestaurant = currentPage * restaurantPerPage;
  const indexOfFirstRestaurant = indexOfLastRestaurant - restaurantPerPage;
  const currentRestaurants = restaurantsData.slice(indexOfFirstRestaurant, indexOfLastRestaurant);

  // when click on different page, set to that page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // const registeredFav = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   console.log("clicked");
  //   setIsFav(!isFav);
  // if (!clickedRestaurant) return;

  // try {
  //   const response = await axios.post(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${user?._id}/favorite`,
  //     { restaurantId: clickedRestaurant?._id },
  //     {
  //       headers: { Accept: "application/json" },
  //     }
  //   );
  //   setUser(response.data);
  //   setIsFav(!isFav);
  // } catch (error) {
  //   console.error("Error updating favorite restaurant:", error);
  // }
  // };
  return (
    <div className="bg-accent h-screen mt-16">
      <div className="flex flex-wrap w-full justify-around pt-16 bg-accent">
        {currentRestaurants &&
          currentRestaurants.map((restaurant: Restaurant, index: number) => (
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
};
export default Restaurants;
