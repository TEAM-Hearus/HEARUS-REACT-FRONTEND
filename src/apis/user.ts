import { API_URL, getToken, IApiResponse } from '.';

export interface IGetUserInfoResponse extends IApiResponse<IUserInfo> {}
interface IUpdateUserInfoResponse extends IApiResponse<IUserUpdateInfo> {}
interface ISupplementaryUpdateInfoResponse
  extends IApiResponse<IUserSupplementaryUpdateInfo> {}

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

export interface IUserName {
  userName: string;
}

export interface IUserUpdateInfo {
  userName: string;
  userPassword?: string;
  userSchool: string;
  userMajor: string;
  userGrade: string;
}

export interface IUserSupplementaryUpdateInfo {
  userSchool: string;
  userMajor: string;
  userGrade: string;
}

export const getUserInfo = async () => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/user/present-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data: IGetUserInfoResponse = await res.json();
  return data;
};

export const updateInfo = async ({
  userName,
  userPassword,
  userSchool,
  userMajor,
  userGrade,
}: IUserUpdateInfo) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/user/updateUser`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userName,
      userPassword,
      userSchool,
      userMajor,
      userGrade,
    }),
  });
  const data: IUpdateUserInfoResponse = await res.json();
  return data;
};

export const updateSupplementaryInfo = async ({
  userSchool,
  userMajor,
  userGrade,
}: IUserSupplementaryUpdateInfo) => {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/v1/user/updateUser`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userSchool,
      userMajor,
      userGrade,
    }),
  });
  const data: ISupplementaryUpdateInfoResponse = await res.json();
  return data;
};
