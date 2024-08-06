import TabLink from '../../../atoms/buttons/TabLink/TabLink';
import Search from '../../../../assets/images/search.svg?react';
import MyScriptActive from '../../../../assets/images/nav/my-script-active.svg?react';
import MyScriptInactive from '../../../../assets/images/nav/my-script-inactive.svg?react';
import TimeTableActive from '../../../../assets/images/nav/time-table-active.svg?react';
import TimeTableInactive from '../../../../assets/images/nav/time-table-inactive.svg?react';
import TestMakeActive from '../../../../assets/images/nav/test-make-active.svg?react';
import TestMakeInactive from '../../../../assets/images/nav/test-make-inactive.svg?react';
import TrashCanActive from '../../../../assets/images/nav/trash-can-active.svg?react';
import TrashCanInactive from '../../../../assets/images/nav/trash-can-inactive.svg?react';
import styles from './MainNav.module.scss';

const MainNav = () => {
  const USERNAME = 'UserName'; // 임시 지정
  return (
    <nav className={styles.container}>
      <div className={styles.userProfile}>
        <div className={styles.profileImage}></div>
        <p className={styles.useName}>{USERNAME}</p>
      </div>
      <span className={styles.searchIcon}>
        <Search />
      </span>
      <input className={styles.searchBar} type="text" placeholder="파일 검색" />
      <section className={styles.linksContainer}>
        <TabLink
          to="/home"
          activeIcon={<MyScriptActive />}
          inactiveIcon={<MyScriptInactive />}
          exact={true}
        >
          내 스크립트
        </TabLink>
        <TabLink
          to="/home/time-table"
          activeIcon={<TimeTableActive />}
          inactiveIcon={<TimeTableInactive />}
        >
          시간표
        </TabLink>
        <TabLink
          to="/home/test-make"
          activeIcon={<TestMakeActive />}
          inactiveIcon={<TestMakeInactive />}
        >
          테스트 생성
        </TabLink>
        <TabLink
          to="/home/trash-can"
          activeIcon={<TrashCanActive />}
          inactiveIcon={<TrashCanInactive />}
        >
          휴지통
        </TabLink>
      </section>
    </nav>
  );
};

export default MainNav;