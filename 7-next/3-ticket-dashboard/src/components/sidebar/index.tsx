"use client";

import { FC, useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.webp";
import { HelpCircle, LogOut, Menu } from "lucide-react";
import { navigationItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

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
      <div className="flex-1 p-4 space-y-2">
        {navigationItems.map((item, key) => (
          <Link
            href={item.href}
            key={key}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${isCollapsed ? "justify-center" : ""} ${item.href === pathname ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "text-gray-300 hover:text-white hover:bg-zinc-800"} `}
          >
            <item.icon className="size-5 shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
          </Link>
        ))}
      </div>

      {/* Butonlar */}
      <div className="p-4 border-t border-zinc-800 space-y-2">
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-zinc-800 w-full ${isCollapsed ? "justify-center" : ""}`}
        >
          <HelpCircle className="size-5 shrink-0" />
          {!isCollapsed && <span>Yardım</span>}
        </button>
        <button
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-zinc-800 w-full ${isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut className="size-5 shrink-0" />
          {!isCollapsed && <span>Çıkış</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
