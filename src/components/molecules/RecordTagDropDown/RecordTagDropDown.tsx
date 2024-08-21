import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useRecordModalStore, {
  ITagItem,
} from '../../../store/useRecordModalStore';
import { IScheduleElement } from '../../../constants/schedule';
import { getSchedule } from '../../../apis/schedule';
import styles from './RecordTagDropDown.module.scss';
import { useUserInfoStore } from '../../../store/useUserInfoStore';

const RecordTagDropDown = () => {
  const { userInfo } = useUserInfoStore();
  const { data } = useQuery<IScheduleElement[], Error>({
    queryKey: ['schedule', userInfo.userName],
    queryFn: () => getSchedule(userInfo.userName),
  });

  const [isTagBtnClicked, setIsTagBtnClicked] = useState(false);

  const { recordData, updateRecordData } = useRecordModalStore();
  const { tag } = recordData;

  const TAGS = useMemo(() => {
    if (!data) return [];

    const tagObject: { [key: string]: number } = {};

    data.forEach((item) => {
      if (!tagObject.hasOwnProperty(item.name)) {
        tagObject[item.name] = item.scheduleId;
      }
    });

    return Object.entries(tagObject).map(([name, id]) => ({
      name,
      scheduleId: id,
    }));
  }, [data]);

  const handleTagBtnClick = () => {
    setIsTagBtnClicked((prev) => !prev);
  };

  const handleLiClick = (item: ITagItem) => {
    updateRecordData({ tag: item.name, scheduleId: item.scheduleId });
    setIsTagBtnClicked(false);
  };

  useEffect(() => {
    console.log(recordData);
  }, [recordData]);

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.tagBtn} ${data !== undefined && data.length > 0 && styles.active}`}
        onClick={handleTagBtnClick}
      >
        {tag !== '' ? tag : '태그'}
      </button>
      {isTagBtnClicked && (
        <ul className={styles.tagsUl}>
          {TAGS.map((item) => (
            <li
              key={item.name}
              className={styles.tagLi}
              onClick={() => handleLiClick(item)}
              role="option"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecordTagDropDown;
