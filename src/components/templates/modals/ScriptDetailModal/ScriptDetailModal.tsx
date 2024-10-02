import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['scriptDetail', scriptId],
    queryFn: () => getScriptDetail(scriptId),
  });

  useEffect(() => {
    if (data?.status === 'UNAUTHORIZED') {
      navigate('/error', { state: { errorStatus: 401 } });
      return;
    }
  }, [data]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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
        <p className={styles.title}>{data?.object?.name}</p>
        {data?.object?.scheduleElementId && (
          <div className={styles.subjectTag}>
            {data.object?.scheduleElementId}
          </div>
        )}
        <article className={styles.textBox}>
          {data?.object?.processedScript.map((text, index) => (
            <HighlightedText key={index} text={text} />
          ))}
        </article>
      </section>
    </div>,
    document.body,
  );
};

export default ScriptDetailModal;
