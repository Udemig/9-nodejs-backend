import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import type { FC } from "react";
import type { Gig, User } from "../../types";
import { getProfilePicture } from "../../utils/helpers";
import Rating from "../../components/card/Rating";

interface Props {
  gig: Gig<User>;
}

const GigInfo: FC<Props> = ({ gig }) => {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <h1 className="font-bold text-xl md:text-2xl">{gig.title}</h1>

      <div className="flex gap-3 items-center">
        <img
          src={getProfilePicture(gig.user.profilePicture)}
          alt={gig.user.username}
          className="size-12 rounded-full"
        />

        <div>
          <h4 className="font-bold">{gig.user.username}</h4>
          <Rating rating={gig.starCount} reviews={gig.reviewCount} />
        </div>
      </div>

      <div>
        <Splide>
          {gig.images.map((url, key) => (
            <SplideSlide key={key}>
              <img
                src={url}
                alt="gig image"
                className="h-[30vh] md:h-[50vh] w-full object-cover rounded-md"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <div>
        <h1 className="font-bold text-xl mt-5 mb-2">Bu hizmet hakkında</h1>
        <p className="text-gray-600">{gig.description}</p>
      </div>
    </div>
  );
};

export default GigInfo;
