import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader";
import { toast } from "react-toastify";
import api from "../../utils/api";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.get(`/api/recipes/${id}`),
    select: (res) => res.data.data,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (recipeData) => api.put(`/api/recipes/${id}`, recipeData),
    onSuccess: (res) => {
      toast.success("Tarif güncellendi");
      navigate(`/tarif/${res.data.data.id}`);
    },
    onError: () => {
      toast.error("İşlem başarısız");
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-stone-800">Tarifi Düzenle</h1>
      <p className="text-stone-500 mt-1">Tarifi düzenlemek için formu doldurun</p>

      <Form recipeData={data} isPending={isPending} mutate={mutate} />
    </div>
  );
};

export default Edit;
