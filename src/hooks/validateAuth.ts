import api from "../services/api";

import { useAuthStore } from "../store/authStore";

export async function validateAuth() {
  const { setAuthenticated, setLoading } = useAuthStore.getState();

  try {
    await api.get("/auth/me", {
      withCredentials: true,
    });

    setAuthenticated(true);
  } catch {
    setAuthenticated(false);
  } finally {
    setLoading(false);
  }
}
