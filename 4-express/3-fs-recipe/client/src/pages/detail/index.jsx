import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import api from "../../utils/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import { ChevronLeft, Clock, Flag, Utensils } from "lucide-react";
import DeleteButton from "./delete-button";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.get(`/api/recipes/${id}`),
    select: (res) => res.data.data,
  });

  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Butonlar */}
      <div className="flex justify-between items-center">
        <Link
          to={-1}
          className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
        >
          <ChevronLeft /> <span>Geri</span>
        </Link>

        <div className="flex items-center gap-3 text-sm">
          <Link
            to={`/düzenle/${id}`}
            className="btn bg-transparent border text-stone-700 border-stone-300 hover:bg-stone-100 py-2 px-4"
          >
            Düzenle
          </Link>

          <DeleteButton id={id} />
        </div>
      </div>

      {/* Detaylar */}
      <div className="mt-10">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">{data.name}</h1>

          <div className="flex gap-3">
            <span className="badge">
              <Utensils className="size-4" />
              {data.category}
            </span>
            <span className="badge">
              <Clock className="size-4" />
              {data.time} dk
            </span>
            <span className="badge">
              <Flag className="size-4" />
              {data.country}
            </span>
          </div>
        </header>

        <img src={data.image} alt={data.name} className="rounded-2xl w-full h-75 object-cover" />

        <section className="mt-8">
          <h2 className="title">Malzemeler</h2>

          <ul className="space-y-2">
            {data.ingredients.map((item, key) => (
              <li key={key} className="flex items-center gap-3 text-stone-600">
                <span className="size-2 bg-stone-300 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="title">Hazırlanış</h2>

          <ul className="space-y-2">
            {data.instructions.map((item, key) => (
              <li key={key} className="flex items-center gap-3 text-stone-600">
                <span className="size-7 bg-stone-100 rounded-full grid place-items-center text-sm font-medium text-stone-600">
                  {key + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {data.serving && (
          <section className="mt-8 p-6 bg-stone-100 rounded-xl">
            <h2 className="title mb-2">Sunum Önerisi</h2>
            <p className="text-stone-600">{data.serving}</p>
          </section>
        )}
      </div>
    </div>
  );
};

export default Detail;
