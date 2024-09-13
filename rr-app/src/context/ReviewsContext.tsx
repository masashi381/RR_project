"use client";
import { Review, ReviewsContextProps } from "@/types/reviewTypes";
import axios from "axios";
import { createContext, ReactNode, useCallback, useState } from "react";

export const ReviewsContext = createContext<ReviewsContextProps>({} as ReviewsContextProps);

export function ReviewsContextProvider({ children }: { children: ReactNode }) {
  const [hasReviews, setHasReviews] = useState<boolean>(false);
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  const fetchReviews = useCallback(async (restaurantId: string) => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/restaurants/reviews/${restaurantId}`);
      setAllReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  }, []);
  return (
    <ReviewsContext.Provider
      value={{
        hasReviews,
        setHasReviews,
        allReviews,
        setAllReviews,
        fetchReviews,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}
