export const API_URL: string = import.meta.env.VITE_API_URL;

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};
