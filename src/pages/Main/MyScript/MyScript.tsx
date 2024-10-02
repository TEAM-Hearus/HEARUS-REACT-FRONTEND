import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ScriptDetailModal from '../../../components/templates/modals/ScriptDetailModal/ScriptDetailModal';
import ScriptItem from '../../../components/molecules/ScriptItem/ScriptItem';
import StartingButton from '../../../components/atoms/buttons/StartBtn/StartBtn';
import { getAllScripts } from '../../../apis/script';
import { useUnauthorizedRedirect } from '../../../hooks/useUnauthorizedRedirect';
import styles from './MyScript.module.scss';

const MyScript = () => {
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['allScripts'],
    queryFn: () => getAllScripts(),
  });

  useUnauthorizedRedirect(data);

  const handleScriptClick = (id: string) => {
    setSelectedScriptId(id);
  };

  const handleCloseModal = () => {
    setSelectedScriptId(null);
  };

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.recentScripts}>최근 스크립트</div>
        <Link to="/record">
          <StartingButton>녹음 시작</StartingButton>
        </Link>
      </div>
      {!data || data?.object?.length === 0 ? (
        <div className={styles.noneScriptContainer}>
          <h4 className={styles.noneScript}>스크립트 없음</h4>
          <br></br>
          <p className={styles.startingScript}>
            녹음 시작 버튼을 눌러 만들어보세요
          </p>
        </div>
      ) : (
        <div className={styles.scriptContainer}>
          {data?.object?.map((script) => (
            <div
              key={script.id}
              onClick={() => {
                handleScriptClick(script.id);
              }}
            >
              <ScriptItem {...script} />
            </div>
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
