import { create } from 'zustand';
import { IUserName } from '../apis/user';

interface IUserStoreState {
  userName: IUserName;
  setUserName: (userName: IUserName) => void;
}

const initialUserName = {
  userName: '',
};

export const useNameStore = create<IUserStoreState>((set) => ({
  userName: initialUserName,
  setUserName: (newUserName: IUserName) => set({ userName: newUserName }),
}));
