import { useAlertStore } from '../../../store/useAlertStore';
import useTestSettingsStore from '../../../store/useTestSettingsStore';
import QuestionTypeBtn from '../../atoms/buttons/QuestionTypeBtn/QuestionTypeBtn';
import styles from './TestOptionSelector.module.scss';

const TestOptionSelector = () => {
  const { questionCount, timeLimit, setQuestionCount, setTimeLimit } =
    useTestSettingsStore();

  const addAlert = useAlertStore((state) => state.addAlert);

  const handleQuestionCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (parseInt(e.target.value, 10) > 10) {
      addAlert('문제는 최대 10개로 설정할 수 있습니다.', 'error');
      setQuestionCount(10);
    } else {
      setQuestionCount(parseInt(e.target.value, 10));
    }
  };

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTimeLimit(checked ? 0 : null);
  };

  const handleTimeLimitValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTimeLimit(parseInt(e.target.value, 10));
  };
  return (
    <section className={styles.testOptionContainer}>
      <div className={styles.selectBox}>
        <p className={styles.selectTitle}>문제 유형</p>
        <div className={styles.selectionBtnsContainer}>
          {['객관식', 'OX 퀴즈'].map((type, index) => (
            <QuestionTypeBtn key={index}>{type}</QuestionTypeBtn>
          ))}
        </div>
      </div>
      <div className={styles.selectBox}>
        <p className={styles.selectTitle}>문제 개수</p>
        <input
          className={styles.numInput}
          type="number"
          min="0"
          value={questionCount}
          onChange={handleQuestionCountChange}
        />
        <span className={styles.inputCaption}>개</span>
      </div>
      <div className={styles.selectBox}>
        <span className={styles.checkBoxContainer}>
          <input
            className={styles.timeLimitInput}
            type="checkbox"
            id="time"
            checked={timeLimit !== null}
            onChange={handleTimeLimitChange}
          />
          <label className={styles.checkBoxTitle} htmlFor="time">
            시간 제한
          </label>
        </span>
        {timeLimit != null && (
          <>
            <input
              className={styles.numInput}
              type="number"
              min="1"
              value={timeLimit}
              onChange={handleTimeLimitValueChange}
            />
            <span className={styles.inputCaption}>분</span>
          </>
        )}
      </div>
    </section>
  );
};

export default TestOptionSelector;
