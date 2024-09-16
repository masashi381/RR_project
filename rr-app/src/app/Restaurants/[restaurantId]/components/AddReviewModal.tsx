import { useState, useContext, forwardRef, RefObject } from "react";
import { UserContext } from "@/context/UserContext";
import { ReviewsContext } from "@/context/ReviewsContext";
import { BtnType, Button } from "@/components/common/Button";
import { useParams } from "next/navigation";
import ReviewInput from "./ReviewInput";
import axios from "axios";
import { RestaurantContext } from "@/context/RestaurantContext";
interface AddReviewModalProps {
  modalRef: RefObject<HTMLDialogElement>;
}

const AddReviewModal = forwardRef<HTMLDialogElement, AddReviewModalProps>(({ modalRef }, ref) => {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewRating, setReviewRating] = useState(5.0);

  const { user } = useContext(UserContext);
  const { setHasReviews, fetchReviews } = useContext(ReviewsContext);
  const { updatedRestaurantData } = useContext(RestaurantContext);

  //Get restaurant ID
  const reviewParams = useParams();
  const restaurantId = reviewParams.restaurantId as string;

  //Get postedTime
  const postedTime = new Date();

  const AddedReview = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    if (!user?._id && !reviewParams) {
      console.log("error add review");
    } else {
      if (!reviewTitle) {
        alert("Please enter a title");
        return;
      } else if (!reviewDesc) {
        alert("Please enter a description");
        return;
      } else {
        setShowConfirm(true);
      }
    }
  };

  // Handle cancel button
  const closedModal = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (modalRef.current) {
      modalRef.current.close();
    }
    setReviewTitle("");
    setReviewDesc("");
    setReviewRating(5.0);
    setShowConfirm(false);
  };

  // Publish users review
  const submittedReviewState = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (user?._id) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/restaurants/review/${restaurantId}/new`,
          {
            review_ratings: reviewRating,
            review_date: postedTime,
            review_title: reviewTitle,
            review_description: reviewDesc,
            restaurantId: restaurantId,
            userId: user?._id,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        // Refresh the reviews
        fetchReviews(restaurantId);
        setHasReviews(true);

        // Fetch the updated restaurant data
        const updatedRestaurantRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/restaurants/${restaurantId}`);
        const updatedRestaurant = updatedRestaurantRes.data;

        // Update the restaurant data in context
        updatedRestaurantData(updatedRestaurant);

        if (modalRef.current) {
          modalRef.current.close();
        }
      } catch (err) {
        console.error("Error posting review", err);
      }
    }
  };

  return (
    <>
      <dialog className="modal" ref={ref || modalRef}>
        <div className="modal-box lb:w-1/2 max-w-4xl">
          {!showConfirm && (
            <ReviewInput
              reviewTitle={reviewTitle}
              setReviewTitle={setReviewTitle}
              reviewDesc={reviewDesc}
              setReviewDesc={setReviewDesc}
              reviewRating={reviewRating}
              setReviewRating={setReviewRating}
            />
          )}
          {showConfirm && (
            <div>
              <h3 className="font-bold text-2xl pb-4 text-center">Preview</h3>
              <p className="text-lg text-center">Rating is {reviewRating}</p>
              <p className="text-lg font-semibold text-center">{reviewTitle}</p>
              <p className="text-lg text-center">{reviewDesc}</p>
              <p className="text-xl py-4 text-center">Will you publish?</p>
            </div>
          )}
          <div className="flex justify-between mt-4">
            <form method="dialog" className="flex flex-col gap-4">
              {/* if there is a button in form, it will close the modal */}
              <Button type={BtnType.cancel} className="btn" onClick={closedModal}>
                Cancel
              </Button>
            </form>

            {!showConfirm && (
              <Button type={BtnType.submit} className="btn" onClick={AddedReview}>
                Add
              </Button>
            )}
            {showConfirm && (
              <Button type={BtnType.submit} onClick={submittedReviewState}>
                Publish
              </Button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
});

AddReviewModal.displayName = "AddReviewModal";

export default AddReviewModal;
