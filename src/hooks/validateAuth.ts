import api from "../services/api";

export async function validateAuth() {
  try {
    await api.get("/auth/me", {
      withCredentials: true,
    });

    return true;
  } catch {
    return false;
  }
}
