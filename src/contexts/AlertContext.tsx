import { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { Alert, AlertContextType, AlertType } from '../utils/alerts';
import ConfirmAlert from '../components/organisms/Alerts/confirmAlert/ConfirmAlert';

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [confirmAlert, setConfirmAlert] = useState<{
    title: string;
    message: string;
    buttonText: string;
    resolve: (value: boolean) => void;
  } | null>(null);
  const nextId = useRef(1);

  const addAlert = (message: string, type: AlertType) => {
    const id = nextId.current++;
    setAlerts((prevAlerts) => [...prevAlerts, { id, message, type }]);

    setTimeout(() => {
      handleClose(id);
    }, 4000);
  };

  const handleClose = (id: number) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, closing: true } : alert,
      ),
    );
    setTimeout(() => {
      removeAlert(id);
    }, 300);
  };

  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const showConfirm = (
    title: string,
    message: string,
    buttonText: string,
  ): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmAlert({ title, message, buttonText, resolve });
    });
  };

  const handleConfirm = (result: boolean) => {
    if (confirmAlert) {
      confirmAlert.resolve(result);
      setConfirmAlert(null);
    }
  };
  return (
    <AlertContext.Provider
      value={{ alerts, addAlert, removeAlert, showConfirm }}
    >
      {children}
      {confirmAlert && (
        <ConfirmAlert
          message={confirmAlert.message}
          title={confirmAlert.title}
          buttonText={confirmAlert.buttonText}
          onConfirm={handleConfirm}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('오류가 발생했습니다.');
  }
  return context;
};
