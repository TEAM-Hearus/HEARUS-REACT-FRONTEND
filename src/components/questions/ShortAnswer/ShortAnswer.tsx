import { useState } from 'react';
import styles from './ShortAnswer.module.scss';
import { IQuestionProps } from '../../../constants/question';

const ShortAnswer = ({
  answer,
  userAnswer,
  onAnswerChange,
  showResult,
}: IQuestionProps) => {
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(e.target.value);
  };
  return (
    <input
      className={styles.input}
      type="text"
      value={userAnswer}
      onChange={handleValueChange}
      placeholder="답변을 입력하세요"
    />
  );
};

export default ShortAnswer;
