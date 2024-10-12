import { useQuery } from '@tanstack/react-query';
import TimeTableItem from '../../../../components/molecules/TimeTableItem/TimeTableItem';
import { daysOfWeek, TIMELIST } from '../../../../constants/schedule';
import { getSchedule } from '../../../../apis/schedule';
import { useUserInfoStore } from '../../../../store/useUserInfoStore';
import { useUnauthorizedRedirect } from '../../../../hooks/useUnauthorizedRedirect';
import useServerErrorToast from '../../../../hooks/useServerErrorToast';
import styles from './WeeklyTimeTable.module.scss';

const WeeklyTimeTable = () => {
  const { userInfo } = useUserInfoStore();

  const { data, isError } = useQuery({
    queryKey: ['schedule', userInfo.userName],
    queryFn: () => getSchedule(userInfo.userName),
  });

  useUnauthorizedRedirect(data);
  useServerErrorToast(isError);

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
            <p className={styles.time}>{time}</p>
            {index !== TIMELIST.length - 1 &&
              daysOfWeek.map((day) => (
                <div
                  className={`${styles.daytime} ${index === TIMELIST.length - 2 && styles.lastRow}`}
                  key={day}
                />
              ))}
          </div>
        ))}
      </div>
      <div className={styles.tableContainer}>
        {data?.object?.scheduleElements?.map((schedule) => (
          <TimeTableItem key={schedule.id} {...schedule} />
        ))}
      </div>
    </div>
  );
};

export default WeeklyTimeTable;
