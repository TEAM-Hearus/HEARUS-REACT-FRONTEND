import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ScriptDetailModal from '../../templates/modals/ScriptDetailModal/ScriptDetailModal';
import {
  deleteScheduleElement,
  getLectureByScheduleElement,
} from '../../../apis/schedule';
import ScriptIcon from '../../../assets/images/nav/my-script-inactive.svg?react';
import TrashCan from '../../../assets/images/orange-trash-can.svg?react';
import styles from './ScriptToolTip.module.scss';
import { useUserInfoStore } from '../../../store/userUserInfoStore';

interface IProps {
  id: number;
  scheduleName: string;
}

const ScriptToolTip = ({ id, scheduleName }: IProps) => {
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  const queryClient = useQueryClient();

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
    },
    onError: () => {
      alert('시간표 삭제를 실패했습니다.');
    },
  });

  const handleToolTipClick = (scriptId: string) => {
    setSelectedScriptId(scriptId);
  };

  const handleCloseModal = () => {
    setSelectedScriptId(null);
  };

  const handleDeleteBtnClick = () => {
    if (window.confirm(`'${scheduleName}' 수업을 삭제하시겠습니까?`)) {
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
