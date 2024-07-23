import { formatScriptDate } from '../../../utils/dateFormatters';
import styles from './ScriptItem.module.scss';

interface IScriptProps {
  id: string;
  name: string;
  processedScript: string[];
  createdAt: string;
}
const ScriptItem = ({ name, processedScript, createdAt }: IScriptProps) => {
  return (
    <div className={styles.postItContainer}>
      <div className={styles.title}>{name}</div>
      <div className={styles.content}>{processedScript[0]}...</div>
      <span className={styles.date}>{formatScriptDate(createdAt)}</span>
    </div>
  );
};
export default ScriptItem;
