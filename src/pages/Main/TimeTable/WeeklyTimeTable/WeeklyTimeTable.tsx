import { useQuery } from '@tanstack/react-query';
import TimeTableItem from '../../../../components/molecules/TimeTableItem/TimeTableItem';
import { IScheduleElement, TIMELIST } from '../../../../constants/schedule';
import styles from './WeeklyTimeTable.module.scss';
import { getSchedule } from '../../../../apis/schedule';

const name = '건국대학교 3-1학기'; // 임시 지정

const WeeklyTimeTable = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const { data } = useQuery<IScheduleElement[], Error>({
    queryKey: ['schedule', name],
    queryFn: () => getSchedule(name),
  });
  return (
    <div className={styles.table}>
      <div className={styles.dayOfWeekRow}>
        {daysOfWeek.map((day) => (
          <div className={styles.dayOfWeekCell} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.tableBox}>
        {TIMELIST.map((time, index) => (
          <div className={styles.timeRow} key={index}>
            <span className={styles.time}>{time}</span>
            {daysOfWeek.map((day) => (
              <div
                className={`${styles.daytime} ${
                  index === TIMELIST.length - 1 ? styles.lastCell : ''
                }`}
                key={day}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.tableContainer}>
        {data?.map((schedule) => (
          <TimeTableItem key={schedule.id} {...schedule} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyTimeTable;
