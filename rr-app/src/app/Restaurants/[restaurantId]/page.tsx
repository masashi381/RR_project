"use client";

import RestaurantWithMap from "./components/RestaurantWithMap";
import NoReviews from "./components/NoReviews";
import PersonalReview from "./components/PersonalReview";
import { RestaurantContext } from "@/context/RestaurantContext";
import { ReviewsContext } from "@/context/ReviewsContext";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  const { clickedRestaurant, setClickedRestaurant, setRestaurantId } = useContext(RestaurantContext);

  const { setAllReviews, hasReviews, setHasReviews } = useContext(ReviewsContext);

  //Check RestaurantId and rest reviews when user go to another restaurant page
  useEffect(() => {
    setRestaurantId(restaurantId);
    setAllReviews([]);
    setHasReviews(false);
  }, [restaurantId, setAllReviews, setHasReviews, setRestaurantId]);

  // create only one function that fetch restaurant data and review data

  useEffect(() => {
    const getData = async () => {
      try {
        if (restaurantId) {
          const restaurantRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/restaurants/${restaurantId}`);
          setClickedRestaurant(restaurantRes.data);

          const reviewRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/reviews/${restaurantId}`);
          setAllReviews(reviewRes.data);
          setHasReviews(reviewRes.data.length > 0);
        }
      } catch (error) {
        console.log("Error fetching restaurant data", error);
      }
    };
    getData();
  }, [restaurantId, setAllReviews, setClickedRestaurant, setHasReviews]);

  return (
    <div className="bg-accent pt-16 h-full lg:relative ">
      {/*display right side */}

      {clickedRestaurant && <RestaurantWithMap clickedRestaurant={clickedRestaurant} />}

      {/*display left side */}
      <div className="bg-accent pb-1">{hasReviews ? <PersonalReview /> : <NoReviews />}</div>
      {/* </div> */}
    </div>
  );
};

export default React.memo(Page);
