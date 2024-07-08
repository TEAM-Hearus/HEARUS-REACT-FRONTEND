import TimeTableItem from '../../../../components/common/TimeTableItem/TimeTableItem';
import { TIMELIST, scheduleElements } from '../../../../constants/schedule';
import { getScheduleStyle } from '../../../../utils/schedule';
import styles from './WeeklyTimeTable.module.scss';

const WeeklyTimeTable = () => {
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
      {scheduleElements.map((schedule) => (
        <div
          className={styles.temp}
          key={schedule.id}
          style={getScheduleStyle(schedule)}
        >
          {schedule.name}
        </div>
      ))}
    </div>
  );
};

export default WeeklyTimeTable;
