import mockAPI_URL from '.';
import { IScheduleElement } from '../constants/schedule';

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
    const res = await fetch(`${mockAPI_URL}/schedule/getSchedule?name=${name}`);
    const data: IGetScheduleResponse = await res.json();
    return data.object['scheduleElements'];
  } catch (error) {
    throw error;
  }
};
