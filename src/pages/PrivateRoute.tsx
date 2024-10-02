import { Navigate } from 'react-router-dom';
import { checkAuthentication } from '../utils/auth';
import { useUserInfoStore } from '../store/useUserInfoStore';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../apis/user';
import { useEffect, useState } from 'react';
import SupplementaryInfoModal from '../components/templates/modals/SupplementaryInfoModal/SupplementaryInfoModal';

interface IProps {
  element: React.ReactElement;
}

interface UserInfo {
  userSchool: string;
  userMajor: string;
  userGrade: string;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const PrivateRoute = ({ element }: IProps) => {
  const { setUserInfo } = useUserInfoStore();
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
    staleTime: 5 * 60 * 1000,
  });

  const isUserInfoComplete = (userInfo: UserInfo | null) => {
    if (!userInfo) return false;
    const { userSchool, userMajor, userGrade } = userInfo;
    return userSchool !== null && userMajor !== null && userGrade !== null;
  };

  useEffect(() => {
    if (!isLoading && data != null) {
      setUserInfo(data?.object);

      if (!isUserInfoComplete(data.object)) {
        const lastRequestTime = localStorage.getItem('lastRequestTime');
        const infoSkipped = localStorage.getItem('SupplementarySkipped');
        const now = Date.now();

        if (infoSkipped === 'true') {
          if (lastRequestTime) {
            const lastTime = parseInt(lastRequestTime, 10);
            if (now - lastTime > ONE_DAY_MS) {
              setShowModal(true);
              localStorage.setItem('lastRequestTime', now.toString());
            }
          } else {
            localStorage.setItem('lastRequestTime', now.toString());
            setShowModal(true);
          }
        } else {
          localStorage.setItem('lastRequestTime', now.toString());
          setShowModal(true);
        }
      }
    }
  }, [data, isLoading]);

  const handleSkip = () => {
    localStorage.setItem('SupplementarySkipped', 'true');
    setShowModal(false);
  };

  const handleSave = () => {
    setShowModal(false);
  };

  // 로그인 상태 확인
  const isAuthenticated = checkAuthentication();

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ errorType: 'auth' }} />;
  }
  return (
    <>
      {element}
      {showModal && (
        <SupplementaryInfoModal onSkip={handleSkip} onSave={handleSave} />
      )}
    </>
  );
};

export default PrivateRoute;
