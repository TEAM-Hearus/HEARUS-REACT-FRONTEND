export interface IQuestionProps {
  options: string[];
  answer: number | string;
  userAnswer: number | string;
  onAnswerChange: (answer: number | string) => void;
  showResult: boolean;
}
