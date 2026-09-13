"use client";

import { FC, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.webp";
import { Menu } from "lucide-react";

const Sidebar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 h-screen ${isCollapsed ? "w-16" : "w-64"}`}
    >
      {/* Logo */}
      <div className={`py-6 px-4 border-b border-zinc-800 h-21 ${isCollapsed ? "px-4" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="bg-white rounded-full flex items-center gap-1">
            <Image src={logo} alt="logo" width={30} height={30} />
            {!isCollapsed && (
              <h1 className="text-zinc-900 md:text-lg font-semibold pe-3 font-mono">Rudder</h1>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* Linkler */}
    </div>
  );
};

export default Sidebar;
