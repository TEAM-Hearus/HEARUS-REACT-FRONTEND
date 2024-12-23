//import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import TestOptionSelector from '../../../components/organisms/TestOptionSelector/TestOptionSelector';
import ScriptItem from '../../../components/molecules/ScriptItem/ScriptItem';
import useTestSettingsStore from '../../../store/useTestSettingsStore';
import { useAlertStore } from '../../../store/useAlertStore';
import { getAllScripts } from '../../../apis/script';
import { useUnauthorizedRedirect } from '../../../hooks/useUnauthorizedRedirect';
import useServerErrorToast from '../../../hooks/useServerErrorToast';
import styles from './TestMake.module.scss';

const TestMake = () => {
  //const navigate = useNavigate();
  const addAlert = useAlertStore((state) => state.addAlert);

  const { data, isError } = useQuery({
    queryKey: ['allScripts'],
    queryFn: () => getAllScripts(),
  });

  useUnauthorizedRedirect(data);
  useServerErrorToast(isError);

  const {
    lectureId,
    // questionCount,
    // questionTypes,
    // timeLimit,
    setLectureId,
    setScheduleElementId,
    setTestName,
  } = useTestSettingsStore();

  const handleScriptClick = (
    lectureId: string,
    scheduleElementId: number,
    name: string,
  ) => {
    setLectureId(lectureId);
    setScheduleElementId(scheduleElementId);
    setTestName(`테스트-${name}`);
  };

  const handleTestStartBtnClick = () => {
    // if (
    //   lectureId.length > 0 &&
    //   questionCount > 0 &&
    //   questionTypes.length > 0 &&
    //   (timeLimit === null || timeLimit > 0)
    // ) {
    //   navigate('/test');
    // } else {
    //   addAlert('스크립트와 문제 유형, 문제 개수를 모두 선택해주세요.', 'error');
    // }
    // 임시로 이용 불가 조치
    addAlert('현재 인공지능 서버는 더 나은 서비스를 위해 유지보수 중입니다', 'error');
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
        {data && data?.object?.length > 0 ? (
          <section className={styles.scriptsContainer}>
            {data?.object.map((script) => (
              <div
                key={script.id}
                className={`${script.id === lectureId ? styles.selectedScript : styles.scriptWrapper}`}
                onClick={() => {
                  handleScriptClick(
                    script.id,
                    script.scheduleElementId,
                    script.name,
                  );
                }}
              >
                <ScriptItem {...script} />
              </div>
            ))}
          </section>
        ) : (
          <section className={styles.noScript}>
            <p className={styles.noScriptText}>스크립트 없음</p>
            <p className={styles.noScriptCaption}>
              녹음 시작 버튼을 눌러 만들어보세요
            </p>
          </section>
        )}
        <TestOptionSelector />
      </div>
    </div>
  );
};

export default TestMake;
