import {
  ColorKey,
  DayOfWeek,
  daysObject,
  LectureInfo,
} from '../constants/schedule';

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

// 요일 한글 -> 대문자 영어 변환
const getDayOfWeek = (day: string) => {
  return daysObject[day as keyof typeof daysObject] || day;
};

// 시간 ISO 변환
const getFormattedTime = (hour: string, minute: string) => {
  const date = new Date();
  date.setHours(parseInt(hour), parseInt(minute), 0, 0);
  const dateString = date.toISOString().split('T')[0];
  const timeString = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
  return `${dateString}T${timeString}`;
};

export interface IScheduleElementDTO {
  name: string;
  location: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  color: ColorKey;
}

export const transformToScheduleElementDTO = (lectureData: LectureInfo) => {
  const transformedData = {
    name: lectureData.title,
    location: lectureData.location,
    dayOfWeek: getDayOfWeek(lectureData.day),
    startTime: getFormattedTime(lectureData.startHour, lectureData.startMinute),
    endTime: getFormattedTime(lectureData.endHour, lectureData.endMinute),
    color: lectureData.lectureColor,
  };
  return transformedData;
};
