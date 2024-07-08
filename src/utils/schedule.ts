import { DayOfWeek } from '../constants/schedule';

interface ISchedule {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

const DAYMAP: Record<DayOfWeek, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};

export const getScheduleStyle = ({
  dayOfWeek,
  startTime,
  endTime,
}: ISchedule) => {
  const startHour = Number(startTime.slice(11, 13));
  const startMinute = Number(startTime.slice(14, 16)) / 60;
  const endHour = Number(endTime.slice(11, 13));
  const endMinute = Number(endTime.slice(14, 16)) / 60;
  // return 값
  const top = (startHour + startMinute - 9) * 80 + 50;
  const height = (endHour + endMinute - startHour - startMinute) * 80;
  const left = `calc((100% - 30px) * ${DAYMAP[dayOfWeek]} / 7)`;
  return {
    '--schedule-left': left,
    '--schedule-top': `${top}px`,
    '--schedule-height': `${height}px`,
  } as React.CSSProperties;
};
