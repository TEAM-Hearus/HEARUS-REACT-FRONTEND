import { create } from 'zustand';
import { IUserInfo } from '../apis/user';

interface IUserStoreState {
  userInfo: IUserInfo;
  setUserInfo: (userInfo: IUserInfo) => void;
}

const initialUserInfo = {
  userId: '',
  userName: '',
  userEmail: '',
  userPassword: '',
  userRole: '',
  userIsOAuth: false,
  userOAuthType: '',
  userSchool: '',
  userMajor: '',
  userGrade: '',
  userSavedLectures: [], // 임시
  userSchedule: [], // 임시
  userUsePurpose: null, // 임시
};

export const useUserInfoStore = create<IUserStoreState>((set) => ({
  userInfo: initialUserInfo,
  setUserInfo: (newUserInfo: IUserInfo) => set({ userInfo: newUserInfo }),
}));
