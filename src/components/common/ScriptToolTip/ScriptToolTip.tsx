import { useQuery } from '@tanstack/react-query';
import { getLectureByScheduleElement } from '../../../apis/schedule';
import ScriptIcon from '../../../assets/images/nav/my-script-inactive.svg?react';
import styles from './ScriptToolTip.module.scss';
import ScriptDetailModal from '../../modals/ScriptDetailModal/ScriptDetailModal';
import { useEffect, useState } from 'react';

interface IProps {
  id: number;
}

const ScriptToolTip = ({ id }: IProps) => {
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['tooltip', id],
    queryFn: () => getLectureByScheduleElement(id),
  });

  const handleClick = (scriptId: string) => {
    setSelectedScriptId(scriptId);
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
    <div className={styles.container}>
      {data?.map((lecture) => (
        <div
          className={styles.tooltipItem}
          onClick={() => handleClick(lecture.id)}
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
