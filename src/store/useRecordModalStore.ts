import create from 'zustand';
import { generateRecordingTitle } from '../utils/dateFormatters';

interface IRecordData {
  title: string;
  tag: string;
}

interface IRecordModalState {
  isModalOpen: boolean;
  recordData: IRecordData;
  openModal: () => void;
  closeModal: () => void;
  updateRecordData: (data: Partial<IRecordData>) => void;
  clearRecordData: () => void;
}

const initialRecordData = {
  title: generateRecordingTitle(),
  tag: '',
};

const useRecordModalStore = create<IRecordModalState>((set) => ({
  isModalOpen: false,
  recordData: initialRecordData,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  updateRecordData: (data) =>
    set((state) => ({
      ...state,
      recordData: { ...state.recordData, ...data },
    })),
  clearRecordData: () =>
    set((state) => ({
      ...state,
      recordData: initialRecordData,
    })),
}));

export { useRecordModalStore };