import { useAlert } from '../../../../contexts/AlertContext';
import { useState } from 'react';
import styles from './GlobalAlert.module.scss';

const AlertComponent = () => {
  const { alerts, removeAlert } = useAlert();
  const [closingAlertIds, setClosingAlertIds] = useState<number[]>([]);

  const handleClose = (id: number) => {
    setClosingAlertIds((prev) => [...prev, id]);

    setTimeout(() => {
      removeAlert(id);
    }, 300);
  };

  return (
    <div className={styles.alertContainer}>
      {alerts.map((alert) => (
        <button
          key={alert.id}
          className={`${styles.alert} ${styles[alert.type]} ${alert.closing || closingAlertIds.includes(alert.id) ? styles.closing : ''}`}
          onClick={() => handleClose(alert.id)}
        >
          {alert.message}
        </button>
      ))}
    </div>
  );
};

export default AlertComponent;
