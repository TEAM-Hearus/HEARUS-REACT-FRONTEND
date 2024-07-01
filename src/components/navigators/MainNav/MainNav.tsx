import styles from './MainNav.module.scss';
import Search from '../../../assets/images/search.svg?react';
import MyBoardActive from '../../../assets/images/nav/my-board-active.svg?react';
import MyBoardInactive from '../../../assets/images/nav/my-board-inactive.svg?react';
import RecordScriptActive from '../../../assets/images/nav/record-script-active.svg?react';
import RecordScriptInactive from '../../../assets/images/nav/record-script-inactive.svg?react';
import TestMakeActive from '../../../assets/images/nav/test-make-active.svg?react';
import TestMakeInactive from '../../../assets/images/nav/test-make-inactive.svg?react';
import TimeTableActive from '../../../assets/images/nav/time-table-active.svg?react';
import TimeTableInactive from '../../../assets/images/nav/time-table-inactive.svg?react';
import TabLink from '../../common/buttons/TabLink/TabLink';

const MainNav = () => {
  return (
    <nav className={styles.container}>
      <span className={styles.searchIcon}>
        <Search />
      </span>
      <input className={styles.searchBar} placeholder="파일 검색" />
      <section className={styles.linksContainer}>
        <TabLink
          to="/home"
          activeIcon={<MyBoardActive />}
          inactiveIcon={<MyBoardInactive />}
        >
          내 보드
        </TabLink>
        <TabLink
          to="/home/record-note"
          activeIcon={<RecordScriptActive />}
          inactiveIcon={<RecordScriptInactive />}
        >
          녹음 스크립트
        </TabLink>
        <TabLink
          to="/home/test-make"
          activeIcon={<TestMakeActive />}
          inactiveIcon={<TestMakeInactive />}
        >
          테스트 생성
        </TabLink>
        <TabLink
          to="/home/time-table"
          activeIcon={<TimeTableActive />}
          inactiveIcon={<TimeTableInactive />}
        >
          시간표
        </TabLink>
      </section>
    </nav>
  );
};

export default MainNav;
