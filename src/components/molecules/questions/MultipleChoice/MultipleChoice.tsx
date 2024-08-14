import { IQuestionProps } from '../../../../constants/question';
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
          key={`${option}-${index}`}
          className={`${styles.optionItem} 
            ${userAnswer === index ? styles.selected : styles.unselected}
            ${showResult && userAnswer !== answer && answer === index ? styles.wrong : ''}
            ${showResult && userAnswer !== answer && userAnswer === index ? styles.selected : ''}
            ${showResult && userAnswer === answer && index === answer ? styles.correct : ''}`}
          onClick={() => handleItemClick(index)}
        >
          {`${index + 1}. ${option}`}
        </li>
      ))}
    </ul>
  );
};

export default MultipleChoice;
