import { IScheduleElement } from '../../../constants/schedule';
import { getScheduleStyle } from '../../../utils/schedule';
import styles from './TimeTableItem.module.scss';
import { getRandomColor } from '../../../utils/randomColor';

const TimeTableItem = ({
  //id,
  //scheduleId,
  name,
  location,
  dayOfWeek,
  startTime,
  endTime,
}: IScheduleElement) => {
  const { height, ...style } = getScheduleStyle(dayOfWeek, startTime, endTime);
  const { backgroundColor, textColor } = getRandomColor();

  return (
    <div
      className={styles.scheduleItem}
      style={{ ...style, backgroundColor, color: textColor }}
    >
      <span className={styles.title}>
        {Number(height) < 53 ? (
          ''
        ) : 53 < Number(height) && 120 > Number(height) ? (
          <h6 className={styles.name}>{name}</h6>
        ) : (
          <>
            <h6 className={styles.name}>{name}</h6>
            <p className={styles.location}>{location}</p>
          </>
        )}
      </span>
      <p
        className={styles.time}
      >{`${startTime.slice(11, 16)}~${endTime.slice(11, 16)}`}</p>
    </div>
  );
};

export default TimeTableItem;
