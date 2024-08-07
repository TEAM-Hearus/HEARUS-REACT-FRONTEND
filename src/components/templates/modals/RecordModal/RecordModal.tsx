import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useRecordModalStore from '../../../../store/useRecordModalStore';
import Up from '../../../../assets/images/arrow/up-arrow.svg?react';
import Down from '../../../../assets/images/arrow/down-arrow.svg?react';
import { IScheduleElement } from '../../../../constants/schedule';
import { getSchedule } from '../../../../apis/schedule';
import styles from './RecordModal.module.scss';

interface IProps {
  handleQuit: () => void; // 타이머, 녹음, 소켓 연결 종료
}

const name = '건국대학교 3-1학기'; // 임시 지정

const RecordModal = ({ handleQuit }: IProps) => {
  const navigate = useNavigate();
  const { recordData, closeModal, clearRecordData } = useRecordModalStore();
  const [localData, setLocalData] = useState(recordData);
  const [isTagClicked, setIsTagClicked] = useState(false);

  const { data } = useQuery<IScheduleElement[], Error>({
    queryKey: ['schedule', name],
    queryFn: () => getSchedule(name),
  });
  const TAGS = useMemo(() => {
    if (!data) return [];

    return Array.from(new Set(data.map((item) => item.name)));
  }, [data]);

  const handleClickModalContent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setLocalData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagClick = (tag: string) => {
    setLocalData((prev) => ({ ...prev, tag }));
  };

  const handleClickArrow = () => {
    setIsTagClicked((prev) => !prev);
  };

  const handleClickSaveBtn = () => {
    handleQuit();
    console.log(localData); // API 연결 예정
    clearRecordData();
    closeModal();
    navigate('/home');
  };

  return createPortal(
    <div className={styles.modalWrapper} onClick={closeModal}>
      <div className={styles.modalContainer} onClick={handleClickModalContent}>
        <h2 className={styles.modalTitle}>녹음을 이대로 저장하시겠습니까?</h2>
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
              value={localData.title}
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
              value={localData.tag}
              onChange={handleChange}
              readOnly
            />
            <span className={styles.arrow} onClick={handleClickArrow}>
              {isTagClicked ? <Up /> : <Down />}
            </span>
          </div>
        </div>
        {isTagClicked && (
          <ul className={styles.tagBtnsUl}>
            {TAGS.map((name, index) => (
              <li
                className={`${styles.tagLiBtn} ${
                  localData.tag === name ? styles.active : styles.inactive
                }`}
                key={index}
                onClick={() => handleTagClick(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.modalActions}>
          <button className={styles.modalClose} onClick={closeModal}>
            뒤로 돌아가기
          </button>
          <button className={styles.modalSave} onClick={handleClickSaveBtn}>
            저장
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
export default RecordModal;
