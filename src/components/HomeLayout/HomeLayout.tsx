import { Outlet } from 'react-router-dom';
import styles from './HomeLayout.module.scss';
import MainNav from '../navigators/MainNav/MainNav';

const HomeLayout = () => {
  return (
    <main className={styles.mainContainer}>
      <MainNav />
      <Outlet />
    </main>
  );
};

export default HomeLayout;
