export type AlertType = 'success' | 'error';

export interface Alert {
  message: string;
  type: AlertType;
  id: number;
  closing?: boolean;
}

export interface AlertContextType {
  alerts: Alert[];
  addAlert: (message: string, type: AlertType) => void;
  removeAlert: (id: number) => void;

  showConfirm: (
    title: string,
    message: string,
    buttonText: string,
  ) => Promise<boolean>;
}
