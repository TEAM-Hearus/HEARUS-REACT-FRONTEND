import { create } from 'zustand';
import { EnQuestionType } from '../utils/test';

type TestSettingsStore = {
  lectureId: string;
  questionTypes: EnQuestionType[];
  questionCount: number;
  timeLimit: number | null;
  setLectureId: (id: string) => void;
  pushQuestionType: (type: EnQuestionType) => void;
  popQuestionType: (type: EnQuestionType) => void;
  setQuestionCount: (count: number) => void;
  setTimeLimit: (limit: number | null) => void;
  clearSettings: () => void;
};

const useTestSettingsStore = create<TestSettingsStore>()((set) => ({
  lectureId: '',
  questionTypes: ['MultipleChoice'],
  questionCount: 0,
  timeLimit: null,

  setLectureId: (id) => set({ lectureId: id }),
  pushQuestionType: (type) =>
    set((state) => ({
      questionTypes: state.questionTypes.includes(type)
        ? state.questionTypes
        : [...state.questionTypes, type],
    })),

  popQuestionType: (type: EnQuestionType) =>
    set((state) => ({
      questionTypes: state.questionTypes.filter((t) => t !== type),
    })),

  setQuestionCount: (count: number) => set({ questionCount: count }),

  setTimeLimit: (limit: number | null) => set({ timeLimit: limit }),

  clearSettings: () =>
    set({ questionTypes: [], questionCount: 0, timeLimit: null }),
}));

export default useTestSettingsStore;
