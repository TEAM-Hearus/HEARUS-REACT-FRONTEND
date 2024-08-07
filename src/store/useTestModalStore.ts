import create from 'zustand';

interface ITestData {
  time: number;
  completeNum: number;
  totalNum: number;
}

interface ITestModalState {
  isModalOpen: boolean;
  testData: ITestData;
  openModal: () => void;
  closeModal: () => void;
  updateTestData: (data: Partial<ITestData>) => void;
  clearTestData: () => void;
}

const initialTestData = {
  time: 0,
  completeNum: 0,
  totalNum: 0,
};

const useTestModalStore = create<ITestModalState>((set) => ({
  isModalOpen: false,
  testData: initialTestData,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  updateTestData: (data) =>
    set((state) => ({
      ...state,
      testData: { ...state.testData, ...data },
    })),
  clearTestData: () =>
    set((state) => ({
      ...state,
      testData: initialTestData,
    })),
}));

export default useTestModalStore;
