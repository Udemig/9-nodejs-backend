import { useNavigate } from "react-router-dom";
import type { AuthResponse, LoginData, RegisterData } from "../types";
import api from "./axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const authService = {
  register: (body: RegisterData) =>
    api.post<AuthResponse>("/auth/register", body, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  login: (body: LoginData) => api.post<AuthResponse>("/auth/login", body),

  profile: () => api.get<AuthResponse>("/auth/profile"),

  logout: () => api.post("/auth/logout"),
};

// register için kullanılacak mutasyon
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      navigate("/login");
      toast.success("Hesabınız oluşturuldu. Giriş yapabilirsiniz.");
    },
    onError: () => {
      toast.error("Kayıt olma işleminde bir hata oluştu");
    },
  });
};

// register için kullanılacak mutasyon
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      navigate("/");
      toast.success("Oturumunuz açıldı");
      // profil sorugusunu yenile
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      const error = err as AxiosError<{ message?: string }>;

      toast.error(error?.response?.data?.message || "Giriş yapma işleminde bir hata oluştu");
    },
  });
};

// profil verilini almak için query
export const useProfile = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: authService.profile,
    staleTime: 0,
    retry: false,
    select: (res) => res.data.user,
  });

  return { isLoading, error, user: data };
};

// çıkış yapmak için kullanılacak mutasyon
export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ["profile"] })
        .forEach((query) => query.setData(undefined));

      navigate("/login");
      toast.success("Oturumunuz kapatıldı");
    },
    onError: (err) => {
      const error = err as AxiosError<{ message?: string }>;

      toast.error(error?.response?.data?.message || "Bir hata oluştu");
    },
  });
};
