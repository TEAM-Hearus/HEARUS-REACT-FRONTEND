import React, { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useUserInfoStore } from '../../../store/useUserInfoStore';
import Edit from './ProfileEdit/ProfileEdit';
import View from './ProfileView/ProfileView';
import { useAlert } from '../../../contexts/AlertContext';
import Preview from '../../../assets/images/preview.png';
import { updateInfo, IUserUpdateInfo } from '../../../apis/user';
import styles from './Mypage.module.scss';

interface UserInfo {
  userName: string;
  userEmail: string;
  userPassword: string;
  userSchool: string;
  userGrade: string;
  userMajor: string;
  userImg: File | string;
  userOAuthType: string;
  userPasswordConfirm?: string;
}

const MyPage = () => {
  const { userInfo } = useUserInfoStore();
  const [info, setInfo] = useState<UserInfo>({
    userName: '',
    userEmail: '',
    userPassword: '',
    userSchool: '',
    userGrade: '',
    userMajor: '',
    userImg: '',
    userOAuthType: '',
    userPasswordConfirm: '',
  });

  const [preview, setPreview] = useState<string>(Preview);
  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>('view');
  const queryClient = useQueryClient();
  const { addAlert } = useAlert();

  useEffect(() => {
    setInfo({
      userName: userInfo.userName || '',
      userEmail: userInfo.userEmail || '',
      userPassword: userInfo.userPassword || '',
      userSchool: userInfo.userSchool || '',
      userGrade: userInfo.userGrade || '',
      userMajor: userInfo.userMajor || '',
      userImg: '',
      userOAuthType: userInfo.userOAuthType || '',
      userPasswordConfirm: '',
    });
  }, [userInfo]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setInfo({
        ...info,
        userImg: file,
      });
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleEditClick = () => {
    setCurrentMode('edit');
  };
  const handleViewClick = () => {
    setInfo({
      userName: userInfo.userName || '',
      userEmail: userInfo.userEmail || '',
      userPassword: userInfo.userPassword || '',
      userSchool: userInfo.userSchool || '',
      userGrade: userInfo.userGrade || '',
      userMajor: userInfo.userMajor || '',
      userImg: '',
      userOAuthType: userInfo.userOAuthType || '',
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
      console.error(error);
    },
  });

  const handleSaveClick = () => {
    if (
      info.userPassword.trim() === '' &&
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
        <div className={styles.profileImgBox}>
          {currentMode === 'view' ? (
            <img
              className={styles.profileImg}
              src={preview}
              alt="프로필 이미지"
            />
          ) : (
            <label className={styles.selectBtn}>
              <img
                className={styles.profileImg}
                src={preview}
                alt="프로필 이미지"
              />
              <input
                className={styles.imgSelectBtn}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
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
