import { DayOfWeek, LectureInfo } from '../constants/schedule';

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
  } as React.CSSProperties;
};

export const getIsTimeValid = (
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
): boolean => {
  if (
    startHour < 9 ||
    startHour > 21 ||
    startMinute < 0 ||
    startMinute > 59 ||
    endHour < 9 ||
    endHour > 21 ||
    endMinute < 0 ||
    endMinute > 59
  ) {
    return false;
  }

  const startTime = startHour * 60 + startMinute;
  const endTime = endHour * 60 + endMinute;
  if (startTime < endTime) {
    return true;
  }

  return startTime < endTime;
};

export const getIsAddScheduleFormValid = ({
  title,
  lectureColor,
  location,
  day,
  startHour,
  startMinute,
  endHour,
  endMinute,
}: LectureInfo) => {
  const isValid =
    title.trim() !== '' &&
    lectureColor.trim() !== '' &&
    location.trim() !== '' &&
    day.trim() !== '' &&
    getIsTimeValid(
      Number(startHour),
      Number(startMinute),
      Number(endHour),
      Number(endMinute),
    );
  return isValid;
};
