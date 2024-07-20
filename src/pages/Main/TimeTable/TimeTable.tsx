import styles from './TimeTable.module.scss';
import WeeklyTimeTable from './WeeklyTimeTable/WeeklyTimeTable';

const TimeTable = () => {
  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.dateBox}>
          <h3 className={styles.title}>Username의 시간표</h3>
        </div>
        <button className={styles.addScheduleBtn}>강의 추가 +</button>
      </div>
      <WeeklyTimeTable />
    </div>
  );
};

export default TimeTable;
