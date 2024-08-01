import { useState } from 'react';
import styles from './OXChoice.module.scss';

interface IProps {
  answer: string | number;
}

const OXChoice = ({ answer }: IProps) => {
  const [userAnswer, setUserAnswer] = useState(2);

  const handleItemClick = (index: number) => {
    setUserAnswer(index);
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
