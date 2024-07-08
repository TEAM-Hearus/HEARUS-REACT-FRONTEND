import styles from './TimeTable.module.scss';
import { Link, Outlet, useLocation } from 'react-router-dom';

const TimeTable = () => {
  const location = useLocation();
  const isWeekly = location.pathname === '/home/time-table';
  return (
    <div className={styles.wholeWrapper}>
      <div className={styles.headerContainer}>
        <div className={styles.dateBox}>
          <h3 className={styles.today}>06/28(금)</h3>
          <div className={styles.toggleMode}>
            <Link
              to="/home/time-table"
              className={`${isWeekly ? styles.activeMode : styles.inactiveMode}`}
            >
              주간
            </Link>
            <Link
              to="/home/time-table/monthly"
              className={`${!isWeekly ? styles.activeMode : styles.inactiveMode}`}
            >
              월간
            </Link>
          </div>
        </div>
        <button className={styles.addScheduleBtn}>일정 추가</button>
      </div>
      <Outlet />
    </div>
  );
};

export default TimeTable;
