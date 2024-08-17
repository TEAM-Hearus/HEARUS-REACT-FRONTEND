import { API_URL, getToken, IApiResponse } from '.';

interface IGenerateProblemResponse extends IApiResponse<IQuestion[]> {}

export interface IQuestion {
  type: string;
  direction: string;
  options: string[];
  answer: string | number;
}

export interface IProblemInput {
  lectureId: string;
  subject: number;
  problem_num: number;
  problem_types: string;
}

export const generateProblem = async (inputData: IProblemInput) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/api/v1/lecture/generateProblems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(inputData),
    });
    const data: IGenerateProblemResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};
