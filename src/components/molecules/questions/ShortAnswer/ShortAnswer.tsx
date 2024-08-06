import styles from './ShortAnswer.module.scss';
import { IQuestionProps } from '../../../../constants/question';

const ShortAnswer = ({
  answer,
  userAnswer,
  onAnswerChange,
  showResult,
}: IQuestionProps) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!showResult) onAnswerChange(e.target.value);
  };

  const displayValue =
    showResult && userAnswer !== answer ? answer : userAnswer;

  return (
    <input
      className={`${styles.input}
        ${showResult && userAnswer !== answer ? styles.wrong : ''}
        ${showResult && userAnswer === answer ? styles.correct : ''}`}
      type="text"
      value={displayValue}
      onChange={handleValueChange}
      placeholder="답변을 입력하세요"
      disabled={showResult}
    />
  );
};

export default ShortAnswer;
