import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo/landing-logo.svg?react';
import styles from './Landing.module.scss';

const Landing = () => {
  return (
    <main>
      <section className={styles.topBgContainer}>
        <header className={styles.header}>
          <Link to="/login" className={styles.loginBtn}>
            로그인
          </Link>
          <Link to="/login" className={styles.startBtn}>
            무료로 시작하기
          </Link>
        </header>
        <article className={styles.titleContainer}>
          <div className={styles.mainTitle}>
            <Logo />
            <h1 className={styles.h1}>HEARUS</h1>
          </div>
          <p className={styles.subTitle}>SIOGANNN SIOGANNN</p>
        </article>
      </section>
    </main>
  );
};

export default Landing;
