import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetAllGigRes, FilterParams, GetOneGigRes } from "../types";
import api from "./axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// hizmet verileri için bütün api istekleri al
const gigService = {
  getAll: (params?: FilterParams) => api.get<GetAllGigRes>("/gigs", { params }),
  getOne: (id: string) => api.get<GetOneGigRes>(`/gigs/${id}`),
  create: (body: FormData) => api.post<GetOneGigRes>(`/gigs`, body),
  delete: (id: string) => api.delete(`/gigs/${id}`),
};

// bütün hizmetleri al
export const useGetAllGigs = (params?: FilterParams) =>
  useQuery({
    queryKey: ["gigs", params],
    queryFn: () => gigService.getAll(params),
    select: (res) => res.data.data,
  });

// bir hizmeti al
export const useGetOneGig = (id?: string) =>
  useQuery({
    queryKey: ["gig", id],
    queryFn: () => gigService.getOne(id!),
    select: (res) => res.data.data,
  });

// yeni hizmet oluştur
export const useCreateGig = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: gigService.create,
    onSuccess: (res) => {
      navigate(`/detail/${res.data.data._id}`);
      toast.success("Hizmet başarıyla oluşturuldu");
    },
    onError: (err) => {
      toast.error(err.message || "Bir sorun oluştu");
    },
  });
};

// hizmeti kaldır
export const useDeleteGig = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: gigService.delete,
    onSuccess: () => {
      toast.success("Hizmet kaldırıldı");
      // arayüzün güncellenmesi için useGetAllGigs sorgusunu yenile
      client.invalidateQueries({ queryKey: ["gigs"] });
    },
    onError: (err) => {
      toast.error(err.message || "İşlem başarısız");
    },
  });
};
