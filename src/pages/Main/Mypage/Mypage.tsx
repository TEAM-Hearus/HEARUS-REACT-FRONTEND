import React, { useState, useEffect } from 'react';
import styles from './Mypage.module.scss';
import Preview from '../../../assets/images/preview.png';
import { useUserInfoStore } from '../../../store/useUserInfoStore';
import Edit from './ProfileEdit/ProfileEdit';
import View from './ProfileView/ProfileView';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateInfo, IUserUpdateInfo } from '../../../apis/user';

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

  const [preveiw, setPreview] = useState<string>(Preview);
  const [currentPage, setCurrentPage] = useState<'view' | 'edit'>('view');
  const queryClient = useQueryClient();

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
    setCurrentPage('edit');
  };

  const updateMutation = useMutation({
    mutationFn: updateInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setCurrentPage('view');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSaveClick = () => {
    if (!info.userPassword || !info.userPasswordConfirm) {
      alert('비밀번호와 비밀번호 확인을 입력해야 합니다.');
      return;
    }
    if (info.userPassword !== info.userPasswordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const updateData: IUserUpdateInfo = {
      userEmail: info.userEmail,
      userName: info.userName || '',
      userPassword: info.userPassword || '',
      userSchool: info.userSchool || '',
      userGrade: info.userGrade || '',
      userMajor: info.userMajor || '',
    };

    // 다시 사용할거라 둡니다.
    // if (!info.userPassword) {
    //   delete updateData.userPassword;
    // }
    updateMutation.mutate(updateData);
  };

  return (
    <div className={styles.wholeContainer}>
      <h1 className={styles.title}>계정 정보</h1>
      <div className={styles.profileContainer}>
        <div className={styles.profileImgBox}>
          <img
            className={styles.profileImg}
            src={preveiw}
            alt="프로필 이미지"
          />
          {currentPage === 'edit' && (
            <label className={styles.selectBtnLabel}>
              프로필 이미지
              <input
                className={styles.imgSelectBtn}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
        {currentPage === 'view' ? (
          <View info={info} onEditClick={handleEditClick} />
        ) : (
          <Edit info={info} setInfo={setInfo} onSaveClick={handleSaveClick} />
        )}
      </div>
    </div>
  );
};
export default MyPage;