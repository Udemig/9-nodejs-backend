import { NavLink } from "react-router-dom";
import { links } from "../../utils/constants";

const Sidebar = () => {
  return (
    <aside className="flex flex-col justify-between items-center py-8 px-2 md:px-5 border-r border-stone-200 bg-white max-md:gap-16 max-md:justify-normal h-screen">
      <div>
        <img src="/logo.jpg" alt="logo" className="w-20 rounded-xl object-cover md:w-30" />
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((i, key) => (
          <NavLink
            to={i.path}
            key={key}
            className="flex gap-3 items-center px-4 py-3 rounded-lg transition-all duration-300 text-stone-500 hover:bg-stone-50 hover:text-stone-700"
          >
            <span>{i.icon}</span>
            <span className="max-md:hidden">{i.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="max-md:hidden flex flex-col gap-3">
        <p className="text-sm text-stone-500">Günlük haberleri al</p>
        <button className="w-full py-2.5 px-4 bg-stone-800 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors">
          Abone Ol
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
