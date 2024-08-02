import { COLORS, ColorKey } from '../constants/schedule';

interface ScheduleItemColor {
  backgroundColor: string;
  textColor: string;
}

export const getScheduleItemColor = (color: ColorKey): ScheduleItemColor => {
  return {
    backgroundColor: color,
    textColor: COLORS[color],
  };
};
