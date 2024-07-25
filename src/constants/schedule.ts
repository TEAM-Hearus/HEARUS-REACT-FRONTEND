export type DayOfWeek = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export interface IScheduleElement {
  id: number;
  scheduleId: number;
  name: string;
  location: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  color: string;
}

export const TIMELIST = Array.from(Array(13), (_, i) => i + 9);
