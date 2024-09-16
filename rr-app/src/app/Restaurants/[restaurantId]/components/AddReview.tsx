import { BtnType, Button } from "@/components/common/Button";
import { useRef } from "react";
import AddReviewModal from "./AddReviewModal";

function AddReview() {
  const modalRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button
        type={BtnType.submit}
        onClick={() => {
          if (modalRef.current) {
            modalRef.current.showModal();
          }
        }}
      >
        Add reviews
      </Button>
      <AddReviewModal modalRef={modalRef} />
    </>
  );
}

export default AddReview;
