import { Link, useLocation } from 'react-router-dom';
import styles from './TabLink.module.scss';

interface IProps {
  to: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  children: React.ReactNode;
}

const TabLink = ({ to, activeIcon, inactiveIcon, children }: IProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
    >
      {isActive ? activeIcon : inactiveIcon}
      <span>{children}</span>
    </Link>
  );
};

export default TabLink;
