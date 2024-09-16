"use client";

import { Restaurant, RestaurantContextType } from "@/types/restaurantTypes";
import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";

export const RestaurantContext = createContext<RestaurantContextType>({} as RestaurantContextType);

export function RestaurantContextProvider({ children }: { children: ReactNode }) {
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant | null>(null);

  const updatedRestaurantData = (updatedRestaurant: Restaurant) => {
    setRestaurantsData((prevData) =>
      prevData.map((restaurant) => (restaurant._id === updatedRestaurant._id ? updatedRestaurant : restaurant))
    );
    setClickedRestaurant((prevRestaurant) =>
      prevRestaurant && prevRestaurant._id === updatedRestaurant._id ? updatedRestaurant : prevRestaurant
    );
  };

  // Homepage, fetch all restaurant data
  useEffect(() => {
    const getRestaurantsData = async () => {
      try {
        if (searchValue) {
          const searchRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/restaurants/?text=` + searchValue);
          setRestaurantsData(searchRes.data);
        } else {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/restaurants`);
          setRestaurantsData(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getRestaurantsData();
  }, [searchValue]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurantsData,
        setRestaurantsData,
        clickedRestaurant,
        setClickedRestaurant,
        restaurantId,
        setRestaurantId,
        searchValue,
        setSearchValue,
        updatedRestaurantData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}
