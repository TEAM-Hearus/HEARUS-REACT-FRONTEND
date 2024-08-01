import TestHeader from '../../components/headers/TestHeader/TestHeader';
import MultipleChoice from '../../components/questions/MultipleChoice/MultipleChoice';
import OXChoice from '../../components/questions/OXChoice/OXChoice';
import ShortAnswer from '../../components/questions/ShortAnswer/ShortAnswer';
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
            {question.type === 'MultipleChoice' && (
              <MultipleChoice
                options={question.options}
                answer={question.answer}
              />
            )}
            {question.type === 'ShortAnswer' && (
              <ShortAnswer answer={question.answer} />
            )}
            {question.type === 'OXChoice' && (
              <OXChoice answer={question.answer} />
            )}
          </section>
        ))}
      </article>
    </div>
  );
};

export default Test;
