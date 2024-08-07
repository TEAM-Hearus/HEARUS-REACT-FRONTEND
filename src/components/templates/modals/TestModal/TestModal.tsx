import { createPortal } from 'react-dom';
import styles from './TestModal.module.scss';
import useTestModalStore from '../../../../store/useTestModalStore';
import { useState } from 'react';

interface IProps {
  title: string;
  handleSubmit: () => void;
}

const TestModal = ({ title, handleSubmit }: IProps) => {
  const { testData, closeModal, clearTestData } = useTestModalStore();
  const isCompleted = testData.completeNum === testData.totalNum;

  const handleClickModalContent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClickQuitBtn = () => {
    closeModal();
    handleSubmit();
  };

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modalContainer} onClick={handleClickModalContent}>
        <h2 className={styles.modalTitle}>테스트를 종료하시겠습니까?</h2>
        <div className={styles.titleInput}>{title}</div>
        <div
          className={`${styles.completeStatus} ${isCompleted ? styles.completedText : styles.incompletedText}`}
        >
          <span
            className={`${styles.circle} ${isCompleted ? styles.completedCircle : styles.incompletedCircle}`}
          />
          <p>{isCompleted ? '답변 완료' : '답변 미완료'}</p>
          <p>
            {testData.completeNum}/{testData.totalNum}
          </p>
        </div>
        <div className={styles.btnsContainer}>
          <button
            className={`${styles.modalBtn} ${styles.gray}`}
            onClick={closeModal}
          >
            뒤로 돌아가기
          </button>
          <button
            className={`${styles.modalBtn} ${styles.orange}`}
            onClick={handleClickQuitBtn}
          >
            종료
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default TestModal;
