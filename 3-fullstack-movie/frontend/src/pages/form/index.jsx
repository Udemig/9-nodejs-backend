import Input from "../../components/form/input";
import { INPUTS } from "../../utils/constants";
import { useMutation } from "@tanstack/react-query";
import api from "../../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  // api isteğini ayarla
  const { isPending, mutate } = useMutation({
    mutationFn: (movieData) => api.post("/movies", movieData),
    onSuccess: (res) => {
      toast.success("Yeni film oluşturuldu");
      navigate(`/movie/${res.data.movie.id}`);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Hata oluştu");
    },
  });

  // form gönderilince
  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardaki verilere eriş
    const formData = new FormData(e.target);
    const movieData = Object.fromEntries(formData.entries());

    // cast ve genre verilerini dizi formatına çevir
    movieData.genre = movieData.genre.split(",");
    movieData.cast = movieData.cast.split(",");

    // filmin süresini s/dk formatına çevir 128 ===> 2s 8dk
    const hour = (movieData.duration / 60).toFixed(0);
    const minute = movieData.duration % 60;
    movieData.duration = `${hour}s ${minute}dk`;

    // api isteğini at
    mutate(movieData);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-5 py-12">
      <div className="glass w-full max-w-2xl p-10 mx-auto rounded-2xl shadow-2xl z-10 animate-fade-in">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-center text-3xl font-bold">Yeni Film Oluştur</h1>

          {/* inputlar */}
          <div className="space-y-5">
            {INPUTS.slice(0, 6).map((props) => (
              <Input key={props.name} {...props} />
            ))}

            <div className="md:grid md:grid-cols-2 md:gap-5 space-y-5">
              {INPUTS.slice(6).map((props) => (
                <Input key={props.name} {...props} />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-gradient py-3 px-6 rounded-xl font-semibold text-lg mt-4 shadow-xl"
          >
            {isPending ? "Oluşturuluyor..." : "Oluştur"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
