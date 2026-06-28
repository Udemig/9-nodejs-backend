import { CalendarFold } from "lucide-react";
import { Link } from "react-router-dom";

const Card = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative glass rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/10! hover:border-purple-500/50! group"
    >
      <div className="relative p-4">
        {/* Resim */}
        <div className="relatieve mb-4 overflow-hidden rounded-xl aspect-2/3">
          <img src={movie.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        </div>

        {/* İçerik */}
        <div className="space-y-2.5">
          <h3 className="text-2xl">{movie.title}</h3>

          <div className="flex items-center gap-2 text-gray-400">
            <CalendarFold className="size-4" />
            <span className="text-sm font-medium">{movie.year}</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {movie.genre.map((genre) => (
              <span key={genre} className="glass px-3 py-1 rounded-full text-xs font-medium">
                {genre}
              </span>
            ))}
          </div>

          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold capitalize shadow-md bg-linear-to-r from-blue-500 to-purple-500">
              {movie.language}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
