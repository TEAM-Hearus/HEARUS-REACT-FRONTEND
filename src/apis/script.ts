import { API_URL, getToken } from '.';

interface IGetAllScriptResponse {
  status: string;
  msg: string;
  object: IScriptInList[];
  success: boolean;
}

interface IGetScriptDetailResponse {
  status: string;
  msg: string;
  object: IScriptDetail;
  success: boolean;
}

export interface IScriptInList {
  id: string;
  name: string;
  processedScript: string[];
  scheduleElementId: number;
  lectureDate: string;
  createdAt: string;
  problems: null;
}

interface IScriptDetail {
  name: string;
  scheduleElementId: string;
  processedScript: string[];
}

export const getAllScripts = async (): Promise<IScriptInList[]> => {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/api/v1/lecture/getAllLecture`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: IGetAllScriptResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};

export const getScriptDetail = async (id: string) => {
  const token = getToken();
  try {
    const res = await fetch(
      `${API_URL}/api/v1/lecture/getLecture?lectureId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data: IGetScriptDetailResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};
