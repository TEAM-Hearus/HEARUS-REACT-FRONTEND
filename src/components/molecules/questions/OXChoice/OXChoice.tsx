import styles from './OXChoice.module.scss';
import { IQuestionProps } from '../../../../constants/question';

const OXChoice = ({
  answer,
  userAnswer,
  onAnswerChange,
  showResult,
}: IQuestionProps) => {
  const handleItemClick = (index: number) => {
    if (!showResult) onAnswerChange(index);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.option} 
            ${userAnswer === 0 ? styles.selected : styles.unselected}
            ${showResult && userAnswer !== answer && answer === 0 ? styles.wrong : ''}
            ${showResult && userAnswer !== answer && userAnswer === 0 ? styles.selected : ''}
            ${showResult && userAnswer === answer && answer === 0 ? styles.correct : ''}`}
        onClick={() => handleItemClick(0)}
      >
        O
      </button>
      <button
        className={`${styles.option} 
            ${userAnswer === 1 ? styles.selected : styles.unselected}
            ${showResult && userAnswer !== answer && answer === 1 ? styles.wrong : ''}
            ${showResult && userAnswer !== answer && userAnswer === 1 ? styles.selected : ''}
            ${showResult && userAnswer === answer && answer === 1 ? styles.correct : ''}`}
        onClick={() => handleItemClick(1)}
      >
        X
      </button>
    </div>
  );
};

export default OXChoice;
