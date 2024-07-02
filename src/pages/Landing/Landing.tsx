import { useState } from 'react';
import SignupModal from '../../components/modals/SignupModal/SignupModal';
import styles from './Landing.module.scss';

const Landing = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const openModal = () => {
    setIsLoginClicked(true);
  };
  const closeModal = () => {
    setIsLoginClicked(false);
  };
  return (
    <>
      <main className={styles.firstBg}>
        <button className={styles.loginBtn} onClick={openModal}>
          무료로 시작하기
        </button>
      </main>
      {isLoginClicked && <SignupModal closeModal={closeModal} />}
    </>
  );
};

export default Landing;
