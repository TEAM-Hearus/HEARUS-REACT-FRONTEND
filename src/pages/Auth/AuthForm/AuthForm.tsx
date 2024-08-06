import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { API_URL } from '../../../apis';
import Google from '../../../assets/images/logo/google.png';
import Kakao from '../../../assets/images/logo/kakao.png';
import styles from './AuthForm.module.scss';
import On from '../../../assets/images/showPasswordOn.svg?react';
import Off from '../../../assets/images/showPasswordOff.svg?react';

interface AuthFormProps {
  title: string;
  buttonText: string;
  mutationFn: (variables: {
    userEmail: string;
    userPassword: string;
  }) => Promise<any>;
  successMessage: string;
  errorMessage: string;
  authGoBoxMessage: string;
  authGoLink: string;
  authGoLinkMessage: string;
}

const AuthForm = ({
  title,
  buttonText,
  mutationFn,
  successMessage,
  errorMessage,
  authGoBoxMessage,
  authGoLink,
  authGoLinkMessage,
}: AuthFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const navigate = useNavigate();
  const [isShowPasswordClick, setIsShowPasswordClick] = useState(false);
  const [isShowPasswordConfirmClick, setIsShowPasswordConfirmClick] =
    useState(false);

  const toggleShowPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShowPasswordClick(!isShowPasswordClick);
  };
  const toggleShowPasswordConfirm = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShowPasswordConfirmClick(!isShowPasswordConfirmClick);
  };

  const mutation: UseMutationResult<
    any,
    unknown,
    { userEmail: string; userPassword: string },
    unknown
  > = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      if (title === '로그인') {
        if (data.status === 'OK') {
          console.log(successMessage, data);
          localStorage.setItem('token', data.accessToken);
          navigate('/home'); // 로그인 성공 후 리다이렉트
        }
      } else if (data.status === 'CREATED') {
        console.log(successMessage, data);
        alert('회원가입 성공!');
        navigate('/login');
      } else {
        console.log('Operation failed:', data.msg);
        alert(data.msg || errorMessage);
      }
    },
    onError: (error) => {
      console.error(errorMessage, error);
      alert(errorMessage);
    },
  });
  // const emailRegex =
  // /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //title이 새 계정이고 비밀번호와 비밀번호확인이 같으면 회원가입 진행
    if (title === '새 계정' && password === passwordConfirm) {
      mutation.mutate({ userEmail: email, userPassword: password });
    }
    //title이 로그인이고 비밀번호 확인이 빈값이면 로그인 진행
    else if (title === '로그인' && passwordConfirm === '') {
      mutation.mutate({ userEmail: email, userPassword: password });
    }
    //title이 새 계정이고 비밀번호와 비밀번호 확인이 일치하지 않으면 팝업
    else if (title === '새 계정' && password !== passwordConfirm) {
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

            {title === '로그인' ? (
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
            ) : (
              ''
            )}
          </div>
          {title === '새 계정' ? (
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
          ) : (
            ''
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
          <Link to={authGoLink}>{authGoLinkMessage} </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
