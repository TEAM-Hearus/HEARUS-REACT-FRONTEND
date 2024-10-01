import { useState } from 'react';
import ScriptToolTip from '../ScriptToolTip/ScriptToolTip';
import { IScheduleElement } from '../../../constants/schedule';
import { getScheduleStyle } from '../../../utils/schedule';
import { getScheduleItemColor } from '../../../utils/randomColor';
import styles from './TimeTableItem.module.scss';

const TimeTableItem = ({
  id,
  name,
  location,
  dayOfWeek,
  color,
  startTime,
  endTime,
}: IScheduleElement) => {
  const { height, ...style } = getScheduleStyle(dayOfWeek, startTime, endTime);
  const { backgroundColor, textColor } = getScheduleItemColor(color);
  const [isShowingToolTip, setIsShowingToolTip] = useState(false);

  const handleMouseEnter = () => {
    setIsShowingToolTip(true);
  };

  const handleMouseLeave = () => {
    setIsShowingToolTip(false);
  };

  return (
    <>
      <div
        className={styles.scheduleItem}
        style={{ ...style, backgroundColor, color: textColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
      {isShowingToolTip && (
        <span
          className={styles.tooltipWrapper}
          style={{ ...style }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ScriptToolTip id={id} scheduleName={name} />
        </span>
      )}
    </>
  );
};

export default TimeTableItem;
