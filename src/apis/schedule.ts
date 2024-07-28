import { API_URL } from '.';
import { IScheduleElement } from '../constants/schedule';
import { token } from './';

interface IGetScheduleResponse {
  status: string;
  msg: string;
  object: {
    id: number;
    scheduleElements: IScheduleElement[];
    name: string;
    userId: string | null;
  };
  success: boolean;
}

export const getSchedule = async (
  name: string,
): Promise<IScheduleElement[]> => {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/schedule/getSchedule?name=${name}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data: IGetScheduleResponse = await res.json();
    return data.object['scheduleElements'];
  } catch (error) {
    throw error;
  }
};
