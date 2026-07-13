import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ recipe }) => {
  return (
    <Link to={`/tarif/${recipe.id}`} className="group card p-4">
      <div className="overflow-hidden rounded-lg relative">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="rounded-lg h-45 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <span className="flex items-center gap-1.5 bg-white/90 absolute bottom-2 left-2 text-stone-700 rounded-full py-1.5 px-3 font-medium">
          <Clock className="size-4" />
          {recipe.time} dk
        </span>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-stone-800 group-hover:text-stone-600 transition-colors">
          {recipe.name}
        </h2>

        <p className="text-stone-500 text-sm mt-1">{recipe.category}</p>

        <div className="flex gap-2 mt-3 flex-wrap">
          {recipe.ingredients.slice(0, 2).map((ingredient, key) => (
            <span
              key={key}
              className="text-xs bg-stone-100 text-stone-600 rounded-full px-2.5 py-1"
            >
              {ingredient}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Card;
