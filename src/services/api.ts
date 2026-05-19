import axios from "axios";

import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Se a API indicar que o usuário não está autorizado, atualizar a store.
      try {
        useAuthStore.getState().setAuthenticated(false);
        useAuthStore.getState().setLoading(false);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error("Erro ao atualizar estado de autenticação:", e.message);
        }
        // silencioso: falhas aqui não devem quebrar o fluxo principal
      }
    } else {
      console.error(error);
    }

    return Promise.reject(error);
  },
);

export default api;
