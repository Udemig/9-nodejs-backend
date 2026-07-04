import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../service/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import DeleteButton from "../../components/detail/delete-button";

const Detail = () => {
  // url'den id parametresini al
  const { id } = useParams();

  // api'dan film bilgilerini al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["movie"],
    queryFn: () => api.get(`/movies/${id}`),
    select: (res) => res.data,
  });

  // ekrana basılacak verilerin dizisini oluştur
  const fieldArray = [
    { label: "Süre", value: data?.duration },
    { label: "İzleyici Skoru", value: data?.rating },
    { label: "Yıl", value: data?.year },
    { label: "Dil", value: data?.language },
    { label: "Oyuncular", list: data?.cast },
    { label: "Türler", list: data?.genre },
    { label: "Yönetmen", value: data?.director },
  ];

  if (isLoading) return <Loader />;

  if (error) return <Error message={error.message} refetch={refetch} />;

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10 animate-fade-in">
          {/* Görsel */}
          <div className="group overflow-hidden rounded-2xl lg:w-1/3">
            <img
              src={data.image}
              alt={data.title}
              className="w-full rounded-2xl border border-white/10 group-hover:scale-105 transition duration-300 shadow-2xl"
            />
          </div>

          {/* İçerik */}
          <div className="lg:w-2/3 space-y-8">
            {/* Başlık */}
            <div className="glass p-8 rounded-2xl border border-white/10 shadow-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                {data.title}
              </h1>

              <p className="text-gray-300 text-lg leading-relaxed">{data.description}</p>
            </div>

            {/* Diğer Bigiler */}
            <div className="grid md:grid-cols-2 gap-4">
              {fieldArray.map((item, key) => (
                <div key={key} className="glass p-4 rounded-xl border border-white/10">
                  <span className="text-gray-400 text-sm block mb-1">{item.label}</span>

                  {item.list ? (
                    <div className="flex gap-2 flex-wrap">
                      {item.list.map((i) => (
                        <span className="glass px-4 py-2 rounded-full font-medium text-purple-300 border border-purple-500/30">
                          {i}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="font-semibold text-lg">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass border-t border-white/10 mt-10 rounded">
          <div className="container mx-auto px-6 py-2 flex justify-end">
            <DeleteButton id={data.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
