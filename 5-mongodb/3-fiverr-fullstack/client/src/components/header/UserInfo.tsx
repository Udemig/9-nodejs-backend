import type { FC } from "react";
import type { User } from "../../types";
import { Link } from "react-router-dom";
import { useLogout } from "../../service/auth";
import { getProfilePicture } from "./../../utils/helpers";

interface Props {
  user: User;
}

const UserInfo: FC<Props> = ({ user }) => {
  const { mutate, isPending } = useLogout();

  const menuItems = [
    user.isSeller && { label: "Hizmetlerim", to: "/my-gigs" },
    user.isSeller && { label: "Hizmet Ekle", to: "/add-gig" },
    { label: "Profil", to: "/" },
    { label: "Ayarlar", to: "/" },
  ].filter(Boolean) as { to: string; label: string }[];

  return (
    <div className="relative group">
      <div className="flex justify-center items-center gap-2">
        <img
          src={getProfilePicture(user.profilePicture)}
          className="size-10 rounded-full object-cover"
        />
        <span>{user.username}</span>
      </div>

      <div className="w-37.5 text-[13px] absolute hidden group-hover:flex flex-col top-10 left-0 bg-gray-200 rounded-md text-center z-99">
        {menuItems.map(({ to, label }, key) => (
          <Link key={key} to={to} className="header-link">
            {label}
          </Link>
        ))}

        <button className="header-link" disabled={isPending} onClick={() => mutate()}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
