import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import HighlightedText from '../../../atoms/HighlightedText/HighlightedText';
import X from '../../../../assets/images/cancel.svg?react';
import { getScriptDetail } from '../../../../apis/script';
import styles from './ScriptDetailModal.module.scss';

interface IProps {
  scriptId: string;
  closeModal: () => void;
}

const ScriptDetailModal = ({ scriptId, closeModal }: IProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const { data } = useQuery({
    queryKey: ['scriptDetail', scriptId],
    queryFn: () => getScriptDetail(scriptId),
  });

  return createPortal(
    <div
      className={styles.overlay}
      onClick={closeModal}
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={(e) => e.stopPropagation()}
    >
      <section className={styles.contentContainer} onClick={handleContentClick}>
        <span className={styles.xBtn} onClick={closeModal}>
          <X />
        </span>
        <p className={styles.title}>{data?.name}</p>
        {data?.scheduleElementId && (
          <div className={styles.subjectTag}>{data.scheduleElementId}</div>
        )}
        <article className={styles.textBox}>
          {data?.processedScript.map((text, index) => (
            <HighlightedText key={index} text={text} />
          ))}
        </article>
      </section>
    </div>,
    document.body,
  );
};

export default ScriptDetailModal;
