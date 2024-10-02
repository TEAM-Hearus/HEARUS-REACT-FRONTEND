import { API_URL, getToken, IApiResponse } from '.';

interface IGetAllScriptResponse extends IApiResponse<IScriptInList[]> {}

interface IGetScriptDetailResponse extends IApiResponse<IScriptDetail> {}

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

export const getAllScripts = async (): Promise<IGetAllScriptResponse> => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/lecture/getAllLecture`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: IGetAllScriptResponse = await res.json();
  return data;
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
