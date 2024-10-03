import { API_URL, getToken, IApiResponse } from '.';

interface IAddLectureObject {
  id: string;
  name: string;
  processedScript: string[];
  scheduleElementId: number;
  lectureDate: string;
  createdAt: string;
  problems: [];
}

interface IAddLectureResponse extends IApiResponse<IAddLectureObject> {}

interface IAddLectureBody {
  name: string;
  processedScript: string[];
  scheduleElementId: number;
  lectureDate: string;
  problems: [];
}

export const addLecture = async (body: IAddLectureBody) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/lecture/addLecture`, {
    headers: {
      method: 'POST',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data: IAddLectureResponse = await res.json();
  return data;
};
