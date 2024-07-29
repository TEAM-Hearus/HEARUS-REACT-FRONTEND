import React from 'react';
import styles from './Modal.module.scss';
import { useModalStore } from '../../../store/useModalStore';

const Modal: React.FC = () => {
  const { isOpen, modalData, closeModal, updateModalData, saveData } =
    useModalStore();

  if (!isOpen || !modalData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateModalData({ [name]: value });
  };

  const handleSave = () => {
    saveData();
    closeModal();
  };

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <h2>녹음을 이대로 저장하시겠습니까?</h2>
          <div className={styles.modalField}>
            <label>제목</label>
            <div className={styles.separator}></div>
            <input
              type="text"
              name="title"
              value={modalData.title}
              onChange={handleChange}
            />
          </div>
          <div className={styles.modalField}>
            <label>태그</label>
            <div className={styles.separator}></div>
            <input
              type="text"
              name="tag"
              value={modalData.tag}
              onChange={handleChange}
            />
          </div>
          <div className={styles.modalActions}>
            <button onClick={closeModal} className={styles.modalClose}>
              뒤로 돌아가기
            </button>
            <button onClick={handleSave} className={styles.modalSave}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;

//import { useModalStore } from '../../../store/useModalStore';
// import Modal from '../../../components/modals/modal/Madal';
//  const openModal = useModalStore((state) => state.openModal);
//  const handleOpenModal = () => {
//    openModal({ title: '', tag: '' });
//  };
//onClick={handleOpenModal}
//      <Modal />
