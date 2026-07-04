import api from "../../service/api";
import Hero from "./hero";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Card from "./card";
import { useState } from "react";

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["movies"],
    queryFn: () => api.get("/movies"),
    select: (res) => res.data,
  });

  // aratılan kelimeyle eşleşen filmleri filtrele
  const filtredMovies = data?.filter((movie) => {
    // filmin adına göre ara
    const titleFilter = movie.title.toLowerCase().includes(searchValue);

    // yönetmen adına göre ara
    const directorFilter = movie.director.toLowerCase().includes(searchValue);

    // yıla göre ara
    const yearFilter = movie.year.toLowerCase().includes(searchValue);

    // aktör adına göre ara
    const castFilter = movie.cast.some((actor) => actor.toLowerCase().includes(searchValue));

    // türe göre arama
    const genreFilter = movie.genre.some((genre) => genre.toLowerCase().includes(searchValue));

    // filtreleme sonucunu döndür
    return titleFilter || directorFilter || yearFilter || castFilter || genreFilter;
  });

  return (
    <div>
      <Hero setSearchValue={setSearchValue} />

      <div className="container mx-auto px-6 py-12">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error.message} refetch={refetch} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtredMovies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
