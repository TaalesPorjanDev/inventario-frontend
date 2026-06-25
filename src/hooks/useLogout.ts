import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuthStore } from "../store/authStore";
import { useItemStore } from "../store/itemStore";

export function useLogout() {
  const navigate = useNavigate();

  async function logout() {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Erro ao tentar sair:", e.message);
      }
    } finally {
      useAuthStore.getState().logout();
      useItemStore.getState().limparItens();
      navigate("/login", { replace: true });
    }
  }

  return { logout };
}
