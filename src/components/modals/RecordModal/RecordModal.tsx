import { createPortal } from 'react-dom';
import { useRecordModalStore } from '../../../store/useRecordModalStore';
import styles from './RecordModal.module.scss';
import { useNavigate } from 'react-router-dom';

interface IProps {
  handleQuit: () => void; // 타이머, 녹음, 소켓 연결 종료
}

const RecordModal = ({ handleQuit }: IProps) => {
  const navigate = useNavigate();

  const { recordData, closeModal, updateModalData } = useRecordModalStore();

  const handleClickModalContent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateModalData({ [name]: value });
  };

  const handleClickSaveBtn = () => {
    handleQuit();
    closeModal();
    navigate('/home');
  };

  return createPortal(
    <div className={styles.modalWrapper} onClick={closeModal}>
      <div className={styles.modalContainer} onClick={handleClickModalContent}>
        <div className={styles.modalTitle}>
          <h2>녹음을 이대로 저장하시겠습니까?</h2>
          <div className={styles.inputsContainer}>
            <div className={styles.modalField}>
              <label className={styles.label} htmlFor="title">
                제목
              </label>
              <div className={styles.separator} />
              <input
                id="title"
                type="text"
                name="title"
                value={recordData.title}
                onChange={handleChange}
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.label} htmlFor="tag">
                태그
              </label>
              <div className={styles.separator} />
              <input
                id="tag"
                type="text"
                name="tag"
                value={recordData.tag}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.modalActions}>
            <button className={styles.modalClose} onClick={closeModal}>
              뒤로 돌아가기
            </button>
            <button className={styles.modalSave} onClick={handleClickSaveBtn}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default RecordModal;
