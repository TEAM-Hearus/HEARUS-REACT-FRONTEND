import {
  IScheduleElement,
  TIMELIST,
  scheduleElements,
} from '../../../../constants/schedule';
import styles from './WeeklyTimeTable.module.scss';

interface IgroupedByDayOfWeek {
  [key: string]: IScheduleElement[];
}

const WeeklyTimeTable = () => {
  const groupedByDayOfWeek: IgroupedByDayOfWeek = scheduleElements.reduce(
    (acc, curr) => {
      acc[curr.dayOfWeek] = acc[curr.dayOfWeek] || [];
      acc[curr.dayOfWeek].push(curr);
      return acc;
    },
    {} as IgroupedByDayOfWeek,
  );

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div className={styles.table}>
      <div className={styles.dayOfWeekRow}>
        {daysOfWeek.map((day) => (
          <div className={styles.dayOfWeekCell} key={day}>
            {day}
          </div>
        ))}
      </div>
      {TIMELIST.map((time) => (
        <div className={styles.timeRow} key={time}>
          <hr />
          <span className={styles.time}>{time}</span>
        </div>
      ))}
      <div className={styles.temp}>테스트</div>
    </div>
  );
};

export default WeeklyTimeTable;
