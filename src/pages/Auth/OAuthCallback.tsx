import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../apis/auth';
import { useQuery } from '@tanstack/react-query';

const OAuthCallback = () => {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const state = searchParams.get('state');
  const code = searchParams.get('code');

  if (state && code) {
    const { data } = useQuery({
      queryKey: ['google', code],
      queryFn: () => googleLogin({ state, code }),
    });
    console.log('state: ', state);
    console.log('code: ', code);
    console.log('data: ', data);
  } else {
    console.log('state, code 없음');
  }

  return <div>OAuthCallback</div>;
};

export default OAuthCallback;
