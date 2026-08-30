import type { FC } from "react";
import type { Gig, User } from "../../types";
import { IoIosArrowDown, IoIosInformationCircleOutline, IoMdCheckmark } from "react-icons/io";
import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { GiRecycle } from "react-icons/gi";

interface Props {
  gig: Gig<User>;
}

const PackageInfo: FC<Props> = ({ gig }) => {
  return (
    <div className="h-fit flex flex-col gap-6 border shadow rounded-md p-5 md:mt-20 md:sticky md:top-20 border-zinc-200">
      <div className="flex justify-between font-semibold gap-10">
        <h2 className="text-xl">{gig.packageTitle}</h2>
        <p className="text-xl font-normal flex items-center gap-2">
          ${gig.packagePrice}
          <IoIosInformationCircleOutline title="Fiyatlar değişkenlik gösterebilir" />
        </p>
      </div>

      <p className="text-gray-600 text-lg">{gig.packageDescription}</p>

      <div className="flex gap-5 font-semibold text-sm whitespace-nowrap">
        <p className="flex items-center gap-2">
          <FaRegClock className="text-lg" />
          {gig.packageDuration} günde teslimat
        </p>
        <p className="flex items-center gap-2">
          <GiRecycle className="text-lg" />
          {gig.packageRevision} revizyon
        </p>
      </div>

      <ul>
        {gig.packageFeatures.map((i) => (
          <li className="flex gap-2 items-center">
            <IoMdCheckmark className="text-black" />
            <span className="text-gray-500">{i}</span>
          </li>
        ))}
      </ul>

      <button className="flex items-center bg-black text-white p-2 rounded-md hover:bg-zinc-700 md:min-w-87.5">
        <span className="flex-1 font-semibold">Devam Et</span>
        <FaArrowRight />
      </button>

      <button className="flex items-center bg-white text-black p-2 rounded-md hover:bg-zinc-200 border-zinc-300 md:min-w-87.5">
        <span className="flex-1 font-semibold">İletişime Geç</span>
        <IoIosArrowDown />
      </button>
    </div>
  );
};

export default PackageInfo;
