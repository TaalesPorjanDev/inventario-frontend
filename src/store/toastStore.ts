import { create } from "zustand";

type ToastType = "success" | "error";

interface ToastStore {
  message: string;
  type: ToastType;
  visible: boolean;

  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: "",
  type: "success",
  visible: false,

  showToast: (message, type) => {
    set({
      message,
      type,
      visible: true,
    });
  },

  hideToast: () => {
    set({
      message: "",
      type: "success",
      visible: false,
    });
  },
}));
