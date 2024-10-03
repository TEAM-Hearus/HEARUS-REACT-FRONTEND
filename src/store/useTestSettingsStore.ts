import { create } from 'zustand';
import { EnQuestionType } from '../utils/test';

interface TestSettingsStore {
  lectureId: string;
  scheduleElementId: number;
  testName: string;
  questionTypes: EnQuestionType[];
  questionCount: number;
  timeLimit: number | null;
  setLectureId: (id: string) => void;
  setScheduleElementId: (id: number) => void;
  setTestName: (name: string) => void;
  pushQuestionType: (type: EnQuestionType) => void;
  popQuestionType: (type: EnQuestionType) => void;
  setQuestionCount: (count: number) => void;
  setTimeLimit: (limit: number | null) => void;
  clearSettings: () => void;
}

interface IInitialState {
  lectureId: string;
  scheduleElementId: number;
  testName: string;
  questionTypes: EnQuestionType[];
  questionCount: number;
  timeLimit: number | null;
}

const initialState: IInitialState = {
  lectureId: '',
  scheduleElementId: 0,
  testName: '',
  questionTypes: ['MultipleChoice'],
  questionCount: 0,
  timeLimit: null,
};

const useTestSettingsStore = create<TestSettingsStore>()((set) => ({
  ...initialState,

  setLectureId: (id) => set({ lectureId: id }),
  setScheduleElementId: (id) => set({ scheduleElementId: id }),
  setTestName: (name) => set({ testName: name }),
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

  clearSettings: () => set(initialState),
}));

export default useTestSettingsStore;
