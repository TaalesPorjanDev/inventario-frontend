import { create } from "zustand";

interface ToastStore {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  showToast: (message: string, type: 'success' | 'error') => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: '',
  type: 'success',
  visible: false,

  showToast: (message, type) => {
    set({ message, type, visible: true });
  },

  hideToast: () => {
    set({ message: '', type: 'success', visible: false });
  },
}));