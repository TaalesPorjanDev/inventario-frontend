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
      // Se a API indicar que o usuário não está autorizado, limpar estado local e redirecionar para login.
      try {
        useAuthStore.getState().logout();
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error("Erro ao limpar estado de autenticação:", e.message);
        }
      }

      try {
        if (typeof window !== "undefined") {
          window.location.replace("/login");
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error("Erro ao redirecionar para login:", e.message);
        }
        // se window falhar, nada a fazer aqui
      }
    } else {
      console.error(error);
    }

    return Promise.reject(error);
  },
);

export default api;
