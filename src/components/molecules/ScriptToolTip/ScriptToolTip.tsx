import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ScriptDetailModal from '../../templates/modals/ScriptDetailModal/ScriptDetailModal';
import {
  deleteScheduleElement,
  getLectureByScheduleElement,
} from '../../../apis/schedule';
import { useAlert } from '../../../contexts/AlertContext';
import ScriptIcon from '../../../assets/images/nav/my-script-inactive.svg?react';
import TrashCan from '../../../assets/images/orange-trash-can.svg?react';
import styles from './ScriptToolTip.module.scss';
import { useUserInfoStore } from '../../../store/useUserInfoStore';

interface IProps {
  id: number;
  scheduleName: string;
}

const ScriptToolTip = ({ id, scheduleName }: IProps) => {
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { addAlert, showConfirm } = useAlert();
  const { userInfo } = useUserInfoStore();

  const { data } = useQuery({
    queryKey: ['tooltip', id],
    queryFn: () => getLectureByScheduleElement(id),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteScheduleElement(id, userInfo.userName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule', userInfo.userName],
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
      '삭제하기',
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
      {data?.map((lecture) => (
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
