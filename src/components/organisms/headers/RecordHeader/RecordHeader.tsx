import styles from './Recordheader.module.scss';
import Back from '../../../../assets/images/arrow/back.svg?react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { formatTimer } from '../../../../utils/dateFormatters';
import { useRecordModalStore } from '../../../../store/useRecordModalStore';
import RecordModal from '../../../templates/modals/RecordModal/RecordModal';
import RecordTagDropDown from '../../../molecules/RecordTagDropDown/RecordTagDropDown';

interface IProps {
  stopRecordingAndDisconnectSocket: () => void;
}

const RECORD_TITLE = '새로운 녹음-240711';

const RecordHeader = ({ stopRecordingAndDisconnectSocket }: IProps) => {
  const [seconds, setSeconds] = useState(0);
  const timerIntervalRef = useRef<number | null>(null);

  const { isModalOpen, openModal } = useRecordModalStore();

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

  const handleQuit = () => {
    // 타이머, 녹음, 소켓 연결 종료
    stopTimer();
    stopRecordingAndDisconnectSocket();
  };

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  return (
    <header className={styles.container}>
      <span className={styles.linkContainer}>
        <Link to="/home">
          <Back />
        </Link>
      </span>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{RECORD_TITLE}</h1>
        <RecordTagDropDown />
      </div>
      <div className={styles.timerContainer}>
        <p className={styles.timer}>{formatTimer(seconds)}</p>
        <button className={styles.quitBtn} onClick={openModal}>
          종료
        </button>
      </div>
      {isModalOpen && <RecordModal handleQuit={handleQuit} />}
    </header>
  );
};

export default RecordHeader;
