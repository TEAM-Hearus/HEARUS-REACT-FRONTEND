import styles from './MyScript.module.scss';
import StartingButton from '../../../components/common/buttons/StartBtn/StartBtn';
import ScriptItem from '../../../components/common/ScriptItem/ScriptItem';
import { useQuery } from '@tanstack/react-query';
import { getAllScripts, IScriptInList } from '../../../apis/script';

const MyScript = () => {
  const { data } = useQuery<IScriptInList[], Error>({
    queryKey: ['allScripts'],
    queryFn: () => getAllScripts(),
  });

  const handleScriptClick = (id: string) => {
    // 스크립트 상세 모달 구현 예정
    console.log(id);
  };

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.recentScripts}>최근 스크립트</div>
        <StartingButton>녹음 시작</StartingButton>
      </div>
      {!data ? (
        <div className={styles.noneScriptContainer}>
          <h4 className={styles.noneScript}>스크립트 없음</h4>
          <br></br>
          <p className={styles.startingScript}>
            녹음 시작 버튼을 눌러 만들어보세요
          </p>
        </div>
      ) : (
        <div className={styles.scriptContainer}>
          {data?.map((script) => (
            <span
              onClick={() => {
                handleScriptClick(script.id);
              }}
            >
              <ScriptItem key={script.id} {...script} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyScript;
