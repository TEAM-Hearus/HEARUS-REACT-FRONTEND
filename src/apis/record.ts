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
  scheduleElementId: number | null;
  lectureDate: string;
  problems: string[];
}

export const addLecture = async (body: IAddLectureBody) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/lecture/addLecture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data: IAddLectureResponse = await res.json();
  return data;
};

interface IRestructurdResponse extends IApiResponse<any> {}

export const restructureScript = async (lectureId: string) => {
  const token = getToken();
  const res = await fetch(
    `${API_URL}/api/v1/lecture/restructureScript?lectureId=${lectureId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data: IRestructurdResponse = await res.json();
  return data;
};
