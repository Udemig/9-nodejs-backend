import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Filter from "./filter";
import Sort from "./sort";
import Card from "./card";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Home = () => {
  const [order, setOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // DEBOUNCE: state güncellemesini her tuş vuruşunda değil son tuş vuruşunun adrından 500ms geçtikten sonra yapıyor. Bizde api isteğini atarken debounce uygulanmış state'i kullanırsak her tuş vuruşunda değil kullanıcı yazmayı bırakınca api isteği atarız
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // api'a gönderilecek parametre nesnesini hazırla
  const params = {
    order,
    search: debouncedSearchTerm,
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipes", order, debouncedSearchTerm],
    queryFn: () => api.get("/api/recipes", { params }),
    select: (res) => res.data.data,
  });

  return (
    <div className="max-w-7xl mx-auto">
      <Filter setSearchTerm={setSearchTerm} />

      <section className="mt-8">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error message={error.message} refetch={refetch} />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-stone-800">Tarifler</h1>
                <p className="text-stone-500 mt-1">{data.length} tarif bulundu</p>
              </div>

              <Sort setOrder={setOrder} />
            </div>

            <div className="mt-5 grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {data.map((recipe) => (
                <Card recipe={recipe} key={recipe.id} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
