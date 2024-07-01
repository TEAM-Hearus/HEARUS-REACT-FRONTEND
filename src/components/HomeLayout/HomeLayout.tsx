import { Outlet } from 'react-router-dom';
import MainHeader from '../headers/MainHeader/MainHeader';
import styles from './HomeLayout.module.scss';

const HomeLayout = () => {
  return (
    <>
      <MainHeader />
      <main className={styles.mainContainer}>
        <nav>gd</nav>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
