export type EnQuestionType = 'MultipleChoice' | 'OXChoice';

export const translateTypeToEnglish = (type: string): EnQuestionType => {
  if (type === '객관식') return 'MultipleChoice';
  if (type === 'OX 퀴즈') return 'OXChoice';
  return 'MultipleChoice';
};
