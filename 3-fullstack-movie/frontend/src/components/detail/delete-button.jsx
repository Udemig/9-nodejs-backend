import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import api from "../../service/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: () => api.delete(`/movies/${id}`),
    onSuccess: () => {
      toast.warning("Film kaldırıldı");
      navigate("/");
    },
    onError: () => {
      toast.error("İşlem başarısız");
    },
  });

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (!confirm("Silmek istediğinizden emin misiniz?")) return;
        mutate();
      }}
      className="p-2 bg-red-600 rounded-md hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
    >
      <Trash className="size-5" />
    </button>
  );
};

export default DeleteButton;
