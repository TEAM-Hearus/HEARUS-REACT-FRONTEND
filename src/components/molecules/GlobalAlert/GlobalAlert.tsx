import { useState } from 'react';
import { useAlertStore } from '../../../store/useAlertStore';
import styles from './GlobalAlert.module.scss';

const AlertComponent = () => {
  const { alerts, removeAlert, closingAlertIds, startClosingAnimation } =
    useAlertStore();

  const handleClose = (id: number) => {
    startClosingAnimation(id);

    setTimeout(() => {
      removeAlert(id);
    }, 300);
  };

  return (
    <div className={styles.alertContainer}>
      {alerts &&
        alerts.map((alert) => (
          <button
            key={alert.id}
            className={`${styles.alert} ${styles[alert.type]} ${
              closingAlertIds.includes(alert.id) ? styles.closing : ''
            }`}
            onClick={() => handleClose(alert.id)}
          >
            {alert.message}
          </button>
        ))}
    </div>
  );
};

export default AlertComponent;
