import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import useRecordModalStore from '../../../../store/useRecordModalStore';
import Up from '../../../../assets/images/arrow/up-arrow.svg?react';
import Down from '../../../../assets/images/arrow/down-arrow.svg?react';
import { getSchedule } from '../../../../apis/schedule';
import { useUserInfoStore } from '../../../../store/useUserInfoStore';
import { useUnauthorizedRedirect } from '../../../../hooks/useUnauthorizedRedirect';
import { addLecture, restructureScript } from '../../../../apis/record';
import { getCurrentKoreanTimeString } from '../../../../utils/dateFormatters';
import { useAlert } from '../../../../contexts/AlertContext';
import styles from './RecordModal.module.scss';

interface IProps {
  handleQuit: () => void; // 타이머, 녹음, 소켓 연결 종료
  recognitionResult: string[];
}

const RecordModal = ({ handleQuit, recognitionResult }: IProps) => {
  const navigate = useNavigate();
  const { recordData, closeModal, clearRecordData } = useRecordModalStore();
  const [localData, setLocalData] = useState(recordData);
  const [isTagClicked, setIsTagClicked] = useState(false);
  const [isRestructuring, setIsRestructuring] = useState(false);

  const { userInfo } = useUserInfoStore();
  const { addAlert } = useAlert();

  const { data } = useQuery({
    queryKey: ['schedule', userInfo.userName],
    queryFn: () => getSchedule(userInfo.userName),
  });

  const mutation = useMutation({
    mutationFn: addLecture,
    onSuccess: async (data) => {
      if (data.success) {
        setIsRestructuring(true);
        const restructureResponse = await restructureScript(data.object.id);
        if (restructureResponse.success) {
          setIsRestructuring(false);
          addAlert('스크립트가 성공적으로 저장됐습니다.', 'success');
          clearRecordData();
          closeModal();
          handleQuit();
          navigate('/home');
        } else {
          addAlert('스크립트 저장 중 문제가 발생했습니다.', 'error');
        }
      } else {
        if (data.msg === 'Lecture name already exists') {
          addAlert('같은 이름의 스크립트가 존재합니다.', 'error');
        }
        // 다른 예외처리 추가 예정
      }
    },
    onError: (error) => {
      addAlert(error.message, 'error');
    },
  });

  useUnauthorizedRedirect(data);
  useUnauthorizedRedirect(mutation.data);

  const TAGS = useMemo(() => {
    if (!data) return [];

    const tagObject: { [key: string]: number } = {};

    data?.object?.scheduleElements.forEach((item) => {
      if (!tagObject.hasOwnProperty(item.name)) {
        tagObject[item.name] = item.id;
      }
    });

    return Object.entries(tagObject).map(([name, id]) => ({
      name,
      id,
    }));
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

  const handleTagClick = (tag: { name: string; id: number }) => {
    setLocalData((prev) => ({
      ...prev,
      tag: tag.name,
      id: tag.id,
    }));
  };

  const handleClickArrow = () => {
    setIsTagClicked((prev) => !prev);
  };

  const handleClickSaveBtn = () => {
    if (recognitionResult.length > 0) {
      const body = {
        name: localData.title,
        processedScript: recognitionResult,
        scheduleElementId: localData.id,
        lectureDate: getCurrentKoreanTimeString(),
        problems: [],
      };
      mutation.mutate(body);
    } else {
      addAlert('빈 스크립트입니다.', 'error');
    }
  };

  useEffect(() => {
    if (isRestructuring)
      addAlert(
        '인공지능이 중요 단어를 하이라이팅 중입니다\n잠시 기다려주세요.',
        'success',
      );
  }, [isRestructuring]);

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
            {TAGS.length > 0 && (
              <div className={styles.arrow} onClick={handleClickArrow}>
                {isTagClicked ? <Up /> : <Down />}
              </div>
            )}
          </div>
        </div>
        {isTagClicked && (
          <ul className={styles.tagBtnsUl}>
            {TAGS.map((item, index) => (
              <li
                className={`${styles.tagLiBtn} ${
                  localData.tag === item.name ? styles.active : styles.inactive
                }`}
                key={index}
                onClick={() => handleTagClick(item)}
              >
                {item.name}
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
