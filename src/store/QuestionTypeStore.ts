import { create } from 'zustand';
import { EnQuestionType } from '../utils/test';

type QuestionTypeStore = {
  questionTypes: EnQuestionType[];
  pushQuestionType: (type: EnQuestionType) => void;
  popQuestionType: (type: EnQuestionType) => void;
  clearQuestionType: () => void;
};

const useQuestionTypeStore = create<QuestionTypeStore>()((set) => ({
  questionTypes: ['MultipleChoice'],

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

  clearQuestionType: () => set({ questionTypes: [] }),
}));

export default useQuestionTypeStore;
