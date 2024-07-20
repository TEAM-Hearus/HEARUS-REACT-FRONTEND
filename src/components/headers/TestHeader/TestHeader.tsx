import { Link } from 'react-router-dom';
import styles from './TestHeader.module.scss';
import Back from '../../../assets/images/arrow/back.svg?react';

const TEST_TITLE = '테스트-경제학원론-240708'; //임시

const TestHeader = () => {
  return (
    <header className={styles.container}>
      <span className={styles.linkContainer}>
        <Link to="/home">
          <Back />
        </Link>
      </span>
      <h1 className={styles.title}>{TEST_TITLE}</h1>
      <span className={styles.quitBtnContainer}>
        <button className={styles.quitBtn}>종료</button>
      </span>
    </header>
  );
};

export default TestHeader;
