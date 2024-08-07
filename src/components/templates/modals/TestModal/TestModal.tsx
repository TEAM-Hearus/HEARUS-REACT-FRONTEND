import { createPortal } from 'react-dom';
import styles from './TestModal.module.scss';
import useTestModalStore from '../../../../store/useTestModalStore';

interface IProps {
  title: string;
}

const TestModal = ({ title }: IProps) => {
  const { testData, closeModal, clearTestData } = useTestModalStore();

  const handleClickModalContent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modalContainer} onClick={handleClickModalContent}>
        <h2 className={styles.modalTitle}>테스트를 종료하시겠습니까?</h2>
        <input
          type="text"
          className={styles.titleInput}
          value={title}
          onChange={handleChangeTitle}
        />
        <div className={styles.completeStatus}>
          <span className={`${styles.circle} ${styles.incompletedCircle}`} />
          <p>답변 미완료</p>
          <p>3/4</p>
        </div>
        <div className={styles.btnsContainer}>
          <button className={`${styles.modalBtn} ${styles.gray}`}>
            뒤로 돌아가기
          </button>
          <button className={`${styles.modalBtn} ${styles.orange}`}>
            종료
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TestModal;
