import { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ScriptDetailModal from '../../../components/templates/modals/ScriptDetailModal/ScriptDetailModal';
import ScriptItem from '../../../components/molecules/ScriptItem/ScriptItem';
import StartingButton from '../../../components/atoms/buttons/StartBtn/StartBtn';
import { getAllScripts } from '../../../apis/script';
import { useUnauthorizedRedirect } from '../../../hooks/useUnauthorizedRedirect';
import { useAlertStore } from '../../../store/useAlertStore';
import styles from './MyScript.module.scss';
import useServerErrorToast from '../../../hooks/useServerErrorToast';

const MyScript = () => {
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  const { addAlert } = useAlertStore();
  const { data, isError } = useQuery({
    queryKey: ['allScripts'],
    queryFn: () => getAllScripts(),
  });

  useUnauthorizedRedirect(data);
  useServerErrorToast(isError);

  const handleScriptClick = (id: string) => {
    setSelectedScriptId(id);
  };

  const handleCloseModal = () => {
    setSelectedScriptId(null);
  };

  useEffect(() => {
    if (isError) addAlert('데이터를 불러오는 중 문제가 발생했습니다.', 'error');
  }, [isError]);

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.recentScripts}>최근 스크립트</div>
        {/* <Link to="/record">
          <StartingButton>녹음 시작</StartingButton>
        </Link> */}
        {/* 임시로 이용 불가 조치 */}
        <div
          onClick={() =>
            addAlert('현재 인공지능 기능은 이용 불가합니다.', 'error')
          }
        >
          <StartingButton>녹음 시작</StartingButton>
        </div>
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
