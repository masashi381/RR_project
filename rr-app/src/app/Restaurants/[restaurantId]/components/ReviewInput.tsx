import { ReactNode } from "react";
import { Input, TextType } from "@/components/common/Input";
import { Rating, ReviewInputProps } from "@/types/reviewTypes";
import { BsEmojiAngry, BsEmojiAstonished, BsEmojiExpressionless, BsEmojiSmile, BsEmojiHeartEyes } from "react-icons/bs";

const ReviewInput = (props: ReviewInputProps) => {
  //Ratings
  const options: Array<Rating> = [];
  for (let i = 1.0; i <= 5.0; i += 0.5) {
    let face: ReactNode;
    if (i === 1.0 || i === 1.5) {
      face = <BsEmojiAngry /**className="fill-primary w-6"*/ />;
    } else if (i === 2.0 || i === 2.5) {
      face = <BsEmojiAstonished /*className="fill-primary w-6"*/ />;
    } else if (i === 3.0 || i === 3.5) {
      face = <BsEmojiExpressionless /*className="fill-primary w-6"*/ />;
    } else if (i === 4.0 || i === 4.5) {
      face = <BsEmojiSmile /*className="fill-primary w-6"*/ />;
    } else {
      face = <BsEmojiHeartEyes /*className="fill-primary w-6"*/ />;
    }
    options.push({ num: i, face });
  }

  return (
    <div className="flex flex-col ">
      <div className="flex mb-4 flex-wrap">
        {options.map((option) => (
          <label key={option.num} className="flex items-center mr-2">
            <input
              type="radio"
              name="rating"
              value={option.num}
              checked={props.reviewRating === option.num}
              onChange={() => props.setReviewRating(option.num)}
            />
            {option.face}
            {option.num.toFixed(1)}
          </label>
        ))}
      </div>
      <Input
        textType={TextType.text}
        placeholder="Title"
        name="title"
        value={props.reviewTitle}
        onChange={(event) => props.setReviewTitle(event?.target.value)}
        className="w-auto"
      />
      <textarea
        className="textarea textarea-bordered"
        placeholder="Description"
        name="description"
        value={props.reviewDesc}
        onChange={(event) => props.setReviewDesc(event?.target.value)}
      ></textarea>
    </div>
  );
};

export default ReviewInput;
