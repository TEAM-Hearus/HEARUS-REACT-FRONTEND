import { API_URL, getToken, IApiResponse } from '.';

interface IGetUserInfoResponse extends IApiResponse<IUserInfo> {}

export interface IUserInfo {
  userId: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  userIsOAuth: boolean;
  userOAuthType: string;
  userSchool: string;
  userMajor: string;
  userGrade: string;
  userSavedLectures: any; // 임시 타입
  userSchedule: any; // 임시 타입
  userUsePurpose: any; // 임시 타입
}

export const getUserInfo = async () => {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/api/v1/user/present-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: IGetUserInfoResponse = await res.json();
    return data.object;
  } catch (error) {
    throw error;
  }
};
