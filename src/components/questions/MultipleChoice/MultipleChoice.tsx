import { IQuestionProps } from '../../../constants/question';
import styles from './MultipleChoice.module.scss';

const MultipleChoice = ({
  options,
  answer,
  userAnswer,
  onAnswerChange,
  showResult,
}: IQuestionProps) => {
  const handleItemClick = (index: number) => {
    if (!showResult) onAnswerChange(index);
  };
  return (
    <ul className={styles.optionsContainer}>
      {options.map((option, index) => (
        <li
          key={`${option}-${index + 1}`}
          className={`${styles.optionItem} 
            ${userAnswer === index + 1 ? styles.selected : styles.unselected}
            ${showResult && userAnswer !== answer && answer === index + 1 ? styles.wrong : ''}
            ${showResult && userAnswer !== answer && userAnswer === index + 1 ? styles.selected : ''}
            ${showResult && userAnswer === answer && index + 1 === answer ? styles.correct : ''}`}
          onClick={() => handleItemClick(index + 1)}
        >
          {`${index + 1}. ${option}`}
        </li>
      ))}
    </ul>
  );
};

export default MultipleChoice;
