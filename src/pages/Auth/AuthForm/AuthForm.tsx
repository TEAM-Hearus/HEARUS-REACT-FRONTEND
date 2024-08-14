import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../../../apis';
import Google from '../../../assets/images/logo/google.png';
import Kakao from '../../../assets/images/logo/kakao.png';
import styles from './AuthForm.module.scss';
import On from '../../../assets/images/showPasswordOn.svg?react';
import Off from '../../../assets/images/showPasswordOff.svg?react';
import { emailLogin, emailSignUp } from '../../../apis/auth';

interface AuthFormProps {
  title: string;
  buttonText: string;
  errorMessage: string;
  authGoBoxMessage: string;
  authGoLink: string;
  authGoLinkMessage: string;
}

const AuthForm = ({
  title,
  buttonText,
  errorMessage,
  authGoBoxMessage,
  authGoLink,
  authGoLinkMessage,
}: AuthFormProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isShowPasswordClick, setIsShowPasswordClick] = useState(false);
  const [isShowPasswordConfirmClick, setIsShowPasswordConfirmClick] =
    useState(false);
  const [name, setName] = useState('');

  const toggleShowPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShowPasswordClick((prev) => !prev);
  };
  const toggleShowPasswordConfirm = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShowPasswordConfirmClick((prev) => !prev);
  };

  const loginMutation = useMutation({
    mutationFn: emailLogin,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      navigate('/home');
    },
    onError: () => {
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    },
  });

  const signupMutation = useMutation({
    mutationFn: emailSignUp,
    onSuccess: () => {
      alert('회원가입에 성공했습니다! 로그인 페이지로 이동합니다.');
      navigate('/login');
    },
    onError: (error) => {
      console.error(errorMessage, error);
      alert(errorMessage);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid =
      title === '새 계정'
        ? email.trim() !== '' &&
          password.trim() !== '' &&
          passwordConfirm.trim() !== '' &&
          name.trim() !== ''
        : email.trim() !== '' && password.trim() !== '';
    if (!isValid) return;
    if (title === '새 계정' && password === passwordConfirm) {
      signupMutation.mutate({
        userEmail: email,
        userPassword: password,
        userName: name,
      });
    }
    if (title === '로그인') {
      loginMutation.mutate({ userEmail: email, userPassword: password });
    }
    if (title === '새 계정' && password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }
  };

  const handleGoogleClick = () => {
    window.location.href = `${API_URL}/oauth2/authorization/google`;
  };

  return (
    <div className={styles.bg}>
      <div className={styles.authContainer}>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <h1 className={styles.h1}>{title}</h1>
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
                type={isShowPasswordClick ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={styles.showBtn} onClick={toggleShowPassword}>
                {isShowPasswordClick ? <On /> : <Off />}
              </button>
            </label>
            {title === '로그인' && (
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="remember"
                  className={styles.checkBoxInput}
                />
                <label className={styles.checkBoxLabel} htmlFor="remember">
                  로그인 유지하기
                </label>
              </div>
            )}
          </div>
          {title === '새 계정' && (
            <>
              <div className={styles.inputBox}>
                <label className={styles.label}>
                  비밀번호 확인
                  <input
                    type={isShowPasswordConfirmClick ? 'text' : 'password'}
                    placeholder="비밀번호를 입력하세요"
                    className={styles.input}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </label>
                <button
                  className={styles.showBtn}
                  onClick={toggleShowPasswordConfirm}
                >
                  {isShowPasswordConfirmClick ? <On /> : <Off />}
                </button>
              </div>
              <div className={styles.inputBox}>
                <label className={styles.label}>
                  이름
                  <input
                    type="text"
                    placeholder="이름을 입력하세요"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              </div>
            </>
          )}
          <button className={styles.authBtn}>{buttonText}</button>
        </form>
        <div className={styles.oauthBtnsContainer}>
          <button className={styles.googleBtn} onClick={handleGoogleClick}>
            <img src={Google} alt="Google Logo" />
          </button>
          <button className={styles.kakaoBtn}>
            <img src={Kakao} alt="Kakao Logo" />
          </button>
        </div>
        <div className={styles.AuthGoBox}>
          <p>{authGoBoxMessage}</p>
          <Link to={authGoLink}>{authGoLinkMessage}</Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
