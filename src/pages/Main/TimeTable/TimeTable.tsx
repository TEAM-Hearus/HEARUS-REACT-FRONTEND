import { useState } from 'react';
import styles from './TimeTable.module.scss';
import WeeklyTimeTable from './WeeklyTimeTable/WeeklyTimeTable';
import LectureModal from '../../../components/templates/modals/AddALectureModal/LectureModal';

const TimeTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.dateBox}>
          <h3 className={styles.title}>Username의 시간표</h3>
        </div>
        <button className={styles.addScheduleBtn} onClick={handleOpenModal}>
          강의 추가 +
        </button>
      </div>
      <WeeklyTimeTable />
      {isOpen && <LectureModal isOpen={isOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default TimeTable;
