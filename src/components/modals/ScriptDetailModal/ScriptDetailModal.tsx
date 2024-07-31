import { createPortal } from 'react-dom';
import X from '../../../assets/images/cancel.svg?react';
import Play from '../../../assets/images/play.svg?react';
import styles from './ScriptDetailModal.module.scss';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getScriptDetail } from '../../../apis/script';

interface IProps {
  scriptId: string;
  closeModal: () => void;
}

const ScriptDetailModal = ({ scriptId, closeModal }: IProps) => {
  const [time, setTime] = useState('00:00:00');

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { data } = useQuery({
    queryKey: ['scriptDetail', scriptId],
    queryFn: () => getScriptDetail(scriptId),
  });

  console.log(scriptId);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <article className={styles.contentContainer} onClick={handleContentClick}>
        <span className={styles.xBtn} onClick={closeModal}>
          <X />
        </span>
        <p className={styles.title}>{data?.name}</p>
        <div className={styles.playBox}>
          <span className={styles.playBtn}>
            <Play />
          </span>
          <p className={styles.time}>{time}</p>
        </div>
        <p className={styles.textBox}>{data?.processedScript.join(' ')}</p>
      </article>
    </div>,
    document.body,
  );
};

export default ScriptDetailModal;
