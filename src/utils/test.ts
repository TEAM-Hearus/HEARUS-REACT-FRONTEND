export type EnQuestionType =
  | 'MultipleChoice'
  | 'ShrotAnswer'
  | 'BlanckQuestion'
  | 'OXChoice';

export const translateTypeToEnglish = (type: string): EnQuestionType => {
  if (type === '객관식') return 'MultipleChoice';
  if (type === '단답형') return 'ShrotAnswer';
  if (type === '빈칸 뚫기') return 'BlanckQuestion';
  if (type === 'OX 퀴즈') return 'OXChoice';
  return 'MultipleChoice';
};
