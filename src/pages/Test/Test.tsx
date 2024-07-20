import TestHeader from '../../components/headers/TestHeader/TestHeader';
import styles from './Test.module.scss';

const Test = () => {
  return (
    <div className={styles.container}>
      <TestHeader />
      <article className={styles.problemsContainer}></article>
    </div>
  );
};

export default Test;
