import { Navigate } from 'react-router-dom';
import { checkAuthentication } from '../utils/auth';

interface IProps {
  element: React.ReactElement;
}

const PrivateRoute = ({ element }: IProps) => {
  // 로그인 상태 확인
  const isAuthenticated = checkAuthentication();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ errorType: 'auth' }} />;
  }
  return element;
};

export default PrivateRoute;
