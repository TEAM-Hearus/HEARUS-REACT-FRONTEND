import { API_URL, token } from '.';

interface IGetAllScriptResponse {
  status: string;
  msg: string;
  object: IScriptInList[];
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

export const getAllScripts = async (): Promise<IScriptInList[]> => {
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
