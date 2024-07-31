import TestHeader from '../../components/headers/TestHeader/TestHeader';
import { QUESTION_LIST } from '../../constants/question';
import styles from './Test.module.scss';

const Test = () => {
  return (
    <div className={styles.container}>
      <TestHeader />
      <article className={styles.problemsContainer}>
        {QUESTION_LIST.map((question, index) => (
          <section key={question.direction} className={styles.questionBox}>
            <p className={styles.qestionNumber}>Q{index + 1}</p>
            <p className={styles.questionTitle}>{question.direction}</p>
          </section>
        ))}
      </article>
    </div>
  );
};

export default Test;
