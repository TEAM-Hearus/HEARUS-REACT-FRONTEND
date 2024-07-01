import styles from './MainHeader.module.scss';
import Logo from '../../../assets/images/logo/logo-header.svg?react';
import DownArrow from '../../../assets/images/arrow/down-arrow.svg?react';

const MainHeader = () => {
  return (
    <header className={styles.wrapper}>
      <Logo />
      <div className={styles.dropDownsContainer}>
        <button className={styles.dropDownBtn}>
          이용 문의
          <DownArrow />
        </button>
        <button className={styles.dropDownBtn}>
          마이페이지
          <DownArrow />
        </button>
      </div>
    </header>
  );
};

export default MainHeader;
