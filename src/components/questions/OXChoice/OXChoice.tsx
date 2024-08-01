import { useState } from 'react';
import styles from './OXChoice.module.scss';
import { IQuestionProps } from '../../../constants/question';

const OXChoice = ({
  answer,
  userAnswer,
  onAnswerChange,
  showResult,
}: IQuestionProps) => {
  const handleItemClick = (index: number) => {
    onAnswerChange(index);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.option} ${userAnswer === 0 ? styles.selected : styles.unselected}`}
        onClick={() => handleItemClick(0)}
      >
        O
      </button>
      <button
        className={`${styles.option} ${userAnswer === 1 ? styles.selected : styles.unselected}`}
        onClick={() => handleItemClick(1)}
      >
        X
      </button>
    </div>
  );
};

export default OXChoice;
