import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ScriptDetailModal from '../../templates/modals/ScriptDetailModal/ScriptDetailModal';
import {
  deleteScheduleElement,
  getLectureByScheduleElement,
} from '../../../apis/schedule';
import { useAlertStore } from '../../../store/useAlertStore';
import ScriptIcon from '../../../assets/images/nav/my-script-inactive.svg?react';
import TrashCan from '../../../assets/images/orange-trash-can.svg?react';
import { useNameStore } from '../../../store/useUserNameStore';
import { useUnauthorizedRedirect } from '../../../hooks/useUnauthorizedRedirect';
import useServerErrorToast from '../../../hooks/useServerErrorToast';
import styles from './ScriptToolTip.module.scss';

interface IProps {
  id: number;
  scheduleName: string;
}

const ScriptToolTip = ({ id, scheduleName }: IProps) => {
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const addAlert = useAlertStore((state) => state.addAlert);
  const showConfirm = useAlertStore((state) => state.showConfirm);
  const { userName } = useNameStore();

  const { data, isError } = useQuery({
    queryKey: ['tooltip', id],
    queryFn: () => getLectureByScheduleElement(id),
  });

  useUnauthorizedRedirect(data);
  useServerErrorToast(isError);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteScheduleElement(id, userName.userName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule', userName.userName],
      });
      addAlert(`'${scheduleName}' 수업이 삭제되었습니다.`, 'success');
    },
    onError: () => {
      addAlert('시간표 삭제를 실패했습니다.', 'error');
    },
  });

  const handleToolTipClick = (scriptId: string) => {
    setSelectedScriptId(scriptId);
  };

  const handleCloseModal = () => {
    setSelectedScriptId(null);
  };

  const handleDeleteBtnClick = async () => {
    const confirmed = await showConfirm(
      `'${scheduleName}'`,
      '이 수업을 시간표에서 삭제하시겠습니까?',
      '삭제',
    );

    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.deleteBtnWrapper}>
        <button className={styles.deleteBtn} onClick={handleDeleteBtnClick}>
          이 수업 삭제하기
          <TrashCan />
        </button>
      </div>
      {data?.object?.map((lecture) => (
        <div
          key={lecture.id}
          className={styles.tooltipItem}
          onClick={() => handleToolTipClick(lecture.id)}
        >
          {lecture.name}
          <ScriptIcon />
        </div>
      ))}
      {selectedScriptId !== null && (
        <ScriptDetailModal
          scriptId={selectedScriptId}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ScriptToolTip;
