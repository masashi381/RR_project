import React, { ReactNode, useState } from "react";
import { useParams } from "next/navigation";
import { Review } from "../../types/reviewTypes";
import Ratings from "../Ratings";
import { BsEmojiAngry, BsEmojiAstonished, BsEmojiExpressionless, BsEmojiSmile, BsEmojiHeartEyes } from "react-icons/bs";

//Show icons
const getIcon = (rating: number): ReactNode => {
  if (rating === 1 || rating === 1.5) {
    return <BsEmojiAngry /**className="fill-primary w-6"*/ />;
  } else if (rating === 2.0 || rating === 2.5) {
    return <BsEmojiAstonished /**className="fill-primary w-6"*/ />;
  } else if (rating === 3.0 || rating === 3.5) {
    return <BsEmojiExpressionless /**className="fill-primary w-6"*/ />;
  } else if (rating === 4.0 || rating === 4.5) {
    return <BsEmojiSmile /**className="fill-primary w-6"*/ />;
  } else {
    return <BsEmojiHeartEyes /**className="fill-primary w-6"*/ />;
  }
};

const ReviewDetail = ({
  _id,
  review_ratings,
  review_date,
  review_title,
  review_description,
  restaurantId,
  userId,
}: Review) => {
  const params = useParams();
  const detailPageParams = params.restaurantId as string;

  const reviewIcon = getIcon(review_ratings);

  const reviewRating = review_ratings.toFixed(1);

  const daysAgo = Math.floor(
    (new Date().setHours(0, 0, 0, 0) - new Date(review_date).setHours(0, 0, 0, 0)) / (1000 * 3600 * 24)
  );

  const daysAgoString = (days: number) => {
    if (days <= 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days > 7) {
      return (days / 7).toFixed(0) + " weeks ago";
    } else {
      return days + " days ago";
    }
  };
  return (
    <div className="flex flex-col flex-wrap ml-2 pt-4">
      <div className="lg:flex" key={_id}>
        <div className="flex items-center">
          {detailPageParams ? <div>{reviewIcon}</div> : <Ratings ratings={review_ratings} />}
          <div className={"pl-2"}>{reviewRating}</div>
        </div>
        <p className="lg:pl-5">{daysAgoString(daysAgo)}</p>
      </div>
      <h2 className="card-title text-2xl my-2">{review_title}</h2>
      <p className="text-lg">{review_description}</p>
    </div>
  );
};

export default React.memo(ReviewDetail);
