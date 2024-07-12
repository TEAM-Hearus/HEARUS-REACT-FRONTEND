import styles from './Recordheader.module.scss';
import Back from '../../../assets/images/arrow/back.svg?react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../../../utils/record';

const RECORD_TITLE = '새로운 녹음-240711';

const RecordHeader = () => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const startTimer = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleOnClickQuitBtn = () => {
    stopTimer();
    setSeconds(0);
  };

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
        <p className={styles.timer}>{formatTime(seconds)}</p>
        <button className={styles.quitBtn} onClick={handleOnClickQuitBtn}>
          종료
        </button>
      </div>
    </header>
  );
};

export default RecordHeader;
