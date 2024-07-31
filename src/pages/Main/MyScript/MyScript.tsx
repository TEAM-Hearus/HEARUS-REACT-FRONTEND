import styles from './MyScript.module.scss';
import StartingButton from '../../../components/common/buttons/StartBtn/StartBtn';
import ScriptItem from '../../../components/common/ScriptItem/ScriptItem';
import { useQuery } from '@tanstack/react-query';
import { getAllScripts, IScriptInList } from '../../../apis/script';
import { useEffect, useState } from 'react';
import ScriptDetailModal from '../../../components/modals/ScriptDetailModal/ScriptDetailModal';

const MyScript = () => {
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);

  const { data } = useQuery<IScriptInList[], Error>({
    queryKey: ['allScripts'],
    queryFn: () => getAllScripts(),
  });

  const handleScriptClick = (id: string) => {
    setSelectedScriptId(id);
  };

  const handleCloseModal = () => {
    setSelectedScriptId(null);
  };

  useEffect(() => {
    if (selectedScriptId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedScriptId]);

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
              key={script.id}
              onClick={() => {
                handleScriptClick(script.id);
              }}
            >
              <ScriptItem {...script} />
            </span>
          ))}
        </div>
      )}
      {selectedScriptId !== null && (
        <ScriptDetailModal
          scriptId={selectedScriptId}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MyScript;
