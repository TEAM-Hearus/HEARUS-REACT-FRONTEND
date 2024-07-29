// useModalStore.ts
import create from 'zustand';

interface ModalData {
  title: string;
  tag: string;
}

interface ModalState {
  isOpen: boolean;
  modalData: ModalData | null;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
  updateModalData: (data: Partial<ModalData>) => void;
  saveData: () => void; // 추가된 부분
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalData: null,
  openModal: (data) => set({ isOpen: true, modalData: data }),
  closeModal: () => set({ isOpen: false, modalData: null }),
  updateModalData: (data) =>
    set((state) => {
      if (state.modalData) {
        return { modalData: { ...state.modalData, ...data } };
      }
      return state;
    }),
  saveData: () => {
    set((state) => {
      if (state.modalData) {
        console.log('저장된 데이터:', state.modalData);
      }
      return state;
    });
  },
}));

export { useModalStore };
