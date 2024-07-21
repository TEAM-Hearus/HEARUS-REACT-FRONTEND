export const formatRecordTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((v) => (v < 10 ? '0' + v : v)).join(':');
};

export const formatScriptDate = (date: string): string => {
  return date.slice(0, 10).replace(/-/g, '.');
};
