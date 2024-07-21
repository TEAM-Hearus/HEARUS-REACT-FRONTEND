import { useQuery } from '@tanstack/react-query';
import styles from './TestMake.module.scss';
import { getAllScripts, IScriptInList } from '../../../apis/script';
import { useNavigate } from 'react-router-dom';
import TestOptionSelector from '../../../components/TestOptionSelector/TestOptionSelector';

const TestMake = () => {
  const navigate = useNavigate();

  const { data } = useQuery<IScriptInList[], Error>({
    queryKey: ['allScripts'],
    queryFn: () => getAllScripts(),
  });

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
        <TestOptionSelector />
      </div>
    </div>
  );
};

export default TestMake;
