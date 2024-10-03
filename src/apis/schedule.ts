import { API_URL, IApiResponse, getToken } from '.';
import { IScheduleElement } from '../constants/schedule';
import { IScheduleElementDTO } from '../constants/schedule';

export interface IGetScheduleResponse
  extends IApiResponse<IGetScheduleObject> {}

interface IGetScheduleObject {
  id: number;
  scheduleElements: IScheduleElement[];
  name: string;
  userId: string | null;
}

export const getSchedule = async (
  name: string,
  retryCount: number = 0, // 무한 루프 방지
): Promise<IGetScheduleResponse> => {
  const MAX_RETRIES = 1;
  const token = getToken();
  const res = await fetch(
    `${API_URL}/api/v1/schedule/getSchedule?name=${name}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data: IGetScheduleResponse = await res.json();
  // userName으로 된 시간표가 없을 경우 만들고 재귀 호출
  if (data.msg === 'Schedule not found with name') {
    if (retryCount >= MAX_RETRIES) {
      throw new Error(
        'Maximum retry limit reached. Unable to create schedule.',
      );
    }
    await createNewScheduleName(name);
    return getSchedule(name, retryCount + 1);
  }
  return data;
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
  const res = await fetch(
    `${API_URL}/api/v1/lecture/getLectureByScheduleElement?scheduleElementId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data: IGetLectureByScheduleElementResponse = await res.json();
  return data;
};

interface IPOSTScheduleElementResponse extends IApiResponse<null> {}

export const addScheduleElement = async (
  inputData: IScheduleElementDTO,
  name: string,
) => {
  const token = getToken();
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
  return data;
};

export const deleteScheduleElement = async (
  scheduleElementId: number,
  name: string,
) => {
  const token = getToken();
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
  return data;
};

/** 현재는 시간표 조회할때 userName으로 된 시간표 없을 때만 쓰임. */
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
