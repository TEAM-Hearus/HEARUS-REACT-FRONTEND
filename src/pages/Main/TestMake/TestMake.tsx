import { useQuery } from '@tanstack/react-query';
import styles from './TestMake.module.scss';
import { getAllScripts, IScriptInList } from '../../../apis/script';
import QuestionTypeBtn from '../../../components/common/buttons/QuestionTypeBtn/QuestionTypeBtn';
import useTestSettingsStore from '../../../store/TestSettingsStore';
import { useNavigate } from 'react-router-dom';

const TestMake = () => {
  const navigate = useNavigate();

  const { data } = useQuery<IScriptInList[], Error>({
    queryKey: ['allScripts'],
    queryFn: () => getAllScripts(),
  });

  const { questionCount, timeLimit, setQuestionCount, setTimeLimit } =
    useTestSettingsStore();

  const handleQuestionCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuestionCount(parseInt(e.target.value, 10));
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

  const handleTestStartBtnClick = () => {
    // 문제 유형 유효성 검사 로직 구현 예정
    navigate('/test');
  };

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>문제 스크립트</h2>
        <button
          className={styles.testStartBtn}
          onClick={handleTestStartBtnClick}
        >
          테스트 시작
        </button>
      </div>
      <div className={styles.contentContainer}>
        {data && data.length > 0 ? (
          <section className={styles.scriptsContainer}></section>
        ) : (
          <section className={styles.noScript}>
            <p className={styles.noScriptText}>스크립트 없음</p>
            <p className={styles.noScriptCaption}>
              녹음 시작 버튼을 눌러 만들어보세요
            </p>
          </section>
        )}
        <section className={styles.testOptionContainer}>
          <div className={styles.selectBox}>
            <p className={styles.selectTitle}>문제 유형</p>
            <div className={styles.selectionBtnsContainer}>
              {['객관식', '단답형', '빈칸 뚫기', 'OX 퀴즈'].map(
                (type, index) => (
                  <QuestionTypeBtn key={index}>{type}</QuestionTypeBtn>
                ),
              )}
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
            {timeLimit !== null && (
              <>
                <input
                  className={styles.numInput}
                  type="number"
                  min="0"
                  value={timeLimit}
                  onChange={handleTimeLimitValueChange}
                />
                <span className={styles.inputCaption}>분</span>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestMake;
