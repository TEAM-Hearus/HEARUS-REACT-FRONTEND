import styles from './SignupModal.module.scss';
import X from '../../../assets/images/cancel.svg?react';
import Google from '../../../assets/images/logo/google.png';
import Kakao from '../../../assets/images/logo/kakao.png';
import Email from '../../../assets/images/logo/email.png';

interface IProps {
  closeModal: () => void;
}

const SignupModal = ({ closeModal }: IProps) => {
  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className={styles.modalWrapper} onClick={handleWrapperClick}>
      <article className={styles.modalContainer}>
        <span className={styles.xBtnWrapper}>
          <button className={styles.xBtn} onClick={closeModal}>
            <X />
          </button>
        </span>
        <div className={styles.modalTitle}>
          <p>아래 계정으로</p>
          <p>로그인할 수 있어요</p>
        </div>
        <div className={styles.loginBtnsContainer}>
          <button className={`${styles.loginBtn} ${styles.google}`}>
            <img src={Google} alt="Google Logo" />
            구글 아이디로 시작하기
          </button>
          <button className={`${styles.loginBtn} ${styles.kakao}`}>
            <img src={Kakao} alt="Kakao Logo" />
            카카오 아이디로 시작하기
          </button>
          <button className={`${styles.loginBtn} ${styles.email}`}>
            <img src={Email} alt="Email Icon" />
            이메일로 시작하기
          </button>
        </div>
        <div className={styles.signupTextContainer}>
          <p>서비스가 처음이신가요?</p>
          <button className={styles.signupLink}>계정 만들기</button>
        </div>
      </article>
    </div>
  );
};

export default SignupModal;
