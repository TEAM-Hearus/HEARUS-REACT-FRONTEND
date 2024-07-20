import { COLORS, TEXT_COLORS } from '../constants/colors';

export const getRandomColor = () => {
  const colorKeys = Object.keys(COLORS);
  const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
  return {
    backgroundColor: COLORS[randomKey],
    textColor: TEXT_COLORS[randomKey],
  };
};
