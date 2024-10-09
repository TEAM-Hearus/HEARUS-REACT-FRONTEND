import React, { useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../../../apis';
import { useAlertStore } from '../../../store/useAlertStore';
import useAuthStore from '../../../store/useAuthStore';
import useValidation from '../../../components/atoms/useValidation/useValidation';
import InputField from '../../../components/atoms/inputs/AuthInput/AuthInputField';
import AlertComponent from '../../../components/molecules/GlobalAlert/GlobalAlert';
import Google from '../../../assets/images/logo/google.png';
import Kakao from '../../../assets/images/logo/kakao.png';
import Naver from '../../../assets/images/logo/naver.png';
import styles from './AuthForm.module.scss';
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
  const {
    name,
    email,
    password,
    passwordConfirm,
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,
  } = useAuthStore();
  const [isShowPasswordClick, setIsShowPasswordClick] = useState(false);
  const [isShowPasswordConfirmClick, setIsShowPasswordConfirmClick] =
    useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const addAlert = useAlertStore((state) => state.addAlert);
  const showConfirm = useAlertStore((state) => state.showConfirm);
  const {
    validationState,
    validateName,
    validateEmail,
    validatePassword,
    validatePasswordConfirm,
  } = useValidation();

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement> | null,
    validationCheck?: boolean,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (validationCheck && nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };
  const handleKeyDownSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

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

  const toggleShowPassword = () => {
    setIsShowPasswordClick((prev) => !prev);
  };
  const toggleShowPasswordConfirm = () => {
    setIsShowPasswordConfirmClick((prev) => !prev);
  };

  const loginMutation = useMutation({
    mutationFn: emailLogin,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      navigate('/home');
    },
    onError: () => {
      addAlert(
        '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
        'error',
      );
    },
  });

  const signupMutation = useMutation({
    mutationFn: emailSignUp,
    onSuccess: async () => {
      const confirmed = await showConfirm(
        '회원가입',
        '회원가입에 성공했습니다!\n 로그인 페이지로 이동하시겠습니까?',
        '확인',
      );
      if (confirmed) {
        navigate('/login');
      } else {
        navigate('/');
      }
    },
    onError: (error) => {
      console.error(errorMessage, error);
      addAlert('회원가입에 실패했습니다. 다시 시도해주세요.', 'error');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid =
      title === '새 계정'
        ? email.trim() !== '' &&
          name.trim() !== '' &&
          password.trim() !== '' &&
          passwordConfirm.trim() !== '' &&
          validationState.email &&
          validationState.name &&
          validationState.password &&
          validationState.passwordConfirm
        : email.trim() !== '' && password.trim() !== '';

    if (!isValid) {
      addAlert('입력 칸을 확인해주세요.', 'error');
      return;
    }

    if (title === '새 계정') {
      signupMutation.mutate({
        userEmail: email,
        userPassword: password,
        userName: name,
      });
    } else if (title === '로그인') {
      loginMutation.mutate({ userEmail: email, userPassword: password });
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
            <InputField
              label="사용자 이름"
              type="text"
              value={name}
              ref={nameRef}
              placeholder="사용자 이름 또는 닉네임을 입력하세요"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e, emailRef, true)
              }
              errorMessage={validationState.nameErrorMessage}
              isValid={validationState.name}
            />
          )}
          <InputField
            label="이메일"
            type="text"
            value={email}
            ref={emailRef}
            placeholder="이메일을 입력하세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(e, passwordRef, validationState.email)
            }
            errorMessage={validationState.emailErrorMessage}
            isValid={validationState.email}
          />

          <InputField
            label="비밀번호"
            type="password"
            value={password}
            ref={passwordRef}
            placeholder="비밀번호를 입력하세요"
            onChange={handlePasswordChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              title === '새 계정'
                ? handleKeyDown(e, passwordConfirmRef, validationState.password)
                : handleKeyDownSubmit
            }
            errorMessage={validationState.passwordErrorMessage}
            isValid={validationState.password}
            showPassword={isShowPasswordClick}
            toggleShowPassword={toggleShowPassword}
          />
          {title === '새 계정' && (
            <InputField
              label="비밀번호 확인"
              type="password"
              value={passwordConfirm}
              ref={passwordConfirmRef}
              placeholder="비밀번호를 재입력하세요"
              onChange={handlePasswordConfirmChange}
              onKeyDown={handleKeyDownSubmit}
              errorMessage={validationState.passwordConfirmErrorMessage}
              isValid={validationState.passwordConfirm}
              showPassword={isShowPasswordConfirmClick}
              toggleShowPassword={toggleShowPasswordConfirm}
            />
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
          <button
            className={styles.kakaoBtn}
            onClick={() => handleOAuthClick('kakao')}
          >
            <img src={Kakao} alt="Kakao Logo" />
          </button>
          <button
            className={styles.naverBtn}
            onClick={() => handleOAuthClick('naver')}
          >
            <img src={Naver} alt="naver Logo" />
          </button>
        </div>
        <div className={styles.authGoBox}>
          <p className={styles.authGoMsg}>{authGoBoxMessage}</p>
          <Link className={styles.authGoLinkMsg} to={authGoLink}>
            {authGoLinkMessage}
          </Link>
        </div>
      </div>
      <AlertComponent />
    </div>
  );
};

export default AuthForm;
