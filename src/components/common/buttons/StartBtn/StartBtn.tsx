import styles from './StartBtn.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const StartingButton = (props: ButtonProps) => {
  return <button className={styles.startingBtn} {...props} />;
};

export default StartingButton;
