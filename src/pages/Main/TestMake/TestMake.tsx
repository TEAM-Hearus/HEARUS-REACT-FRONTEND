import { useQuery } from '@tanstack/react-query';
import styles from './TestMake.module.scss';
import { getAllScripts, IScriptInList } from '../../../apis/script';

const TestMake = () => {
  const { data } = useQuery<IScriptInList[], Error>({
    queryKey: ['allScripts'],
    queryFn: () => getAllScripts(),
  });

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>문제 스크립트</h2>
        <button className={styles.testStartBtn}>테스트 시작</button>
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
              <button className={styles.qtypeBtn}>객관식</button>
              <button className={styles.qtypeBtn}>단답형</button>
              <button className={styles.qtypeBtn}>빈칸 뚫기</button>
              <button className={styles.qtypeBtn}>OX 퀴즈</button>
            </div>
          </div>
          <div className={styles.selectBox}>
            <p className={styles.selectTitle}>문제 개수</p>
            <input className={styles.numInput} type="number" />
            <span className={styles.inputCaption}>개</span>
          </div>
          <div className={styles.selectBox}>
            <label className={styles.checkBoxTitle}>
              <input className={styles.timeLimitInput} type="checkbox" />
              시간 제한
            </label>
            <input className={styles.numInput} type="number" />
            <span className={styles.inputCaption}>분</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestMake;
