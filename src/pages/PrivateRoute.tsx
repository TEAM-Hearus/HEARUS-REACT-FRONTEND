import { Navigate } from 'react-router-dom';
import { checkAuthentication } from '../utils/auth';
import { useUserInfoStore } from '../store/userUserInfoStore';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../apis/user';
import { useEffect } from 'react';

interface IProps {
  element: React.ReactElement;
}

const PrivateRoute = ({ element }: IProps) => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });
  const { setUserInfo } = useUserInfoStore();
  useEffect(() => {
    if (data != null) {
      setUserInfo(data);
    }
  }, [data]);

  // 로그인 상태 확인
  const isAuthenticated = checkAuthentication();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ errorType: 'auth' }} />;
  }
  return element;
};

export default PrivateRoute;
