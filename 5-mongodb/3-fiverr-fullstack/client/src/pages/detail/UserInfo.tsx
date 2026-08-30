import type { FC } from "react";
import type { User } from "../../types";
import { getProfilePicture } from "../../utils/helpers";
import Rating from "../../components/card/Rating";
import { PiStarFourFill, PiVideoCamera } from "react-icons/pi";

interface Props {
  user: User;
}

const UserInfo: FC<Props> = ({ user }) => {
  return (
    <div>
      <h1 className="font-bold text-xl mt-10 mb-3">{user.username}'i tanıyalım</h1>

      <div className="flex flex-col items-center gap-3">
        <img
          src={getProfilePicture(user.profilePicture)}
          alt={user.username}
          className="size-28 rounded-full object-cover"
        />

        <h4 className="font-semibold">{user.username}</h4>

        <p className="text-gray-600 text-light text-center">{user.description}</p>

        <div className="flex gap-5">
          <Rating rating={410} reviews={98} />

          <div className="flex items-center bg-orange-500/40 py-1 px-2 rounded-md">
            <span className="text-sm pe-1">Top Rated</span>

            <PiStarFourFill />
            <PiStarFourFill />
            <PiStarFourFill />
          </div>
        </div>
      </div>

      <div className="flex gap-8 mt-5 font-semibold">
        <button className="py-2 px-5 border rounded-md hover:bg-zinc-100">İletişime Geç</button>
        <button className="py-2 px-5 border rounded-md hover:bg-zinc-100 flex items-center gap-2">
          <PiVideoCamera className="text-lg" /> Toplantı Ayarla
        </button>
      </div>

      <div className="border border-zinc-300 my-10 p-5 grid md:grid-cols-2 gap-5 rounded-md">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Nereden</span>
          <span className="text-gray-700 font-semibold">{user.country}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Üyelik Tarihi</span>
          <span className="text-gray-700 font-semibold">
            {new Date(user.createdAt).toLocaleDateString("tr")}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">Telefon</span>
          <span className="text-gray-700 font-semibold">{user.phone}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500">E-Posta</span>
          <span className="text-gray-700 font-semibold">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
