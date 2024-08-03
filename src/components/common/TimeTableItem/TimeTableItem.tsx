import { IScheduleElement } from '../../../constants/schedule';
import { getScheduleStyle } from '../../../utils/schedule';
import styles from './TimeTableItem.module.scss';
import { getScheduleItemColor } from '../../../utils/randomColor';
import { useState } from 'react';
import ScriptToolTip from '../ScriptToolTip/ScriptToolTip';

const TimeTableItem = ({
  id,
  //scheduleId,
  name,
  location,
  dayOfWeek,
  color,
  startTime,
  endTime,
}: IScheduleElement) => {
  const { height, top, left, ...style } = getScheduleStyle(
    dayOfWeek,
    startTime,
    endTime,
  );
  const { backgroundColor, textColor } = getScheduleItemColor(color);
  const [showToolTip, setShowToolTip] = useState(false);

  return (
    <>
      <div
        className={styles.scheduleItem}
        style={{ ...style, backgroundColor, color: textColor }}
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
      >
        <span className={styles.title}>
          {Number(height) < 33 ? (
            ''
          ) : 33 < Number(height) && 53 > Number(height) ? (
            <h6 className={styles.name}>{name}</h6>
          ) : (
            <>
              <h6 className={styles.name}>{name}</h6>
              <p className={styles.location}>{location}</p>
            </>
          )}
        </span>
        {Number(height) < 73 ? (
          ''
        ) : (
          <p
            className={styles.time}
          >{`${startTime.slice(11, 16)}~${endTime.slice(11, 16)}`}</p>
        )}
      </div>
      {showToolTip && (
        <span
          className={styles.tooptipWrapper}
          style={{ top: `${top}px`, left }}
          onMouseEnter={() => setShowToolTip(true)}
          onMouseLeave={() => setShowToolTip(false)}
        >
          <ScriptToolTip id={id} />
        </span>
      )}
    </>
  );
};

export default TimeTableItem;
