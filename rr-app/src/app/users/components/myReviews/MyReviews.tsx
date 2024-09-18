"use client";
import React, { useContext, useEffect, useState } from "react";
import ReviewDetail from "@/components/common/ReviewDetail";
import { ReviewsContext } from "@/context/ReviewsContext";
import { UserContext } from "@/context/UserContext";
import axios from "axios";
import { RestaurantContext } from "@/context/RestaurantContext";
import { Review } from "@/types/reviewTypes";
import { MdDelete } from "react-icons/md";
// import DeleteReviewModal from "./DeleteReviewModal";

const MyReviews = () => {
  const { allReviews, setAllReviews } = useContext(ReviewsContext);
  const { user } = useContext(UserContext);
  // const modalRef = useRef<HTMLDialogElement>(null);
  const { restaurantsData, setRestaurantsData } = useContext(RestaurantContext);
  const [restaurantReviews, setRestaurantReviews] = useState<{ restaurantName: string; review: Review }[]>([]);

  // Get all my reviews
  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/${user?._id}`);
        console.log("getReviews in my reviews page", res.data);
        setAllReviews(res.data);
      } catch (err) {
        console.log("Error fetching reviews", err);
      }
    };
    if (user?._id) {
      getReviews();
    }
  }, [setAllReviews, user?._id]);

  //Get all restaurant data
  useEffect(() => {
    const handleReviewChange = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/restaurants`);
        setRestaurantsData(res.data);
      } catch (err) {
        console.log("Error handleReviewChange", err);
      }
    };

    handleReviewChange();
  }, [setRestaurantsData]);

  console.log("bag check restaurantsData", restaurantsData);

  // Get restaurant name and my review from the restaurant
  useEffect(() => {
    if (allReviews.length && restaurantsData.length) {
      const matchedReviews = allReviews
        .map((review) => {
          const restaurant = restaurantsData.find((restaurant) => restaurant.reviewsId.includes(review._id));
          if (restaurant) {
            return {
              restaurantName: restaurant.restaurant_name,
              review,
            };
          }
          return null;
        })
        .filter(Boolean);

      setRestaurantReviews(matchedReviews as { restaurantName: string; review: Review }[]);
      console.log("matched", matchedReviews);
    }
  }, [allReviews, restaurantsData]);

  // Get review's id to delete itself
  // const deleteHandler = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   event.preventDefault();
  //   console.log("review delete handler clicked");

  //   const reviewId = event.currentTarget.dataset.reviewId;
  //   setReviewId(reviewId);

  //   console.log("modalRef", modalRef.current);

  //   if (modalRef.current) {
  //     console.log("show modal", modalRef.current);
  //     modalRef.current.showModal();
  //   }

  // };

  const deleteReviewHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const reviewId = event.currentTarget.dataset.reviewId;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/delete/${reviewId}`);
      console.log("review deleted", res.data);

      setRestaurantReviews((prev) => prev.filter((review) => review.review._id !== reviewId));

      setAllReviews((prev: Review[]) => prev.filter((review) => review._id !== reviewId));
      // if (modalRef.current) {
      //   modalRef.current?.close();
      // }
    } catch (err) {
      console.log("Error deleting review", err);
    }
  };

  return (
    <div className="bg-accent">
      <h2 className="text-3xl text-center my-8">Review</h2>
      <div className="join join-vertical w-3/4 mx-auto mt-2 block">
        {restaurantReviews.length > 0 ? (
          restaurantReviews.map(({ restaurantName, review }, i) => (
            <div key={i} className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" defaultChecked={i === 0} />
              <div className="collapse-title text-xl font-medium bg-primary text-accent">{restaurantName}</div>
              <div className="collapse-content ">
                <ReviewDetail
                  key={review._id}
                  _id={review._id}
                  review_ratings={review.review_ratings}
                  review_date={review.review_date}
                  review_title={review.review_title}
                  review_description={review.review_description}
                  restaurantId={review.restaurantId}
                  userId={review.userId}
                />
                <button
                  className="absolute top-16 right-3"
                  data-review-id={review._id} // Adding data attribute to button
                  // onClick={deleteHandler}
                  onClick={deleteReviewHandler}
                >
                  <MdDelete className="fill-warning" />
                </button>
                {/* Modal for deletion */}
                {/* <DeleteReviewModal
                  modalRef={modalRef}
                  setRestaurantReviews={setRestaurantReviews}
                  reviewId={reviewId!}
                  // setModalVisible={setModalVisible}
                /> */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-center pt-8">You have no reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(MyReviews);
