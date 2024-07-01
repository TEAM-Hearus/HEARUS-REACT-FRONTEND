import { Outlet } from 'react-router-dom';
import MainHeader from '../headers/MainHeader/MainHeader';
import styles from './HomeLayout.module.scss';
import MainNav from '../navigators/MainNav/MainNav';

const HomeLayout = () => {
  return (
    <>
      <MainHeader />
      <main className={styles.mainContainer}>
        <MainNav />
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
