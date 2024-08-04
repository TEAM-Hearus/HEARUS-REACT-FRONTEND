import create from 'zustand';

interface IRecordData {
  title: string;
  tag: string;
}

interface IRecordModalState {
  isModalOpen: boolean;
  recordData: IRecordData;
  openModal: () => void;
  closeModal: () => void;
  updateModalData: (data: Partial<IRecordData>) => void;
}

const initialRecordData = {
  title: '',
  tag: '',
};

const useRecordModalStore = create<IRecordModalState>((set) => ({
  isModalOpen: false,
  recordData: initialRecordData,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  updateModalData: (data) =>
    set((state) => {
      if (state.recordData) {
        return { recordData: { ...state.recordData, ...data } };
      }
      return state;
    }),
}));

export { useRecordModalStore };
