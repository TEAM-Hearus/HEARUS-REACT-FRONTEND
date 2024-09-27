import styles from './ConfirmAlert.module.scss';

interface ConfirmAlertProps {
  title: string;
  message: string;
  buttonText: string;
  onConfirm: (result: boolean) => void;
}

const ConfirmAlert = ({
  message,
  title,
  buttonText,
  onConfirm,
}: ConfirmAlertProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.btnBox}>
          <button className={styles.cancleBtn} onClick={() => onConfirm(false)}>
            취소하기
          </button>
          <button className={styles.selectBtn} onClick={() => onConfirm(true)}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
