import { formatScriptDate } from '../../../utils/dateFormatters';
import styles from './ScriptItem.module.scss';

interface IScriptProps {
  id: string;
  name: string;
  processedScript: string[];
  lectureDate: string;
}
const ScriptItem = ({ name, processedScript, lectureDate }: IScriptProps) => {
  return (
    <article className={styles.postItContainer}>
      <p className={styles.title}>{name}</p>
      <p className={styles.content}>{processedScript[0]}...</p>
      <p className={styles.date}>{formatScriptDate(lectureDate)}</p>
    </article>
  );
};
export default ScriptItem;
