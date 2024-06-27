import styles from './App.module.scss';
import Logo from './assets/images/hearus.svg?react';

function App() {
  return (
    <div className={styles.logo}>
      <Logo />
      <p className={styles.title}>Hello, HEARUS!</p>
    </div>
  );
}

export default App;
