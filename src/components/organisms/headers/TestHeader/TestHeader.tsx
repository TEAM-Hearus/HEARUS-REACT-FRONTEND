import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestModal from '../../../templates/modals/TestModal/TestModal';
import useTestModalStore from '../../../../store/useTestModalStore';
import { useAlertStore } from '../../../../store/useAlertStore';
import Back from '../../../../assets/images/arrow/back.svg?react';
import { formatTimer } from '../../../../utils/dateFormatters';
import useTestSettingsStore from '../../../../store/useTestSettingsStore';
import styles from './TestHeader.module.scss';

interface IProps {
  handleSubmit: () => void;
  showResults: boolean;
  isFetching: boolean;
}

const TestHeader = ({ handleSubmit, showResults, isFetching }: IProps) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const timerIntervalRef = useRef<number | null>(null);

  const { testName, timeLimit } = useTestSettingsStore();
  const { isModalOpen, openModal, closeModal, clearTestData } =
    useTestModalStore();
  const showConfirm = useAlertStore((state) => state.showConfirm);

  const { addAlert } = useAlertStore();

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
    if (!showResults && !isFetching) {
      openModal();
    }
    if (showResults) {
      navigate('/home/test-make');
    }
  }, [showResults, isFetching]);

  const backClick = async () => {
    if (!showResults) {
      const confirmed = await showConfirm(
        '테스트 중단',
        '지금 나가면 문제를 다시 불러올 수 없습니다. \n 테스트를 중단하시겠습니까?',
        '확인',
      );
      if (confirmed) {
        navigate('/home/test-make');
      }
    } else {
      navigate('/home/test-make');
    }
  };

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
      if (seconds === timeLimit * 60 - 10) {
        addAlert('문제 종료까지 10초 남았습니다.', 'error');
      }
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
        <button className={styles.backBtn} onClick={backClick}>
          <Back />
        </button>
      </div>
      <h1 className={styles.title}>{testName}</h1>
      <div className={styles.rightContainer}>
        <p className={styles.timer}>{formatTimer(seconds)}</p>
        {timeLimit && (
          <>
            <p className={styles.timeLimit}>/</p>
            <p className={styles.timeLimit}>{`${timeLimit} 분`}</p>
          </>
        )}
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
