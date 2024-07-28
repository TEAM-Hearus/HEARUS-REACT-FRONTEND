import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../../apis';
import Google from '../../assets/images/logo/google.png';
import Kakao from '../../assets/images/logo/kakao.png';
import { emailLogin } from '../../apis/auth';
import styles from './Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: emailLogin,
    onSuccess: (data) => {
      console.log('Login successful', data);
      localStorage.setItem('token', data.accessToken);
      navigate('/home'); // 로그인 성공 후 리다이렉트
    },
    onError: (error) => {
      console.error('Login failed', error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ userEmail: email, userPassword: password });
  };

  const handleGoogleLoginClick = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };
  return (
    <div className={styles.bg}>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h1 className={styles.h1}>로그인</h1>
          <div className={styles.inputBox}>
            <label className={styles.label}>
              이메일
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </form>
        <span className={styles.dividingLine}>
          <hr className={styles.line} />
          <p>계정 연동하기</p>
          <hr className={styles.line} />
        </span>
        <div className={styles.oauthBtnsContainer}>
          <button className={styles.googleBtn} onClick={handleGoogleLoginClick}>
            <img src={Google} alt="Google Logo" />
          </button>
          <button className={styles.kakaoBtn}>
            <img src={Kakao} alt="Kakao Logo" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
