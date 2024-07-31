import styles from './Recordheader.module.scss';
import Back from '../../../assets/images/arrow/back.svg?react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { formatTimer } from '../../../utils/dateFormatters';

interface IProps {
  handleQuit: () => void;
}

const RECORD_TITLE = '새로운 녹음-240711';

const RecordHeader = ({ handleQuit }: IProps) => {
  const [seconds, setSeconds] = useState(0);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  const startTimer = () => {
    if (timerIntervalRef.current !== null) return;
    timerIntervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current === null) return;
    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  };

  const handleOnClickQuitBtn = () => {
    stopTimer();
    setSeconds(0);
    handleQuit();
  };

  return (
    <header className={styles.container}>
      <span className={styles.linkContainer}>
        <Link to="/home">
          <Back />
        </Link>
      </span>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{RECORD_TITLE}</h1>
        <button className={styles.tagBtn}>태그</button>
      </div>
      <div className={styles.timerContainer}>
        <p className={styles.timer}>{formatTimer(seconds)}</p>
        <button className={styles.quitBtn} onClick={handleOnClickQuitBtn}>
          종료
        </button>
      </div>
    </header>
  );
};

export default RecordHeader;
