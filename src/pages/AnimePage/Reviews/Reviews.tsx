import { useEffect } from "react";
import { iReview } from "../../../models/Review";
import ReviewText from "./ReviewText";
import { BiLike } from "react-icons/bi";

const Reviews = ({ reviews }: { reviews: iReview[] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="anime__reviews flex flex-col gap-5 overflow-hidden">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="anime__review bg-gray p-2 rounded flex flex-col items-start"
        >
          <div className="review__user--info flex items-start mb-2 w-full">
            <img
              src={review.user.avatar.large}
              alt={`review--user--avatar`}
              className="size-10 mt-1 lg:mt-0 lg:size-15 rounded-full mr-2"
            />
            <div className="review__user-name">
              <h4 className="text-xl text-primary font-semibold">
                {review.user.name}
              </h4>
              <span className="text-gray-700 text-xs">
                {new Date(Number(review.createdAt) * 1000).toLocaleDateString()}
              </span>
            </div>
            <div className="review__likes ml-auto flex items-center text-secondary text-sm gap-1">
              <BiLike />
              <span>{review.rating}</span>
            </div>
          </div>
          <ReviewText text={review.body} />
        </div>
      ))}
    </div>
  );
};

export default Reviews;
