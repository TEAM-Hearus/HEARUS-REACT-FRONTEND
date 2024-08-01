import { useState } from 'react';
import { IQuestion } from '../../../constants/question';
import styles from './MultipleChoice.module.scss';

const MultipleChoice = ({ options, answer }: IQuestion) => {
  const [userAnswer, setUserAnswer] = useState(0);
  const handleItemClick = (index: number) => {
    setUserAnswer(index);
  };
  return (
    <ul className={styles.optionsContainer}>
      {options.map((option, index) => (
        <li
          key={`${option}-${index + 1}`}
          className={`${styles.optionItem} ${userAnswer === index + 1 ? styles.selected : styles.unselected}`}
          onClick={() => handleItemClick(index + 1)}
        >
          {`${index + 1}. ${option}`}
        </li>
      ))}
    </ul>
  );
};

export default MultipleChoice;
