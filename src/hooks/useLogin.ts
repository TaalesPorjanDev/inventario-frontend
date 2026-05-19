import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useToastStore } from "../store/toastStore";
import { useAuthStore } from "../store/authStore";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.showToast);

  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  async function login({ email, password }: LoginData) {
    if (!email || !password) {
      showToast("Preencha email e senha", "error");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      setAuthenticated(true);

      showToast("Login realizado com sucesso", "success");

      navigate("/");
    } catch {
      showToast("Email ou senha inválidos", "error");
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    loading,
  };
}
