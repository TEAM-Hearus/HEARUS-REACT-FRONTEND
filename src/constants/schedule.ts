export type DayOfWeek = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export interface IScheduleElement {
  id: number;
  scheduleId: number;
  name: string;
  location: string;
  dayOfWeek: DayOfWeek;
  color: ColorKey;
  startTime: string;
  endTime: string;
}

export interface IAddScheduleElement {
  name: string;
  location: string;
  dayOfWeek: DayOfWeek;
  color: ColorKey;
  startTime: string;
  endTime: string;
}

export interface IScheduleElementDTO {
  name: string;
  location: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  color: ColorKey;
}

export const TIMELIST = Array.from(Array(13), (_, i) => i + 9);

export const COLORS = {
  '#FFD6D6': '#733232', // Pink
  '#FFF3D6': '#733232', // Orange
  '#FEFFD6': '#733232', // Yellow
  '#D6FFDA': '#327354', // Green
  '#D6DFFF': '#323973', // Blue
  '#D6F8FF': '#326073', // BlueGreen
  '#EAD6FF': '#6E3273', //Purple
} as const;

export type ColorKey = keyof typeof COLORS;

export interface LectureInfo {
  title: string;
  lectureColor: ColorKey;
  location: string;
  day: string;
  startHour: string;
  startMinute: string;
  endHour: string;
  endMinute: string;
}

export const initialLectureInfo: LectureInfo = {
  title: '',
  lectureColor: '#FFD6D6',
  location: '',
  day: '',
  startHour: '00',
  startMinute: '00',
  endHour: '00',
  endMinute: '00',
};

export const daysKorEnMap = {
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
  토: 'SAT',
  일: 'SUN',
} as const;

export const daysEnNumMap: Record<DayOfWeek, number> = {
  SUN: 0,
  MON: 1,
  TUE: 2,
  WED: 3,
  THU: 4,
  FRI: 5,
  SAT: 6,
};
