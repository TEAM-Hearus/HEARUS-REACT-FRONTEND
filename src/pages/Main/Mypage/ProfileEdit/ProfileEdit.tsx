import React, { useState } from 'react';
import Google from '../../../../assets/images/logo/google.png';
import Kakao from '../../../../assets/images/logo/kakao.png';
import Naver from '../../../../assets/images/logo/naver.png';
import On from '../../../../assets/images/showPasswordOn.svg?react';
import Off from '../../../../assets/images/showPasswordOff.svg?react';
import styles from './ProfileEdit.module.scss';

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

interface ProfileEditProps {
  info: UserInfo;
  setInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  onSaveClick: () => void;
}

const ProfileEdit = ({ info, setInfo, onSaveClick }: ProfileEditProps) => {
  const [isShowPasswordClick, setIsShowPasswordClick] = useState(false);
  const [isShowPasswordConfirmClick, setIsShowPasswordConfirmClick] =
    useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
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
  const logoSrc = getLogoSrc(info.userOAuthType as LoginType);
  const oauthTypeClass = info.userOAuthType && styles[info.userOAuthType];

  const toggleShowPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShowPasswordClick((prev) => !prev);
  };
  const toggleShowPasswordConfirm = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setIsShowPasswordConfirmClick((prev) => !prev);
  };

  return (
    <div className={styles.infoBox}>
      <div className={styles.inputBox}>
        <label className={styles.emailLabel}>
          {logoSrc && (
            <div className={`${styles.oauthTypeBox} ${oauthTypeClass}`}>
              <img
                className={styles.oauthTypeImg}
                src={logoSrc}
                alt={`${info.userOAuthType} Logo`}
              />
            </div>
          )}
          계정 이메일
          <input
            className={`${styles.input} ${info.userOAuthType && styles.rightPadding}`}
            type="text"
            name="userEmail"
            value={info.userEmail}
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
                value={info.userPassword}
                onChange={handleChange}
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
                value={info.userPasswordConfirm}
                onChange={handleChange}
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
            value={info.userName}
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
            value={info.userSchool}
            onChange={handleChange}
            placeholder="학교를 입력하세요"
          />
        </label>
        <label className={styles.inputLabel}>
          학년
          <input
            className={styles.gradeInput}
            type="text"
            name="userGrade"
            value={info.userGrade}
            onChange={handleChange}
            placeholder="학년을 입력하세요"
          />
        </label>
      </div>
      <div className={styles.inputBox}>
        <label className={styles.inputLabel}>
          학과
          <input
            className={styles.input}
            type="text"
            name="userMajor"
            value={info.userMajor}
            onChange={handleChange}
            placeholder="학과를 입력하세요"
          />
        </label>
      </div>

      <div className={styles.btnBox}>
        <button className={styles.submitBtn} onClick={onSaveClick}>
          완료하기
        </button>
      </div>
    </div>
  );
};
export default ProfileEdit;
