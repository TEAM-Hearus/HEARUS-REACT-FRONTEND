import { useAlertStore } from '../../../../store/useAlertStore';
import styles from './ConfirmAlert.module.scss';

const ConfirmAlert = () => {
  const { confirmAlert, handleConfirm } = useAlertStore();

  if (!confirmAlert) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>{confirmAlert.title}</h2>
        <p className={styles.message}>{confirmAlert.message}</p>
        <div className={styles.btnBox}>
          <button
            className={styles.cancleBtn}
            onClick={() => handleConfirm(false)}
          >
            취소
          </button>
          <button
            className={styles.selectBtn}
            onClick={() => handleConfirm(true)}
          >
            {confirmAlert.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
