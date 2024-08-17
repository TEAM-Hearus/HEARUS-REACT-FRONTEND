export const API_URL: string = import.meta.env.VITE_API_URL;

export const SOCKETURL = import.meta.env.VITE_SOCKETIO_HOST;

export const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

export interface IApiResponse<T> {
  status: string;
  msg: string;
  object: T;
  success: boolean;
}
