import styles from './MyScript.module.scss';
import StartingButton from '../../../components/common/buttons/StartBtn/StartBtn';
import ScriptItem from '../../../components/common/ScriptItem/ScriptItem';
import { scriptElements } from '../../../constants/script';

const MyScript = () => {
  // const { data } = useQuery<IScriptElement[], Error>({
  //   queryKey: ['script'],
  //   queryFn: () => getScript(),
  // });

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.recentScripts}>
          {scriptElements ? '최근 스크립트' : ''}
        </div>
        <StartingButton>녹음 시작</StartingButton>
      </div>

      {!scriptElements ? (
        <div className={styles.noneScriptContainer}>
          <h4 className={styles.noneScript}>스크립트 없음</h4>
          <br></br>
          <p className={styles.startingScript}>
            녹음 시작 버튼을 눌러 만들어보세요
          </p>
        </div>
      ) : (
        <div className={styles.scriptContainer}>
          {scriptElements?.map((script) => (
            <ScriptItem key={script.id} {...script} />
          ))}
          {/* <ScriptItem
          id="1"
          title="경제학원론-240708"
          content="정부와 중앙은행이 경제를 어떻게 조절하고, 경제 문제에 대응하는지를 다루는 경제 정책은 매우 중요한 주제입니다. 통화 정책, 재정 정책 등 다양한 정책 도구를 통해 경제의 안정성과 성장을 유지하는 방법을 분석합니다."
          date="2024.05.07"
        ></ScriptItem>
        <ScriptItem
          id="1"
          title="title"
          content="content"
          date="date"
        ></ScriptItem>
        <ScriptItem
          id="1"
          title="title"
          content="content"
          date="2024.05.07"
        ></ScriptItem>
        <ScriptItem
          id="1"
          title="title"
          content="content"
          date="2024.05.07"
        ></ScriptItem> */}
        </div>
      )}
    </div>
  );
};

export default MyScript;
