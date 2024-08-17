import {
  daysEnNumMap,
  DayOfWeek,
  daysKorEnMap,
  LectureInfo,
  IScheduleElement,
  IAddScheduleElement,
} from '../constants/schedule';

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
  const left = `calc((100% - 120px) * ${daysEnNumMap[dayOfWeek]} / 7)`;

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
  return daysKorEnMap[day as keyof typeof daysKorEnMap] || day;
};

// 시간 ISO 변환
const getFormattedTime = (hour: string, minute: string) => {
  const date = new Date();
  date.setHours(parseInt(hour), parseInt(minute), 0, 0);
  const dateString = date.toISOString().split('T')[0];
  const timeString = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
  return `${dateString}T${timeString}`;
};

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

export const hasNewElementConflict = (
  newElement: IAddScheduleElement,
  existingElements: IScheduleElement[],
): boolean => {
  for (const existingElement of existingElements) {
    if (newElement.dayOfWeek === existingElement.dayOfWeek) {
      const startNew = new Date(
        `1970-01-01T${newElement.startTime.slice(11)}`,
      ).getTime();
      const endNew = new Date(
        `1970-01-01T${newElement.endTime.slice(11)}`,
      ).getTime();
      const startExisting = new Date(
        `1970-01-01T${existingElement.startTime.slice(11)}`,
      ).getTime();
      const endExisting = new Date(
        `1970-01-01T${existingElement.endTime.slice(11)}`,
      ).getTime();

      if (
        (startNew < endExisting && startExisting < endNew) ||
        (startExisting < endNew && startNew < endExisting)
      ) {
        return true;
      }
    }
  }
  return false;
};
