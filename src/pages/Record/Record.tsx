import RecordHeader from '../../components/headers/RecordHeader/RecordHeader';
import styles from './Record.module.scss';

const Record = () => {
  return (
    <div className={styles.container}>
      <RecordHeader />
      <article className={styles.captionContainer}></article>
    </div>
  );
};

export default Record;
