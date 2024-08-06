import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRecordModalStore } from '../../../store/useRecordModalStore';
import { IScheduleElement } from '../../../constants/schedule';
import { getSchedule } from '../../../apis/schedule';
import styles from './RecordTagDropDown.module.scss';

const name = '건국대학교 3-1학기'; // 임시 지정

const RecordTagDropDown = () => {
  const { data } = useQuery<IScheduleElement[], Error>({
    queryKey: ['schedule', name],
    queryFn: () => getSchedule(name),
  });

  const [isTagBtnClicked, setIsTagBtnClicked] = useState(false);

  const { recordData, updateModalData } = useRecordModalStore();
  const { tag } = recordData;

  const TAGS = useMemo(() => {
    if (!data) return [];

    return Array.from(new Set(data.map((item) => item.name)));
  }, [data]);

  const handleTagBtnClick = () => {
    setIsTagBtnClicked((prev) => !prev);
  };

  const handleLiClick = (name: string) => {
    updateModalData({ tag: name });
    setIsTagBtnClicked(false);
  };

  return (
    <span className={styles.wrapper}>
      <button
        className={`${styles.tagBtn} ${data !== undefined && data.length > 0 && styles.active}`}
        onClick={handleTagBtnClick}
      >
        {tag !== '' ? tag : '태그'}
      </button>
      {isTagBtnClicked && (
        <ul className={styles.tagsUl}>
          {TAGS.map((name) => (
            <li className={styles.tagLi} onClick={() => handleLiClick(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};

export default RecordTagDropDown;
