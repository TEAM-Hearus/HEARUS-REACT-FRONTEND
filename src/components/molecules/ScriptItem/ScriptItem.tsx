import { formatScriptDate } from '../../../utils/dateFormatters';
import HighlightedText from '../../atoms/HighlightedText/HighlightedText';
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
      <div className={styles.content}>
        <HighlightedText text={processedScript[0] + '...'} isPreview />
      </div>
      <p className={styles.date}>{formatScriptDate(lectureDate)}</p>
    </article>
  );
};
export default ScriptItem;
