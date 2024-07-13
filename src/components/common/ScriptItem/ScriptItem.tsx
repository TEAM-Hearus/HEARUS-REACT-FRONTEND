import styles from './ScriptItem.module.scss';

interface IScriptProps {
  //   id: number;
  title: string;
  content: string;
  date: string;
}
const ScriptItem = ({ title, content, date }: IScriptProps) => {
  return (
    <div className={styles.postItContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
      <span className={styles.date}>{date}</span>
    </div>
  );
};
export default ScriptItem;
