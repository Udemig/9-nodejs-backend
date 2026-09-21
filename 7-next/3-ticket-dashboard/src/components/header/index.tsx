import { Bell, Mail, Search, Settings, User } from "lucide-react";
import { FC } from "react";
import Statistics from "./Statistics";

const Header: FC = () => {
  return (
    <>
      <header className="h-21 bg-zinc-900 border-b border-zinc-800 px-6 py-4.5">
        <div className="flex items-center justify-between gap-4">
          {/* Arama */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
              <input
                type="text"
                className="w-full p-10 pr-4 py-2 border-zinc-700 rounded-lg bg-zinc-800 text-gray-100 placeholder-gray-500"
                placeholder="Ticket ara..."
              />
            </div>
          </div>

          {/* Iconlar */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="icon">
              <Bell />
              <span className="icon-info">1</span>
            </button>

            <button className="icon">
              <Mail />
              <span className="icon-info">3</span>
            </button>

            <button className="icon">
              <Settings />
            </button>

            {/* Profil */}
            <div className="relative">
              <button className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-lg transition">
                <div className="size-8 bg-blue-600 rounded-full grid place-items-center">
                  <User className="size-4" />
                </div>

                <div className="max-md:hidden text-left">
                  <p className="text-xs text-gray-100">Kullanıcı</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Statistics />
    </>
  );
};

export default Header;
