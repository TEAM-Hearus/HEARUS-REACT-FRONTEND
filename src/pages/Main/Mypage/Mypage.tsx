import { useState, useEffect } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import Edit from './ProfileEdit/ProfileEdit';
import View from './ProfileView/ProfileView';
import { useAlertStore } from '../../../store/useAlertStore';
import { updateInfo, IUserUpdateInfo, getUserInfo } from '../../../apis/user';
import { useUnauthorizedRedirect } from '../../../hooks/useUnauthorizedRedirect';
import styles from './Mypage.module.scss';

interface UserInfo {
  userName: string;
  userEmail: string;
  userPassword: string;
  userSchool: string;
  userGrade: string;
  userMajor: string;
  userOAuthType: string;
  userPasswordConfirm?: string;
}

const MyPage = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUserInfo,
  });

  useUnauthorizedRedirect(data);

  const [info, setInfo] = useState<UserInfo>({
    userName: '',
    userEmail: '',
    userPassword: '',
    userSchool: '',
    userGrade: '',
    userMajor: '',
    userOAuthType: '',
    userPasswordConfirm: '',
  });

  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>('view');
  const queryClient = useQueryClient();
  const addAlert = useAlertStore((state) => state.addAlert);

  useEffect(() => {
    setInfo({
      userName: data?.object.userName || '',
      userEmail: data?.object.userEmail || '',
      userPassword: data?.object.userPassword || '',
      userSchool: data?.object.userSchool || '',
      userGrade: data?.object.userGrade || '',
      userMajor: data?.object.userMajor || '',
      userOAuthType: data?.object.userOAuthType || '',
      userPasswordConfirm: '',
    });
  }, [data]);

  const handleEditClick = () => {
    setCurrentMode('edit');
  };
  const handleViewClick = () => {
    setInfo({
      userName: data?.object.userName || '',
      userEmail: data?.object.userEmail || '',
      userPassword: data?.object.userPassword || '',
      userSchool: data?.object.userSchool || '',
      userGrade: data?.object.userGrade || '',
      userMajor: data?.object.userMajor || '',
      userOAuthType: data?.object.userOAuthType || '',
      userPasswordConfirm: '',
    });
    setCurrentMode('view');
  };

  const updateMutation = useMutation({
    mutationFn: updateInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setCurrentMode('view');
    },
    onError: (error) => {
      addAlert(
        '정보 변경에 오류가 발생했습니다.\n 다시 시도해 주세요.',
        'error',
      );
      console.error(error);
    },
  });
  const handleSaveClick = () => {
    if (info.userPassword.length < 8) {
      addAlert('비밀번호는 최소 8자 이상이어야 합니다.', 'error');
      return;
    }
    if (
      info.userOAuthType === '' &&
      info.userPassword.trim() !== '' &&
      info.userPassword !== info.userPasswordConfirm
    ) {
      addAlert('비밀번호와 비밀번호 확인이 일치하지 않습니다.', 'error');
      return;
    }

    const updateData: IUserUpdateInfo = {
      userName: info.userName || '',
      userPassword: info.userPassword || '',
      userSchool: info.userSchool || '',
      userGrade: info.userGrade || '',
      userMajor: info.userMajor || '',
    };

    if (!info.userPassword) {
      delete updateData.userPassword;
    }
    updateMutation.mutate(updateData);
  };

  return (
    <div className={styles.wholeContainer}>
      <h1 className={styles.title}>계정 정보</h1>
      <div className={styles.profileContainer}>
        <div className={styles.profileImgBox}></div>
        {currentMode === 'view' ? (
          <View info={info} onEditClick={handleEditClick} />
        ) : (
          <Edit
            info={info}
            setInfo={setInfo}
            onSaveClick={handleSaveClick}
            onViewClick={handleViewClick}
          />
        )}
      </div>
    </div>
  );
};
export default MyPage;
