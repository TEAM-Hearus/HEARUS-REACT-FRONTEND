import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TestModal from '../../../templates/modals/TestModal/TestModal';
import useTestModalStore from '../../../../store/useTestModalStore';
import Back from '../../../../assets/images/arrow/back.svg?react';
import { formatTimer } from '../../../../utils/dateFormatters';
import styles from './TestHeader.module.scss';
import useTestSettingsStore from '../../../../store/useTestSettingsStore';

interface IProps {
  handleSubmit: () => void;
  showResults: boolean;
  isFetching: boolean;
}

const TestHeader = ({ handleSubmit, showResults, isFetching }: IProps) => {
  const [seconds, setSeconds] = useState(0);
  const timerIntervalRef = useRef<number | null>(null);

  const { testName, timeLimit } = useTestSettingsStore();
  const { isModalOpen, openModal, closeModal, clearTestData } =
    useTestModalStore();

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current !== null) return;
    timerIntervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current === null) return;
    setSeconds(0);
    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  }, []);

  const handleClickQuitBtn = useCallback(() => {
    if (!showResults && !isFetching) openModal();
  }, []);

  useEffect(() => {
    if (!isFetching) startTimer();
    return () => {
      stopTimer();
      closeModal();
    };
  }, [isFetching]);

  useEffect(() => {
    if (showResults) stopTimer();
  }, [showResults]);

  useEffect(() => {
    if (timeLimit != null) {
      if (seconds >= timeLimit * 60) {
        stopTimer();
        clearTestData();
        handleSubmit();
      }
    }
  }, [timeLimit, seconds]);

  return (
    <header className={styles.container}>
      <div className={styles.leftContainer}>
        <Link to="/home/test-make">
          <Back />
        </Link>
      </div>
      <h1 className={styles.title}>{testName}</h1>
      <div className={styles.rightContainer}>
        <p className={styles.timer}>{formatTimer(seconds)}</p>
        <button className={styles.quitBtn} onClick={handleClickQuitBtn}>
          종료
        </button>
      </div>
      {isModalOpen && !showResults && !isFetching && (
        <TestModal title={testName} handleSubmit={handleSubmit} />
      )}
    </header>
  );
};

export default TestHeader;
