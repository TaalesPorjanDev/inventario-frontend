import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useToastStore } from "../store/toastStore";

interface LoginData {
  email: string;
  password: string;
}

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  async function login({ email, password }: LoginData) {
    if (!email || !password) {
      showToast("Preencha email e senha", "error");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", { email, password });
      const authResponse = response.data.authResponse;
      const token = authResponse.accessToken;

      localStorage.setItem("token", token);
      showToast("Login bem-sucedido!", "success");
      navigate("/");
    } catch {
        showToast("Email ou senha inválidos", "error");
    } finally {
      setIsLoading(false);
    }
    }

    return {
        login,
        isLoading
    }
}