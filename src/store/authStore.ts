import { create } from "zustand";

interface AuthStore {
  isAuthenticated: boolean;
  loading: boolean;
  setAuthenticated: (auth: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  loading: true,
  setAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
  setLoading: (loading: boolean) => set({ loading }),
  logout: () => set({ isAuthenticated: false, loading: false }),
}));