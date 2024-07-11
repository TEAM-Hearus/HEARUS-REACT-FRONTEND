import styles from './Recordheader.module.scss';
import Back from '../../../assets/images/arrow/back.svg?react';
import { Link } from 'react-router-dom';

const RECORD_TITLE = '새로운 녹음-240711';

const RecordHeader = () => {
  return (
    <header className={styles.container}>
      <Link to="/home">
        <Back />
      </Link>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{RECORD_TITLE}</h1>
        <button className={styles.tagBtn}>태그</button>
      </div>
      <div className={styles.timerContainer}>
        <p className={styles.timer}>{'00:00:00'}</p>
        <button className={styles.quitBtn}>종료</button>
      </div>
    </header>
  );
};

export default RecordHeader;
