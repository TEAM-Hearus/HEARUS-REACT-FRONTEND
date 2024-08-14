import { API_URL } from '.';
import { IScheduleElement } from '../constants/schedule';
import { IScheduleElementDTO } from '../utils/schedule';
import { getToken } from './';

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
  const token = getToken();
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

interface IGetLectureByScheduleElementResponse {
  status: string;
  msg: string;
  object: ILectureItem[];
  success: boolean;
}

interface ILectureItem {
  id: string;
  name: string;
  processedScript: null;
  scheduleElementId: string;
  lectureDate: string;
  createdAt: string;
  problems: null;
}

export const getLectureByScheduleElement = async (id: number) => {
  const token = getToken();
  try {
    const res = await fetch(
      `${API_URL}/api/v1/lecture/getLectureByScheduleElement?scheduleElementId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data: IGetLectureByScheduleElementResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};

interface IPOSTScheduleElementResponse {
  status: string;
  msg: string;
  object: null;
  success: boolean;
}

export const addScheduleElement = async (
  inputData: IScheduleElementDTO,
  name: string,
) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/api/v1/schedule/addElement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        scheduleDTO: {
          name,
        },
        scheduleElementDTO: inputData,
      }),
    });
    const data: IPOSTScheduleElementResponse = await res.json();
    return data.success;
  } catch (error) {
    throw new Error('Failed to delete schedule element');
  }
};

export const deleteScheduleElement = async (
  scheduleElementId: number,
  name: string,
) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/api/v1/schedule/deleteElement`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        scheduleDTO: {
          name,
        },
        scheduleElementDTO: {
          id: scheduleElementId,
        },
      }),
    });
    const data: IPOSTScheduleElementResponse = await res.json();
    return data.success;
  } catch (error) {
    throw new Error('Failed to delete schedule element');
  }
};
