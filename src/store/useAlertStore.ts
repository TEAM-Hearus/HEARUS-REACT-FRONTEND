import { create } from 'zustand';

interface Alert {
  id: number;
  message: string;
  type: 'success' | 'error';
}
interface AlertStore {
  alerts: Alert[];
  confirmAlert: {
    title: string;
    message: string;
    buttonText: string;
    resolve: (value: boolean) => void;
  } | null;
  addAlert: (message: string, type: 'success' | 'error') => void;
  removeAlert: (id: number) => void;
  showConfirm: (
    title: string,
    message: string,
    buttonText: string,
  ) => Promise<boolean>;
  handleConfirm: (result: boolean) => void;
}

export const useAlertStore = create<AlertStore>((set, get) => ({
  alerts: [],
  confirmAlert: null,
  addAlert: (message, type) => {
    const id = Date.now();
    set((state) => ({
      alerts: [...state.alerts, { id, message, type }],
    }));

    setTimeout(() => {
      get().removeAlert(id);
    }, 4000);
  },
  removeAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    }));
  },
  showConfirm: (title, message, buttonText) => {
    return new Promise((resolve) => {
      set({
        confirmAlert: { title, message, buttonText, resolve },
      });
    });
  },
  handleConfirm: (result) => {
    const { confirmAlert } = get();
    if (confirmAlert) {
      confirmAlert.resolve(result);
      set({ confirmAlert: null });
    }
  },
}));
