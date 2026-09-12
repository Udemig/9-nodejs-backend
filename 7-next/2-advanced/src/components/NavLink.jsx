"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href }) => {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={`text-blue-500 hover:underline ${href === path && "text-red-500"}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
