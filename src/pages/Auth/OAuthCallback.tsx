import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../apis/auth';
import { useQuery } from '@tanstack/react-query';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const state = searchParams.get('state') || '';
  const code = searchParams.get('code') || '';

  const { data, isError } = useQuery({
    queryKey: ['google', code],
    queryFn: () => googleLogin({ state, code }),
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

  return <div>로그인 시도중...</div>;
};

export default OAuthCallback;
