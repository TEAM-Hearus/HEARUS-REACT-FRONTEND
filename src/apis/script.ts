import { API_URL } from '.';

const token = //임시 token
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwMTZiZDAyOC03OGMxLTRjZTUtYjlhNC1hZDc0Y2ZlYzNkZTIiLCJyb2xlIjoiVVNFUiIsImV4cCI6MTcyMjA3NzAzNX0.dN5G2bMI0jah-peCWY_xn1c-iHRxTW7EjttbKKm86ak';

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

export const getScripts = async (): Promise<IScriptInList[]> => {
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
