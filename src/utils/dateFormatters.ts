export const formatTimer = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((v) => (v < 10 ? '0' + v : v)).join(':');
};

export const formatScriptDate = (date: string): string => {
  return date.slice(0, 10).replace(/-/g, '.');
};

export const generateRecordingTitle = () => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return `새로운 녹음-${year}${month}${day}`;
};
