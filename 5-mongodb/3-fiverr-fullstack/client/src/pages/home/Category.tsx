import type { FC } from "react";
import { categories } from "../../utils/constants";
import { Link } from "react-router-dom";

const Category: FC = () => {
  return (
    <div className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {categories.map((category, key) => (
        <Link
          to={`/search?category=${category.name}`}
          key={key}
          className="border shadow p-4 rounded-md cursor-pointer hover:shadow-xl border-zinc-200 hover:bg-gray-100"
        >
          <div className="flex flex-col gap-3 items-center text-center">
            <span className="text-3xl">{category.icon}</span>
            <span className="font-semibold text-sm">{category.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
