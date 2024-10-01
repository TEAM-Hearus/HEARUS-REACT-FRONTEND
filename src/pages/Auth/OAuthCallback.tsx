import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { OAuthLogin } from '../../apis/auth';
import Loading from '../../assets/images/LoadingCircle.gif';
import styles from './OAuthCallback.module.scss';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const params = useLocation();
  const parts = params.pathname?.split('/');
  const social = parts[2];
  const state = searchParams.get('state') || '';
  const code = searchParams.get('code') || '';

  const { data, isError } = useQuery({
    queryKey: ['oauth', code],
    queryFn: () => OAuthLogin({ social, state, code }),
    enabled: !!state && !!code,
    retry: false,
  });

  useEffect(() => {
    if (!state || !code) {
      alert('로그인 중 오류가 발생했습니다.');
      navigate('/');
      return;
    }

    if (isError) {
      alert('로그인 중 오류가 발생했습니다.');
      navigate('/');
      return;
    }

    if (data?.accessToken) {
      localStorage.setItem('token', data.accessToken);
      navigate('/home');
    }
  }, [state, code, data, isError]);

  return (
    <div className={styles.container}>
      <img src={Loading} alt="로그인 시도중..." />
    </div>
  );
};

export default OAuthCallback;
