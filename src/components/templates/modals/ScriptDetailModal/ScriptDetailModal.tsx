import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import X from '../../../../assets/images/cancel.svg?react';
import Play from '../../../../assets/images/audio/play.svg?react';
import Pause from '../../../../assets/images/audio/pause.svg?react';
import { getScriptDetail } from '../../../../apis/script';
import { formatTimer } from '../../../../utils/dateFormatters';
import styles from './ScriptDetailModal.module.scss';

interface IProps {
  scriptId: string;
  closeModal: () => void;
}

const ScriptDetailModal = ({ scriptId, closeModal }: IProps) => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const { data } = useQuery({
    queryKey: ['scriptDetail', scriptId],
    queryFn: () => getScriptDetail(scriptId),
  });

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  return createPortal(
    <div
      className={styles.overlay}
      onClick={closeModal}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
    >
      <article className={styles.contentContainer} onClick={handleContentClick}>
        <span className={styles.xBtn} onClick={closeModal}>
          <X />
        </span>
        <p className={styles.title}>{data?.name}</p>
        <div className={styles.playBox}>
          <div className={styles.playBtn} onClick={handlePlayClick}>
            {isPlaying ? <Pause /> : <Play />}
          </div>
          <p className={styles.time}>{formatTimer(time)}</p>
        </div>
        <p className={styles.textBox}>{data?.processedScript.join(' ')}</p>
      </article>
    </div>,
    document.body,
  );
};

export default ScriptDetailModal;
