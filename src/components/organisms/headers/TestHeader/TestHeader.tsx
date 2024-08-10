import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TestModal from '../../../templates/modals/TestModal/TestModal';
import useTestModalStore from '../../../../store/useTestModalStore';
import Back from '../../../../assets/images/arrow/back.svg?react';
import { formatTimer } from '../../../../utils/dateFormatters';
import styles from './TestHeader.module.scss';

const TEST_TITLE = '테스트-경제학원론-240708'; //임시

interface IProps {
  handleSubmit: () => void;
  showResults: boolean;
}

const TestHeader = ({ handleSubmit, showResults }: IProps) => {
  const [seconds, setSeconds] = useState(0);
  const timerIntervalRef = useRef<number | null>(null);

  const { isModalOpen, openModal } = useTestModalStore();

  const startTimer = () => {
    if (timerIntervalRef.current !== null) return;
    timerIntervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current === null) return;
    setSeconds(0);
    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  };

  const handleClickQuitBtn = () => {
    if (!showResults) openModal();
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  useEffect(() => {
    if (showResults) stopTimer();
  }, [showResults]);

  return (
    <header className={styles.container}>
      <div className={styles.leftContainer}>
        <Link to="/home/test-make">
          <Back />
        </Link>
      </div>
      <h1 className={styles.title}>{TEST_TITLE}</h1>
      <div className={styles.rightContainer}>
        <p className={styles.timer}>{formatTimer(seconds)}</p>
        <button className={styles.quitBtn} onClick={handleClickQuitBtn}>
          종료
        </button>
      </div>
      {isModalOpen && (
        <TestModal title={TEST_TITLE} handleSubmit={handleSubmit} />
      )}
    </header>
  );
};

export default TestHeader;
