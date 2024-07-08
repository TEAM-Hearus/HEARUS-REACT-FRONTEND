export type DayOfWeek = 'SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export interface IScheduleElement {
  id: number;
  scheduleId: number;
  name: string;
  location: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
}

export const scheduleElements: IScheduleElement[] = [
  {
    id: 1,
    scheduleId: 7,
    name: '경제학원론',
    location: '경영관',
    dayOfWeek: 'MON',
    startTime: '2023-06-12T10:00:00.000+00:00',
    endTime: '2023-06-12T12:00:00.000+00:00',
  },
  {
    id: 2,
    scheduleId: 7,
    name: '경제학원론',
    location: '경영관',
    dayOfWeek: 'WED',
    startTime: '2023-06-12T10:00:00.000+00:00',
    endTime: '2023-06-12T12:00:00.000+00:00',
  },
  {
    id: 5,
    scheduleId: 7,
    name: '미시경제학',
    location: '경영관 301호',
    dayOfWeek: 'TUE',
    startTime: '2023-06-13T09:00:00.000+00:00',
    endTime: '2023-06-13T10:30:00.000+00:00',
  },
  {
    id: 6,
    scheduleId: 7,
    name: '거시경제학',
    location: '사회과학관 201호',
    dayOfWeek: 'WED',
    startTime: '2023-06-14T13:00:00.000+00:00',
    endTime: '2023-06-14T14:30:00.000+00:00',
  },
  {
    id: 7,
    scheduleId: 7,
    name: '경제통계학',
    location: '경상관 402호',
    dayOfWeek: 'THU',
    startTime: '2023-06-15T15:00:00.000+00:00',
    endTime: '2023-06-15T16:30:00.000+00:00',
  },
  {
    id: 8,
    scheduleId: 7,
    name: '경제수학',
    location: '수학관 101호',
    dayOfWeek: 'WED',
    startTime: '2023-06-12T13:00:00.000+00:00',
    endTime: '2023-06-12T14:30:00.000+00:00',
  },
  {
    id: 9,
    scheduleId: 7,
    name: '경제학세미나',
    location: '경영관 세미나실',
    dayOfWeek: 'FRI',
    startTime: '2023-06-16T13:00:00.000+00:00',
    endTime: '2023-06-16T16:00:00.000+00:00',
  },
];

export const TIMELIST = Array.from(Array(13), (_, i) => i + 9);
