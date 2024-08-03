import { DayOfWeek } from '../constants/schedule';

const DAYMAP: Record<DayOfWeek, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};

export const getScheduleStyle = (
  dayOfWeek: DayOfWeek,
  startTime: string,
  endTime: string,
) => {
  const startHour = Number(startTime.slice(11, 13));
  const startMinute = Number(startTime.slice(14, 16)) / 60;
  const endHour = Number(endTime.slice(11, 13));
  const endMinute = Number(endTime.slice(14, 16)) / 60;
  // return 값
  const top = (startHour + startMinute - 9) * 80 + 60;
  const height = (endHour + endMinute - startHour - startMinute) * 80;
  const left = `calc((100% - 120px) * ${DAYMAP[dayOfWeek]} / 7)`;

  return {
    '--schedule-left': left,
    '--schedule-top': `${top}px`,
    '--schedule-height': `${height + 1}px`,
    height,
    top,
    left,
  } as React.CSSProperties;
};
