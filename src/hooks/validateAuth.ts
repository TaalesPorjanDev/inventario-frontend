import api from "../services/api";

import { useAuthStore } from "../store/authStore";

export async function validateAuth() {
  const { setAuthenticated, setLoading } = useAuthStore.getState();

  setLoading(true);

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
