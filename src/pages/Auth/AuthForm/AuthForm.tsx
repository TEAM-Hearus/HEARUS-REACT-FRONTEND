import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../../../apis';
import Google from '../../../assets/images/logo/google.png';
import Kakao from '../../../assets/images/logo/kakao.png';
import Naver from '../../../assets/images/logo/naver.png';
import styles from './AuthForm.module.scss';
import On from '../../../assets/images/showPasswordOn.svg?react';
import Off from '../../../assets/images/showPasswordOff.svg?react';
import Warning from '../../../assets/images/warning.svg?react';
import { emailLogin, emailSignUp } from '../../../apis/auth';

interface AuthFormProps {
  title: string;
  buttonText: string;
  errorMessage: string;
  authGoBoxMessage: string;
  authGoLink: string;
  authGoLinkMessage: string;
}
interface ValidationState {
  name: boolean;
  nameErrorMessage: string;
  email: boolean;
  emailErrorMessage: string;
  password: boolean;
  passwordErrorMessage: string;
  passwordConfirm: boolean;
  passwordConfirmErrorMessage: string;
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

  const [validationState, setValidationState] = useState<ValidationState>({
    name: true,
    nameErrorMessage: '',
    email: true,
    emailErrorMessage: '',
    password: true,
    passwordErrorMessage: '',
    passwordConfirm: true,
    passwordConfirmErrorMessage: '',
  });

  const updateValidation = useCallback(
    (
      field: keyof ValidationState,
      isValid: boolean,
      errorMessage: string = '',
    ) => {
      setValidationState((prevState) => ({
        ...prevState,
        [field]: isValid,
        [`${field}ErrorMessage`]: errorMessage,
      }));
    },
    [],
  );
  const validateName = (value: string) => {
    if (value.trim() === '') {
      updateValidation('name', false, '이름을 입력해 주세요.');
    } else {
      updateValidation('name', true, '');
    }
  };

  const validateEmail = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        updateValidation('email', false, '이메일은 필수 입력 값입니다.');
        return;
      }
      const regex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const isValid = regex.test(value);

      if (!isValid) {
        updateValidation('email', false, '유효하지 않은 이메일입니다.');
      } else {
        updateValidation('email', true, '');
      }
    },
    [updateValidation],
  );

  const validatePassword = useCallback(
    (value: string) => {
      if (value.trim() === '') {
        updateValidation('password', false, '비밀번호는 필수 입력 값입니다.');
        return;
      }
      if (value.length < 8) {
        updateValidation(
          'password',
          false,
          '비밀번호는 최소 8자 이상이어야 합니다.',
        );
        return;
      }
      updateValidation('password', true, '');
    },
    [updateValidation],
  );

  const validatePasswordConfirm = useCallback(
    (value: string, currentPassword: string) => {
      if (value.trim() === '') {
        updateValidation(
          'passwordConfirm',
          false,
          '비밀번호 확인은 필수 입력 값입니다.',
        );
        return;
      }

      if (value !== currentPassword) {
        updateValidation(
          'passwordConfirm',
          false,
          '비밀번호가 일치하지 않습니다.',
        );
        return;
      }

      updateValidation('passwordConfirm', true, '');
    },
    [updateValidation],
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      validatePassword(newPassword);
      if (passwordConfirm) {
        validatePasswordConfirm(passwordConfirm, newPassword);
      }
    },
    [validatePassword, validatePasswordConfirm, passwordConfirm],
  );

  const handlePasswordConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPasswordConfirm = e.target.value;
      setPasswordConfirm(newPasswordConfirm);
      validatePasswordConfirm(newPasswordConfirm, password);
    },
    [validatePasswordConfirm, password],
  );

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
        ? validationState.email &&
          validationState.name &&
          validationState.password &&
          validationState.passwordConfirm
        : email.trim() !== '' && password.trim() !== '';
    if (!isValid) return;
    if (title === '새 계정' && isValid) {
      signupMutation.mutate({
        userEmail: email,
        userPassword: password,
        userName: name,
      });
    }
    if (title === '로그인') {
      loginMutation.mutate({ userEmail: email, userPassword: password });
    }
    if (!isValid) {
      alert('입력칸을 확인해주세요.');
    }
  };

  const handleOAuthClick = (e: string) => {
    window.location.href = `${API_URL}/oauth2/authorization/${e}`;
  };

  return (
    <div className={styles.bg}>
      <div className={styles.authContainer}>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <h1 className={styles.h1}>{title}</h1>
          {title === '새 계정' && (
            <div
              className={`${styles.inputBox} ${
                !validationState.name ? styles.inputBoxError : ''
              }`}
            >
              <label className={styles.label}>
                사용자 이름
                <input
                  type="text"
                  placeholder="사용자 이름 또는 닉네임을 입력하세요"
                  className={`${styles.input} ${
                    !validationState.name ? styles.inputError : ''
                  }`}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validateName(e.target.value);
                  }}
                />
              </label>
              {!validationState.name && (
                <div className={styles.validMsg}>
                  <Warning className={styles.warning} />
                  {validationState.nameErrorMessage}
                </div>
              )}
            </div>
          )}
          <div
            className={`${styles.inputBox} ${
              !validationState.email ? styles.inputBoxError : ''
            }`}
          >
            <label className={styles.label}>
              이메일
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                className={`${styles.input} ${
                  !validationState.email ? styles.inputError : ''
                }`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
              />
            </label>
            {!validationState.email && (
              <div className={styles.validMsg}>
                <Warning className={styles.warning} />
                {validationState.emailErrorMessage}
              </div>
            )}
          </div>

          <div
            className={`${styles.inputBox} ${
              !validationState.password ? styles.inputBoxError : ''
            }`}
          >
            <label className={styles.label}>
              비밀번호
              <input
                type={isShowPasswordClick ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className={`${styles.input} ${!validationState.password ? styles.inputError : ''}`}
                value={password}
                onChange={handlePasswordChange}
              />
              <div className={styles.showBtn} onClick={toggleShowPassword}>
                {isShowPasswordClick ? <On /> : <Off />}
              </div>
            </label>
            {!validationState.password &&
              validationState.passwordErrorMessage && (
                <div className={styles.validMsg}>
                  <Warning className={styles.warning} />
                  {validationState.passwordErrorMessage}
                </div>
              )}

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
            <div
              className={`${styles.inputBox} ${
                !validationState.passwordConfirm ? styles.inputBoxError : ''
              }`}
            >
              <label className={styles.label}>
                비밀번호 확인
                <input
                  type={isShowPasswordConfirmClick ? 'text' : 'password'}
                  placeholder="비밀번호를 재입력하세요"
                  className={`${styles.input} ${!validationState.passwordConfirm ? styles.inputError : ''}`}
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
              </label>
              <div
                className={styles.showBtn}
                onClick={toggleShowPasswordConfirm}
              >
                {isShowPasswordConfirmClick ? <On /> : <Off />}
              </div>
              {!validationState.passwordConfirm &&
                validationState.passwordConfirmErrorMessage && (
                  <div className={styles.validMsg}>
                    <Warning className={styles.warning} />
                    {validationState.passwordConfirmErrorMessage}
                  </div>
                )}
            </div>
          )}
          <button className={styles.authBtn}>{buttonText}</button>
        </form>
        <div className={styles.oauthBtnsContainer}>
          <button
            className={styles.googleBtn}
            onClick={() => handleOAuthClick('google')}
          >
            <img src={Google} alt="Google Logo" />
          </button>
          <button className={styles.kakaoBtn}>
            <img
              src={Kakao}
              alt="Kakao Logo"
              onClick={() => handleOAuthClick('kakao')}
            />
          </button>
          <button className={styles.naverBtn}>
            <img
              src={Naver}
              alt="naver Logo"
              onClick={() => handleOAuthClick('naver')}
            />
          </button>
        </div>
        <div className={styles.authGoBox}>
          <p className={styles.authGoMsg}>{authGoBoxMessage}</p>
          <Link className={styles.authGoLinkMsg} to={authGoLink}>
            {authGoLinkMessage}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
