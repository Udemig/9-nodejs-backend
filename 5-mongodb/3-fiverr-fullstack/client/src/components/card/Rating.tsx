import type { FC } from "react";
import { FaStar } from "react-icons/fa";

interface Props {
  rating: number;
  reviews: number;
  designs?: string;
}

const Rating: FC<Props> = ({ rating, reviews, designs }) => {
  return (
    <div className={`flex gap-1 items-center ${designs}`}>
      <FaStar />

      <span className="font-semibold">{rating === 0 ? 0 : (rating / reviews).toFixed(1)}</span>
      <span className="text-gray-500 font-normal underline">({reviews})</span>
    </div>
  );
};

export default Rating;
