import { useState } from 'react';
import { IQuestion } from '../../../constants/question';
import styles from './ShortAnswer.module.scss';

const ShortAnswer = ({ answer }: IQuestion) => {
  const [userAnswer, setUserAnswer] = useState('');
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
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
