import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import HighlightedText from '../../../atoms/HighlightedText/HighlightedText';
import X from '../../../../assets/images/cancel.svg?react';
import { getScriptDetail } from '../../../../apis/script';
import { useUnauthorizedRedirect } from '../../../../hooks/useUnauthorizedRedirect';
import styles from './ScriptDetailModal.module.scss';
import useServerErrorToast from '../../../../hooks/useServerErrorToast';

interface IProps {
  scriptId: string;
  closeModal: () => void;
}

const ScriptDetailModal = ({ scriptId, closeModal }: IProps) => {
  const { data, isError } = useQuery({
    queryKey: ['scriptDetail', scriptId],
    queryFn: () => getScriptDetail(scriptId),
  });

  useUnauthorizedRedirect(data);
  useServerErrorToast(isError);

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
