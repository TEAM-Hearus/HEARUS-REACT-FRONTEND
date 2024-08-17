import { API_URL, IApiResponse, getToken } from '.';
import { IScheduleElement } from '../constants/schedule';
import { IScheduleElementDTO } from '../constants/schedule';

interface IGetScheduleResponse extends IApiResponse<IGetScheduleObject> {}

interface IGetScheduleObject {
  id: number;
  scheduleElements: IScheduleElement[];
  name: string;
  userId: string | null;
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
    if (data.msg === 'Schedule not found with name') {
      await createNewScheduleName(name);
      return getSchedule(name);
    }
    return data.object['scheduleElements'];
  } catch (error) {
    throw error;
  }
};

interface IGetLectureByScheduleElementResponse
  extends IApiResponse<ILectureItem[]> {}

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

interface IPOSTScheduleElementResponse extends IApiResponse<null> {}

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
    throw error;
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
    throw error;
  }
};

const createNewScheduleName = async (name: string) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/api/v1/schedule/addSchedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.msg);
    }
  } catch (error) {
    throw error;
  }
};
