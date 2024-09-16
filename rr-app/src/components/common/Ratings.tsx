import { RatingProps } from "@/types/commonTypes";
import React from "react";

const Ratings = ({ ratings, maxRating = 5 }: RatingProps) => {
  const fullStars = Math.floor(ratings);
  const halfStar = ratings % 1 !== 0;
  const emptyStars = Math.floor(maxRating - ratings);

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, index) => (
        <input
          key={index}
          type="radio"
          name="rating-10"
          className="mask mask-star-2 bg-secondary cursor-default mr-1"
          checked
          disabled
        />
      ))}
      {halfStar && (
        <input
          type="radio"
          name="rating-10"
          className="mask mask-star-2 bg-secondary cursor-default mr-1"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          checked
          disabled
        />
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <input
          key={index + fullStars}
          type="radio"
          name="rating-10"
          className="mask mask-star-2 bg-gray-400 cursor-default mr-1"
          disabled
        />
      ))}
    </div>
  );
};

export default React.memo(Ratings);
