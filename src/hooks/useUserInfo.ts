import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../apis/user';

export const useMypageInfo = () => {
  const { data, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });

  const info = {
    userName: data?.object.userName || '',
    userEmail: data?.object.userEmail || '',
    userPassword: data?.object.userPassword || '',
    userSchool: data?.object.userSchool || '',
    userGrade: data?.object.userGrade || '0',
    userMajor: data?.object.userMajor || '',
    userOAuthType: data?.object.userOAuthType || '',
    userPasswordConfirm: '',
  };

  return { data, info, isError };
};
