import Google from '../../assets/images/logo/google.png';
import Kakao from '../../assets/images/logo/kakao.png';
import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.bg}>
      <form className={styles.loginForm}>
        <h1 className={styles.h1}>로그인</h1>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            이메일
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.inputBox}>
          <label className={styles.label}>
            비밀번호
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              className={styles.input}
            />
          </label>
          <span className={styles.checkboxContainer}>
            <input
              type="checkbox"
              id="remember"
              className={styles.checkBoxInput}
            />
            <label className={styles.checkBoxLabel} htmlFor="remember">
              로그인 유지하기
            </label>
          </span>
        </div>
        <button className={styles.loginBtn}>로그인</button>
        <span className={styles.dividingLine}>
          <hr className={styles.line} />
          <p>계정 연동하기</p>
          <hr className={styles.line} />
        </span>
        <div className={styles.oauthBtnsContainer}>
          <button className={styles.googleBtn}>
            <img src={Google} alt="Google Logo" />
          </button>
          <button className={styles.kakaoBtn}>
            <img src={Kakao} alt="Kakao Logo" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
