export type DayOfWeek = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

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
