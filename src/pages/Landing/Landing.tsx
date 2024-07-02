import styles from './Landing.module.scss';

const Landing = () => {
  return (
    <main className={styles.firstBg}>
      <button className={styles.loginBtn}>무료로 시작하기</button>
    </main>
  );
};

export default Landing;
