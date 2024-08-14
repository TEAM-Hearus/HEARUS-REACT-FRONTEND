import styles from './HighlightedText.module.scss';

interface IProps {
  text: string;
  isPreview?: boolean;
}

const HighlightedText = ({ text, isPreview }: IProps) => {
  const highlightPattern = /\*\*(.*?)\*\*/g;
  const parts = text.split(highlightPattern);
  return (
    <p className={`${!isPreview && styles.sentence}`}>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          return part;
        } else {
          return <span className={styles.highlight}>{part}</span>;
        }
      })}
    </p>
  );
};

export default HighlightedText;
