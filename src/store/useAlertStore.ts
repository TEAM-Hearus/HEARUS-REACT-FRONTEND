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
  closingAlertIds: number[];
  startClosingAnimation: (id: number) => void;
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
  closingAlertIds: [],

  addAlert: (message, type) => {
    const id = Date.now();
    set((state) => ({
      alerts: [...state.alerts, { id, message, type }],
    }));

    setTimeout(() => {
      get().startClosingAnimation(id);
      setTimeout(() => {
        get().removeAlert(id);
      }, 300);
    }, 3000);
  },
  startClosingAnimation: (id: number) => {
    set((state) => ({
      closingAlertIds: [...state.closingAlertIds, id],
    }));
  },
  removeAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
      closingAlertIds: state.closingAlertIds.filter(
        (alertId) => alertId !== id,
      ),
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
