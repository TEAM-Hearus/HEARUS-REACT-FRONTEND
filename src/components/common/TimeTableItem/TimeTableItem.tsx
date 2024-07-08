import { IScheduleElement } from '../../../constants/schedule';
import { getScheduleStyle } from '../../../utils/schedule';
import styles from './TimeTableItem.module.scss';

const TimeTableItem = ({
  //id,
  //scheduleId,
  name,
  location,
  dayOfWeek,
  startTime,
  endTime,
}: IScheduleElement) => {
  return (
    <div
      className={styles.scheduleItem}
      style={getScheduleStyle(dayOfWeek, startTime, endTime)}
    >
      <span className={styles.title}>
        <h6 className={styles.name}>{name}</h6>
        <p className={styles.location}>{location}</p>
      </span>
      <p
        className={styles.time}
      >{`${startTime.slice(11, 16)}~${endTime.slice(11, 16)}`}</p>
    </div>
  );
};

export default TimeTableItem;
