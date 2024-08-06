import { Link, useLocation } from 'react-router-dom';
import styles from './TabLink.module.scss';

interface IProps {
  to: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
  children: React.ReactNode;
  exact?: boolean;
}

const TabLink = ({
  to,
  activeIcon,
  inactiveIcon,
  children,
  exact = false,
}: IProps) => {
  const location = useLocation();
  const isActive = exact
    ? location.pathname === to
    : location.pathname.startsWith(to);
  return (
    <Link to={to} className={`${styles.navItem} ${isActive && styles.active}`}>
      {isActive ? activeIcon : inactiveIcon}
      <span>{children}</span>
    </Link>
  );
};

export default TabLink;
