import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import Google from '../../../../assets/images/logo/google.png';
import Kakao from '../../../../assets/images/logo/kakao.png';
import Naver from '../../../../assets/images/logo/naver.png';
import On from '../../../../assets/images/showPasswordOn.svg?react';
import Off from '../../../../assets/images/showPasswordOff.svg?react';
import Next from '../../../../assets/images/arrow/next-arrow.svg?react';
import Back from '../../../../assets/images/arrow/back-arrow.svg?react';
import { useAlertStore } from '../../../../store/useAlertStore';
import { updateInfo, IUserUpdateInfo } from '../../../../apis/user';
import { useMypageInfo } from '../../../../hooks/useUserInfo';
import { useUnauthorizedRedirect } from '../../../../hooks/useUnauthorizedRedirect';
import useServerErrorToast from '../../../../hooks/useServerErrorToast';
import styles from './ProfileEdit.module.scss';

const ProfileEdit = () => {
  const { data, info, isError } = useMypageInfo();

  useUnauthorizedRedirect(data);
  useServerErrorToast(isError);

  const nav = useNavigate();

  const [userInfo, setUserInfo] = useState({
    ...info,
  });

  const queryClient = useQueryClient();
  const addAlert = useAlertStore((state) => state.addAlert);

  const [isShowPasswordClick, setIsShowPasswordClick] = useState(false);
  const [isShowPasswordConfirmClick, setIsShowPasswordConfirmClick] =
    useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  type LoginType = 'naver' | 'kakao' | 'google' | null;

  const getLogoSrc = (type: LoginType): string => {
    switch (type) {
      case 'naver':
        return Naver;
      case 'kakao':
        return Kakao;
      case 'google':
        return Google;
      default:
        return '';
    }
  };
  const logoSrc = getLogoSrc(userInfo.userOAuthType as LoginType);
  const oauthTypeClass =
    userInfo.userOAuthType && styles[userInfo.userOAuthType];

  const toggleShowPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShowPasswordClick((prev) => !prev);
  };
  const toggleShowPasswordConfirm = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShowPasswordConfirmClick((prev) => !prev);
  };

  const increaseGrade = () => {
    if (parseInt(userInfo.userGrade) < 8) {
      setUserInfo({
        ...userInfo,
        userGrade: (parseInt(userInfo.userGrade) + 1).toString(),
      });
    }
  };

  const decreaseGrade = () => {
    if (parseInt(userInfo.userGrade) > 1) {
      setUserInfo({
        ...userInfo,
        userGrade: (parseInt(userInfo.userGrade) - 1).toString(),
      });
    }
  };

  const updateMutation = useMutation({
    mutationFn: updateInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      nav('/home/my-page');
    },
    onError: (error) => {
      addAlert(
        '정보 변경에 오류가 발생했습니다.\n 다시 시도해 주세요.',
        'error',
      );
      console.error(error);
    },
  });

  const handleMypageClick = () => {
    nav('/home/my-page');
  };

  const handleSaveClick = () => {
    if (userInfo.userPassword && userInfo.userPassword.length < 8) {
      addAlert('비밀번호는 최소 8자 이상이어야 합니다.', 'error');
      return;
    }
    if (
      userInfo.userOAuthType === '' &&
      userInfo.userPassword.trim() !== '' &&
      userInfo.userPassword !== userInfo.userPasswordConfirm
    ) {
      addAlert('비밀번호와 비밀번호 확인이 일치하지 않습니다.', 'error');
      return;
    }
    const updateData: IUserUpdateInfo = {
      userName: userInfo.userName || '',
      userPassword: userInfo.userPassword || '',
      userSchool: userInfo.userSchool || '',
      userGrade: userInfo.userGrade || '',
      userMajor: userInfo.userMajor || '',
    };

    if (!userInfo.userPassword) {
      delete updateData.userPassword;
    }
    updateMutation.mutate(updateData);
  };

  return (
    <div className={styles.wholeContainer}>
      <h1 className={styles.title}>계정 정보</h1>
      <div className={styles.profileContainer}>
        <div className={styles.infoBox}>
          <div className={styles.inputBox}>
            <label className={styles.emailLabel}>
              {logoSrc && (
                <div className={`${styles.oauthTypeBox} ${oauthTypeClass}`}>
                  <img
                    className={styles.oauthTypeImg}
                    src={logoSrc}
                    alt={`${userInfo.userOAuthType} Logo`}
                  />
                </div>
              )}
              계정 이메일
              <input
                className={`${styles.input} ${userInfo.userOAuthType && styles.rightPadding}`}
                type="text"
                name="userEmail"
                value={userInfo.userEmail}
                disabled
              />
            </label>
          </div>
          {!logoSrc && (
            <>
              <div className={styles.inputBox}>
                <label className={styles.inputLabel}>
                  비밀번호
                  <input
                    className={`${styles.input} ${styles.rightPadding}`}
                    type={isShowPasswordClick ? 'text' : 'password'}
                    name="userPassword"
                    value={userInfo.userPassword}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <div className={styles.showBtn} onClick={toggleShowPassword}>
                    {isShowPasswordClick ? <On /> : <Off />}
                  </div>
                </label>
              </div>
              <div className={styles.inputBox}>
                <label className={styles.inputLabel}>
                  비밀번호 확인
                  <input
                    className={`${styles.input} ${styles.rightPadding}`}
                    type={isShowPasswordConfirmClick ? 'text' : 'password'}
                    name="userPasswordConfirm"
                    value={userInfo.userPasswordConfirm}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <div
                    className={styles.showBtn}
                    onClick={toggleShowPasswordConfirm}
                  >
                    {isShowPasswordConfirmClick ? <On /> : <Off />}
                  </div>
                </label>
              </div>
            </>
          )}

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
              사용자 이름
              <input
                className={styles.input}
                type="text"
                name="userName"
                value={userInfo.userName}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
              />
            </label>
          </div>
          <div className={styles.schoolInputBox}>
            <label className={styles.inputLabel}>
              학교
              <input
                className={styles.schoolInput}
                type="text"
                name="userSchool"
                value={userInfo.userSchool}
                onChange={handleChange}
                placeholder="학교를 입력하세요"
              />
            </label>
            <label className={styles.inputLabel}>
              학년
              <div className={styles.gradeInput}>
                <div className={styles.arrowBtn} onClick={decreaseGrade}>
                  <Back />
                </div>
                <span className={styles.gradeNum}>{userInfo.userGrade}</span>
                <div className={styles.arrowBtn} onClick={increaseGrade}>
                  <Next />
                </div>
              </div>
            </label>
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
              학과
              <input
                className={styles.input}
                type="text"
                name="userMajor"
                value={userInfo.userMajor}
                onChange={handleChange}
                placeholder="학과를 입력하세요"
              />
            </label>
          </div>

          <div className={styles.btnBox}>
            <button className={styles.submitBtn} onClick={handleSaveClick}>
              저장하기
            </button>
            <button className={styles.viewModeBtn} onClick={handleMypageClick}>
              프로필 수정 취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileEdit;
