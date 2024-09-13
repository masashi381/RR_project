import { ReactNode, RefObject } from "react";

type Review = {
  _id: string;
  // review_icon: string;
  review_ratings: number;
  review_date: Date;
  review_title: string;
  review_description: string;
  restaurantId: string;
  userId: string;
};

// type ShowConfirmProps = {
//   showConfirm: boolean;
//   setShowConfirm: (showConfirm: boolean) => void;
//   modalRef: RefObject<HTMLDialogElement>;
// };

type Rating = {
  num: number;
  face: ReactNode;
};

type NewReview = {
  review_ratings: number;
  review_date: Date;
  review_title: string;
  review_description: string;
  restaurantId: string;
  userId: string | undefined;
};

type ReviewInputProps = {
  reviewTitle: string;
  setReviewTitle: (reviewTitle: string) => void;
  reviewDesc: string;
  setReviewDesc: (reviewDesc: string) => void;
  reviewRating: number;
  setReviewRating: (reviewRating: number) => void;
};

type InitialReviewStateProps = {
  reviewTitle: string;
  reviewDesc: string;
  reviewRating: number;
};

type ReviewsContextProps = {
  // review: Review | null;
  // setReview: (reviews: Review | null) => void;
  hasReviews: boolean;
  setHasReviews: (hasReviews: boolean) => void;
  allReviews: Review[];
  setAllReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  fetchReviews: (restaurantId: string) => void;
};

export type {
  Review,
  // ShowConfirmProps,
  Rating,
  NewReview,
  ReviewInputProps,
  InitialReviewStateProps,
  ReviewsContextProps,
};
