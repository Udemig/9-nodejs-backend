import { Link } from "react-router-dom";
import type { Gig } from "../../types";
import type { FC } from "react";
import { getProfilePicture } from "../../utils/helpers";
import Rating from "./Rating";
import DeleteButton from "./DeleteButton";

interface Props {
  item: Gig<{ _id: string; username: string; profilePicture: string }>;
  expand?: boolean;
}

const Card: FC<Props> = ({ item, expand }) => {
  return (
    <div>
      <DeleteButton id={item._id} show={expand} />

      <Link to={`/detail/${item._id}`} className="p-2 rounded-md flex flex-col gap-2 group">
        <img
          src={item.coverImage}
          alt={item.title}
          className="size-full object-cover rounded-md max-h-50"
        />

        <div className="flex gap-2 items-center">
          <img
            src={getProfilePicture(item.user.profilePicture)}
            alt={item.user.username}
            className="size-8 rounded-full"
          />
          <p>
            <span className="font-semibold">{item.user.username}</span>
            <span className="text-gray-500 ps-1">tarafindan oluşturuldu</span>
          </p>
        </div>

        <h2 className="line-clamp-2 group-hover:underline">{item.title}</h2>

        <Rating
          rating={item.starCount}
          reviews={item.reviewCount}
          designs="font-semibold text-lg"
        />

        <p>
          <span className="font-semibold">${item.packagePrice.toLocaleString()}</span>
          <span className="text-gray-500">'den başlayan fiyatlarla</span>
        </p>
      </Link>
    </div>
  );
};

export default Card;
