import Google from '../../../../assets/images/logo/google.png';
import Kakao from '../../../../assets/images/logo/kakao.png';
import Naver from '../../../../assets/images/logo/naver.png';
import styles from './ProfileView.module.scss';

interface UserInfo {
  userName: string;
  userEmail: string;
  userPassword: string;
  userSchool: string;
  userGrade: string;
  userMajor: string;
  userOAuthType: string;
}
interface ProfileViewProps {
  info: UserInfo;
  onEditClick: () => void;
}

const ProfileView = ({ info, onEditClick }: ProfileViewProps) => {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <div className={styles.infoBox}>
      <div className={styles.inputBox}>
        <label className={styles.inputLabel}>
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
            className={`${styles.emailInput} ${!info.userOAuthType && styles.noLeftPadding}`}
            type="text"
            name="userEmail"
            value={info.userEmail}
            disabled
          />
        </label>
      </div>
      <div className={styles.inputBox}>
        <label className={styles.inputLabel}>
          사용자 이름
          <input
            className={styles.input}
            type="text"
            name="userName"
            value={info.userName}
            disabled
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
            disabled
          />
        </label>
        <label className={styles.inputLabel}>
          학년
          <input
            className={styles.gradeInput}
            type="text"
            name="userGrade"
            value={info.userGrade}
            disabled
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
            disabled
          />
        </label>
      </div>
      <div className={styles.btnBox}>
        <button className={styles.modifyBtn} onClick={onEditClick}>
          프로필 수정
        </button>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
};
export default ProfileView;
