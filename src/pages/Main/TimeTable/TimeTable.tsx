import { useRef, useState } from 'react';
import styles from './TimeTable.module.scss';
import WeeklyTimeTable from './WeeklyTimeTable/WeeklyTimeTable';
import AddScheduleForm from '../../../components/organisms/AddScheduleForm/AddScheduleForm';
import { useNameStore } from '../../../store/useUserNameStore';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

const TimeTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { userName } = useNameStore();

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  useOutsideClick(modalRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.dateBox}>
          <h3 className={styles.title}>{`${userName?.userName}의 시간표`}</h3>
        </div>
        <button className={styles.addScheduleBtn} onClick={handleOpenModal}>
          강의 추가 +
        </button>
      </div>
      <WeeklyTimeTable />
      {isOpen && (
        <div className={styles.AddScheduleContainer} ref={modalRef}>
          <AddScheduleForm onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
};

export default TimeTable;
